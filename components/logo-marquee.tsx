const CLIENTS = [
  'NORDVANE',
  'AURELIS',
  'MERIDIAN',
  'VOLT & KESSLER',
  'HELIOGRID',
  'STRATOSPAN',
  'CAELUM LABS',
]

export function LogoMarquee() {
  return (
    <section
      aria-label="Enterprises that trust VOLONIS"
      className="border-y border-border/60 bg-card/20 py-8"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
          Trusted by enterprise teams worldwide
        </p>
        <div
          className="relative mt-6 overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <ul className="flex w-max animate-[marquee_32s_linear_infinite] items-center gap-12 sm:gap-16">
            {[...CLIENTS, ...CLIENTS].map((name, i) => (
              <li
                key={`${name}-${i}`}
                aria-hidden={i >= CLIENTS.length}
                className="font-display shrink-0 text-sm font-semibold tracking-[0.16em] whitespace-nowrap text-muted-foreground/70 transition-colors hover:text-accent sm:text-base"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
