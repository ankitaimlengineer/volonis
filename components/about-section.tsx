'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Award, Globe2, ShieldCheck, Users2, ArrowRight, CheckCircle2, Layers } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

const PILLARS = [
  {
    icon: Users2,
    title: 'Senior-only engineering',
    body: 'Every pod is staffed with architects and senior engineers who have shipped systems at enterprise scale. No junior bench, no hand-offs.',
  },
  {
    icon: Globe2,
    title: 'Global delivery footprint',
    body: 'Distributed teams across EMEA, APAC, and North America give you overlapping hours with your internal stakeholders.',
  },
  {
    icon: ShieldCheck,
    title: 'Security as a default',
    body: 'Zero-trust access, encrypted data paths, and audit-ready logging are built into the first sprint — never retrofitted.',
  },
  {
    icon: Award,
    title: 'Outcome-based contracts',
    body: 'We define success metrics before writing code and tie milestones to measurable business impact, not story points.',
  },
]

const PHILOSOPHIES = [
  {
    id: 'discovery',
    name: '1. Discovery & Strategy',
    title: 'Aligning business goals with precise architecture',
    desc: 'We map out your operational bottlenecks, system workflows, and scalability requirements before writing a single line of code.',
  },
  {
    id: 'execution',
    name: '2. Agile Execution',
    title: 'Rapid iterative sprints with continuous feedback',
    desc: 'Transparent deployment cycles ensure you have full visibility into progress, metrics, and milestone achievements.',
  },
  {
    id: 'support',
    name: '3. Long-term Scaling',
    title: 'Rigorous optimization and 24/7 reliability',
    desc: 'Post-launch monitoring, automated updates, and security patching keep your platforms running at peak efficiency.',
  },
]

const TECH_STACK = [
  'Next.js',
  'Tailwind CSS',
  'TypeScript',
  'PHP & MySQL',
  'React / POS',
]

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<string>('discovery')
  const currentPhilosophy = PHILOSOPHIES.find((p) => p.id === activeTab) || PHILOSOPHIES[0]

  return (
    <section id="about" className="relative scroll-mt-20 py-20 sm:py-24 lg:py-28 bg-card/10 border-y border-border/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/4 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[130px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 items-start">
          <div>
            <SectionHeading
              align="left"
              eyebrow="About VOLONIS"
              title="An engineering partner built for the next decade of enterprise software"
              description="VOLONIS was founded to close the gap between ambitious business strategy and the technology infrastructure required to execute it. We operate as an extension of your team — accountable for architecture, delivery, and results."
            />

            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8"
            >
              {[
                { v: '2026', l: 'Founded' },
                { v: '1+', l: 'Core Engineers' },
                { v: 'Pan-India', l: 'Support & Reach' },
                { v: '100%', l: 'Client Commitment' },
              ].map((s) => (
                <div key={s.l}>
                  <dd className="font-display text-2xl font-bold sm:text-3xl text-accent">
                    {s.v}
                  </dd>
                  <dt className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {s.l}
                  </dt>
                </div>
              ))}
            </motion.dl>

            <ul className="mt-8 flex flex-wrap gap-2">
              {TECH_STACK.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-[11px] font-medium text-accent"
                >
                  {c}
                </li>
              ))}
            </ul>

            {/* Direct CTA inside About */}
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-3 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
              >
                <span>Let's Build Together</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass rounded-2xl p-6 transition-colors hover:border-accent/40 border border-border/60"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                    <p.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display mt-4 text-base font-semibold">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Interactive Working Philosophy Box */}
            <div className="glass rounded-2xl p-6 border border-border/60 mt-2">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="size-4 text-accent" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Our Working Approach
                </h4>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {PHILOSOPHIES.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer border',
                      activeTab === tab.id
                        ? 'border-accent bg-accent/15 text-accent shadow-sm'
                        : 'border-border bg-background/40 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              <motion.div
                key={currentPhilosophy.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl bg-background/50 p-4 border border-border/40"
              >
                <h5 className="font-display text-sm font-bold text-foreground">
                  {currentPhilosophy.title}
                </h5>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {currentPhilosophy.desc}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}