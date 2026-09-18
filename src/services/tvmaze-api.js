const API_BASE_URL = "https://api.tvmaze.com";

export class TVMazeApiError extends Error {
  constructor(status) {
    super(
      status === 429
        ? "TVMaze is receiving too many requests. Please try again shortly."
        : `TVMaze request failed (HTTP ${status}).`,
    );
    this.name = "TVMazeApiError";
    this.status = status;
  }
}

// AbortController is a built-in browser API that allows you to cancel fetch requests. You can pass the `signal` property of an AbortController to the `fetch` options, and then call `abort()` on the controller to cancel the request. This is useful for scenarios where you want to cancel a request if the user navigates away from the page or if a new request is made before the previous one completes.

async function requestShows(path, { signal } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal });

  if (!response.ok) {
    throw new TVMazeApiError(response.status);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("TVMaze returned an unexpected response.");
  }

  return data;
}

/**
 * Convert a TVMaze show into the shared shape used by cards and the dialog.
 * Optional values are null, so the UI can render an explicit fallback.
 * `summaryHtml` is untrusted API content; sanitize it before rendering as HTML.
 */
export function normalizeShow(show) {
  const premiered = typeof show?.premiered === "string" ? show.premiered : null;
  const rating = show?.rating?.average;
  const runtime = show?.averageRuntime ?? show?.runtime;

  return {
    id: show?.id ?? null,
    name: show?.name || "Untitled show",
    url: show?.url || null,
    image: show?.image?.medium || show?.image?.original || null,
    largeImage: show?.image?.original || show?.image?.medium || null,
    premiered,
    year: /^\d{4}/.test(premiered || "") ? premiered.slice(0, 4) : null,
    rating: typeof rating === "number" && Number.isFinite(rating) ? rating : null,
    summaryHtml:
      typeof show?.summary === "string" && show.summary.trim()
        ? show.summary
        : null,
    genres: Array.isArray(show?.genres)
      ? show.genres.filter((genre) => typeof genre === "string")
      : [],
    language: show?.language || null,
    runtime: typeof runtime === "number" && Number.isFinite(runtime) ? runtime : null,
    status: show?.status || null,
    network: show?.network?.name || show?.webChannel?.name || null,
  };
}

/** Fetch one page of TVMaze's show index. Pass `{ signal }` to cancel the request. */
export async function getShows(page = 0, { signal } = {}) {
  if (!Number.isInteger(page) || page < 0) {
    throw new RangeError("Page must be a non-negative integer.");
  }

  const shows = await requestShows(`/shows?page=${page}`, { signal });
  return shows.map(normalizeShow);
}

/** Search all TVMaze shows by title, preserving the API's relevance order. */
export async function searchShows(query = "", { signal } = {}) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const results = await requestShows(`/search/shows?q=${encodeURIComponent(trimmedQuery)}`, {
    signal,
  });

  return results.filter((result) => result?.show).map((result) => normalizeShow(result.show));
}
