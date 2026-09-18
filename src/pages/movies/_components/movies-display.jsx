import MovieCard from "@/src/components/movie-card";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import { AlertCircle, Film } from "lucide-react";

export default function MoviesDisplay({
  result,
  isLoading,
  setRetryCount,
  query,
  clearSearch,
  showDetails,
}) {
  return (
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
            <MovieCard key={show.id} show={show} onSelect={showDetails} />
          ))}
        </div>
      )}
    </section>
  );
}

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
