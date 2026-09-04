# Devries Homebase — Easy Editing

This version is designed like a shared homebase/dashboard rather than a traditional website.

## Most edits happen in only two files

### `data/content.js`
Edit:
- Homepage wording
- RA names
- RA bios
- RA photos
- Verse-of-the-Day list

### `data/events.js`
Edit:
- 3rd Floor dorm nights (`building: "3"`)
- 4th Floor X dorm nights (`building: "4X"`)
- 4th Floor Y dorm nights (`building: "4Y"`)
- Rare whole-building events (`building: "ALL"`)

Only `ALL` events appear on the main Devries Homebase.

## Normal workflow

1. Open the file on GitHub.
2. Click the pencil icon.
3. Change the text/event.
4. Click **Commit changes**.
5. Netlify updates the live site automatically.

You do not need to edit the HTML for normal updates.
