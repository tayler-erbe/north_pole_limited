/**
 * North Pole Limited — RSVP collector
 *
 * Paste this into a Google Apps Script attached to a Google Sheet.
 * It does two things:
 *   • records every RSVP the website sends into the sheet
 *   • hands back the "good list" so the website can display who's coming
 *
 * Contact info and private notes stay in your sheet only —
 * they are never sent back out to the website.
 */

var SHEET_NAME = 'RSVPs';

/** Someone filled out the form. */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var data = JSON.parse(e.postData.contents);
    getSheet().appendRow([
      new Date(),
      String(data.name || '').slice(0, 120),
      String(data.attending || ''),
      Number(data.adults) || 0,
      Number(data.kids) || 0,
      String(data.who || '').slice(0, 1000),
      String(data.email || '').slice(0, 200),
      String(data.notes || '').slice(0, 1000)
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** The website is asking who's coming. */
function doGet() {
  var rows = getSheet().getDataRange().getValues();
  rows.shift(); // drop the header row

  // If somebody answers twice, their newest answer wins.
  var byName = {};
  rows.forEach(function (r) {
    var name = String(r[1] || '').trim();
    if (!name) return;
    byName[name.toLowerCase()] = {
      name: name,
      attending: String(r[2] || ''),
      adults: Number(r[3]) || 0,
      kids: Number(r[4]) || 0,
      who: String(r[5] || '')
      // note: contact + notes columns are intentionally left out
    };
  });

  var entries = Object.keys(byName).map(function (k) { return byName[k]; });
  return json({ entries: entries });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['When', 'Name', 'Coming', 'Adults', 'Kids', "Who's coming", 'Contact', 'Notes']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
