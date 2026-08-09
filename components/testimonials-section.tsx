export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "VOLONIS transformed our infrastructure and scaled our platform seamlessly. Outstanding engineering team!",
      author: "Alex Turner",
      role: "CTO, Stratospan",
    },
    {
      quote: "Their AI and automation solutions cut our manual operational overhead by over 50%. Highly recommended.",
      author: "Sarah Jenkins",
      role: "Head of Product, Caelum Labs",
    },
  ]

  return (
    <section className="py-20 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trusted by Industry Leaders</h2>
          <p className="mt-4 text-muted-foreground">See what our enterprise partners have to say about working with us.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl border border-border bg-background/40 p-6 flex flex-col justify-between">
              <p className="text-muted-foreground italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6">
                <p className="font-semibold">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}