# Sharely website

The public site for [Sharely](https://github.com/SatyamChy03/Sharely): a home page, a download center and an installation guide.

Built with Vite, React, TypeScript and Tailwind CSS 4. Fonts (Geist, Geist Mono) are bundled, so the site makes no third-party requests.

## Commands

```bash
npm install
npm run dev            # local preview at http://localhost:5173
npm run build          # type-check, then build into dist/
npm run preview        # serve the built site
npm run sync-release   # refresh download links from GitHub (also runs before every build)
```

## How downloads work

`scripts/sync-release.mjs` reads the newest release of the app repository (pre-releases included) and writes `src/config/release.json`. The pages read that file, so:

- **Before a release exists**, every build shows as "Not yet available" and the download buttons are disabled.
- **After a release**, rebuild and redeploy the site. The buttons then link straight to the release files, with size, version, date and SHA-256 checksum.

The script matches files by the names the app's release workflow produces:

| Download | File name ends with |
|---|---|
| Windows | `-windows.zip` |
| Linux (Debian package) | `-linux-amd64.deb` |
| Linux (portable) | `-linux-x64.tar.gz` |
| Android | `-android.apk` |

macOS is listed as planned. To publish it later, add its file ending to `ASSET_SUFFIXES` in the script and pass the new key to the macOS format in `src/config/platforms.ts`.

If GitHub cannot be reached during a build, the script keeps the existing `release.json`.

## Where to change things

| What | File |
|---|---|
| Platforms, formats, system requirements | `src/config/platforms.ts` |
| Site name, GitHub link, privacy/terms/support links | `src/config/site.ts` |
| Claims about the app (pricing, network, how transfers work) | `src/config/facts.ts` |
| Installation steps | `src/pages/install/` |
| FAQ | `src/sections/faqItems.ts` |
| Colours, radii, motion | `src/index.css` |

A `null` in `site.ts` or `facts.ts` shows a neutral "soon" or "to be announced" answer instead of a claim.

## Deploying

`dist/` is a static site and works on any static host. The build copies `index.html` to `404.html` so links such as `/download` load on hosts that serve `404.html` for unknown paths (GitHub Pages does).

Optional environment variables at build time:

- `VITE_SITE_URL`: the public address, used for canonical and social-sharing links.
- `VITE_BASE`: the sub-path when the site is not served from the root, for example `/Sharely-web/`.
- `GITHUB_TOKEN`: raises the GitHub API limit for `sync-release` in CI.
