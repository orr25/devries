# Devries Website — Easy Editing Guide

You normally only need to edit **two files**.

## 1. Change wording / RA information / verses
Edit:

`data/content.js`

This contains:
- homepage title and intro
- 3rd Floor / 4th Floor X / 4th Floor Y RA names and bios
- optional RA photo paths
- Verse of the Day collection

### Add an RA photo
1. Put the image inside the `images` folder, for example `images/billy.jpg`.
2. In `data/content.js`, change:

`raPhoto: ""`

to:

`raPhoto: "images/billy.jpg"`

## 2. Add or change dorm nights
Edit:

`data/events.js`

Building codes:
- `3` = 3rd Floor Guys
- `4X` = 4th Floor X
- `4Y` = 4th Floor Y
- `ALL` = rare Devries-wide event

Normal dorm events do **not** appear on the homepage.

## Easiest live editing after launch
On GitHub:
1. Open the file you want to change.
2. Click the pencil icon (Edit this file).
3. Change the text.
4. Click **Commit changes**.
5. Netlify will automatically redeploy the website from GitHub.

You do not need to upload the whole website again.
