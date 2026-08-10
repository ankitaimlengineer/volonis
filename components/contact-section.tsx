'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  CalendarCheck,
  Check,
  Clock,
  Mail,
  MapPin,
  Send,
  Video,
  Sparkles,
} from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

const SLOTS = [
  { day: 'Mon', date: '04', times: ['09:30', '13:00', '16:30'] },
  { day: 'Tue', date: '05', times: ['10:00', '14:30'] },
  { day: 'Wed', date: '06', times: ['09:00', '11:30', '15:00'] },
  { day: 'Thu', date: '07', times: ['13:30', '17:00'] },
]

export function ContactSection() {
  const [sent, setSent] = useState(false)
  const [activeDay, setActiveDay] = useState(0)
  const [slot, setSlot] = useState<string | null>(null)
  const [booked, setBooked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)

  // 👉 જો તમારે બુકિંગ વિજેટ ફરી શરૂ કરવું હોય, તો અહીં 'false' ની જગ્યાએ 'true' કરી દેવું.
  const isStrategyCallActive = false;

  // ફોર્મ સબમીટ કરીને API માં ડેટા મોકલવાનું ફંક્શન
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formElement = e.currentTarget
    const formData = new FormData(formElement)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name,
          name: name,
          customerName: name,
          email: email,
          message: message,
          projectDetails: message,
          productName: message ? message : 'Volonis Project / Inquiry',
          plan: 'Contact Form',
          amount: '0',
          paymentId: 'VOLONIS_' + Date.now(),
          durationDays: 30,
        }),
      })

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON Response:', text)
        throw new Error('સર્વરમાંથી ખોટો રિસ્પોન્સ આવ્યો છે (HTML Error).')
      }

      const result = await response.json()

      if (response.ok && result.success) {
        setSent(true)
        formElement.reset()
      } else {
        alert(result.message || 'ડેટા સેવ કરવામાં ભૂલ છે.')
      }
    } catch (error: any) {
      console.error('Error:', error)
      alert(error.message || 'સબમીટ કરવામાં એરર આવી.')
    } finally {
      setLoading(false)
    }
  }

  // સ્ટ્રેટેજી કૉલ બુકિંગ ફંક્શન (ડેટાબેઝમાં સેવ કરવા માટે)
  const handleBookCall = async () => {
    if (!slot) return
    setBookingLoading(true)

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: 'Strategy Call Client',
          email: 'client.strategy@volonis.com',
          productName: `Strategy Call - ${SLOTS[activeDay].day} ${SLOTS[activeDay].date} August at ${slot} CET`,
          plan: 'Strategy Call',
          amount: '0',
          paymentId: 'CALL_' + Date.now(),
          durationDays: 1,
        }),
      })

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('સર્વર એરર આવી રહી છે.')
      }

      const result = await response.json()

      if (response.ok && result.success) {
        setBooked(true)
      } else {
        alert(result.message || 'બુકિંગ સેવ કરવામાં એરર આવી.')
      }
    } catch (error: any) {
      console.error('Booking Error:', error)
      alert(error.message || 'બુકિંગ ફેલ થયું.')
    } finally {
      setBookingLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 border-t border-border/60 bg-card/10 py-24 sm:py-28 lg:py-32 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-10 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[140px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get Started"
          title="Let's scope your next platform"
          description="Send a brief or book a 15-minute strategy call with a solutions architect — no sales script, just engineering."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="group relative glass rounded-3xl p-7 sm:p-9 border border-border/70 bg-card/40 backdrop-blur-2xl shadow-xl hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                  Send us a brief
                </h3>
                <Sparkles className="size-4 text-accent/40" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We reply to every enquiry within one business day.
              </p>

              {sent ? (
                <div
                  className="mt-8 rounded-2xl border border-accent/40 bg-accent/10 p-6 text-center backdrop-blur-md shadow-inner"
                  role="status"
                >
                  <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent/20 text-accent shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                    <Check className="size-7" aria-hidden="true" />
                  </span>
                  <p className="font-display mt-4 text-lg font-bold text-foreground">
                    Message sent
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Thanks — a solutions architect will be in touch shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 text-sm font-semibold text-accent underline-offset-4 hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="mt-8 grid gap-5" onSubmit={handleSubmitForm}>
                  <div className="grid gap-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                    >
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Jordan Ellis"
                      className="rounded-2xl border border-border/80 bg-background/50 px-4.5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent/60 focus:ring-2 focus:ring-accent/25 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                    >
                      Work email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="jordan@company.com"
                      className="rounded-2xl border border-border/80 bg-background/50 px-4.5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent/60 focus:ring-2 focus:ring-accent/25 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label
                      htmlFor="message"
                      className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                    >
                      Project details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us about the systems, timelines, and outcomes you have in mind."
                      className="resize-none rounded-2xl border border-border/80 bg-background/50 px-4.5 py-3.5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:border-accent/60 focus:ring-2 focus:ring-accent/25 focus:outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[0_0_28px_rgba(21,101,255,0.4)] transition-all hover:shadow-[0_0_44px_rgba(0,212,255,0.5)] cursor-pointer disabled:opacity-50"
                  >
                    <Send className="size-4" aria-hidden="true" />
                    <span>{loading ? 'Sending...' : 'Send message'}</span>
                  </button>
                </form>
              )}
            </div>

            <ul className="mt-8 grid gap-3.5 border-t border-border/50 pt-6">
              <li className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>hello@volonis.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                <MapPin className="size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>I</span>
              </li>
            </ul>
          </motion.div>

          {/* Scheduling (Paused or Active Condition) */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="group relative glass flex flex-col justify-between rounded-3xl p-7 sm:p-9 border border-border/70 bg-card/40 backdrop-blur-2xl shadow-xl hover:border-accent/40 transition-all duration-300"
          >
            {isStrategyCallActive ? (
              <>
                <div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent shadow-sm">
                    <Video className="size-3.5" aria-hidden="true" />
                    Google Meet · 15 minutes
                  </span>
                  
                  <h3 className="font-display mt-5 text-xl font-bold text-foreground text-balance sm:text-2xl">
                    Book a 15-min Strategy Call
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Pick a slot that works for you. You will receive a calendar invite
                    with a shared agenda instantly.
                  </p>

                  <div className="mt-7">
                    <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      August 2026
                    </p>
                    <div
                      role="tablist"
                      aria-label="Select a day"
                      className="mt-3 grid grid-cols-4 gap-3"
                    >
                      {SLOTS.map((s, i) => (
                        <button
                          key={s.day}
                          role="tab"
                          aria-selected={activeDay === i}
                          onClick={() => {
                            setActiveDay(i)
                            setSlot(null)
                            setBooked(false)
                          }}
                          className={cn(
                            'rounded-2xl border py-3.5 text-center transition-all cursor-pointer',
                            activeDay === i
                              ? 'border-accent/80 bg-accent/15 shadow-[0_0_15px_rgba(0,212,255,0.2)] text-foreground'
                              : 'border-border/80 bg-background/40 hover:border-accent/40 text-muted-foreground',
                          )}
                        >
                          <span className="block text-xs font-medium">
                            {s.day}
                          </span>
                          <span className="font-display block text-lg font-bold mt-0.5">
                            {s.date}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      <Clock className="size-3.5 text-accent" aria-hidden="true" />
                      Available times (CET)
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {SLOTS[activeDay].times.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            setSlot(t)
                            setBooked(false)
                          }}
                          aria-pressed={slot === t}
                          className={cn(
                            'rounded-xl border px-4 py-2.5 font-mono text-xs font-semibold transition-all cursor-pointer',
                            slot === t
                              ? 'border-accent bg-accent text-accent-foreground shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                              : 'border-border/80 bg-background/40 hover:border-accent/40 text-muted-foreground hover:text-foreground',
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border/50">
                  {booked ? (
                    <div
                      className="rounded-2xl border border-accent/40 bg-accent/10 p-5 text-center backdrop-blur-md shadow-inner"
                      role="status"
                    >
                      <CalendarCheck
                        className="mx-auto size-6 text-accent"
                        aria-hidden="true"
                      />
                      <p className="font-display mt-3 text-sm font-bold text-foreground">
                        Call confirmed for {SLOTS[activeDay].day} {SLOTS[activeDay].date}{' '}
                        at {slot} CET
                      </p>
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        A calendar invite is on its way to your inbox.
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={!slot || bookingLoading}
                      onClick={handleBookCall}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border/80 bg-background/60 px-6 py-4 text-sm font-semibold transition-all hover:border-accent/50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer shadow-sm"
                    >
                      <CalendarCheck className="size-4 text-accent" aria-hidden="true" />
                      <span>{bookingLoading ? 'Confirming...' : slot ? `Confirm ${slot} CET` : 'Select a time to continue'}</span>
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Paused Message Display (English) */
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <span className="inline-flex items-center justify-center size-16 rounded-3xl border border-accent/30 bg-accent/10 text-accent mb-6 shadow-sm">
                  <Video className="size-7" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                  Strategy Calls Paused
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-sm">
                  Strategy call bookings are temporarily paused for a few days. You can reach out using the contact form on the left!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}