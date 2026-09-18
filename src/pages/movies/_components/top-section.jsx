import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";

export default function TopSection({ handleSearch, query }) {
  return (
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
            className="h-11 border-white/20 bg-white px-4 text-sm text-slate-950 placeholder:text-slate-500 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/40 md:text-sm"
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
  );
}
