'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Mail, MapPin, CheckCircle, ShieldCheck, Clock, Package, Zap } from 'lucide-react';

function BillingDetailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [billingList, setBillingList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`/api?type=billing`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            const userOrders = data.data.filter((b: any) => b.email === email);
            setBillingList(userOrders);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [email]);

  if (loading) return <div className="p-8 text-white">Loading details...</div>;
  if (!billingList || billingList.length === 0) return <div className="p-8 text-white">No billing details found for this user.</div>;

  const firstRecord = billingList[0];

  return (
    <div className="p-8 min-h-screen bg-gray-950 text-white font-sans">
      {/* Back Button */}
      <a href="/admin/billing" className="inline-flex items-center gap-2 text-indigo-400 hover:underline mb-6 text-sm font-medium">
        <ArrowLeft size={16} /> Back to Billing Overview
      </a>

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Customer Basic Info Header */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-start border-b border-gray-800 pb-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                {firstRecord.customerName || 'Customer Details'}
              </h1>
              <p className="text-sm text-gray-400">Complete order history and packages list for this email.</p>
            </div>
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Total Orders: {billingList.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-950/60 p-4 rounded-xl border border-gray-800/80">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-600/10 text-indigo-400 rounded-lg">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Gmail ID / Email</p>
                <p className="text-sm font-semibold text-white">{email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-600/10 text-purple-400 rounded-lg">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Customer Location / Address</p>
                <p className="text-sm font-semibold text-white">Haripura, Amreli, Gujarat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders History Loop */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-indigo-300 flex items-center gap-2 px-1">
            <ShieldCheck size={18} /> Order History & Purchased Packages ({billingList.length})
          </h3>

          {billingList.map((order: any, idx: number) => {
            const allItems = order.itemsList ? order.itemsList.split(',').map((i: string) => i.trim()).filter(Boolean) : [];
            
            // પહેલી આઇટમને મેઇન પેકેજ ગણીશું, અને બાકીની આઇટમ્સને ફીચર્સ/એડ-ઓન્સ ગણીશું
            const mainPackage = allItems.length > 0 ? allItems[0] : 'Standard Package';
            const featuresAndAddons = allItems.length > 1 ? allItems.slice(1) : [];

            // જો તમારી પાસે પેકેજ ફીચર્સ અને એડ-ઓન્સ અલગ અલગ ભાગમાં વિભાજિત કરવા હોય તો અહીં સ્લાઇસ કરી શકાય
            // દા.ત., પહેલા 7 ફીચર્સ પેકેજના અને બાકીના એક્સ્ટ્રા એડ-ઓન્સ
            const packageFeatures = featuresAndAddons.slice(0, 7);
            const extraAddons = featuresAndAddons.slice(7);

            return (
              <div key={order.id || idx} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
                
                {/* Order Top Bar with Date & Status */}
                <div className="flex flex-wrap justify-between items-center border-b border-gray-800 pb-3 gap-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock size={14} className="text-indigo-400" />
                    <span>Order Date & Time: <strong className="text-gray-200">{new Date(order.createdAt).toLocaleString()}</strong></span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    order.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {order.status || 'Pending'}
                  </span>
                </div>

                {/* 1. Main Purchased Product / Package */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Purchased Package:</p>
                  <div className="flex items-center gap-3 bg-indigo-950/40 p-4 rounded-xl border border-indigo-500/30 text-indigo-200 font-bold text-base">
                    <Package size={20} className="text-indigo-400 shrink-0" />
                    <span>{mainPackage}</span>
                  </div>
                </div>

                {/* 2. Package Included Features */}
                {packageFeatures.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wider">Package Features:</p>
                    <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {packageFeatures.map((feature: string, fIdx: number) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-sm text-gray-300">
                            <CheckCircle size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 3. Extra Add-ons / Features */}
                {extraAddons.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-amber-400 mb-2 uppercase tracking-wider">Extra Add-ons / Custom Features:</p>
                    <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {extraAddons.map((addon: string, aIdx: number) => (
                          <li key={aIdx} className="flex items-start gap-2.5 text-sm text-gray-300">
                            <Zap size={16} className="text-amber-400 mt-0.5 shrink-0" />
                            <span>{addon}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Payment Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-950 p-4 rounded-xl border border-gray-800 text-center">
                  <div className="p-2">
                    <p className="text-xs text-gray-400 mb-1">Total Payment</p>
                    <p className="text-lg font-bold text-white">₹{order.total}</p>
                  </div>
                  <div className="p-2 border-x border-gray-800">
                    <p className="text-xs text-gray-400 mb-1">Paid Amount</p>
                    <p className="text-lg font-bold text-emerald-400">₹{order.paid}</p>
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-400 mb-1">Remaining Balance</p>
                    <p className="text-lg font-bold text-rose-500">₹{order.remaining}</p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default function BillingDetail() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Loading...</div>}>
      <BillingDetailContent />
    </Suspense>
  );
}