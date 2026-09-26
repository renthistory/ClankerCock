# CLANKER COCK

Simple 18+ video viewer for the [daddysgoodglrl](https://www.redgifs.com/users/daddysgoodglrl) RedGifs stash.

RedGifs does **not** give out a public third-party API anymore. Direct `.mp4` URLs also rotate and are token-gated. The reliable way to put clips on your own site is their official iframe embed:

```html
<iframe
  src="https://www.redgifs.com/ifr/VIDEO_ID"
  frameborder="0"
  scrolling="no"
  allowfullscreen
  allow="autoplay; fullscreen"
></iframe>
```

Swap `/watch/` for `/ifr/` on any clip URL.

## What's in here

- `index.html` / `styles.css` / `app.js` — grid + lightbox player
- `videos.js` — catalog scraped from the public profile (14 watch pages found; profile listed 15 posts)
- Official logo in `logo.js`

## Run it locally

Just open `index.html` in a browser, or:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Add new clips

1. Open a gif on RedGifs.
2. Copy the slug after `/watch/` (example: `threadbaredisgustingantelope`).
3. Append an object in `videos.js`:

```js
{
  id: "theslug",
  tags: ["Whatever"],
  poster: "https://media.redgifs.com/TheSlug-mobile.jpg"
}
```

Poster URLs follow `https://media.redgifs.com/{PascalCaseId}-mobile.jpg`.

## GitHub Pages

Repo Settings → Pages → Deploy from branch `main` / root. Site will land at:

`https://renthistory.github.io/ClankerCock/`

## Source

- Profile: https://www.redgifs.com/users/daddysgoodglrl
- Display name: CLANKER COCK
- Bio: Follow for more AI generated filth
