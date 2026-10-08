# Veronika Volokitina

A minimal personal website and Markdown blog built with [Astro](https://astro.build/).

## Development

Use Node.js 24 LTS.

```sh
npm ci
npm run dev
```

`npm run build` creates the static website in `dist/`. `npm run preview` serves the production build locally.

## Editing

- `src/pages/index.astro`: experience, talks, engineering background, and social links.
- `src/content/blog/*.md`: blog posts; see [BLOGGING.md](BLOGGING.md).
- `src/components/ExternalPosts.astro`: articles published elsewhere.
- `src/layouts/SiteLayout.astro`: navigation and page metadata.
- `public/style.css`: colors, typography, and responsive layout.

Talks accept a `presentationUrl` for slides and an optional `youtubeUrl` for a recording. Add the real links when available.

The site uses locally hosted Manrope. Its license is in `public/fonts/OFL.txt`.

## Publishing

The main branch is `master`. GitHub Actions installs locked dependencies and builds the site on pushes and pull requests to `master`.

Automatic deployment is pending the hosting choice. A GitHub Pages workflow is prepared for `https://vlktna.github.io/me/` and remains disabled until the repository variable `PAGES_ENABLED` is set to `true`. To activate it, enable Pages with GitHub Actions as its source, set that variable, then run the workflow or push to `master`. It builds the website and publishes only after a successful build, using GitHub's temporary workflow token.

`SITE_URL` and `BASE_PATH` configure the build for its host. Navigation, assets, Markdown links, and RSS include the deployment path.

The existing Sites copy is published through Codex; its credentials are not stored in this repository. The local `vlktna/` checkout belongs to that copy and is ignored by this repository.
