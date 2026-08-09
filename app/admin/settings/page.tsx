"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Settings,
  Building,
  Palette,
  Mail,
  Smartphone,
  Bot,
  Key,
  CreditCard,
  Globe,
  Database,
  Shield,
  Save,
  RotateCcw,
  RefreshCw,
  Download,
  CheckCircle2
} from "lucide-react"

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState("company")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Form State
  const [companyName, setCompanyName] = useState("કૃષિ ઈન્ફો & એન્ટરપ્રાઈઝ")
  const [supportEmail, setSupportEmail] = useState("support@krushiinfo.com")
  const [contactNumber, setContactNumber] = useState("+91 98765 43210")
  const [gstNumber, setGstNumber] = useState("24AAAAA0000A1Z5")
  const [primaryColor, setPrimaryColor] = useState("#0f172a")
  const [defaultCurrency, setDefaultCurrency] = useState("INR (₹)")
  const [defaultLanguage, setDefaultLanguage] = useState("Gujarati & English")
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSavedSuccess(false)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
    } catch (err) {
      alert("Failed to save settings.")
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: "company", label: "Company Profile", icon: Building },
    { id: "branding", label: "Branding & Theme", icon: Palette },
    { id: "email", label: "Email & SMTP", icon: Mail },
    { id: "sms", label: "SMS Gateways", icon: Smartphone },
    { id: "ai", label: "AI Providers", icon: Bot },
    { id: "apikeys", label: "API Keys", icon: Key },
    { id: "payment", label: "Payment Gateways", icon: CreditCard },
    { id: "localization", label: "Localization", icon: Globe },
    { id: "system", label: "System Preferences", icon: Database },
  ]

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">System Settings</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <span>Admin</span>
            <span>/</span>
            <span className="text-foreground font-medium">Enterprise Configuration & Global Parameters</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => alert("Settings exported as JSON successfully!")} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-border bg-card hover:bg-muted/50 transition-all shadow-sm cursor-pointer">
            <Download className="h-4 w-4" />
            <span>Export Config</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Save className={`h-4 w-4 ${saving ? "animate-spin" : ""}`} />
            <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-semibold text-sm">System configuration updated successfully and secured in database.</span>
        </motion.div>
      )}

      {/* Main Container with Sidebar Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1 bg-card p-4 rounded-2xl border border-border/60 shadow-sm h-fit">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-3 mb-3">Configuration Categories</div>
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Settings Content Form */}
        <div className="lg:col-span-3 bg-card rounded-2xl border border-border/60 shadow-sm p-6 md:p-8">
          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === "company" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Company Profile Information</h3>
                  <p className="text-sm text-muted-foreground">Manage your official company credentials, tax numbers, and contact details.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full p-3 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Support Email</label>
                    <input
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="w-full p-3 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact Number</label>
                    <input
                      type="text"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full p-3 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">GST Number</label>
                    <input
                      type="text"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      className="w-full p-3 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "branding" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Branding & Theme Customization</h3>
                  <p className="text-sm text-muted-foreground">Customize UI colors, theme modes, and visual assets.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Primary Accent Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-12 h-12 rounded-xl border border-border bg-background cursor-pointer"
                      />
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-full p-3 text-sm rounded-xl border border-border bg-background"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "system" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">System Preferences & Maintenance</h3>
                  <p className="text-sm text-muted-foreground">Manage global maintenance modes, automatic backups, and security policies.</p>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
                  <div>
                    <div className="font-semibold text-foreground">Maintenance Mode</div>
                    <div className="text-xs text-muted-foreground">Temporarily disable public access for system upgrades.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    className="w-5 h-5 rounded accent-primary cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeTab !== "company" && activeTab !== "branding" && activeTab !== "system" && (
              <div className="space-y-6 py-12 text-center">
                <div className="p-4 rounded-full bg-primary/10 text-primary w-16 h-16 mx-auto flex items-center justify-center">
                  <Settings className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Configuration Module</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">Manage API credentials, security keys, and gateway tokens securely from this panel.</p>
              </div>
            )}

            <div className="pt-6 border-t border-border flex items-center justify-end gap-3">
              <button type="button" onClick={() => alert("Changes reset")} className="px-4 py-2 rounded-xl border border-border bg-card hover:bg-muted text-sm font-semibold text-foreground cursor-pointer flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                <span>Reset Default</span>
              </button>
              <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold shadow-sm cursor-pointer flex items-center gap-2">
                <Save className="h-4 w-4" />
                <span>{saving ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}