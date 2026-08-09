'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ArrowRight, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'About', href: '#about' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // બહાર ક્લિક કરવાથી ભાષાનું ડ્રોપડાઉન બંધ થઈ જાય તે માટે
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // ગૂગલ ટ્રાન્સલેટ કુકી બદલવાનું અને પેજ રિલોડ કરવાનું ફંક્શન
  const changeLanguage = (langCode: string) => {
    const cookieName = 'googtrans'
    document.cookie = `${cookieName}=/en/${langCode}; path=/; domain=${window.location.hostname}`
    window.location.reload()
    setLangOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/85 backdrop-blur-xl shadow-md'
          : 'border-b border-transparent bg-background/40 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-22 lg:px-8">
        {/* Logo and Brand Name */}
        <a
          href="#home"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="VOLONIS home"
        >
          <img 
            src="/logo.svg" 
            alt="VOLONIS Logo" 
            className="h-15 w-auto drop-shadow-sm" 
          />
          <span className="font-display text-2xl font-bold tracking-[0.20em] text-foreground text-glow flex items-center gap-1.5">
            VOLONIS
            <span className="inline-block size-1.5 rounded-full bg-accent animate-pulse" />
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden items-center gap-1.5 lg:flex bg-card/40 border border-border/60 px-4 py-2 rounded-full backdrop-blur-md shadow-sm"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative rounded-full px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:text-foreground hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side Actions, Language Dropdown & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          
          {/* --- Language Dropdown (Get a Quote ની ડાબી/જમણી બાજુ) --- */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-xl border border-border/80 bg-background/60 px-3.5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary hover:border-accent/40 shadow-sm cursor-pointer"
              aria-label="Select Language"
            >
              <Globe className="size-4 text-cyan-400" />
              <span className="hidden sm:inline">Language</span>
            </button>

            {/* ડ્રોપડાઉન મેનુ */}
            {langOpen && (
              <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-border/80 bg-background/95 backdrop-blur-2xl shadow-2xl z-50">
                <button
                  type="button"
                  onClick={() => changeLanguage('en')}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-accent cursor-pointer"
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage('hi')}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-accent border-t border-border/40 cursor-pointer"
                >
                  हिन्दी (Hindi)
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage('gu')}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-accent border-t border-border/40 cursor-pointer"
                >
                  ગુજરાતી (Gujarati)
                </button>
              </div>
            )}
          </div>

          {/* Get a Quote Button */}
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_28px_rgba(21,101,255,0.4)] transition-all hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none sm:inline-flex cursor-pointer"
          >
            <span>Get a Quote</span>
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-xl border border-border/80 bg-background/60 text-foreground transition-colors hover:bg-secondary hover:border-accent/40 lg:hidden cursor-pointer shadow-sm"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? (
              <X className="size-6 text-accent" aria-hidden="true" />
            ) : (
              <Menu className="size-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-b border-border/80 bg-background/95 backdrop-blur-2xl shadow-2xl lg:hidden"
          >
            <nav
              className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 sm:px-6"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3.5 text-base font-semibold text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="size-4 opacity-50" />
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-4 text-sm font-semibold text-primary-foreground shadow-md"
              >
                <span>Get a Quote</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}