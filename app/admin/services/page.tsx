"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Package,
  Layers,
  DollarSign,
  Star,
  Search,
  RefreshCw,
  Download,
  Plus,
  Eye,
  Trash2,
  Edit,
  CheckCircle2,
  Copy
} from "lucide-react"

interface ServiceItem {
  id: string
  name: string
  category: string
  shortDescription: string
  pricingType: "Fixed Price" | "Hourly" | "Monthly" | "Custom Quote"
  basePrice: string
  packageCount: number
  status: "Active" | "Draft" | "Hidden"
  featured: boolean
  lastUpdated: string
}

export default function ServicesManagementPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [services, setServices] = useState<ServiceItem[]>([])

  const fetchServices = async () => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const mockServices: ServiceItem[] = [
        {
          id: "SRV-001",
          name: "AI Enterprise Bot Development",
          category: "AI Development",
          shortDescription: "Custom LLM agents and automated customer support bots.",
          pricingType: "Custom Quote",
          basePrice: "₹75,000",
          packageCount: 3,
          status: "Active",
          featured: true,
          lastUpdated: "2026-08-04"
        },
        {
          id: "SRV-002",
          name: "Agriculture ERP Portal (કૃષિ ઈન્ફો)",
          category: "Web Development",
          shortDescription: "Complete farmer market price and inventory management portal.",
          pricingType: "Fixed Price",
          basePrice: "₹45,000",
          packageCount: 2,
          status: "Active",
          featured: true,
          lastUpdated: "2026-08-03"
        },
        {
          id: "SRV-003",
          name: "Jewelry E-Commerce Web App",
          category: "Web Development",
          shortDescription: "Online ornaments store with secure payment and inventory.",
          pricingType: "Fixed Price",
          basePrice: "₹60,000",
          packageCount: 3,
          status: "Active",
          featured: false,
          lastUpdated: "2026-08-01"
        },
        {
          id: "SRV-004",
          name: "UI/UX Enterprise Design System",
          category: "UI/UX Design",
          shortDescription: "Figma design system, user journeys, and dashboard layouts.",
          pricingType: "Hourly",
          basePrice: "₹2,500 / hr",
          packageCount: 2,
          status: "Active",
          featured: true,
          lastUpdated: "2026-07-28"
        }
      ]

      setServices(mockServices)
    } catch (err: any) {
      setError(err.message || "Failed to load services management records.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      const matchSearch =
        srv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())

      const matchCategory = selectedCategory === "All" || srv.category === selectedCategory

      return matchSearch && matchCategory
    })
  }, [services, searchTerm, selectedCategory])

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Services Management</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <span>Admin</span>
            <span>/</span>
            <span className="text-foreground font-medium">Catalog, Packages, Pricing & Features</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => alert("Create First Service modal opened")} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Services</span>
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500"><Package className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">16</div>
            <p className="text-xs text-blue-600 font-medium mt-1">14 Active, 2 Draft</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</span>
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500"><Layers className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">8</div>
            <p className="text-xs text-purple-600 font-medium mt-1">AI, Web, UI/UX & Cloud</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Avg Service Price</span>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500"><DollarSign className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">₹52,500</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">Flexible packages</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Packages</span>
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500"><Package className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">42</div>
            <p className="text-xs text-indigo-600 font-medium mt-1">Multi-tier setup</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Featured Services</span>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500"><Star className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">5</div>
            <p className="text-xs text-amber-600 font-medium mt-1">Pinned on homepage</p>
          </div>
        </motion.div>
      </div>

      {/* Search & Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/60 backdrop-blur-md p-4 rounded-2xl border border-border/60 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search service name, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 text-sm rounded-xl border border-border bg-background cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="AI Development">AI Development</option>
            <option value="Web Development">Web Development</option>
            <option value="UI/UX Design">UI/UX Design</option>
          </select>

          <button onClick={fetchServices} className="p-2 rounded-xl border border-border bg-background hover:bg-muted/50 cursor-pointer" title="Refresh Services">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Services Table */}
      {loading ? (
        <div className="p-12 text-center text-muted-foreground">Loading services catalog...</div>
      ) : error ? (
        <div className="p-12 text-center text-rose-500 font-semibold">{error}</div>
      ) : filteredServices.length === 0 ? (
        <div className="p-16 text-center space-y-4 rounded-2xl border border-border/60 bg-card">
          <div className="p-4 rounded-full bg-muted w-16 h-16 mx-auto flex items-center justify-center text-muted-foreground">
            <Package className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No Services Available</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">Get started by creating your first service offering in the catalog.</p>
          <button onClick={() => alert("Create First Service modal opened")} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-xl cursor-pointer">
            Create First Service
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
          <div className="p-4 font-bold text-foreground border-b border-border flex items-center justify-between">
            <span>Services Catalog ({filteredServices.length})</span>
            <span className="text-xs font-normal text-muted-foreground">Enterprise Service Management</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="p-4 font-semibold">Service Name</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Pricing Type</th>
                  <th className="p-4 font-semibold">Base Price</th>
                  <th className="p-4 font-semibold">Packages</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-sm">
                {filteredServices.map((srv) => (
                  <tr key={srv.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-bold text-foreground flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                        <Package className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{srv.name}</span>
                          {srv.featured && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-600">Featured</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground font-normal">{srv.shortDescription}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600">{srv.category}</span>
                    </td>
                    <td className="p-4 text-muted-foreground font-medium">{srv.pricingType}</td>
                    <td className="p-4 text-emerald-600 font-bold">{srv.basePrice}</td>
                    <td className="p-4 text-muted-foreground">{srv.packageCount} Tiers</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        {srv.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => alert(`Viewing service ${srv.name}`)} className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer" title="View Service">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button onClick={() => alert(`Duplicating service ${srv.name}`)} className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer" title="Duplicate Service">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button onClick={() => alert(`Editing service ${srv.name}`)} className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer" title="Edit Service">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => alert(`Deleting service ${srv.name}`)} className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 cursor-pointer" title="Delete Service">
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
    </div>
  )
}