"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FolderKanban, TrendingUp, Globe, Settings, Package, Receipt, Mail, DollarSign } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { title: "ડેશબોર્ડ (Dashboard)", href: "/admin", icon: LayoutDashboard },
    { title: "લીડ્સ અને સેલ્સ (Leads & Sales)", href: "/admin/leads-sales", icon: TrendingUp },
    { title: "પ્રોજેક્ટ્સ (Projects)", href: "/admin/projects", icon: FolderKanban },
    { title: "સર્વિસીઝ (Services)", href: "/admin/services", icon: Package },
    { title: "બિલિંગ (Billing)", href: "/admin/billing", icon: Receipt },
    { title: "વેબસાઇટ CMS (Website CMS)", href: "/admin/website-cms", icon: Globe },
    { title: "સેટિંગ્સ (Settings)", href: "/admin/settings", icon: Settings },
  ]

  return (
    <aside className="w-64 border-r bg-card flex flex-col h-screen p-4 overflow-y-auto">
      <div className="text-xl font-bold mb-8 px-2">એડમિન પેનલ</div>
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}