import { AlertCircle, Film, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import MovieCard from "../../components/movie-card";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Skeleton } from "../../components/ui/skeleton";
import { getShows, searchShows } from "../../services/tvmaze-api";

function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden border bg-card" aria-hidden="true">
      <Skeleton className="aspect-2/3 w-full" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="mt-5 h-10 w-full" />
      </div>
    </div>
  );
}

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const [retryCount, setRetryCount] = useState(0);
  const [result, setResult] = useState({ key: null, shows: [], error: null });
  const requestKey = `${query}\u0000${retryCount}`;
  const isLoading = result.key !== requestKey;

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadShows() {
      try {
        const shows = query
          ? await searchShows(query, { signal: controller.signal })
          : await getShows(0, { signal: controller.signal });

        if (active) {
          setResult({ key: requestKey, shows, error: null });
        }
      } catch (error) {
        if (active && error.name !== "AbortError") {
          setResult({ key: requestKey, shows: [], error });
        }
      }
    }

    loadShows();

    return () => {
      active = false;
      controller.abort();
    };
  }, [query, requestKey]);

  function handleSearch(event) {
    event.preventDefault();
    const nextQuery = String(new FormData(event.currentTarget).get("query") ?? "").trim();

    if (nextQuery === query) return;

    setSearchParams(nextQuery ? { q: nextQuery } : {});
  }

  function clearSearch() {
    setSearchParams({});
  }

  return (
    <div className="min-h-full bg-background">
      <section className="relative isolate overflow-hidden border-b border-emerald-300/10 bg-[#071411] text-white">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_0%,rgba(38,191,131,0.22),transparent_40%),linear-gradient(135deg,#0c241d,#071411_70%)]"
          aria-hidden="true"
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
            The catalog
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Find your next favorite show.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Explore the collection or search by title to find exactly what you want to watch.
          </p>

          <form
            key={query}
            onSubmit={handleSearch}
            role="search"
            className="mt-8 flex max-w-2xl gap-2"
          >
            <Input
              name="query"
              type="search"
              defaultValue={query}
              placeholder="Search for a show..."
              aria-label="Search shows by title"
              className="h-11 border-white/20 bg-white px-4 text-sm text-slate-150 placeholder:text-slate-500 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/40 md:text-sm"
            />
            <Button
              type="submit"
              size="lg"
              className="h-11 min-w-11 bg-emerald-400 px-3 text-emerald-950 hover:bg-emerald-300"
              aria-label="Search shows"
            >
              <Search className="size-5" aria-hidden="true" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </form>
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
        aria-labelledby="results-heading"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="results-heading" className="text-2xl font-semibold tracking-tight">
              {query ? `Results for “${query}”` : "Browse shows"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground" role="status" aria-live="polite">
              {isLoading
                ? "Loading shows..."
                : result.error
                  ? "Could not load shows"
                  : `${result.shows.length} ${result.shows.length === 1 ? "show" : "shows"} found`}
            </p>
          </div>
          {query && (
            <Button
              type="button"
              variant="outline"
              onClick={clearSearch}
              className="h-9 px-3 text-sm"
            >
              Clear search
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </div>
        ) : result.error ? (
          <Alert variant="destructive" className="max-w-2xl gap-2 p-5">
            <AlertCircle aria-hidden="true" />
            <AlertTitle>Unable to load shows</AlertTitle>
            <AlertDescription>
              {result.error.message || "Please check your connection and try again."}
            </AlertDescription>
            <Button
              type="button"
              variant="outline"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-3 w-fit px-4"
            >
              Try again
            </Button>
          </Alert>
        ) : result.shows.length === 0 ? (
          <div className="flex flex-col items-center border bg-muted/30 px-6 py-16 text-center">
            <Film className="size-10 text-muted-foreground" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-semibold">No shows found</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              {query
                ? "Try another title or clear the search to browse the catalog."
                : "There are no shows to display right now. Please try again later."}
            </p>
            {query && (
              <Button type="button" variant="outline" onClick={clearSearch} className="mt-5 px-4">
                Browse all shows
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {result.shows.map((show) => (
              <MovieCard key={show.id} show={show} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
