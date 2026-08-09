'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Activity, Cpu, Database, ShieldCheck } from 'lucide-react'

type Node = { id: string; x: number; y: number; label: string }

const NODES: Node[] = [
  { id: 'core', x: 50, y: 50, label: 'AI Core' },
  { id: 'data', x: 17, y: 24, label: 'Data Lake' },
  { id: 'infer', x: 84, y: 27, label: 'Inference' },
  { id: 'edge', x: 15, y: 76, label: 'Edge CDN' },
  { id: 'sec', x: 82, y: 74, label: 'Security' },
  { id: 'api', x: 50, y: 12, label: 'API Mesh' },
  { id: 'obs', x: 50, y: 89, label: 'Telemetry' },
]

const EDGES: [string, string][] = [
  ['core', 'data'],
  ['core', 'infer'],
  ['core', 'edge'],
  ['core', 'sec'],
  ['core', 'api'],
  ['core', 'obs'],
  ['data', 'api'],
  ['infer', 'sec'],
  ['edge', 'obs'],
]

const METRICS = [
  { icon: Cpu, label: 'GPU Utilization', value: 78, suffix: '%' },
  { icon: Database, label: 'Records / sec', value: 42, suffix: 'K' },
  { icon: ShieldCheck, label: 'Threats Blocked', value: 1284, suffix: '' },
]

function byId(id: string) {
  return NODES.find((n) => n.id === id)!
}

export function NetworkVisual() {
  const [throughput, setThroughput] = useState(94.2)
  const [active, setActive] = useState<string | null>(null)
  const [bars, setBars] = useState<number[]>(() =>
    Array.from({ length: 24 }, (_, i) => 30 + Math.sin(i / 2) * 18 + 20),
  )
  const frame = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      frame.current += 1
      const f = frame.current
      setThroughput(Number((92 + Math.sin(f / 3) * 3.4).toFixed(1)))
      setBars(
        Array.from(
          { length: 24 },
          (_, i) => 28 + Math.abs(Math.sin((i + f) / 2.6)) * 62,
        ),
      )
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/25 via-transparent to-accent/20 blur-3xl"
      />

      <div className="glass overflow-hidden rounded-2xl shadow-2xl">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-destructive/70" />
            <span className="size-2.5 rounded-full bg-accent/60" />
            <span className="size-2.5 rounded-full bg-primary/70" />
          </div>
          <p className="font-mono text-[11px] tracking-wider text-muted-foreground">
            volonis://infrastructure-mesh
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-1 text-[10px] font-medium text-accent">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            LIVE
          </span>
        </div>

        <div className="p-4 sm:p-5">
          {/* Node graph */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border/60 bg-background/40">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 size-full"
              role="img"
              aria-label="Interactive diagram of VOLONIS infrastructure nodes connected to a central AI core"
            >
              <defs>
                <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1565FF" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.75" />
                </linearGradient>
              </defs>

              {EDGES.map(([a, b], i) => {
                const from = byId(a)
                const to = byId(b)
                const isActive = active === a || active === b
                return (
                  <g key={`${a}-${b}`}>
                    <line
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke="url(#edgeGrad)"
                      strokeWidth={isActive ? 0.7 : 0.3}
                      opacity={isActive ? 0.95 : 0.35}
                      className="transition-all duration-300"
                    />
                    <circle r="0.85" fill="#00D4FF">
                      <animateMotion
                        dur={`${2.4 + (i % 4) * 0.6}s`}
                        repeatCount="indefinite"
                        path={`M${from.x},${from.y} L${to.x},${to.y}`}
                      />
                    </circle>
                  </g>
                )
              })}

              {NODES.map((node) => {
                const isCore = node.id === 'core'
                const isActive = active === node.id
                return (
                  <g
                    key={node.id}
                    onMouseEnter={() => setActive(node.id)}
                    onMouseLeave={() => setActive(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isCore ? 7.5 : 5}
                      fill={isCore ? '#1565FF' : 'rgba(11,15,25,0.9)'}
                      stroke={isActive || isCore ? '#00D4FF' : '#1565FF'}
                      strokeWidth={isActive ? 0.9 : 0.5}
                      opacity={0.95}
                      className="transition-all duration-300"
                    />
                    {isCore && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="7.5"
                        fill="none"
                        stroke="#00D4FF"
                        strokeWidth="0.4"
                        opacity="0.7"
                      >
                        <animate
                          attributeName="r"
                          values="7.5;13;7.5"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.7;0;0.7"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                    <text
                      x={node.x}
                      y={node.y + (isCore ? 12.5 : 9.5)}
                      textAnchor="middle"
                      className="fill-current text-muted-foreground"
                      style={{ fontSize: '3.1px' }}
                    >
                      {node.label}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Throughput panel */}
          <div className="mt-4 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
            <div className="rounded-xl border border-border/60 bg-background/40 p-4">
              <div className="flex items-baseline justify-between">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Activity className="size-3.5 text-accent" aria-hidden="true" />
                  Pipeline Throughput
                </p>
                <p
                  className="font-display text-lg font-bold text-accent"
                  aria-live="polite"
                >
                  {throughput}%
                </p>
              </div>
              <div className="mt-3 flex h-14 items-end gap-1">
                {bars.map((h, i) => (
                  <motion.span
                    key={i}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex-1 rounded-sm bg-gradient-to-t from-primary/40 to-accent"
                  />
                ))}
              </div>
            </div>

            <ul className="grid gap-2">
              {METRICS.map((m) => (
                <li
                  key={m.label}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 px-3 py-2.5"
                >
                  <m.icon
                    className="size-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold text-foreground">
                      {m.value.toLocaleString()}
                      {m.suffix}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {m.label}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
