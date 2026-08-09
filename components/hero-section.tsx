'use client'

import { motion } from 'motion/react'
import { ArrowRight, Calculator, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react'
import { NetworkVisual } from '@/components/network-visual'

const STATS = [
  { value: '120+', label: 'Enterprise deployments' },
  { value: '18', label: 'Countries served' },
  { value: '99.98%', label: 'Platform uptime' },
  { value: '4.2x', label: 'Avg. ROI uplift' },
]

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24 bg-card/5"
    >
      {/* Ambient glow & grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-[-12rem] left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute top-24 right-[-8rem] h-[24rem] w-[24rem] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Top Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-accent sm:text-sm">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Empowering Enterprises with Next-Gen AI
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <ShieldCheck className="size-3.5 text-accent" />
                
              </span>
            </div>

            <h1 className="font-display mt-4 text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.65rem]">
              Building Scalable{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-accent bg-clip-text text-transparent">
                AI &amp; Software
              </span>{' '}
              Infrastructure for the Global Future
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We engineer custom IT solutions, intelligent automation, and
              production-grade SaaS platforms for enterprises operating at
              scale. From architecture to deployment, VOLONIS delivers systems
              built to compound value for years.
            </p>

            {/* Feature Highlights Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="size-4 text-accent" /> Zero-Trust Security
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="size-4 text-accent" /> 24/7 Dedicated Support
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="size-4 text-accent" /> Cloud Native
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_32px_rgba(21,101,255,0.45)] transition-all hover:shadow-[0_0_48px_rgba(0,212,255,0.55)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none cursor-pointer"
              >
                Explore Solutions
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#estimator"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:border-accent/40 hover:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none cursor-pointer"
              >
                <Calculator className="size-4" aria-hidden="true" />
                Calculate Project Cost
              </a>
            </div>

            {/* Statistics Grid */}
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-bold text-accent sm:text-3xl">
                    {stat.value}
                  </dd>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="relative"
          >
            <NetworkVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}