# Claude Warm

A warm, quiet theme for Obsidian.

![Claude Warm preview](screenshot.png)

Claude Warm uses soft ivory in light mode and charcoal gray in dark mode, with muted red accents and a little extra breathing room around the editor. It is inspired by Claude's warm, low-contrast interface: calm enough to disappear, but not so plain that every pane feels the same.

## Features

- Light and dark color schemes
- Warm backgrounds with restrained contrast
- Muted red accents for links, tags, selections, and focused controls
- Softer sidebars, tabs, menus, modals, tables, callouts, and code blocks
- No remote fonts or external assets

## Install

### From Obsidian

Claude Warm is available in the Obsidian community theme directory:

- Community page: <https://community.obsidian.md/themes/claude-warm>
- Open in Obsidian: <obsidian://show-theme?name=Claude%20Warm>

To install from Obsidian:

1. Open Obsidian Settings.
2. Go to `Appearance`.
3. Next to `Themes`, click `Manage`.
4. Search for `Claude Warm` and click `Use`.

### Manually

1. Create a folder named `Claude Warm` in your vault at `.obsidian/themes/`.
2. Copy `manifest.json` and `theme.css` into that folder.
3. Restart Obsidian.
4. Go to `Settings -> Appearance -> Themes` and choose `Claude Warm`.

## Development

Claude Warm keeps the source intentionally small. Most of the theme is built from Obsidian CSS variables, with a few light selectors for surfaces that need a softer shape.

Files worth knowing:

- `theme.css` is the theme.
- `manifest.json` is the Obsidian theme manifest.
- `versions.json` maps theme versions to the minimum supported Obsidian version.
- `screenshot.png` is the preview used by the community theme directory.

Run the local validator before release:

```bash
node scripts/validate-theme.mjs
```

Regenerate the 512 x 288 preview image:

```bash
node scripts/generate-screenshot.mjs
```

## Release

Releases are created by GitHub Actions when a version tag is pushed.

1. Update `manifest.json` and `versions.json` to the new version.
2. Commit the change.
3. Create and push a tag that exactly matches `manifest.json`, for example:

```bash
git tag 1.0.0
git push origin 1.0.0
```

4. GitHub Actions creates a draft release and uploads `manifest.json` and `theme.css`.
5. Review the generated release notes, then publish the draft.

## Feedback

Issues and pull requests are welcome. Screenshots are especially helpful for UI bugs, since many theme problems depend on plugins, panes, and operating system settings.

## Palette

- Light background: `#F8F7F2`, `hsl(51, 24%, 95%)`
- Light text: `hsl(47, 15%, 25%)`
- Light accent: `#7C1B13`
- Dark background: `#2A2B2A`, `#2D2E2D`
- Dark text: `hsl(50, 14%, 91%)`
- Dark accent: `#EA928A`

## License

MIT
