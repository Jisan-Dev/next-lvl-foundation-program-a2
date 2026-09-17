import { Clapperboard, ExternalLink } from "lucide-react";
import { Link } from "react-router";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Movies", to: "/movies" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-muted/35">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex w-fit items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="MovieExplorer home"
          >
            <span className="flex size-8 items-center justify-center bg-primary text-primary-foreground">
              <Clapperboard className="size-4" aria-hidden="true" />
            </span>
            <span className="font-semibold tracking-tight">
              Movie<span className="text-primary">Explorer</span>
            </span>
          </Link>

          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-5">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t pt-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} MovieExplorer. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Show data provided by
            <a
              href="https://www.tvmaze.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 outline-none hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring"
            >
              TVMaze
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
