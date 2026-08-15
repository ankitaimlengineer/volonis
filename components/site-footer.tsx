'use client'

import { Mail } from 'lucide-react'

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.8 18.3 5 18.3 5c.7 1.6.3 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
    </svg>
  )
}

const COLUMNS = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#case-studies' },
      { label: 'Services', href: '#services' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'AI & Automation', href: '#services' },
      { label: 'Custom Software', href: '#services' },
      { label: 'Web & App Development', href: '#services' },
      { label: 'SaaS Solutions', href: '#services' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Start a Project', href: '#contact' },
      { label: 'Project Estimator', href: '#estimator' },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/ankit-thummar-b46686361',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/ankitaimlengineer',
      },
    ],
  },
]

const LEGAL = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-card/20 backdrop-blur-xl">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-72 w-[35rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand / Company Info */}
          <div className="flex flex-col items-start">
            <a
              href="#home"
              className="group flex items-center gap-3.5"
              aria-label="VOLONIS home"
            >
              <div className="rounded-2xl border border-border/80 bg-background/50 p-2.5 shadow-sm transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]">
                <img
                  src="/logo.svg"
                  alt="VOLONIS Logo"
                  className="h-8 w-auto"
                />
              </div>

              <span className="font-display text-2xl font-extrabold tracking-[0.25em] text-foreground text-glow">
                VOLONIS
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              VOLONIS TECHNOLOGIES is an India-based technology company
              building AI solutions, custom software, automation, and SaaS
              products for businesses worldwide.
            </p>

            {/* Social Links */}
            <ul className="mt-7 flex items-center gap-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/ankit-thummar-b46686361"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="VOLONIS on LinkedIn"
                  className="inline-flex size-10.5 items-center justify-center rounded-xl border border-border/80 bg-background/50 text-muted-foreground transition-all duration-300 hover:border-accent/60 hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_15px_rgba(0,212,255,0.25)]"
                >
                  <LinkedInIcon className="size-4" />
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/ankitaimlengineer"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="VOLONIS GitHub projects"
                  className="inline-flex size-10.5 items-center justify-center rounded-xl border border-border/80 bg-background/50 text-muted-foreground transition-all duration-300 hover:border-accent/60 hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_15px_rgba(0,212,255,0.25)]"
                >
                  <GitHubIcon className="size-4" />
                </a>
              </li>

              <li>
                <a
                  href="mailto:contact.volonis@gmail.com"
                  aria-label="Email VOLONIS"
                  className="inline-flex size-10.5 items-center justify-center rounded-xl border border-border/80 bg-background/50 text-muted-foreground transition-all duration-300 hover:border-accent/60 hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_15px_rgba(0,212,255,0.25)]"
                >
                  <Mail className="size-4" aria-hidden="true" />
                </a>
              </li>
            </ul>

            {/* Contact Email */}
            <a
              href="mailto:contact.volonis@gmail.com"
              className="mt-5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              contact.volonis@gmail.com
            </a>
          </div>

          {/* Footer Navigation */}
          <nav
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:pl-6"
            aria-label="Footer navigation"
          >
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
                  {col.heading}
                </h2>

                <ul className="mt-5 grid gap-3">
                  {col.links.map((link) => {
                    const isExternal =
                      link.href.startsWith('http://') ||
                      link.href.startsWith('https://')

                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          className="inline-block py-0.5 text-sm text-muted-foreground transition-colors hover:text-accent"
                        >
                          {link.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Footer */}
        <div className="mt-14 flex flex-col gap-5 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium text-muted-foreground">
            © {new Date().getFullYear()} VOLONIS TECHNOLOGIES. All rights
            reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}