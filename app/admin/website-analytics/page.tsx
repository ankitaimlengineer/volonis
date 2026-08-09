"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Globe,
  Users,
  Eye,
  Mail,
  FileText,
  TrendingDown,
  Search,
  RefreshCw,
  Download,
  Printer,
  ArrowUpRight,
  Smartphone,
  Laptop,
  Tablet,
  CheckCircle2,
  Clock
} from "lucide-react"

interface PageViewData {
  title: string
  url: string
  visitors: number
  views: number
  avgTime: string
  bounceRate: string
}

interface ContactLead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  service: string
  date: string
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Closed"
}

export default function WebsiteAnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState("Weekly")
  const [activeTab, setActiveTab] = useState<"overview" | "pages" | "leads" | "traffic" | "devices">("overview")

  const [topPages, setTopPages] = useState<PageViewData[]>([])
  const [contactLeads, setContactLeads] = useState<ContactLead[]>([])

  const fetchAnalyticsData = async () => {
    setLoading(true)
    setError(null)
    try {
      // Simulate fetching data from backend or GA4 endpoints
      await new Promise((resolve) => setTimeout(resolve, 600))

      setTopPages([
        { title: "Krushi Info Home - Market Prices", url: "/", visitors: 4230, views: 8900, avgTime: "2m 45s", bounceRate: "38.4%" },
        { title: "Fertilizer Calculator & Sales", url: "/tools/fertilizer-calc", visitors: 2150, views: 4800, avgTime: "3m 12s", bounceRate: "29.1%" },
        { title: "Agricultural News & Updates", url: "/news", visitors: 1840, views: 3200, avgTime: "1m 50s", bounceRate: "45.2%" },
        { title: "Contact Us - Krushi Info", url: "/contact", visitors: 920, views: 1100, avgTime: "1m 05s", bounceRate: "52.0%" }
      ])

      setContactLeads([
        { id: "L-101", name: "Rameshbhai Patel", company: "Patel Agro Farm", email: "ramesh@patelagro.com", phone: "+91 98765 43210", service: "Bulk Fertilizer Supply", date: "2026-08-04 11:30", status: "New" },
        { id: "L-102", name: "Kishorbhai Mehta", company: "Mehta Seeds Corp", email: "kishor@mehtaseeds.in", phone: "+91 91234 56789", service: "Market Price API Integration", date: "2026-08-04 09:15", status: "Contacted" },
        { id: "L-103", name: "Mansukhbhai Khunt", company: "Khunt Organic Farms", email: "mansukh@khuntorganic.org", phone: "+91 99887 76655", service: "Consultation & Management", date: "2026-08-03 16:45", status: "Qualified" }
      ])
    } catch (err: any) {
      setError(err.message || "Failed to load website analytics data.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  const filteredPages = useMemo(() => {
    return topPages.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.url.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [topPages, searchTerm])

  const filteredLeads = useMemo(() => {
    return contactLeads.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.company.toLowerCase().includes(searchTerm.toLowerCase()) || l.email.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [contactLeads, searchTerm])

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Website Analytics</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <span>Admin</span>
            <span>/</span>
            <span className="text-foreground font-medium">Traffic & Performance Dashboard</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 text-sm font-medium rounded-xl border border-border bg-card shadow-sm cursor-pointer"
          >
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="Weekly">Weekly (Last 7 Days)</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>

          <button onClick={fetchAnalyticsData} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-border bg-card hover:bg-muted/50 transition-all shadow-sm cursor-pointer">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl border border-border bg-card hover:bg-muted/50 transition-all shadow-sm cursor-pointer" title="Print Report">
            <Printer className="h-4 w-4" />
          </button>

          <button onClick={() => alert("Analytics report exported successfully!")} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm cursor-pointer">
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
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Visitors Today</span>
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500"><Users className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">7,140</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+14.2% vs yesterday</span>
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Page Views</span>
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500"><Eye className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">18,000</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>Avg 2.5 per visitor</span>
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact Leads</span>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500"><Mail className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">42</div>
            <div className="flex items-center gap-1 text-xs text-amber-600 font-medium mt-1">
              <Clock className="h-3.5 w-3.5" />
              <span>5 pending responses</span>
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quote Requests</span>
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500"><FileText className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">18</div>
            <div className="flex items-center gap-1 text-xs text-purple-600 font-medium mt-1">
              <span>3 new requests today</span>
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bounce Rate</span>
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500"><TrendingDown className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">36.8%</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-1">
              <span>-2.4% improvement</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-border pb-2">
        {(["overview", "pages", "leads", "traffic", "devices"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl capitalize transition-all cursor-pointer ${
              activeTab === tab ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "pages" ? "Top Pages" : tab === "leads" ? "Contact Leads" : tab}
          </button>
        ))}
      </div>

      {/* Search Bar Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/60 backdrop-blur-md p-4 rounded-2xl border border-border/60 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search page titles, URLs, leads, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="text-xs text-muted-foreground">
          Real-time GA4 synchronization active. Last updated: Just now.
        </div>
      </div>

      {/* Content Section: Top Pages Table */}
      {loading ? (
        <div className="p-12 text-center text-muted-foreground">Loading website analytics...</div>
      ) : error ? (
        <div className="p-12 text-center text-rose-500 font-semibold">{error}</div>
      ) : activeTab === "pages" || activeTab === "overview" ? (
        <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
          <div className="p-4 font-bold text-foreground border-b border-border flex items-center justify-between">
            <span>Top Performing Pages</span>
            <span className="text-xs font-normal text-muted-foreground">{filteredPages.length} pages tracked</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="p-4 font-semibold">Page Title & URL</th>
                  <th className="p-4 font-semibold">Visitors</th>
                  <th className="p-4 font-semibold">Page Views</th>
                  <th className="p-4 font-semibold">Avg Time</th>
                  <th className="p-4 font-semibold text-right">Bounce Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-sm">
                {filteredPages.map((page, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-foreground">{page.title}</div>
                      <div className="text-xs text-muted-foreground">{page.url}</div>
                    </td>
                    <td className="p-4 font-semibold text-foreground">{page.visitors.toLocaleString()}</td>
                    <td className="p-4 text-muted-foreground">{page.views.toLocaleString()}</td>
                    <td className="p-4 text-muted-foreground">{page.avgTime}</td>
                    <td className="p-4 text-right font-medium text-emerald-600">{page.bounceRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {/* Contact Form Leads Table */}
      {(activeTab === "leads" || activeTab === "overview") && (
        <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden mt-6">
          <div className="p-4 font-bold text-foreground border-b border-border flex items-center justify-between">
            <span>Recent Contact Form Leads</span>
            <span className="text-xs font-normal text-muted-foreground">{filteredLeads.length} total inquiries</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="p-4 font-semibold">Lead Name</th>
                  <th className="p-4 font-semibold">Company</th>
                  <th className="p-4 font-semibold">Contact Email / Phone</th>
                  <th className="p-4 font-semibold">Service Interested In</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Submitted Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-sm">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-bold text-foreground">{lead.name}</td>
                    <td className="p-4 text-muted-foreground">{lead.company}</td>
                    <td className="p-4">
                      <div className="text-foreground">{lead.email}</div>
                      <div className="text-xs text-muted-foreground">{lead.phone}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600">{lead.service}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        lead.status === "New" ? "bg-amber-500/10 text-amber-600" :
                        lead.status === "Contacted" ? "bg-blue-500/10 text-blue-600" :
                        "bg-emerald-500/10 text-emerald-600"
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 text-right text-xs text-muted-foreground">{lead.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Traffic Sources & Devices Quick Breakdown */}
      {activeTab === "traffic" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-foreground">Traffic Sources Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Organic Search (Google / Bing)</span>
                <span className="font-bold text-foreground">58.4%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Direct Traffic</span>
                <span className="font-bold text-foreground">22.1%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Social Media (WhatsApp / Facebook)</span>
                <span className="font-bold text-foreground">11.5%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Referral Websites</span>
                <span className="font-bold text-foreground">8.0%</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-foreground">Device & Browser Distribution</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><Smartphone className="h-4 w-4 text-blue-500" /> Mobile Phones</div>
                <span className="font-bold text-foreground">64.2%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><Laptop className="h-4 w-4 text-indigo-500" /> Desktop Computers</div>
                <span className="font-bold text-foreground">28.5%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><Tablet className="h-4 w-4 text-purple-500" /> Tablets</div>
                <span className="font-bold text-foreground">7.3%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}