# MovieExplorer

MovieExplorer is a responsive React app for discovering TV shows. Browse the TVMaze catalog, search for a title, and open a show to see its poster, rating, premiere date, genres, and overview. The project uses TV-show data even though its name says “MovieExplorer.”

## Features

- Landing page with a direct link to the show catalog.
- Responsive show cards with poster, title, year, rating, and missing-data fallbacks.
- Title search that runs when you click the search button or press Enter—not while typing.
- Shareable search URLs, such as `/movies?q=girls`.
- In-app details dialog with keyboard-friendly close controls and a link to the show on TVMaze.
- Loading, empty-result, error, and retry states.
- Sanitized TVMaze summaries that preserve basic text formatting.

## Run locally

You need Node.js and pnpm installed. No API key or environment file is required.

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). The homepage is at `/`, and the catalog is at `/movies`.

On Windows PowerShell, use `pnpm.cmd` in place of `pnpm` if the shell blocks the `pnpm.ps1` script.

## Production build

```bash
pnpm lint
pnpm build
pnpm preview
```

`pnpm build` writes the production site to `dist/`. Deploy that directory to a static host and configure a single-page-app fallback to `index.html` so direct visits to `/movies` work.

## Data and attribution

Show information and poster images come from the [TVMaze API](https://www.tvmaze.com/api). The app uses the `/shows` index for browsing and `/search/shows` for title searches. TVMaze is credited in the app footer and linked from each details dialog. TVMaze data is provided under its [API licensing terms](https://www.tvmaze.com/api#licensing).

## Submission links

- Public GitHub repository: **https://github.com/Jisan-Dev/next-lvl-foundation-program-a2**
- Live deployment: **https://next-level-movie-explorer-zeta.vercel.app/**
