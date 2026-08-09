'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, TrendingUp, CheckCircle2, Quote, Layers, Globe } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

const CASES = [
  {
    client: 'AI-Resume-Analyzer',
    sector: 'Web Apps',
    region: 'Local / Web',
    title: 'Smart Resume Evaluation and Analysis Platform',
    problem: 'Manual screening of resumes takes excessive time and often misses critical candidate skills and qualifications.',
    solution: 'Built a responsive web interface using HTML and modern web standards to streamline resume parsing and review workflows.',
    testimonial: '"A clean and intuitive layout that simplifies the entire candidate filtering process." — Developer Review',
    stack: ['HTML', 'CSS', 'JavaScript', 'Tailwind'],
    impact: [
      { value: '100%', label: 'Web Responsive' },
      { value: 'Fast', label: 'Screening time' },
      { value: 'v1.0', label: 'Production ready' },
    ],
    href: '#contact',
  },
  {
    client: 'Documents Q&A Bot',
    sector: 'AI / RAG',
    region: 'Python Backend',
    title: 'Context-aware document Q&A system using RAG',
    problem: 'Extracting specific information and answers from extensive PDF documentation and manuals is tedious and slow.',
    solution: 'Engineered a robust RAG (Retrieval-Augmented Generation) pipeline integrated with Gemini and ChromaDB for instant, accurate answers.',
    testimonial: '"Getting precise answers directly from large PDFs without manual searching saves hours of work." — Beta Tester',
    stack: ['Python', 'Gemini API', 'ChromaDB', 'SQLite'],
    impact: [
      { value: '98%', label: 'Retrieval acc.' },
      { value: '< 2s', label: 'Query latency' },
      { value: 'PDF', label: 'Support format' },
    ],
    href: '#contact',
  },
  {
    client: 'Multi-Agent Code Review',
    sector: 'AI / ML',
    region: 'LangGraph',
    title: 'Multi-Agent automated code inspection and review system',
    problem: 'Manual code reviews are prone to human oversight, inconsistent coding standards, and delayed feedback loops.',
    solution: 'Developed an advanced multi-agent architecture using LangGraph and Gemini to autonomously analyze, review, and suggest code improvements.',
    testimonial: '"Automating multi-step code analysis catches bugs and formatting issues before human deployment." — Tech Lead',
    stack: ['Python', 'LangGraph', 'Gemini API', 'LLM Agents'],
    impact: [
      { value: 'Multi', label: 'Agent workflow' },
      { value: 'Auto', label: 'Bug detection' },
      { value: 'High', label: 'Code quality' },
    ],
    href: '#contact',
  },
  {
    client: 'School Admission Chatbot',
    sector: 'AI / RAG',
    region: 'Streamlit UI',
    title: 'RAG-based school admission assistant with database integration',
    problem: 'Parents face difficulty getting instant answers regarding admission criteria, fee structures, and schedules outside office hours.',
    solution: 'Deployed an interactive Streamlit chatbot powered by Gemini, ChromaDB, and SQLite for seamless institutional query handling.',
    testimonial: '"Provides instant, 24/7 accurate answers to parents regarding all school admission queries." — Administrator',
    stack: ['Python', 'Streamlit', 'ChromaDB', 'SQLite'],
    impact: [
      { value: '24/7', label: 'Availability' },
      { value: '100%', label: 'Instant replies' },
      { value: 'SQL', label: 'Database sync' },
    ],
    href: '#contact',
  },
]

export function CaseStudiesSection() {
  const [activeSector, setActiveSector] = useState<string>('All')

  const filteredCases = activeSector === 'All'
    ? CASES
    : CASES.filter(c => c.sector === activeSector)

  return (
    <section
      id="case-studies"
      className="relative scroll-mt-20 border-y border-border/60 bg-card/20 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="My Projects"
              title="Advanced AI & Web Solutions Built for Real-World Impact"
              description="Explore my developed projects featuring modern web interfaces, RAG architectures, and multi-agent AI systems."
            />
          </div>

          {/* Sector Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Web Apps', 'AI / RAG', 'AI / ML'].map((sector) => (
              <button
                key={sector}
                onClick={() => setActiveSector(sector)}
                className={cn(
                  'rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer border',
                  activeSector === sector
                    ? 'border-accent bg-accent/15 text-accent shadow-sm'
                    : 'border-border bg-background/40 text-muted-foreground hover:text-foreground'
                )}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {filteredCases.map((study, i) => (
            <motion.article
              key={study.client}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: 'easeOut' }}
              className="group glass relative flex flex-col rounded-2xl p-6 transition-all hover:border-accent/40 sm:p-7 border border-border/60"
            >
              {/* Header Info */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                      {study.sector}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">· {study.region}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {study.client}
                  </h3>
                </div>
                <a
                  href={study.href}
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all group-hover:border-accent/50 group-hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  aria-label={`View the ${study.client} project`}
                >
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>

              <p className="mt-4 text-lg leading-snug font-semibold text-balance">
                {study.title}
              </p>

              {/* Problem vs Solution Box */}
              <div className="mt-4 grid gap-2.5 rounded-xl bg-background/40 p-3.5 border border-border/40 text-xs leading-relaxed">
                <div>
                  <span className="font-bold text-foreground">Problem: </span>
                  <span className="text-muted-foreground">{study.problem}</span>
                </div>
                <div className="border-t border-border/40 pt-2">
                  <span className="font-bold text-accent">Solution: </span>
                  <span className="text-muted-foreground">{study.solution}</span>
                </div>
              </div>

              {/* Client Testimonial Quote */}
              <div className="mt-4 flex items-start gap-2.5 italic text-xs text-muted-foreground bg-accent/5 rounded-lg p-3 border-l-2 border-accent">
                <Quote className="size-4 shrink-0 text-accent mt-0.5" />
                <span>{study.testimonial}</span>
              </div>

              {/* Tech Stack Tags */}
              <ul className="mt-5 flex flex-wrap gap-2">
                {study.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border/70 bg-background/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {/* Quantifiable Metrics */}
              <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-border/60 pt-5 sm:mt-6">
                {study.impact.map((m) => (
                  <div key={m.label}>
                    <dd className="font-display flex items-center gap-1 text-lg font-bold text-accent">
                      {m.value}
                      <TrendingUp className="size-3.5" aria-hidden="true" />
                    </dd>
                    <dt className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                      {m.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}