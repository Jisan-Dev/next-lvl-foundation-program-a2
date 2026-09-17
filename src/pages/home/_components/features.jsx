export default function Features({ features }) {
  return (
    <section id="discover" className="scroll-mt-20 bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Made for discovery
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Less searching. More watching.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Everything you need to move from a vague idea to a show you are excited to watch.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden border bg-border md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.title} className="bg-background p-6 sm:p-8">
                <span className="flex size-10 items-center justify-center bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
