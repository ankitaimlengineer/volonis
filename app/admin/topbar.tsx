"use client"

import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Topbar() {
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6">
      {/* ખાલી જગ્યા અથવા પ્રોજેક્ટનું નામ અહીં મૂકી શકાય */}
      <div></div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}