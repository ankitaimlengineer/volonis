"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  CheckCircle2,
  TrendingUp,
  Layers,
  Search,
  RefreshCw,
  Plus,
  Eye,
  Trash2,
  Download,
  Edit3,
  X,
  Check
} from "lucide-react"

interface QuotationItem {
  id: string
  quotationNumber: string
  clientName: string
  companyName: string
  servicesIncluded: string
  finalAmount: string
  validUntil: string
  salesExecutive: string
  status: "Draft" | "Sent" | "Approved" | "Converted" | "Rejected" | "Pending"
  createdDate: string
  timeline?: string
  coreTeam?: string
}

export default function QuotationManagementPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [quotations, setQuotations] = useState<QuotationItem[]>([])
  
  // View Modal માટેનું સ્ટેટ
  const [viewingQuote, setViewingQuote] = useState<QuotationItem | null>(null)

  const fetchQuotations = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api?type=proposals')
      if (!response.ok) throw new Error("Failed to fetch quotations from database.")
      
      const result = await response.json()
      
      let rawData = []
      if (Array.isArray(result)) {
        rawData = result
      } else if (result && Array.isArray(result.data)) {
        rawData = result.data
      } else if (result && Array.isArray(result.proposals)) {
        rawData = result.proposals
      }

      const formattedData: QuotationItem[] = rawData.map((item: any, index: number) => ({
        id: item.id || String(index + 1),
        quotationNumber: item.quotationNumber || `PROP-${item.id?.substring(0, 5) || index + 1}`,
        clientName: item.clientName || item.customerName || "General Client",
        companyName: item.companyName || "Independent",
        servicesIncluded: item.servicesIncluded || item.scopeItems || "Standard Development",
        finalAmount: item.finalAmount || item.investment || "₹69,000",
        validUntil: item.validUntil || "30 Days",
        salesExecutive: item.salesExecutive || "Admin",
        status: item.status || "Sent",
        createdDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent",
        timeline: item.timeline || "4-6 weeks",
        coreTeam: item.coreTeam || "2 Engineers"
      }))

      setQuotations(formattedData)
    } catch (err: any) {
      setError(err.message || "Failed to load quotation records.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuotations()
  }, [])

  const handleDelete = async (id: string, quotationNumber: string) => {
    if (!confirm(`Are you sure you want to delete ${quotationNumber}?`)) return

    try {
      const res = await fetch(`/api?id=${id}&type=proposal`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.success) {
        setQuotations(prev => prev.filter(q => q.id !== id))
      } else {
        alert("Failed to delete record.")
      }
    } catch (err) {
      alert("Error deleting record.")
    }
  }

  const handleAddNew = async () => {
    const client = prompt("Enter Client Name:")
    if (!client) return

    const amount = prompt("Enter Final Amount (e.g. ₹50,000):", "₹50,000") || "₹50,000"
    const scope = prompt("Enter Services / Modules (e.g. Dashboard, Auth, Reports):", "Dashboard, User Management, Reports") || "Standard Modules"

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'proposal',
          clientName: client,
          investment: amount,
          timeline: '4 weeks',
          scopeItems: scope,
          status: 'Sent'
        })
      })
      const data = await res.json()
      if (data.success) {
        fetchQuotations()
      } else {
        alert("Failed to add quotation.")
      }
    } catch (err) {
      alert("Error adding quotation.")
    }
  }

  const handleUpdateStatus = async (id: string, currentStatus: string) => {
    const newStatus = prompt("Update Status (Draft, Sent, Approved, Converted, Rejected, Pending):", currentStatus)
    if (!newStatus) return

    try {
      const res = await fetch('/api', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id,
          type: 'proposal',
          status: newStatus
        })
      })
      const data = await res.json()
      if (data.success) {
        fetchQuotations()
      } else {
        alert("Failed to update status.")
      }
    } catch (err) {
      alert("Error updating status.")
    }
  }

  const filteredQuotations = useMemo(() => {
    const safeQuotations = Array.isArray(quotations) ? quotations : []

    return safeQuotations.filter((quo) => {
      const matchSearch =
        quo.quotationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quo.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quo.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quo.servicesIncluded?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchStatus = selectedStatus === "All" || quo.status === selectedStatus

      return matchSearch && matchStatus
    })
  }, [quotations, searchTerm, selectedStatus])

  const totalQuotationsCount = quotations.length
  const approvedCount = quotations.filter(q => q.status === "Approved").length
  const convertedCount = quotations.filter(q => q.status === "Converted").length

  return (
    <div className="space-y-8 pb-12 relative">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Quotation Management</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <span>Admin</span>
            <span>/</span>
            <span className="text-foreground font-medium">Quotes, Approvals & Project Conversion</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button onClick={handleAddNew} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>Create New Quotation</span>
          </button>
        </div>
      </div>

      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Quotations</span>
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500"><FileText className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">{totalQuotationsCount}</div>
            <p className="text-xs text-blue-600 font-medium mt-1">Active pipeline</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Approved Quotes</span>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500"><CheckCircle2 className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">{approvedCount}</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">Ready for conversion</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Converted Projects</span>
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500"><TrendingUp className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">{convertedCount}</div>
            <p className="text-xs text-purple-600 font-medium mt-1">Successfully deployed</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quote Templates</span>
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500"><Layers className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">5</div>
            <p className="text-xs text-indigo-600 font-medium mt-1">Reusable layouts</p>
          </div>
        </motion.div>
      </div>

      {/* Search & Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/60 backdrop-blur-md p-4 rounded-2xl border border-border/60 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search quotation number, client name..."
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
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Approved">Approved</option>
            <option value="Converted">Converted</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>

          <button onClick={fetchQuotations} className="p-2 rounded-xl border border-border bg-background hover:bg-muted/50 cursor-pointer" title="Refresh Quotations">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Quotations Table */}
      {loading ? (
        <div className="p-12 text-center text-muted-foreground">Loading live quotation records...</div>
      ) : error ? (
        <div className="p-12 text-center text-rose-500 font-semibold">{error}</div>
      ) : filteredQuotations.length === 0 ? (
        <div className="p-16 text-center space-y-4 rounded-2xl border border-border/60 bg-card">
          <div className="p-4 rounded-full bg-muted w-16 h-16 mx-auto flex items-center justify-center text-muted-foreground">
            <FileText className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No Live Quotations Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">When clients submit requests or proposals from the estimator, they will appear here live.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
          <div className="p-4 font-bold text-foreground border-b border-border flex items-center justify-between">
            <span>Quotations Directory ({filteredQuotations.length})</span>
            <span className="text-xs font-normal text-muted-foreground">Live Database Records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="p-4 font-semibold">Quote Number & Client</th>
                  <th className="p-4 font-semibold">Services & Modules Included</th>
                  <th className="p-4 font-semibold">Final Amount</th>
                  <th className="p-4 font-semibold">Valid Until</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-sm">
                {filteredQuotations.map((quo) => (
                  <tr key={quo.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-bold text-foreground flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-foreground font-bold">{quo.quotationNumber}</div>
                        <div className="text-xs text-muted-foreground font-normal">{quo.clientName} ({quo.companyName})</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-foreground">{quo.servicesIncluded}</div>
                      <span className="text-xs text-muted-foreground">Click view to see full breakdown</span>
                    </td>
                    <td className="p-4 text-emerald-600 font-bold">{quo.finalAmount}</td>
                    <td className="p-4 text-muted-foreground">{quo.validUntil}</td>
                    <td className="p-4">
                      <button onClick={() => handleUpdateStatus(quo.id, quo.status)} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 cursor-pointer" title="Click to update status">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        {quo.status} ✏️
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => setViewingQuote(quo)} className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer" title="View Full Details & Modules">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button onClick={() => alert(`Downloading PDF for ${quo.quotationNumber}`)} className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer" title="Download PDF">
                        <Download className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleUpdateStatus(quo.id, quo.status)} className="p-1.5 rounded-lg border border-border hover:bg-blue-500/10 text-muted-foreground hover:text-blue-500 cursor-pointer" title="Edit Status">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(quo.id, quo.quotationNumber)} className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 cursor-pointer" title="Delete Quotation">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Details Modal (મોડ્યુલ્સ અને ડિટેલ્સ જોવા માટે) */}
      <AnimatePresence>
        {viewingQuote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border/80 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-border bg-muted/40">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Quotation Details</h3>
                    <p className="text-xs text-muted-foreground">{viewingQuote.quotationNumber}</p>
                  </div>
                </div>
                <button onClick={() => setViewingQuote(null)} className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/50">
                    <span className="text-xs text-muted-foreground block">Client Name</span>
                    <span className="font-bold text-foreground">{viewingQuote.clientName}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/50">
                    <span className="text-xs text-muted-foreground block">Company</span>
                    <span className="font-bold text-foreground">{viewingQuote.companyName}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Scope / Included Features & Modules</span>
                  <div className="text-base font-bold text-foreground flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>{viewingQuote.servicesIncluded}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">This package includes all standard structural requirements, responsive UI design, and database integration as requested.</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/50">
                    <span className="text-xs text-muted-foreground block">Final Amount</span>
                    <span className="font-bold text-emerald-600">{viewingQuote.finalAmount}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/50">
                    <span className="text-xs text-muted-foreground block">Timeline</span>
                    <span className="font-bold text-foreground">{viewingQuote.timeline}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/50">
                    <span className="text-xs text-muted-foreground block">Status</span>
                    <span className="font-bold text-blue-500">{viewingQuote.status}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-3">
                <button onClick={() => setViewingQuote(null)} className="px-4 py-2 rounded-xl border border-border bg-background text-sm font-semibold hover:bg-muted cursor-pointer">
                  Close
                </button>
                <button onClick={() => { alert(`Downloading PDF for ${viewingQuote.quotationNumber}`); setViewingQuote(null); }} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 cursor-pointer">
                  Download PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}