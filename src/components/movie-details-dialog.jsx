import DOMPurify from "dompurify";
import { ArrowUpRight, CalendarDays, Clock3, Film, Star, X } from "lucide-react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const SUMMARY_TAGS = ["p", "br", "b", "strong", "i", "em", "ul", "ol", "li"];

export default function MovieDetailsDialog({ show, open, onOpenChange, returnFocusRef }) {
  const safeSummary = show?.summaryHtml
    ? DOMPurify.sanitize(show.summaryHtml, {
        ALLOWED_TAGS: SUMMARY_TAGS,
        ALLOWED_ATTR: [],
      })
    : null;

  function restoreFocus(event) {
    event.preventDefault();
    returnFocusRef.current?.focus();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {show && (
        <DialogContent
          showCloseButton={false}
          onCloseAutoFocus={restoreFocus}
          className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl gap-0 overflow-y-auto p-0 text-sm sm:max-w-4xl"
        >
          <div className="relative grid md:grid-cols-[340px_minmax(0,1fr)]">
            <div className="flex h-56 items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#1a3f34,#071411)] md:h-full md:min-h-120">
              {show.largeImage ? (
                <img
                  src={show.largeImage}
                  alt={`${show.name} poster`}
                  className="h-full w-full object-contain md:object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-emerald-100/70">
                  <Film className="size-12" aria-hidden="true" />
                  <span>Poster unavailable</span>
                </div>
              )}
            </div>

            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close details"
                className="absolute top-3 right-3 z-10 bg-black/60 text-white hover:bg-black/75 hover:text-white"
              >
                <X aria-hidden="true" />
              </Button>
            </DialogClose>

            <div className="p-6 sm:p-8">
              <DialogHeader className="pr-8">
                <DialogTitle className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
                  {show.name}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Details, rating, premiere date, and summary for {show.name}.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 text-foreground">
                  <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  {show.rating === null ? "Not rated" : `${show.rating.toFixed(1)} / 10`}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-4" aria-hidden="true" />
                  {show.premiered ?? "Premiere unknown"}
                </span>
                {show.runtime !== null && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="size-4" aria-hidden="true" />
                    {show.runtime} min
                  </span>
                )}
              </div>

              {show.genres.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2" aria-label="Genres">
                  {show.genres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="h-6 px-2.5">
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="mt-7 border-t pt-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em]">Overview</h3>
                {safeSummary ? (
                  <div
                    className="mt-3 text-sm leading-6 text-muted-foreground [&_p:not(:last-child)]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
                    dangerouslySetInnerHTML={{ __html: safeSummary }}
                  />
                ) : (
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    No summary available.
                  </p>
                )}
              </div>

              {(show.language || show.status || show.network) && (
                <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t pt-6 text-sm">
                  {show.language && (
                    <div>
                      <dt className="text-muted-foreground">Language</dt>
                      <dd className="mt-1 font-medium">{show.language}</dd>
                    </div>
                  )}
                  {show.status && (
                    <div>
                      <dt className="text-muted-foreground">Status</dt>
                      <dd className="mt-1 font-medium">{show.status}</dd>
                    </div>
                  )}
                  {show.network && (
                    <div>
                      <dt className="text-muted-foreground">Network</dt>
                      <dd className="mt-1 font-medium">{show.network}</dd>
                    </div>
                  )}
                </dl>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {show.url && (
                  <Button asChild className="h-10 px-4 text-sm">
                    <a href={show.url} target="_blank" rel="noopener noreferrer">
                      View on TVMaze
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  </Button>
                )}
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="h-10 px-4 text-sm">
                    Close
                  </Button>
                </DialogClose>
              </div>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
