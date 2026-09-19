# Vedic Samadhan
Consultation & Pooja booking site for **Pundit Vidyanand Shukla**.

No backend, no database — 100% static site. Payment is via UPI deep link,
and every booking is confirmed manually over WhatsApp, exactly as designed.

---

## 📁 What's in this folder

| File | What it's for |
|---|---|
| `index.html` | The page structure. You shouldn't need to touch this. |
| `style.css` | All the colors, fonts, and layout. |
| `app.js` | All the logic (booking flow, payment link, WhatsApp message). |
| `data.js` | **Edit this one.** Prices, pooja list, phone number, UPI ID, daily Tithi text — all in one place. |
| `assets/` | Put Pundit Ji's photo and a logo here once you have them. |

---

## 🚀 Put it live on GitHub Pages (free hosting)

### Step 1 — Create the repository
1. Go to [github.com/new](https://github.com/new) (log in first).
2. Repository name: `vedic-samadhan` (or anything you like).
3. Set it to **Public**.
4. Do **not** tick "Add a README" — you already have one. Click **Create repository**.

### Step 2 — Upload the files
1. On your new empty repository page, click **"uploading an existing file"**.
2. Drag in **all the files and folders from this package** (`index.html`, `style.css`, `app.js`, `data.js`, `assets/`, `README.md`) — keep them at the top level of the repo, not inside another folder.
3. Scroll down, click **Commit changes**.

### Step 3 — Turn on GitHub Pages
1. In your repository, go to **Settings** → **Pages** (left sidebar).
2. Under "Build and deployment" → **Source**, choose **Deploy from a branch**.
3. Under **Branch**, choose `main` and folder `/ (root)`. Click **Save**.
4. Wait 1–2 minutes. Refresh the page — GitHub will show your live link, something like:
   `https://your-username.github.io/vedic-samadhan/`

That link is your app. Open it on your phone to test the full flow end to end
(fill the form → tap pay → tap the WhatsApp button) before sharing it anywhere.

### Step 4 — Add it to Google Business
1. Open your existing Google Business Profile.
2. Go to **Edit profile** → **Website** (or **Add a link** under the profile).
3. Paste your GitHub Pages link.
4. Save. You can also add it to your WhatsApp Business "Business Info" link field.

---

## ✏️ Making changes later (no coding needed)

Almost everything you'll want to change lives in **`data.js`**:
- Prices — edit the `price:` numbers.
- Add/remove a pooja — copy a line inside `poojas: [ ... ]` and edit the name/tier.
- Change the phone number or UPI ID — edit `whatsappNumber` and `upiId`.
- Update today's Tithi/Nakshatra — edit `panchang: { ... }`.

After editing, upload the changed file again on GitHub (open the file in your repo,
click the pencil ✏️ icon, edit, then **Commit changes**) — the live site updates
automatically within a minute or two.

## 🖼️ Adding Pundit Ji's real photo
Right now the header shows a placeholder (🕉️ glyph on a warm background).
To use a real photo:
1. Upload the photo into the `assets/` folder (e.g. `assets/pundit-photo.jpg`).
2. Open `index.html`, find this block near the top:
   ```html
   <div class="banner-photo" aria-hidden="true">
     <div class="photo-placeholder">
   ```
3. Replace the whole `<div class="banner-photo">...</div>` block with:
   ```html
   <div class="banner-photo" aria-hidden="true">
     <img src="assets/pundit-photo.jpg" alt="" style="width:100%;height:100%;object-fit:cover;">
   </div>
   ```

## ⚠️ Good to know
- This is a **static site**: it cannot automatically verify a UPI payment.
  That's intentional — your assistant checks the WhatsApp screenshot and
  confirms the slot manually, exactly as in your original workflow.
- The "Blessed Counter" and Tithi banner are **plain text you update by hand**
  in `data.js` — there's no live astronomy calculation behind them.
- Always test the live link on an actual phone before sharing it, since the
  UPI payment button only opens installed UPI apps on mobile devices.
