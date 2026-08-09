'use client'

import { useState, useEffect } from 'react'
import { FolderGit2, Plus, Trash2, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NewProjectPage() {
  const router = useRouter()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')

  // પ્રોજેક્ટ્સ ફેચ કરવા માટે
  const fetchProjects = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/projects')
      const result = await res.json()
      if (result.success) {
        setProjects(result.data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  // નવો પ્રોજેક્ટ કે સર્વિસ ઉમેરવા માટે
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, amount, status: 'Active' })
      })
      const result = await res.json()
      if (result.success) {
        setTitle('')
        setCategory('')
        setAmount('')
        fetchProjects()
      } else {
        alert(result.message || 'પ્રોજેક્ટ સેવ કરવામાં ભૂલ થઈ છે.')
      }
    } catch (error) {
      console.error('Error adding project:', error)
    }
  }

  // પ્રોજેક્ટ ડિલીટ કરવા માટે
  const handleDelete = async (id: string) => {
    if (!confirm('શું તમે ખરેખર આ પ્રોજેક્ટ/સર્વિસ ડિલીટ કરવા માંગો છો?')) return

    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' })
      const result = await res.json()
      if (result.success) {
        fetchProjects()
      } else {
        alert(result.message || 'ડિલીટ કરવામાં ભૂલ થઈ છે.')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between bg-card p-6 rounded-3xl border border-border shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()} 
            className="p-2 rounded-xl bg-secondary/80 hover:bg-secondary text-secondary-foreground transition cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Projects Management</h1>
            <p className="text-xs text-muted-foreground mt-0.5">એડમિન પેનલમાંથી નવા પ્રોજેક્ટ્સ અથવા સર્વિસીઝ ઉમેરો અને મેનેજ કરો</p>
          </div>
        </div>
      </div>

      {/* નવો પ્રોજેક્ટ ઉમેરવાનું ફોર્મ */}
      <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2">
          <FolderGit2 className="h-5 w-5 text-primary" /> Add New Project / Service
        </h3>
        
        <form onSubmit={handleAddProject} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Service / Project Name..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="text"
            placeholder="Category (e.g. Web, AI, App)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="number"
            placeholder="Price / Budget (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-1.5 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-xs font-semibold hover:opacity-90 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add Project
          </button>
        </form>
      </div>

      {/* પ્રોજેક્ટ્સની યાદી દર્શાવતું ટેબલ */}
      <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
        <h3 className="text-base font-bold">Existing Projects & Services List</h3>

        {loading ? (
          <p className="text-sm text-muted-foreground text-center py-6">Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-border rounded-2xl">
            <p className="text-sm text-muted-foreground font-medium">હજી સુધી કોઈ પ્રોજેક્ટ કે સર્વિસ ઉમેરવામાં નથી આવી.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Budget</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {projects.map((item: any) => (
                  <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-bold">{item.title}</td>
                    <td className="p-4 text-muted-foreground">{item.category || 'General'}</td>
                    <td className="p-4 font-semibold text-emerald-600">₹{item.amount || '0'}</td>
                    <td className="p-4">
                      <span className="bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-lg text-xs font-semibold">
                        {item.status || 'Active'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/25 transition cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  )
}