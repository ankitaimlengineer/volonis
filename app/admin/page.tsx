'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminShell } from "./admin-shell"
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts'
import { 
  Users, FolderGit2, CheckCircle2, Clock, DollarSign, CreditCard, 
  FileText, Bot, Globe, UserCheck, Ticket, Calendar, Plus, RefreshCw, 
  ArrowUpRight, Download, Search, TrendingUp
} from 'lucide-react'

export default function AdminPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  
  // Visitors States (Daily, Monthly, Yearly)
  const [dailyVisitors, setDailyVisitors] = useState(0)
  const [monthlyVisitors, setMonthlyVisitors] = useState(0)
  const [yearlyVisitors, setYearlyVisitors] = useState(0)

  const router = useRouter()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // -------------------------------------------------------------
  // VISITORS COUNTING LOGIC (Unique per day, resets daily/monthly/yearly)
  // -------------------------------------------------------------
  useEffect(() => {
    const now = new Date()
    const todayStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
    const currentYearStr = `${now.getFullYear()}`; // YYYY

    // Check if this browser session has already been counted today
    const lastVisitDate = localStorage.getItem('visitor_last_date')
    const hasVisitedToday = localStorage.getItem('visitor_counted_today')

    // Get stored counts or initialize
    let dCount = Number(localStorage.getItem(`visitors_daily_${todayStr}`) || '0')
    let mCount = Number(localStorage.getItem(`visitors_monthly_${currentMonthStr}`) || '0')
    let yCount = Number(localStorage.getItem(`visitors_yearly_${currentYearStr}`) || '0')

    // If it's a new day, reset daily visitor tracking for this browser session
    if (lastVisitDate !== todayStr) {
      localStorage.setItem('visitor_last_date', todayStr)
      localStorage.removeItem('visitor_counted_today')
    }

    // If not counted yet in this session/day, increment counts
    if (!localStorage.getItem('visitor_counted_today')) {
      dCount += 1
      mCount += 1
      yCount += 1

      localStorage.setItem(`visitors_daily_${todayStr}`, dCount.toString())
      localStorage.setItem(`visitors_monthly_${currentMonthStr}`, mCount.toString())
      localStorage.setItem(`visitors_yearly_${currentYearStr}`, yCount.toString())
      localStorage.setItem('visitor_counted_today', 'true')
    }

    setDailyVisitors(dCount)
    setMonthlyVisitors(mCount)
    setYearlyVisitors(yCount)
  }, [])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api')
      const result = await res.json()
      if (result.success) {
        setData(result.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn")
    if (isLoggedIn !== "true") {
      router.push("/admin/login")
      return
    }
    fetchSubmissions()
  }, [router])

  const exportToCSV = () => {
    if (data.length === 0) {
      alert('એક્સપોર્ટ કરવા માટે કોઈ ડેટા ઉપલબ્ધ નથી!')
      return
    }

    const headers = ['Name,Email,Project/Message,Amount,Date,Status']
    const rows = data.map((item: any) => 
      `"${item.customerName}","${item.email}","${item.productName || ''}","${item.amount || '0'}","${new Date(item.createdAt).toLocaleString()}","${item.status || 'Active'}"`
    )

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'ceo_dashboard_report.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const totalSubmissions = data.length
  const totalRevenue = data.reduce((sum, item: any) => sum + Number(item.amount || 0), 0)
  const completedProjects = data.filter((item: any) => item.status === 'Completed' || item.status === 'completed').length
  const pendingProjects = data.filter((item: any) => item.status === 'Pending' || item.status === 'pending' || !item.status).length

  const chartData = [
    { name: 'Jan', revenue: totalRevenue > 0 ? totalRevenue : 0 },
    { name: 'Feb', revenue: totalRevenue > 0 ? totalRevenue : 0 },
    { name: 'Mar', revenue: totalRevenue > 0 ? totalRevenue : 0 },
    { name: 'Apr', revenue: totalRevenue > 0 ? totalRevenue : 0 },
    { name: 'May', revenue: totalRevenue > 0 ? totalRevenue : 0 },
    { name: 'Jun', revenue: totalRevenue },
  ]

  return (
    <AdminShell>
      <div className="mx-auto max-w-7xl space-y-6 pb-12">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-card p-6 rounded-3xl border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
              <span>Admin</span> / <span className="text-foreground">CEO Dashboard</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, CEO 👋</h1>
            <p className="text-sm text-muted-foreground mt-1">Here is the real-time overview of your AI & IT enterprise operations.</p>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap w-full lg:w-auto justify-start lg:justify-end">
            <div className="text-xs bg-muted/60 px-3 py-2 rounded-xl font-medium text-muted-foreground border border-border">
              📅 {currentTime || 'Loading time...'}
            </div>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 rounded-xl bg-green-600/10 px-4 py-2 text-xs font-semibold text-green-600 hover:bg-green-600/20 transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" /> Export Report
            </button>

            <button
              onClick={fetchSubmissions}
              className="flex items-center gap-1.5 rounded-xl bg-primary/10 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/25 transition-colors cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>
        </div>

        {/* QUICK ACTIONS BAR */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap mr-1">Quick Actions:</span>
          <button onClick={() => alert('Add Client Modal')} className="flex items-center gap-1 bg-secondary/80 hover:bg-secondary text-secondary-foreground px-3 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Add Client
          </button>
          <button onClick={() => alert('Create Project Modal')} className="flex items-center gap-1 bg-secondary/80 hover:bg-secondary text-secondary-foreground px-3 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Create Project
          </button>
          <button onClick={() => alert('Generate Invoice Modal')} className="flex items-center gap-1 bg-secondary/80 hover:bg-secondary text-secondary-foreground px-3 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Generate Invoice
          </button>
          <button onClick={() => alert('Create Quotation')} className="flex items-center gap-1 bg-secondary/80 hover:bg-secondary text-secondary-foreground px-3 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Create Quotation
          </button>
          <button onClick={() => alert('Schedule Meeting')} className="flex items-center gap-1 bg-secondary/80 hover:bg-secondary text-secondary-foreground px-3 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Schedule Meeting
          </button>
          <button onClick={() => alert('Add Team Member')} className="flex items-center gap-1 bg-secondary/80 hover:bg-secondary text-secondary-foreground px-3 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Add Team Member
          </button>
        </div>

        {/* STATISTICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {/* 📈 TOTAL VISITORS CARD */}
          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between group lg:col-span-1">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-xl bg-violet-500/10 text-violet-500"><TrendingUp className="h-5 w-5" /></span>
                <span className="text-xs font-semibold text-violet-500 bg-violet-500/10 px-2 py-0.5 rounded-lg">Visitors</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium mb-3">🌐 Website Visitors Analytics</p>
              
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/60 text-center">
                <div className="bg-muted/40 p-2 rounded-xl">
                  <span className="text-[10px] text-muted-foreground block font-medium">Daily</span>
                  <span className="text-lg font-bold text-violet-600">{dailyVisitors}</span>
                </div>
                <div className="bg-muted/40 p-2 rounded-xl">
                  <span className="text-[10px] text-muted-foreground block font-medium">Monthly</span>
                  <span className="text-lg font-bold text-blue-600">{monthlyVisitors}</span>
                </div>
                <div className="bg-muted/40 p-2 rounded-xl">
                  <span className="text-[10px] text-muted-foreground block font-medium">Yearly</span>
                  <span className="text-lg font-bold text-emerald-600">{yearlyVisitors}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-primary/10 text-primary"><Users className="h-5 w-5" /></span>
                <span className="text-xs font-semibold text-emerald-500 flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-lg">Live <ArrowUpRight className="h-3 w-3" /></span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">👥 Total Clients</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight">{totalSubmissions}</h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-blue-500/10 text-blue-500"><FolderGit2 className="h-5 w-5" /></span>
                <span className="text-xs font-semibold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-lg">Active</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">📂 Active Projects</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight">{totalSubmissions}</h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-green-500/10 text-green-500"><CheckCircle2 className="h-5 w-5" /></span>
                <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-lg">Done</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">✅ Completed Projects</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight">{completedProjects}</h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500"><Clock className="h-5 w-5" /></span>
                <span className="text-xs font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-lg">Queue</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">⏳ Pending Projects</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight">{pendingProjects}</h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500"><DollarSign className="h-5 w-5" /></span>
                <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg">Earned</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">💰 Total Revenue</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight text-emerald-600">₹{totalRevenue}</h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-red-500/10 text-red-500"><CreditCard className="h-5 w-5" /></span>
                <span className="text-xs font-semibold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-lg">Due</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">💵 Pending Payments</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight text-red-500">₹0</h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500"><FileText className="h-5 w-5" /></span>
                <span className="text-xs font-semibold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-lg">Total</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">📑 Total Quotations</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight">{totalSubmissions}</h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-purple-500/10 text-purple-500"><Bot className="h-5 w-5" /></span>
                <span className="text-xs font-semibold text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded-lg">Active AI</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">🤖 AI Bots Deployed</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight">1</h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500"><Globe className="h-5 w-5" /></span>
                <span className="text-xs font-semibold text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-lg">Hosted</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">🌐 Total Websites Hosted</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight">{totalSubmissions}</h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-teal-500/10 text-teal-500"><UserCheck className="h-5 w-5" /></span>
                <span className="text-xs font-semibold text-teal-500 bg-teal-500/10 px-2 py-0.5 rounded-lg">Online</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">👨‍💻 Team Members</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight">1</h3>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-rose-500/10 text-rose-500"><Ticket className="h-5 w-5" /></span>
                <span className="text-xs font-semibold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-lg">Tickets</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">🎫 Open Support Tickets</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight">0</h3>
            </div>
          </div>

        </div>

        {/* ANALYTICS & CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-3xl border border-border bg-card shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold">Revenue & Growth Analytics</h3>
                <p className="text-xs text-muted-foreground">Live revenue tracking based on database inputs</p>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={11} />
                  <YAxis stroke="#888888" fontSize={11} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold mb-1">Performance & Metrics</h3>
              <p className="text-xs text-muted-foreground mb-4">Key enterprise KPIs</p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Database Records</span>
                    <span className="text-emerald-500 font-bold">{totalSubmissions}</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(totalSubmissions * 10, 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>Live System Status</span>
              <span className="flex items-center gap-1.5 text-emerald-500 font-semibold"><span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> Connected to DB</span>
            </div>
          </div>
        </div>

      </div>
    </AdminShell>
  )
}