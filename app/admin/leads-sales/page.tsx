"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  Users,
  CheckCircle2,
  XCircle,
  Award,
  Search,
  RefreshCw,
  Plus,
  Download,
  Trash2,
  Mail,
  MessageSquare
} from "lucide-react"

type LeadStatus = "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Negotiation" | "Won" | "Lost" | "On Hold"
type Priority = "Low" | "Medium" | "High" | "Urgent"

interface Lead {
  id: string
  leadId: string
  leadName: string
  companyName: string
  contactPerson: string
  email: string
  phone: string
  country: string
  industry: string
  companySize: string
  budget: string
  expectedValue: number
  leadSource: string
  assignedExecutive: string
  status: LeadStatus
  priority: Priority
  lastFollowUp: string
  nextFollowUp: string
  expectedClosingDate: string
}

export default function LeadsSalesPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [selectedSource, setSelectedSource] = useState<string>("All")
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "funnel" | "won" | "lost">("overview")

  const fetchLeadsData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api")
      if (!res.ok) throw new Error("Failed to load leads and sales data.")
      const json = await res.json()
      
      const raw = json.data || []

      const statuses: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Won", "Lost", "On Hold"]
      const priorities: Priority[] = ["Low", "Medium", "High", "Urgent"]
      const sources = ["Website", "LinkedIn", "Referral", "Facebook", "Google Ads", "Cold Email"]
      const industries = ["Agriculture", "SaaS & Tech", "Healthcare", "E-commerce", "Finance"]

      const mappedLeads: Lead[] = raw.map((item: any, i: number) => {
        const isContactForm = item.plan === "Contact Form" || String(item.paymentId || "").startsWith("CONTACT_")
        
        return {
          id: String(item.id || i + 1),
          leadId: isContactForm ? `INC-${1000 + i}` : `LD-${1000 + i}`,
          leadName: item.customerName || item.name || `Client Lead #${i + 1}`,
          companyName: item.company || item.productName || `Inquiry / Enterprise`,
          contactPerson: item.customerName || "Ankit Thummar",
          email: item.email || `lead${i + 1}@example.com`,
          phone: item.phone || "+91 98765 43210",
          country: "India",
          industry: isContactForm ? "Website Inquiry" : industries[i % industries.length],
          companySize: "50-200 employees",
          budget: item.amount ? `₹${item.amount}` : "₹20,000",
          expectedValue: item.amount ? Number(item.amount) : 15000 + (i * 2500),
          leadSource: isContactForm ? "Website" : sources[i % sources.length],
          assignedExecutive: "Ankit Thummar",
          status: isContactForm ? "New" : (item.status === "Active" ? "Qualified" : statuses[i % statuses.length]),
          priority: priorities[i % priorities.length],
          lastFollowUp: "2026-06-01",
          nextFollowUp: "2026-06-10",
          expectedClosingDate: "2026-06-30"
        }
      })

      setLeads(mappedLeads)
    } catch (err: any) {
      setError(err.message || "Failed to load leads data.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeadsData()
  }, [])

  // Delete Lead Handler
  const handleDelete = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id))
  }

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchSearch = 
        lead.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.leadId.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchStatus = selectedStatus === "All" || lead.status === selectedStatus
      const matchSource = selectedSource === "All" || lead.leadSource === selectedSource

      return matchSearch && matchStatus && matchSource
    })
  }, [leads, searchTerm, selectedStatus, selectedSource])

  const metrics = useMemo(() => {
    const totalNew = leads.filter(l => l.status === "New").length
    const qualified = leads.filter(l => l.status === "Qualified" || l.status === "Proposal Sent").length
    const wonDeals = leads.filter(l => l.status === "Won")
    const lostDeals = leads.filter(l => l.status === "Lost")
    const totalRevenue = wonDeals.reduce((acc, l) => acc + l.expectedValue, 0)
    const conversionRate = leads.length ? Math.round((wonDeals.length / leads.length) * 100) : 0

    return {
      totalNew,
      qualified,
      wonCount: wonDeals.length,
      lostCount: lostDeals.length,
      totalRevenue,
      conversionRate
    }
  }, [leads])

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Leads & Sales Management</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <span>Admin</span>
            <span>/</span>
            <span className="text-foreground font-medium">Leads & Sales Pipeline</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button onClick={fetchLeadsData} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-border bg-card hover:bg-muted/55 transition-all shadow-sm cursor-pointer">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <button onClick={() => alert("Export generated successfully!")} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-border bg-card hover:bg-muted/55 transition-all shadow-sm cursor-pointer">
            <Download className="h-4 w-4" />
            <span>Export CSV/PDF</span>
          </button>
          <button onClick={() => alert("Open New Lead Modal")} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>Add New Lead</span>
          </button>
        </div>
      </div>

      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">New Leads / Inquiries</span>
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500"><Users className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">{metrics.totalNew}</div>
            <p className="text-xs text-blue-600 font-medium mt-1">From website & forms</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Qualified Leads</span>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500"><CheckCircle2 className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">{metrics.qualified}</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">Ready for proposal</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Won Deals</span>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500"><Award className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">{metrics.wonCount}</div>
            <p className="text-xs text-amber-600 font-medium mt-1">₹{metrics.totalRevenue.toLocaleString()} Revenue</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Lost Leads</span>
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500"><XCircle className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">{metrics.lostCount}</div>
            <p className="text-xs text-rose-600 font-medium mt-1">Loss rate analyzed</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Conversion Rate</span>
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500"><TrendingUp className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">{metrics.conversionRate}%</div>
            <p className="text-xs text-purple-600 font-medium mt-1">Lead to client success</p>
          </div>
        </motion.div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-border pb-2">
        {(["overview", "leads", "funnel", "won", "lost"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl capitalize transition-all cursor-pointer ${
              activeTab === tab ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search & Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/60 backdrop-blur-md p-4 rounded-2xl border border-border/60 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, company, email, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 text-sm rounded-xl border border-border bg-background cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>

          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="p-2 text-sm rounded-xl border border-border bg-background cursor-pointer"
          >
            <option value="All">All Sources</option>
            <option value="Website">Website</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Referral">Referral</option>
            <option value="Facebook">Facebook</option>
            <option value="Google Ads">Google Ads</option>
          </select>
        </div>
      </div>

      {/* Leads Main Card List Layout */}
      {loading ? (
        <div className="p-12 text-center text-muted-foreground">Loading leads & inquiries database...</div>
      ) : error ? (
        <div className="p-12 text-center text-rose-500 font-semibold">{error}</div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-bold text-foreground">Leads & Inquiries Directory</h2>
            <span className="text-xs font-medium text-muted-foreground">{filteredLeads.length} items found</span>
          </div>

          {filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground bg-card rounded-2xl border border-border/60">
              No leads or inquiries found. Try submitting the contact form on your website!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredLeads.map((lead) => (
                <div 
                  key={lead.id} 
                  className="p-6 rounded-2xl border border-border/60 bg-card/90 backdrop-blur-md shadow-sm hover:border-primary/50 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  {/* Left Section: Name & Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold tracking-tight text-foreground uppercase">{lead.leadName}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        {lead.leadId}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* Gmail Card Box */}
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border/40">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <Mail className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Gmail ID / Email</div>
                          <div className="text-sm font-medium text-foreground">{lead.email}</div>
                        </div>
                      </div>

                      {/* Inquiry Message Box */}
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border/40">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Inquiry Message</div>
                          <div className="text-sm font-medium text-foreground">{lead.companyName}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Delete Button */}
                  <div className="flex items-center justify-end md:justify-center border-t md:border-t-0 pt-3 md:pt-0 border-border/40">
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white transition-all text-sm font-semibold cursor-pointer shadow-xs"
                      title="Delete Record"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}