'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Check,
  TrendingUp,
  Store,
  Tag,
  Clock,
  BellRing,
} from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const PRODUCTS = [
  {
    id: 'volonis-billing',
    name: 'Volonis Billing',
    category: 'Enterprise SaaS',
    badge: 'Coming Soon / POS',
    tagline: 'Next-gen smart billing and invoicing solution for your business. Launching very soon!',
    icon: Store,
    metrics: [
      { label: 'Billing speed', value: '3x Faster' },
      { label: 'GST compliant', value: '100%' },
      { label: 'Daily transactions', value: '50K+' },
    ],
    features: [
      'Lightning-fast barcode scanning & billing',
      'GST report generation and filing support',
      'Customer loyalty points & SMS receipts',
      'Offline mode support with auto-sync',
    ],
  },
] as const

const CHART_DATA = [
  { label: 'Mon', a: 58, b: 78 },
  { label: 'Tue', a: 62, b: 84 },
  { label: 'Wed', a: 68, b: 90 },
  { label: 'Thu', a: 74, b: 95 },
  { label: 'Fri', a: 82, b: 98 },
  { label: 'Sat', a: 70, b: 88 },
  { label: 'Sun', a: 85, b: 99 },
]

function DemoPreview() {
  return (
    <div className="glass rounded-2xl p-4 sm:p-5 relative overflow-hidden border border-border/60">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] tracking-wider text-muted-foreground">PREVIEW METRICS</p>
          <p className="font-display mt-1 text-2xl font-bold">
            ₹1.85L
            <span className="ml-2 inline-flex items-center gap-0.5 align-middle text-xs font-medium text-accent">
              <TrendingUp className="size-3" aria-hidden="true" />
              +24.1%
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-medium text-amber-500">
            <span className="size-1.5 animate-pulse rounded-full bg-amber-500" />
            Coming Soon Preview
          </span>
        </div>
      </div>

      <div className="mt-5 flex h-36 items-end gap-2 sm:h-40">
        {CHART_DATA.map((d, i) => (
          <div key={d.label} className="flex h-full flex-1 flex-col justify-end gap-1">
            <div className="flex h-full items-end gap-1">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${d.a}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="flex-1 rounded-t-sm bg-primary/45"
              />
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${d.b}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06 + 0.1 }}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-accent/40 to-accent"
              />
            </div>
            <p className="text-center text-[10px] text-muted-foreground">{d.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between border-t border-border/60 pt-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="size-2 rounded-sm bg-primary/45" aria-hidden="true" />
            Cash
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="size-2 rounded-sm bg-accent" aria-hidden="true" />
            Digital / UPI
          </span>
        </div>
      </div>
    </div>
  )
}

export function ProductsSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  const active = PRODUCTS[0]

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    alert("Thank you! We will notify you when Volonis Billing launches.")
  }

  return (
    <section
      id="products"
      className="relative scroll-mt-20 border-y border-border/60 bg-card/20 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Our Product"
              title="Built for modern businesses & retail stores"
              description="Volonis Billing is currently under final development. Get ready for the ultimate POS and invoicing experience."
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mt-6 grid items-start gap-8 lg:grid-cols-2 lg:gap-12"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-500">
                <Tag className="size-3" />
                {active.badge}
              </span>
              <span className="text-xs text-muted-foreground font-mono">Category: {active.category}</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-balance sm:text-3xl">{active.name}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{active.tagline}</p>

            <dl className="mt-7 grid grid-cols-3 gap-3">
              {active.metrics.map((m) => (
                <div key={m.label} className="glass rounded-xl px-3 py-3.5 text-center border border-border/60">
                  <dd className="font-display text-lg font-bold text-accent sm:text-xl">{m.value}</dd>
                  <dt className="mt-1 text-[11px] leading-snug text-muted-foreground">{m.label}</dt>
                </div>
              ))}
            </dl>

            <ul className="mt-7 grid gap-2.5">
              {active.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>

            {/* Coming Soon Notification Box */}
            <div className="mt-8 rounded-2xl border border-border/80 bg-card/40 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm mb-2">
                <Clock className="size-4" />
                <span>Launching Soon</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Be the first to know when Volonis Billing goes live. Drop your email below for early access.
              </p>

              {submitted ? (
                <div className="rounded-xl bg-accent/10 border border-accent/30 p-3 text-center text-xs font-medium text-accent">
                  ✓ You are on the early access list! We'll notify you soon.
                </div>
              ) : (
                <form onSubmit={handleNotifyMe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 cursor-pointer"
                  >
                    <BellRing className="size-4" />
                    Notify Me
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <DemoPreview />
          </div>
        </motion.div>
      </div>
    </section>
  )
}