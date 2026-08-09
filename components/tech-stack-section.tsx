export function TechStackSection() {
  const technologies = [
    { name: 'Next.js', category: 'Frontend' },
    { name: 'React', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python / AI', category: 'AI & ML' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'AWS & Cloud', category: 'Infrastructure' },
    { name: 'Docker', category: 'DevOps' },
  ]

  return (
    <section className="py-20 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Tech Stack</h2>
          <p className="mt-4 text-muted-foreground">
            We build high-performance, scalable systems using modern, industry-standard technologies.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {technologies.map((tech) => (
            <div key={tech.name} className="rounded-xl border border-border bg-background/40 p-5 text-center transition-all hover:border-accent/40">
              <p className="font-semibold text-lg">{tech.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{tech.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}