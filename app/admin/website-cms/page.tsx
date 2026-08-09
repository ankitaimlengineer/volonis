"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Newspaper,
  Briefcase,
  Star,
  HelpCircle,
  Mail,
  Search as SearchIcon,
  Image as ImageIcon,
  RefreshCw,
  Plus,
  Eye,
  Trash2,
  Download,
  CheckCircle2,
  Globe
} from "lucide-react"

interface CMSPageItem {
  id: string
  title: string
  slug: string
  author: string
  status: "Draft" | "Published" | "Scheduled" | "Archived"
  seoScore: number
  lastUpdated: string
}

export default function WebsiteCMSPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [pagesList, setPagesList] = useState<CMSPageItem[]>([])

  const fetchCMSContent = async () => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const mockPages: CMSPageItem[] = [
        {
          id: "PAGE-01",
          title: "Home - Krushi Info & Agriculture Portal",
          slug: "/",
          author: "Ankit Thummar",
          status: "Published",
          seoScore: 94,
          lastUpdated: "2026-08-04"
        },
        {
          id: "PAGE-02",
          title: "JN Soni Jewellers - Exclusive E-Commerce Store",
          slug: "/jewellery",
          author: "Maulik Vavaliya",
          status: "Published",
          seoScore: 91,
          lastUpdated: "2026-08-03"
        },
        {
          id: "PAGE-03",
          title: "About Us & Academic Project Overview",
          slug: "/about",
          author: "Shailesh Makwana",
          status: "Draft",
          seoScore: 78,
          lastUpdated: "2026-08-02"
        }
      ]

      setPagesList(mockPages)
    } catch (err: any) {
      setError(err.message || "Failed to load website CMS content.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCMSContent()
  }, [])

  const filteredPages = useMemo(() => {
    return pagesList.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase())

      const matchStatus = statusFilter === "All" || item.status === statusFilter

      return matchSearch && matchStatus
    })
  }, [pagesList, searchTerm, statusFilter])

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Website CMS</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <span>Admin</span>
            <span>/</span>
            <span className="text-foreground font-medium">Pages, Blogs, Portfolio, SEO & Media Library</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => alert("Create New Content modal opened")} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>Create New Content</span>
          </button>
        </div>
      </div>

      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-6">
        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pages</span>
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500"><FileText className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">16</div>
            <p className="text-xs text-blue-600 font-medium mt-1">14 published</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Blogs</span>
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500"><Newspaper className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">32</div>
            <p className="text-xs text-purple-600 font-medium mt-1">4 categories</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Portfolio</span>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500"><Briefcase className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">24</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">Projects listed</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reviews</span>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500"><Star className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">48</div>
            <p className="text-xs text-amber-600 font-medium mt-1">Testimonials</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">FAQs</span>
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500"><HelpCircle className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">18</div>
            <p className="text-xs text-indigo-600 font-medium mt-1">Active items</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Enquiries</span>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500"><Mail className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">142</div>
            <p className="text-xs text-cyan-600 font-medium mt-1">Form submissions</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">SEO Score</span>
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500"><SearchIcon className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">92%</div>
            <p className="text-xs text-teal-600 font-medium mt-1">Optimized</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Media</span>
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500"><ImageIcon className="h-5 w-5" /></div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">3.2GB</div>
            <p className="text-xs text-rose-600 font-medium mt-1">Storage used</p>
          </div>
        </motion.div>
      </div>

      {/* Search & Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/60 backdrop-blur-md p-4 rounded-2xl border border-border/60 shadow-sm">
        <div className="relative w-full md:w-96">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search page title, slug, author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 text-sm rounded-xl border border-border bg-background cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Archived">Archived</option>
          </select>

          <button onClick={fetchCMSContent} className="p-2 rounded-xl border border-border bg-background hover:bg-muted/50 cursor-pointer" title="Refresh CMS">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* CMS Pages Table */}
      {loading ? (
        <div className="p-12 text-center text-muted-foreground">Loading CMS content records...</div>
      ) : error ? (
        <div className="p-12 text-center text-rose-500 font-semibold">{error}</div>
      ) : filteredPages.length === 0 ? (
        <div className="p-16 text-center space-y-4 rounded-2xl border border-border/60 bg-card">
          <div className="p-4 rounded-full bg-muted w-16 h-16 mx-auto flex items-center justify-center text-muted-foreground">
            <Globe className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No Website Content Available</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">Get started by creating your first piece of website content.</p>
          <button onClick={() => alert("Create First Content modal opened")} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-xl cursor-pointer">
            Create First Content
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
          <div className="p-4 font-bold text-foreground border-b border-border flex items-center justify-between">
            <span>Website Pages & CMS Records ({filteredPages.length})</span>
            <span className="text-xs font-normal text-muted-foreground">Dynamic URL Routing & SEO</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="p-4 font-semibold">Page Title & Slug</th>
                  <th className="p-4 font-semibold">Author</th>
                  <th className="p-4 font-semibold">SEO Score</th>
                  <th className="p-4 font-semibold">Last Updated</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-sm">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-bold text-foreground flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-foreground font-bold">{page.title}</div>
                        <div className="text-xs text-muted-foreground font-mono">{page.slug}</div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground font-medium">{page.author}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-600 font-mono text-xs font-bold">
                        {page.seoScore}%
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{page.lastUpdated}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${page.status === "Published" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>
                        <CheckCircle2 className="h-3 w-3" />
                        {page.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => alert(`Previewing page ${page.title}`)} className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer" title="Preview Page">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button onClick={() => alert(`Exporting page ${page.id}`)} className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer" title="Download Record">
                        <Download className="h-4 w-4" />
                      </button>
                      <button onClick={() => alert(`Deleting page ${page.id}`)} className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 cursor-pointer" title="Delete Page">
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