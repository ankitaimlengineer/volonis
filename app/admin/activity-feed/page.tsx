"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Rss,
  Users,
  Cpu,
  AlertTriangle,
  Clock,
  Search,
  RefreshCw,
  Download,
  Printer,
  CheckCircle2,
  FolderKanban,
  DollarSign,
  ShieldAlert,
  Globe,
  FileText
} from "lucide-react"

interface ActivityItem {
  id: string
  userName: string
  userRole: string
  title: string
  description: string
  module: "Clients" | "Projects" | "Finance" | "Team" | "AI" | "Website" | "Support" | "Security"
  timestamp: string
  relativeTime: string
  priority: "Low" | "Medium" | "High" | "Critical"
  status: "Success" | "Pending" | "Failed"
}

export default function ActivityFeedPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModule, setSelectedModule] = useState<string>("All")
  const [selectedPriority, setSelectedPriority] = useState<string>("All")
  const [activities, setActivities] = useState<ActivityItem[]>([])

  const fetchActivities = async () => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const mockData: ActivityItem[] = [
        {
          id: "ACT-801",
          userName: "Ankit Thummar",
          userRole: "Admin",
          title: "Project ERP Created",
          description: "Ankit created Project ERP for agricultural stock management.",
          module: "Projects",
          timestamp: "2026-08-04 16:10:00",
          relativeTime: "Just now",
          priority: "High",
          status: "Success"
        },
        {
          id: "ACT-802",
          userName: "Shailesh Makwana",
          userRole: "Project Guide",
          title: "AI Chatbot Module Completed",
          description: "Rahul completed AI Chatbot module for Krushi Info.",
          module: "AI",
          timestamp: "2026-08-04 15:45:00",
          relativeTime: "25 mins ago",
          priority: "Medium",
          status: "Success"
        },
        {
          id: "ACT-803",
          userName: "Rameshbhai Patel",
          userRole: "Client",
          title: "Payment Received",
          description: "Payment ₹25,000 received from Patel Agro Farm for bulk fertilizer order.",
          module: "Finance",
          timestamp: "2026-08-04 14:20:00",
          relativeTime: "2 hours ago",
          priority: "High",
          status: "Success"
        },
        {
          id: "ACT-804",
          userName: "System Security",
          userRole: "System",
          title: "Failed Login Attempt",
          description: "Multiple failed login attempts detected from IP 192.168.1.45.",
          module: "Security",
          timestamp: "2026-08-04 12:00:00",
          relativeTime: "4 hours ago",
          priority: "Critical",
          status: "Failed"
        },
        {
          id: "ACT-805",
          userName: "Kishorbhai Mehta",
          userRole: "Client",
          title: "Contact Form Submitted",
          description: "New quote request received regarding Market Price API Integration.",
          module: "Website",
          timestamp: "2026-08-04 09:15:00",
          relativeTime: "7 hours ago",
          priority: "Medium",
          status: "Pending"
        }
      ]

      setActivities(mockData)
    } catch (err: any) {
      setError(err.message || "Failed to load recent activities.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchSearch =
        act.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchModule = selectedModule === "All" || act.module === selectedModule
      const matchPriority = selectedPriority === "All" || act.priority === selectedPriority

      return matchSearch && matchModule && matchPriority
    })
  }, [activities, searchTerm, selectedModule, selectedPriority])

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Recent Activity Feed</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <span>Admin</span>
            <span>/</span>
            <span className="text-foreground font-medium">Real-Time Audit & Activity Logs</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button onClick={fetchActivities} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-border bg-card hover:bg-muted/50 transition-all shadow-sm cursor-pointer">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl border border-border bg-card hover:bg-muted/50 transition-all shadow-sm cursor-pointer" title="Print Feed">
            <Printer className="h-4 w-4" />
          </button>

          <button onClick={() => alert("Activity logs exported successfully!")} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm cursor-pointer">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Activities</span>
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500"><Rss className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">{activities.length * 14}</div>
            <p className="text-xs text-blue-600 font-medium mt-1">Logged across modules</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">User Activities</span>
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500"><Users className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">84%</div>
            <p className="text-xs text-indigo-600 font-medium mt-1">Admin & Team actions</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">System Activities</span>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500"><Cpu className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">126</div>
            <p className="text-xs text-amber-600 font-medium mt-1">Automated events today</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Important Events</span>
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500"><AlertTriangle className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">3</div>
            <p className="text-xs text-rose-600 font-medium mt-1">Requires review</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live Activity</span>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500"><Clock className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">Active</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">Real-time SSE polling</p>
          </div>
        </motion.div>
      </div>

      {/* Search & Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/60 backdrop-blur-md p-4 rounded-2xl border border-border/60 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search activity title, user, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="p-2 text-sm rounded-xl border border-border bg-background cursor-pointer"
          >
            <option value="All">All Modules</option>
            <option value="Clients">Clients</option>
            <option value="Projects">Projects</option>
            <option value="Finance">Finance</option>
            <option value="Team">Team</option>
            <option value="AI">AI</option>
            <option value="Website">Website</option>
            <option value="Support">Support</option>
            <option value="Security">Security</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="p-2 text-sm rounded-xl border border-border bg-background cursor-pointer"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Live Activity Timeline Feed */}
      {loading ? (
        <div className="p-12 text-center text-muted-foreground">Loading recent activities...</div>
      ) : error ? (
        <div className="p-12 text-center text-rose-500 font-semibold">{error}</div>
      ) : filteredActivities.length === 0 ? (
        <div className="p-16 text-center space-y-4 rounded-2xl border border-border/60 bg-card">
          <div className="p-4 rounded-full bg-muted w-16 h-16 mx-auto flex items-center justify-center text-muted-foreground">
            <Rss className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No Recent Activities Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">There are no activity logs matching your current filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="font-bold text-lg text-foreground px-1">Live Activity Timeline ({filteredActivities.length})</div>
          {filteredActivities.map((act) => (
            <motion.div
              key={act.id}
              whileHover={{ scale: 1.01 }}
              className="p-5 rounded-2xl border border-border/60 bg-card shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl mt-0.5 ${
                  act.module === "Projects" ? "bg-blue-500/10 text-blue-500" :
                  act.module === "AI" ? "bg-purple-500/10 text-purple-500" :
                  act.module === "Finance" ? "bg-emerald-500/10 text-emerald-500" :
                  act.module === "Security" ? "bg-rose-500/10 text-rose-500" : "bg-amber-500/10 text-amber-500"
                }`}>
                  {act.module === "Projects" ? <FolderKanban className="h-5 w-5" /> :
                   act.module === "AI" ? <Cpu className="h-5 w-5" /> :
                   act.module === "Finance" ? <DollarSign className="h-5 w-5" /> :
                   act.module === "Security" ? <ShieldAlert className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-foreground text-base">{act.title}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">{act.module}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      act.priority === "Critical" ? "bg-rose-500/10 text-rose-600" :
                      act.priority === "High" ? "bg-amber-500/10 text-amber-600" : "bg-blue-500/10 text-blue-600"
                    }`}>
                      {act.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{act.description}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                    <span className="font-medium text-foreground">{act.userName} ({act.userRole})</span>
                    <span>•</span>
                    <span>{act.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-xl">{act.relativeTime}</span>
                <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                  act.status === "Success" ? "bg-emerald-500/10 text-emerald-600" :
                  act.status === "Pending" ? "bg-amber-500/10 text-amber-600" : "bg-rose-500/10 text-rose-600"
                }`}>
                  {act.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}