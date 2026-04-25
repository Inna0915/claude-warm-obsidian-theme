# Community Theme Submission Checklist

Use this after the repository is pushed to GitHub and the first release is published.

## Required repository files

- [x] `manifest.json`
- [x] `theme.css`
- [x] `README.md`
- [x] `LICENSE`
- [x] `screenshot.png` at 512 x 288
- [x] `versions.json`

## Required release assets

The GitHub Actions workflow creates a draft release and uploads:

- [x] `manifest.json`
- [x] `theme.css`

## `community-css-themes.json` entry

Use this entry when submitting the theme to `obsidianmd/obsidian-releases`:

```json
{
  "name": "Claude Warm",
  "author": "Amo",
  "repo": "amm10090/claude-warm-obsidian-theme",
  "screenshot": "screenshot.png",
  "modes": ["dark", "light"]
}
```

## Submission steps

1. Push this repository to GitHub.
2. Create and push a tag that matches `manifest.json`, for example `1.0.0`.
3. Open the draft release created by GitHub Actions, check the notes, then publish it.
4. Fork `obsidianmd/obsidian-releases`.
5. Add the JSON entry above to `community-css-themes.json`.
6. Open a pull request titled `Add Claude Warm theme`.
