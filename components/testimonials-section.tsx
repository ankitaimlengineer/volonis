const benefits = [
  {
    title: 'Direct Communication',
    description:
      'Work directly with our team to discuss your requirements, priorities, progress and technical decisions throughout the project.',
  },
  {
    title: 'Modern Technology',
    description:
      'We build solutions using modern AI, software development, cloud and automation technologies suited to your project requirements.',
  },
  {
    title: 'Flexible Engagement',
    description:
      'Choose a project-based engagement, ongoing development support or a long-term technology partnership based on your needs.',
  },
  {
    title: 'Built for Your Business',
    description:
      'We understand your requirements and build practical digital solutions around your business goals, workflows and budget.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="border-t border-border/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">
            Why VOLONIS
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Technology Solutions Built Around Your Business
          </h2>

          <p className="mt-4 text-muted-foreground">
            From AI and custom software to SaaS platforms and automation, we
            build practical digital solutions around your business
            requirements, goals and budget.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-border bg-background/40 p-6 transition-all hover:border-accent/40 hover:bg-card/50"
            >
              <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <span className="text-sm font-bold">✓</span>
              </div>

              <h3 className="font-semibold text-foreground">
                {benefit.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-accent/20 bg-accent/5 p-6 text-center sm:p-8">
          <h3 className="text-xl font-semibold">
            Have a Project in Mind?
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Whether you need an AI solution, custom software, SaaS platform,
            automation system or a reliable development partner, VOLONIS can
            help turn your requirements into a practical digital solution.
          </p>

          <a
            href="#contact"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Discuss Your Project →
          </a>
        </div>
      </div>
    </section>
  )
}