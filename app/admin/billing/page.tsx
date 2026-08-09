'use client'

import { useEffect, useState } from 'react'
import { AdminShell } from "../admin-shell"
import { Search, Trash2, Edit2, X, Check } from 'lucide-react'

export default function BillingPage() {
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  
  // Edit Name Modal States
  const [editingItem, setEditingItem] = useState<any>(null)
  const [newName, setNewName] = useState('')

  const fetchBillingData = () => {
    fetch('/api?type=billing')
      .then(res => res.json())
      .then(res => {
        if (res.success) setData(res.data || res.billing || [])
      })
      .catch(err => console.error('Billing fetch error:', err))
  }

  useEffect(() => {
    fetchBillingData()
  }, [])

  // Delete Record Function
  const handleDelete = async (id: string) => {
    if (!confirm('શું તમે ખરેખર આ બિલિંગ રેકોર્ડ ડિલીટ કરવા માંગો છો?')) return;

    try {
      const res = await fetch(`/api?type=billing&id=${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.success) {
        // લિસ્ટમાંથી હટાવી લો
        setData(data.filter((item: any) => item.id !== id));
      } else {
        alert('ડિલીટ કરવામાં ભૂલ થઈ છે.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('સર્વર એરર આવી છે.');
    }
  }

  // Update Name Function
  const handleUpdateName = async () => {
    if (!editingItem) return;

    try {
      const res = await fetch(`/api?type=billing`, {
        method: 'PUT', // અથવા તમારા બેકએન્ડ મુજબ PATCH/POST જે ચાલતું હોય
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingItem.id, customerName: newName }),
      });
      const result = await res.json();
      
      if (result.success || res.ok) {
        setEditingItem(null);
        fetchBillingData(); // ડેટા ફરીથી ફેચ કરી લો
      } else {
        alert('નામ અપડેટ કરવામાં નિષ્ફળ.');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('સર્વર એરર આવી છે.');
    }
  }

  // સર્ચ બાર માટે ફિલ્ટર લોજિક
  const filteredData = data.filter((item: any) => {
    const customerName = item.customerName || item.name || ''
    const email = item.email || ''
    const query = searchQuery.toLowerCase()
    return customerName.toLowerCase().includes(query) || email.toLowerCase().includes(query)
  })

  return (
    <AdminShell>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">📊 Billing & Payment Overview</h1>
        
        {/* Search Bar */}
        <div className="mb-6 relative max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="નામ અથવા ઈમેઈલ દ્વારા શોધો (Search)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm shadow-sm"
          />
        </div>

        {/* Billing Table */}
        <div className="overflow-x-auto bg-card border rounded-2xl shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="p-4 font-semibold text-foreground">Customer Name & Email</th>
                <th className="p-4 font-semibold text-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((item: any) => {
                  const customerName = item.customerName || item.name || 'No Name Provided'

                  return (
                    <tr key={item.id} className="border-b hover:bg-muted/30 transition">
                      <td className="p-4">
                        <div className="flex items-center justify-between">
                          <a 
                            href={`/admin/billing/detail?email=${encodeURIComponent(item.email)}`} 
                            className="flex flex-col group py-1"
                          >
                            <span className="font-semibold text-indigo-400 group-hover:underline text-base flex items-center gap-2">
                              {customerName}
                            </span>
                            <span className="text-xs text-muted-foreground mt-0.5">{item.email}</span>
                          </a>
                        </div>
                      </td>

                      {/* Action Buttons (Edit Name & Delete) */}
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setNewName(item.customerName || item.name || '');
                          }}
                          className="p-2 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 rounded-lg transition"
                          title="Edit Name"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg transition"
                          title="Delete Record"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={2} className="p-6 text-center text-muted-foreground">
                    કોઈ બિલિંગ ડેટા મળ્યો નથી.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Name Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border p-6 rounded-2xl w-full max-w-md shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-border pb-3">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Edit2 size={18} className="text-indigo-400" /> Update Customer Name
                </h3>
                <button 
                  onClick={() => setEditingItem(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">New Customer Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="કસ્ટમરનું નામ લખો..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-muted text-muted-foreground hover:bg-muted/80 text-sm rounded-xl font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateName}
                  className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 text-sm rounded-xl font-medium flex items-center gap-1.5 transition"
                >
                  <Check size={16} /> Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminShell>
  )
}