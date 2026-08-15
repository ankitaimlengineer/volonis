'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, CheckCircle2, Layers, Globe } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

const CASES = [
  {
    client: 'AI Resume Analyzer',
    sector: 'Web Apps',
    region: 'AI-Powered',
    title: 'Smart Resume Evaluation and Analysis Platform',
    problem:
      'Recruiters and teams need a faster way to review resumes and identify relevant candidate information.',
    solution:
      'Built a responsive web application focused on structured resume analysis and a streamlined review workflow.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Tailwind'],
    features: [
      'Responsive web interface',
      'Resume analysis workflow',
      'Structured candidate information',
    ],
    href: '#contact',
  },
  {
    client: 'Documents Q&A Bot',
    sector: 'AI / RAG',
    region: 'AI-Powered',
    title: 'Context-Aware Document Q&A System',
    problem:
      'Finding specific information inside large PDF documents and manuals can be time-consuming.',
    solution:
      'Built a RAG-based question-answering system using Gemini and ChromaDB to retrieve relevant information from uploaded documents.',
    stack: ['Python', 'Gemini API', 'ChromaDB', 'SQLite'],
    features: [
      'RAG-based retrieval',
      'Document question answering',
      'Vector database integration',
    ],
    href: '#contact',
  },
  {
    client: 'Multi-Agent Code Review',
    sector: 'AI / ML',
    region: 'Agentic AI',
    title: 'Multi-Agent Automated Code Review System',
    problem:
      'Manual code reviews can take significant time and may miss issues during repetitive review tasks.',
    solution:
      'Developed a multi-agent workflow using LangGraph and Gemini to analyze code and provide automated review suggestions.',
    stack: ['Python', 'LangGraph', 'Gemini API', 'LLM Agents'],
    features: [
      'Multi-agent workflow',
      'Automated code analysis',
      'AI-generated review suggestions',
    ],
    href: '#contact',
  },
  {
    client: 'School Admission Assistant',
    sector: 'AI / RAG',
    region: 'Business Automation',
    title: 'RAG-Based School Admission Enquiry Assistant',
    problem:
      'Parents often need quick answers about admission requirements, fees, schedules and school information.',
    solution:
      'Built an AI-powered admission assistant using Gemini, ChromaDB and SQLite to provide information from structured school data and documents.',
    stack: ['Python', 'Streamlit', 'Gemini', 'ChromaDB', 'SQLite'],
    features: [
      'AI-powered enquiry handling',
      'Document-based answers',
      'Database integration',
    ],
    href: '#contact',
  },
]

export function CaseStudiesSection() {
  const [activeSector, setActiveSector] = useState<string>('All')

  const filteredCases =
    activeSector === 'All'
      ? CASES
      : CASES.filter((c) => c.sector === activeSector)

  return (
    <section
      id="case-studies"
      className="relative scroll-mt-20 border-y border-border/60 bg-card/20 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Selected Work"
              title="AI & Software Solutions Built by VOLONIS"
              description="Explore selected projects across AI, automation, web applications and intelligent business systems. Each project demonstrates our approach to solving practical problems with modern technology."
            />
          </div>

          {/* Sector Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Web Apps', 'AI / RAG', 'AI / ML'].map((sector) => (
              <button
                key={sector}
                onClick={() => setActiveSector(sector)}
                className={cn(
                  'cursor-pointer rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-all',
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
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: 'easeOut',
              }}
              className="glass group relative flex flex-col rounded-2xl border border-border/60 p-6 transition-all hover:border-accent/40 sm:p-7"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                      {study.sector}
                    </span>

                    <span className="font-mono text-xs text-muted-foreground">
                      · {study.region}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground">
                    {study.client}
                  </h3>
                </div>

                <a
                  href={study.href}
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all group-hover:border-accent/50 group-hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  aria-label={`Learn more about ${study.client}`}
                >
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>

              {/* Project Title */}
              <p className="mt-4 text-lg font-semibold leading-snug text-balance">
                {study.title}
              </p>

              {/* Problem & Solution */}
              <div className="mt-4 grid gap-2.5 rounded-xl border border-border/40 bg-background/40 p-3.5 text-xs leading-relaxed">
                <div>
                  <span className="font-bold text-foreground">
                    Problem:{' '}
                  </span>
                  <span className="text-muted-foreground">
                    {study.problem}
                  </span>
                </div>

                <div className="border-t border-border/40 pt-2">
                  <span className="font-bold text-accent">
                    Solution:{' '}
                  </span>
                  <span className="text-muted-foreground">
                    {study.solution}
                  </span>
                </div>
              </div>

              {/* Key Features */}
              <div className="mt-5">
                <div className="mb-3 flex items-center gap-2">
                  <Layers
                    className="size-4 text-accent"
                    aria-hidden="true"
                  />

                  <span className="text-xs font-semibold text-foreground">
                    Key Features
                  </span>
                </div>

                <ul className="grid gap-2 sm:grid-cols-2">
                  {study.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <CheckCircle2
                        className="mt-0.5 size-3.5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Stack */}
              <div className="mt-5">
                <div className="mb-3 flex items-center gap-2">
                  <Globe
                    className="size-4 text-accent"
                    aria-hidden="true"
                  />

                  <span className="text-xs font-semibold text-foreground">
                    Technology
                  </span>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {study.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-border/70 bg-background/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA */}
              <div className="mt-6 border-t border-border/60 pt-5">
                <a
                  href={study.href}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-accent transition-colors hover:text-foreground"
                >
                  Discuss a Similar Project
                  <ArrowUpRight
                    className="size-3.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}