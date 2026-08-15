'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  ArrowRight,
  Globe2,
  ShieldCheck,
  Users2,
  Layers,
  Code2,
} from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

const PILLARS = [
  {
    icon: Users2,
    title: 'Founder-Led Engineering',
    body: 'Work closely with our team throughout the development process, from requirements and architecture to delivery and improvements.',
  },
  {
    icon: Globe2,
    title: 'Global Collaboration',
    body: 'Based in India and available to collaborate with businesses and technology teams across different markets and time zones.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Reliability',
    body: 'We consider security, maintainability and reliability throughout the development lifecycle to create dependable software.',
  },
  {
    icon: Code2,
    title: 'Flexible Engagement',
    body: 'Choose project-based development, ongoing support or a long-term technology partnership based on your business needs.',
  },
]

const PHILOSOPHIES = [
  {
    id: 'discovery',
    name: '1. Discovery & Strategy',
    title: 'Understanding your goals before development',
    desc: 'We understand your business requirements, workflows, users and technical needs before defining the right solution and development approach.',
  },
  {
    id: 'execution',
    name: '2. Agile Execution',
    title: 'Build, review and improve continuously',
    desc: 'We work through clear development milestones, regular communication and iterative feedback so you can stay involved throughout the project.',
  },
  {
    id: 'support',
    name: '3. Long-term Support',
    title: 'Improving your product after launch',
    desc: 'Our relationship does not have to end at deployment. We can continue supporting, improving and scaling your product as your requirements evolve.',
  },
]

const TECH_STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Python',
  'Gemini / AI',
  'PHP & MySQL',
  'PostgreSQL',
]

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<string>('discovery')

  const currentPhilosophy =
    PHILOSOPHIES.find((p) => p.id === activeTab) || PHILOSOPHIES[0]

  return (
    <section
      id="about"
      className="relative scroll-mt-20 border-y border-border/60 bg-card/10 py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/4 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[130px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="About VOLONIS"
              title="A Technology Partner for Modern Businesses"
              description="VOLONIS TECHNOLOGIES helps businesses turn ideas into practical digital products. We combine AI, software engineering and automation to build solutions designed around real business requirements."
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
                { v: 'India', l: 'Based' },
                { v: 'AI + Software', l: 'Core Focus' },
                { v: 'End-to-End', l: 'Development' },
              ].map((s) => (
                <div key={s.l}>
                  <dd className="font-display text-2xl font-bold text-accent sm:text-3xl">
                    {s.v}
                  </dd>
                  <dt className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {s.l}
                  </dt>
                </div>
              ))}
            </motion.dl>

            <ul className="mt-8 flex flex-wrap gap-2">
              {TECH_STACK.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-[11px] font-medium text-accent"
                >
                  {tech}
                </li>
              ))}
            </ul>

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
                  className="glass rounded-2xl border border-border/60 p-6 transition-colors hover:border-accent/40"
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

            <div className="glass mt-2 rounded-2xl border border-border/60 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Layers className="size-4 text-accent" />

                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Our Working Approach
                </h4>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {PHILOSOPHIES.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-all',
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
                className="rounded-xl border border-border/40 bg-background/50 p-4"
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