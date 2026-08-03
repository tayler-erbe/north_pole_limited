# North Pole Limited — putting it online

Two parts: a place to collect RSVPs, and a place to host the page. Do them in this order, because step 1 gives you a link you'll paste into the page in step 2.

Total time: about 15 minutes.

---

## Part 1 — Set up the RSVP collector (Google Sheets)

GitHub Pages can only serve files; it can't save anything. So a free Google Sheet does the remembering.

1. Go to **sheets.google.com** and make a new blank spreadsheet. Name it something like *North Pole Limited RSVPs*.
2. In that sheet: **Extensions → Apps Script**. A code editor opens in a new tab.
3. Delete whatever's in there, then paste in the entire contents of **`apps-script.gs`**. Hit save (the disk icon).
4. Click **Deploy → New deployment**.
   - Click the gear next to "Select type" and choose **Web app**.
   - Description: anything, e.g. `RSVP`.
   - **Execute as:** Me
   - **Who has access:** **Anyone** ← this matters. It has to be "Anyone," not "Anyone with Google account," or your guests will hit a login wall.
   - Click **Deploy**.
5. Google will ask you to authorize it. Click through: *Review permissions → your account → Advanced → Go to (project name) → Allow*. The "unverified app" warning is expected — it's your own script.
6. Copy the **Web app URL** it gives you. It looks like:
   `https://script.google.com/macros/s/AKfycb…long…/exec`

Keep that URL handy.

---

## Part 2 — Connect the page to it

1. Open `index.html` in any plain text editor (TextEdit, Notepad, VS Code, or straight in GitHub's web editor).
2. Search for `var ENDPOINT`. It's near the top of the script section and looks like this:

   ```js
   var ENDPOINT = "";
   ```

3. Paste your URL between the quotes:

   ```js
   var ENDPOINT = "https://script.google.com/macros/s/AKfycb…/exec";
   ```

4. Save. That's the only edit you need to make to the file.

---

## Part 3 — Put it on GitHub Pages

1. On **github.com**, click **New repository**. Name it whatever you like (`north-pole-limited` works). Set it to **Public**. Create it.
2. Click **uploading an existing file** and drag in `index.html`. Commit.
3. Go to **Settings → Pages** (left sidebar).
4. Under "Build and deployment," set **Source: Deploy from a branch**, **Branch: main**, **Folder: / (root)**. Save.
5. Wait a minute or two, then refresh. GitHub shows your live link at the top:
   `https://yourusername.github.io/north-pole-limited/`

That's the link you text to everybody. No login, no app, works on any phone.

---

## How it behaves once it's live

- A guest fills out the ticket and hits **Punch my ticket** → their answer lands in your Google Sheet instantly.
- Anyone can tap **See who's coming** in the "Who's on the good list" section and see the running list: each family, who they're bringing, and a headcount at the top.
- The list shows **names and party size only**. Phone numbers, emails, and the "anything else we should know" notes stay private in your sheet where only you can see them.
- If somebody RSVPs twice, their newest answer replaces the old one, so nobody gets double-counted.
- **Copy as spreadsheet** grabs the whole list for you to paste into Numbers or Excel when you give the museum a headcount.

---

## Things worth knowing

**Anyone with the link can RSVP.** There's no password. For a family event that's the point — but it does mean if the link gets forwarded around, a stranger could technically add a row. You'd see it immediately in the sheet and can just delete the row. If that ever becomes a problem, tell me and I'll add a simple passphrase to the form.

**Your repo is public, so the Apps Script URL is visible** to anyone who views the page source. It only does two things — add a row, or return the names list — so the worst case is a junk entry. It can't read your other Google files.

**To change anything later** — a time, a photo, a FAQ answer — edit `index.html` on GitHub directly (click the file, then the pencil icon) and commit. The live site updates in about a minute.

**Making updates to the deployment.** If you ever paste a new version of the Apps Script, you must click **Deploy → Manage deployments → edit (pencil) → Version: New version → Deploy**. Otherwise the old code keeps running. 

---

## If something doesn't work

- **Form says it saved but the sheet is empty** → the deployment's "Who has access" isn't set to *Anyone*. Redeploy with that fixed.
- **"Couldn't reach the list right now"** → same cause, or you pasted the URL ending in `/dev` instead of `/exec`. Use the `/exec` one.
- **The page loads but photos don't** → make sure you uploaded the full `index.html`; the pictures live inside it, so the file is around 1 MB. That's normal.
