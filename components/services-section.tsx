'use client'

import { useRef, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import {
  BrainCircuit,
  Cloud,
  Code2,
  ShoppingCart,
  Layers,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

type Service = {
  icon: LucideIcon
  title: string
  description: string
  bullets: string[]
  span: string
}

const SERVICES: Service[] = [
  {
    icon: BrainCircuit,
    title: 'AI & Automation Engineering',
    description:
      'Production machine learning systems that cut manual workload and surface decisions before your competitors see them.',
    bullets: [
      'Machine learning pipelines',
      'Conversational AI & chatbots',
      'Predictive analytics',
      'Document intelligence',
    ],
    span: 'lg:col-span-3',
  },
  {
    icon: Code2,
    title: 'Custom Web & App Ecosystems',
    description:
      'Type-safe, edge-rendered product surfaces engineered for scale from the first commit.',
    bullets: [
      'Next.js & React',
      'Node.js APIs',
      'iOS & Android apps',
      'Design systems',
    ],
    span: 'lg:col-span-3',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce & Retail SaaS',
    description:
      'Multi-tenant commerce platforms with inventory, billing, and payments wired end to end.',
    bullets: [
      'Inventory systems',
      'Subscription billing',
      'Payment gateways',
      'POS integrations',
    ],
    span: 'lg:col-span-2',
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture & Cybersecurity',
    description:
      'Hardened, compliant infrastructure across AWS and GCP with zero-trust access by default.',
    bullets: [
      'AWS / GCP architecture',
      'API integrations',
      'Zero-trust security',
      'SOC 2 readiness',
    ],
    span: 'lg:col-span-2',
  },
  {
    icon: Layers,
    title: 'Dedicated Delivery Pods',
    description:
      'Embedded senior engineering squads that ship alongside your internal teams.',
    bullets: [
      'Senior-only squads',
      'Overlapping timezones',
      'Weekly releases',
      'Full handover docs',
    ],
    span: 'lg:col-span-2',
  },
]

function TiltCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState({ rx: 0, ry: 0, mx: 50, my: 50 })

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        setStyle({
          rx: (0.5 - py) * 10,
          ry: (px - 0.5) * 10,
          mx: px * 100,
          my: py * 100,
        })
      }}
      onMouseLeave={() => setStyle({ rx: 0, ry: 0, mx: 50, my: 50 })}
      style={{
        transform: `perspective(1000px) rotateX(${style.rx}deg) rotateY(${style.ry}deg)`,
        transition: 'transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
      className={cn(
        'group glass relative overflow-hidden rounded-3xl p-7 sm:p-8 border border-border/70 bg-card/40 backdrop-blur-2xl',
        'hover:border-accent/50 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)] transition-all duration-300 cursor-pointer',
        className,
      )}
    >
      {/* Cursor Glow ની ઓપેસિટી અને સ્ટ્રેન્થ અહીં ઓછી કરી છે */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${style.mx}% ${style.my}%, rgba(0,212,255,0.08), transparent 75%)`,
        }}
      />
      {children}
    </div>
  )
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative scroll-mt-20 py-24 sm:py-28 lg:py-32 overflow-hidden bg-card/5"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-0 -z-10 h-[25rem] w-[25rem] rounded-full bg-accent/5 blur-[140px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Capabilities"
          title="Full-stack engineering across the enterprise stack"
          description="Four core practices, one accountable delivery team. We architect, build, secure, and operate the systems your business runs on."
        />

        <div className="mt-16 grid gap-6 sm:gap-6 lg:grid-cols-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              className={service.span}
            >
              <TiltCard className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-13 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                      <service.icon className="size-6" aria-hidden="true" />
                    </span>
                    <Sparkles className="size-4 text-accent/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <h3 className="font-display mt-6 text-xl font-bold tracking-tight text-balance sm:text-2xl text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                <ul className="mt-8 pt-5 border-t border-border/50 grid gap-3 sm:grid-cols-2">
                  {service.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2.5 text-xs text-muted-foreground font-medium"
                    >
                      <span
                        aria-hidden="true"
                        className="size-2 shrink-0 rounded-full bg-accent/80 shadow-[0_0_5px_rgba(0,212,255,0.4)]"
                      />
                      <span className="transition-colors group-hover:text-foreground/90">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}