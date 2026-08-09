export function FaqSection() {
  const faqs = [
    {
      q: "How does the project estimation process work?",
      a: "You can use our interactive Cost Estimator on the homepage to instantly scope your requirements, select features, and get an estimated budget and timeline range.",
    },
    {
      q: "What is your typical turnaround time for an enterprise project?",
      a: "Timelines vary based on complexity, ranging from 8 weeks for standard web platforms to 14+ weeks for complex AI systems and multi-tenant architectures.",
    },
    {
      q: "Do you offer post-launch support and maintenance?",
      a: "Yes, we provide dedicated maintenance, uptime monitoring, security audits, and continuous scaling support following deployment.",
    },
  ]

  return (
    <section className="py-20 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-muted-foreground">Got questions? We've got answers about our process and services.</p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto grid gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-border bg-background/40 p-6">
              <h3 className="font-semibold text-lg">{faq.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}