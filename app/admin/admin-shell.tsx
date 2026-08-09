"use client"

import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"

interface AdminShellProps {
  children: React.ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  // સાઈડબાર લિંક્સ રેન્ડર કરતી વખતે અથવા આ ડાયરેક્ટ કોડમાં Analytics ઉમેરી શકાય છે
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* સાઈડબાર */}
      <Sidebar />

      {/* મુખ્ય કન્ટેન્ટ એરિયા */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
          {children}
        </main>
      </div>
    </div>
  )
}