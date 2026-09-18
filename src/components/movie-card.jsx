import { ArrowUpRight, Film, Star } from "lucide-react";
import { useState } from "react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";

export default function MovieCard({ show }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = show.image && !imageFailed;

  return (
    <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[2/3] overflow-hidden bg-[linear-gradient(145deg,#1a3f34,#071411)]">
        {hasImage ? (
          <img
            src={show.image}
            alt={`${show.name} poster`}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="size-full object-cover transition-transform duration-300 group-hover/card:scale-105 motion-reduce:transition-none"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-3 px-5 text-center text-emerald-100/70">
            <Film className="size-10" aria-hidden="true" />
            <span className="text-sm font-medium">Poster unavailable</span>
          </div>
        )}
        {show.genres[0] && (
          <Badge className="absolute top-3 left-3 border border-white/20 bg-black/65 text-white backdrop-blur-sm">
            {show.genres[0]}
          </Badge>
        )}
      </div>

      <CardHeader className="gap-3 px-4 pt-4 pb-3">
        <CardTitle className="line-clamp-2 min-h-10 text-base leading-5 font-semibold">
          {show.name}
        </CardTitle>
        <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>{show.year ?? "Year unknown"}</span>
          <span className="inline-flex items-center gap-1 font-medium text-foreground">
            <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            {show.rating === null ? "Not rated" : show.rating.toFixed(1)}
          </span>
        </div>
      </CardHeader>

      <CardFooter className="mt-auto border-0 px-4 pt-0 pb-4">
        <Button asChild variant="outline" className="h-10 w-full justify-between px-3 text-sm">
          <a
            href={show.url ?? `https://www.tvmaze.com/shows/${show.id}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`See details for ${show.name} on TVMaze (opens in a new tab)`}
          >
            See Details
            <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
