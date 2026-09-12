# Komal Patil — Developer Portfolio

An animated, responsive single-page portfolio built with plain HTML, CSS, and JavaScript.
No build step, no framework — just open and go.

## Sections
- **Hero** — animated typed tagline, gradient name, social links
- **About Me** — bio + animated stat counters
- **Tech Skills** — animated icon tiles
- **Work Experience** — timeline (Cornerstone OnDemand, Infosys)
- **Featured Projects** — AmenityHub & Resto-Track, with video covers
- **Get In Touch** — contact details (left) + message form (right)

## Run locally
From this folder:
```bash
python -m http.server 5500
```
Then open http://localhost:5500

## Project cover videos
Cover videos live in `assets/`:
- `assets/amenity.mp4`
- `assets/restotrack.mp4`

Priority is video → image → animated CSS scene. If a file is missing, the animated
scene shows automatically.

---

## Deploy to GitHub Pages

1. Create a new **public** repo on GitHub (e.g. `portfolio` or `komal-portfolio`).
   > Tip: if you name it exactly `kpatil5912.github.io`, the site is served at the
   > root domain `https://kpatil5912.github.io/`. Any other name is served at
   > `https://kpatil5912.github.io/<repo-name>/`.

2. From this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/kpatil5912/<repo-name>.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages** → under *Build and deployment*, set
   **Source = Deploy from a branch**, **Branch = main**, **Folder = / (root)** → Save.

4. Wait ~1 minute. Your site goes live at the URL shown on that Pages settings screen.

### Notes
- A `.nojekyll` file is included so GitHub Pages serves all files as-is.
- Before pushing, set your real LinkedIn URL in `script.js` (`LINKEDIN_URL`).
