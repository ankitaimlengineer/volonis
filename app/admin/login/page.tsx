"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // અહીં તમે તમારો યુઝરનેમ અને પાસવર્ડ સેટ કરી શકો છો
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true")
      router.push("/admin")
    } else {
      setError("ખોટો યુઝરનેમ અથવા પાસવર્ડ!")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">એડમિન લોગિન (Admin Login)</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">યુઝરનેમ (Username)</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">પાસવર્ડ (Password)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              લોગ ઇન કરો
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}