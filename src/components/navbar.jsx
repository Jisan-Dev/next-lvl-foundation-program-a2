import { ArrowRight, Clapperboard } from "lucide-react";
import { Link, NavLink } from "react-router";

import { Button } from "./ui/button";

const navigation = [
  { label: "Home", to: "/", end: true },
  { label: "Movies", to: "/movies" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:h-18 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="MovieExplorer home"
        >
          <span className="flex size-9 items-center justify-center bg-primary text-primary-foreground shadow-sm transition-transform group-hover:-rotate-3">
            <Clapperboard className="size-5" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight sm:text-lg">
            Movie<span className="text-primary">Explorer</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-5">
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    " px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Button asChild size="lg" className="px-4 sm:px-5">
            <Link to="/movies">
              <span className="sm:hidden">Browse</span>
              <span className="hidden sm:inline">Explore movies</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
