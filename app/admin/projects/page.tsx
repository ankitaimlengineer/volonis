"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  RefreshCw,
  Download,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  SlidersHorizontal
} from "lucide-react"

type ProjectStatus =
  | "Planning"
  | "Pending"
  | "In Progress"
  | "Development"
  | "Testing"
  | "Review"
  | "Client Review"
  | "Completed"
  | "Delivered"
  | "On Hold"
  | "Cancelled"

type ProjectType = "Website" | "Software" | "ERP" | "AI" | "Mobile App" | "Other"
type Priority = "Low" | "Medium" | "High" | "Critical"

interface TeamMember {
  name: string
  avatar: string
  role: string
}

interface Project {
  id: string
  projectId: string
  name: string
  clientName: string
  category: string
  type: ProjectType
  status: ProjectStatus
  progress: number
  startDate: string
  endDate: string
  teamLeader: TeamMember
  developers: TeamMember[]
  designers: TeamMember[]
  aiEngineers: TeamMember[]
  estimatedBudget: number
  receivedAmount: number
  profitMargin: number
  priority: Priority
  currency: string
}

export default function ProjectsOverviewPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [selectedType, setSelectedType] = useState<string>("All")
  const [selectedPriority, setSelectedPriority] = useState<string>("All")
  const [sortBy, setSortBy] = useState<string>("Latest")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCurrency] = useState("₹")

  const fetchProjects = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/apidata")
      if (!res.ok) {
        throw new Error("Failed to fetch projects data from the server.")
      }
      const result = await res.json()
      
      // /apidata માંથી આવતા ડેટાને Projects ફોર્મેટમાં મેપ કરીએ છીએ
      const formattedProjects = (result.data || []).map((item: any, index: number) => ({
        id: item.id || String(index + 1),
        projectId: `PRJ-${1000 + index}`,
        name: item.productName || item.customerName + " Project" || "Custom Website",
        clientName: item.customerName || "Unknown Client",
        category: "Web Development",
        type: "Website" as ProjectType,
        status: (item.status as ProjectStatus) || "In Progress",
        progress: item.progress || 60,
        startDate: item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : "2026-01-01",
        endDate: "2026-12-31",
        teamLeader: { name: "Ankit", avatar: "", role: "Lead" },
        developers: [{ name: "Dev", avatar: "", role: "Developer" }],
        designers: [],
        aiEngineers: [],
        estimatedBudget: Number(item.amount || 50000),
        receivedAmount: Number(item.amount || 0),
        profitMargin: 20,
        priority: "High" as Priority,
        currency: "₹"
      }))

      setProjects(formattedProjects)
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesSearch =
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.projectId.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = selectedStatus === "All" || project.status === selectedStatus
        const matchesType = selectedType === "All" || project.type === selectedType
        const matchesPriority = selectedPriority === "All" || project.priority === selectedPriority

        return matchesSearch && matchesStatus && matchesType && matchesPriority
      })
      .sort((a, b) => {
        if (sortBy === "Latest") return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        if (sortBy === "Oldest") return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        if (sortBy === "Deadline") return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
        if (sortBy === "Budget") return b.estimatedBudget - a.estimatedBudget
        if (sortBy === "Progress") return b.progress - a.progress
        return 0
      })
  }, [projects, searchTerm, selectedStatus, selectedType, selectedPriority, sortBy])

  const totalPages = Math.ceil(filteredProjects.length / rowsPerPage) || 1
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredProjects.slice(start, start + rowsPerPage)
  }, [filteredProjects, currentPage, rowsPerPage])

  const metrics = useMemo(() => {
    const total = projects.length
    const active = projects.filter((p) => ["In Progress", "Development", "Testing", "Review"].includes(p.status)).length
    const completed = projects.filter((p) => ["Completed", "Delivered"].includes(p.status)).length
    const pending = projects.filter((p) => ["Pending", "Planning", "Client Review"].includes(p.status)).length
    const overdue = projects.filter((p) => new Date(p.endDate) < new Date() && p.progress < 100).length
    const totalRevenue = projects.reduce((acc, p) => acc + p.receivedAmount, 0)

    return { total, active, completed, pending, overdue, totalRevenue }
  }, [projects])

  const getStatusBadge = (status: ProjectStatus) => {
    const styles: Record<ProjectStatus, string> = {
      Planning: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      "In Progress": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      Development: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      Testing: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      Review: "bg-pink-500/10 text-pink-500 border-pink-500/20",
      "Client Review": "bg-orange-500/10 text-orange-500 border-orange-500/20",
      Completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      Delivered: "bg-green-500/10 text-green-600 border-green-500/20",
      "On Hold": "bg-slate-500/10 text-slate-500 border-slate-500/20",
      Cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
    }
    return styles[status] || "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }

  const getPriorityBadge = (priority: Priority) => {
    const styles: Record<Priority, string> = {
      Low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      Medium: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
      High: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
      Critical: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
    }
    return styles[priority]
  }

  const getProgressBarColor = (progress: number) => {
    if (progress === 100) return "bg-emerald-500"
    if (progress >= 70) return "bg-blue-500"
    if (progress >= 40) return "bg-indigo-500"
    if (progress >= 15) return "bg-amber-500"
    return "bg-rose-500"
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Project Overview</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <span>Admin</span>
            <span>/</span>
            <span className="text-foreground font-medium">Projects</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={fetchProjects}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-border bg-card hover:bg-muted/50 transition-all shadow-sm cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => alert("Exporting project reports...")}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-border bg-card hover:bg-muted/50 transition-all shadow-sm cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>

          <button
            onClick={() => alert("Opening Create New Project Modal...")}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-md cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { title: "Total Projects", count: metrics.total, growth: "+12% this month", icon: FolderKanban, color: "text-blue-500", bg: "bg-blue-500/10" },
          { title: "Active Projects", count: metrics.active, growth: "Currently running", icon: TrendingUp, color: "text-indigo-500", bg: "bg-indigo-500/10" },
          { title: "Completed", count: metrics.completed, growth: "Successfully delivered", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { title: "Pending", count: metrics.pending, growth: "Awaiting approval", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
          { title: "Overdue", count: metrics.overdue, growth: "Requires attention", icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-500/10" },
          { title: "Total Revenue", count: `${selectedCurrency}${metrics.totalRevenue.toLocaleString()}`, growth: "Realized earnings", icon: DollarSign, color: "text-purple-500", bg: "bg-purple-500/10" },
        ].map((card, idx) => {
          const Icon = card.icon
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{card.title}</span>
                <div className={`p-2 rounded-xl ${card.bg} ${card.color}`}><Icon className="h-5 w-5" /></div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-foreground">{card.count}</div>
                <p className="text-xs text-muted-foreground mt-1">{card.growth}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/60 backdrop-blur-md p-4 rounded-2xl border border-border/60 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by project name, client, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border transition-all cursor-pointer ${
              isFilterOpen ? "bg-primary/10 border-primary text-primary" : "border-border bg-card hover:bg-muted/50"
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>

          <div className="relative flex items-center gap-2 border border-border bg-card px-3 py-2 rounded-xl text-sm">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-medium text-foreground focus:outline-none cursor-pointer"
            >
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
              <option value="Deadline">Deadline</option>
              <option value="Budget">Budget</option>
              <option value="Progress">Progress</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filters Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card/90 backdrop-blur-md p-6 rounded-2xl border border-border shadow-md space-y-4 overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-primary" /> Advanced Filters
              </h3>
              <button
                onClick={() => { setSelectedStatus("All"); setSelectedType("All"); setSelectedPriority("All"); }}
                className="text-xs text-primary hover:underline font-medium cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">Project Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-2.5 text-sm rounded-xl border border-border bg-background cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  {["Planning", "Pending", "In Progress", "Development", "Testing", "Review", "Client Review", "Completed", "Delivered", "On Hold", "Cancelled"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">Project Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-2.5 text-sm rounded-xl border border-border bg-background cursor-pointer"
                >
                  <option value="All">All Types</option>
                  {["Website", "Software", "ERP", "AI", "Mobile App", "Other"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">Priority</label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full p-2.5 text-sm rounded-xl border border-border bg-background cursor-pointer"
                >
                  <option value="All">All Priorities</option>
                  {["Low", "Medium", "High", "Critical"].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Table / States */}
      {loading ? (
        <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-4">
          <div className="h-8 bg-muted rounded-xl w-1/4 animate-pulse" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-16 bg-muted/60 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="p-12 text-center rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-4">
          <ShieldAlert className="h-6 w-6 text-rose-500 mx-auto" />
          <h3 className="font-semibold text-lg text-foreground">Failed to load projects</h3>
          <button onClick={fetchProjects} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-xl cursor-pointer">Try Again</button>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-16 text-center rounded-2xl border border-border/60 bg-card/60 space-y-4">
          <FolderKanban className="h-8 w-8 text-primary mx-auto" />
          <h3 className="font-bold text-xl text-foreground">No Projects Found</h3>
          <button onClick={() => alert("Opening Create Modal...")} className="px-5 py-2.5 bg-primary text-primary-foreground text-sm rounded-xl cursor-pointer">Create New Project</button>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/60 bg-card/90 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-semibold uppercase text-muted-foreground">
                  <th className="py-4 px-6">Project Name & ID</th>
                  <th className="py-4 px-6">Client & Type</th>
                  <th className="py-4 px-6">Status & Priority</th>
                  <th className="py-4 px-6">Progress</th>
                  <th className="py-4 px-6">Deadline</th>
                  <th className="py-4 px-6">Team</th>
                  <th className="py-4 px-6">Budget</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-sm">
                {paginatedProjects.map((project) => {
                  const isOverdue = new Date(project.endDate) < new Date() && project.progress < 100
                  const remainingDays = Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))
                  return (
                    <tr key={project.id} className={`hover:bg-muted/30 transition-colors ${isOverdue ? "bg-rose-500/5" : ""}`}>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-foreground">{project.name}</div>
                        <div className="text-xs text-muted-foreground font-mono mt-0.5">{project.projectId}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-foreground">{project.clientName}</div>
                        <span className="inline-block px-2 py-0.5 rounded-md text-xs bg-muted text-muted-foreground mt-1">{project.type}</span>
                      </td>
                      <td className="py-4 px-6 space-y-1.5">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(project.status)}`}>{project.status}</span>
                        <div><span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getPriorityBadge(project.priority)}`}>{project.priority}</span></div>
                      </td>
                      <td className="py-4 px-6 w-44">
                        <div className="text-xs font-semibold mb-1 text-foreground">{project.progress}%</div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div className={`h-full rounded-full ${getProgressBarColor(project.progress)}`} style={{ width: `${project.progress}%` }} />
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs">
                        <div className="text-foreground font-medium">{project.endDate}</div>
                        {isOverdue ? <span className="text-rose-500 font-semibold flex items-center gap-1 mt-0.5"><AlertCircle className="h-3 w-3" /> Overdue</span> : <span className="text-muted-foreground">{remainingDays} days left</span>}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center -space-x-2">
                          <div className="w-7 h-7 rounded-full bg-primary/20 border-2 border-background text-[10px] flex items-center justify-center font-bold text-primary">
                            {project.teamLeader.name.charAt(0)}
                          </div>
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-1">Lead: {project.teamLeader.name}</div>
                      </td>
                      <td className="py-4 px-6 text-xs">
                        <div className="font-semibold text-foreground">{selectedCurrency}{project.estimatedBudget.toLocaleString()}</div>
                        <div className="text-emerald-600 mt-0.5">Rcv: {selectedCurrency}{project.receivedAmount.toLocaleString()}</div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => alert(`View ${project.name}`)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"><Eye className="h-4 w-4" /></button>
                          <button onClick={() => alert(`Edit ${project.name}`)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => alert(`Delete ${project.name}`)} className="p-1.5 hover:bg-rose-500/10 rounded-lg text-rose-500 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-border bg-muted/20">
            <div className="text-sm text-muted-foreground">Showing {paginatedProjects.length} of {filteredProjects.length} projects</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-border bg-card disabled:opacity-50 cursor-pointer"><ChevronLeft className="h-4 w-4" /></button>
              <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-border bg-card disabled:opacity-50 cursor-pointer"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}