import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

import MovieDetailsDialog from "../../components/movie-details-dialog";
import { getShows, searchShows } from "../../services/tvmaze-api";
import MoviesDisplay from "./_components/movies-display";
import TopSection from "./_components/top-section";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const [retryCount, setRetryCount] = useState(0);
  const [result, setResult] = useState({ key: null, shows: [], error: null });
  const [selectedShow, setSelectedShow] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const detailsTriggerRef = useRef(null);
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

  function showDetails(show, event) {
    detailsTriggerRef.current = event.currentTarget;
    setSelectedShow(show);
    setDetailsOpen(true);
  }

  return (
    <div className="min-h-full bg-background">
      <TopSection handleSearch={handleSearch} query={query} />

      <MoviesDisplay
        result={result}
        isLoading={isLoading}
        setRetryCount={setRetryCount}
        query={query}
        clearSearch={clearSearch}
        showDetails={showDetails}
      />

      <MovieDetailsDialog
        show={selectedShow}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        returnFocusRef={detailsTriggerRef}
      />
    </div>
  );
}
