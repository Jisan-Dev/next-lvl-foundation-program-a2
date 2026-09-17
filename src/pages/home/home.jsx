import { Clapperboard, Search, Sparkles } from "lucide-react";

import Features from "./_components/features";
import Hero from "./_components/hero";

const features = [
  {
    icon: Search,
    title: "Search in seconds",
    description:
      "Find shows by title and get relevant matches without digging through endless lists.",
  },
  {
    icon: Clapperboard,
    title: "Browse every genre",
    description: "Move from cult classics to current favorites in one simple, responsive catalog.",
  },
  {
    icon: Sparkles,
    title: "See the full story",
    description: "Open a show to explore its rating, premiere date, genres, summary, and more.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features features={features} />
    </>
  );
}
