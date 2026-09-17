import { Button } from "@/src/components/ui/button";
import { ArrowRight, Clapperboard, Film, Search, Star } from "lucide-react";
import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#071411] text-white">
      <div
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_25%,rgba(38,191,131,0.2),transparent_32%),radial-gradient(circle_at_10%_90%,rgba(28,117,84,0.18),transparent_35%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[56px_56px] mask-[linear-gradient(to_bottom,black,transparent_90%)]"
        aria-hidden="true"
      />

      <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
            <Film className="size-3.5" aria-hidden="true" />
            Your next watch starts here
          </div>

          <h1 className="text-5xl leading-[0.98] font-semibold tracking-tighter text-balance sm:text-6xl lg:text-7xl">
            Discover stories worth watching.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Search, explore, and learn more about shows from around the world—all in one beautifully
            simple place.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-11 bg-emerald-500 px-6 text-sm text-emerald-950 hover:bg-emerald-400"
            >
              <Link to="/movies">
                Explore movies
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 border-white/20 bg-white/5 px-6 text-sm text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#discover">See what you can do</a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Search className="size-4 text-emerald-400" aria-hidden="true" />
              Fast title search
            </span>
            <span className="flex items-center gap-2">
              <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              Ratings at a glance
            </span>
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-md lg:block" aria-hidden="true">
          <div className="absolute top-12 -left-8 h-116 w-64 -rotate-8 border border-white/10 bg-linear-to-br from-slate-700 to-slate-950 shadow-2xl" />
          <div className="absolute top-5 right-0 h-116 w-64 rotate-7 border border-white/10 bg-linear-to-br from-emerald-800 to-slate-950 shadow-2xl" />
          <div className="relative mx-auto flex h-124 w-72 flex-col justify-between overflow-hidden border border-white/15 bg-[radial-gradient(circle_at_65%_20%,rgba(52,211,153,0.4),transparent_30%),linear-gradient(145deg,#173d32,#070d0b_70%)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-emerald-200">
              <span>Movie-Explorer</span>
              <span>01</span>
            </div>

            <div>
              <span className="mb-5 flex size-14 items-center justify-center border border-emerald-300/30 bg-emerald-300/10 text-emerald-300">
                <Clapperboard className="size-7" />
              </span>
              <p className="text-3xl leading-tight font-semibold tracking-tight">
                Find your next favorite story.
              </p>
              <div className="mt-6 h-px bg-white/15" />
              <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                <span>Explore the catalog</span>
                <ArrowRight className="size-4" />
              </div>
            </div>
          </div>

          <div className="absolute -right-4 bottom-14 flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-3 shadow-xl backdrop-blur-md">
            <span className="flex size-9 items-center justify-center bg-amber-400 text-slate-950">
              <Star className="size-4 fill-current" />
            </span>
            <div>
              <p className="text-xs text-slate-300">Viewer rating</p>
              <p className="text-sm font-semibold">Top-rated picks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
