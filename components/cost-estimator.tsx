'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CalendarClock,
  Check,
  CircleDollarSign,
  Gauge,
  Globe,
  KeyRound,
  Mail,
  RotateCcw,
  Send,
  Smartphone,
  Users,
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Lock,
  User,
  MapPin,
} from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'
import { PayPalButtons } from '@paypal/react-paypal-js'

// TypeScript Interface for Razorpay
declare global {
  interface Window {
    Razorpay: new (options: Record<string, any>) => {
      open: () => void
      on: (event: string, callback: (response: any) => void) => void
    }
  }
}

const PROJECT_TYPES = [
  {
    id: 'web',
    label: 'Advanced Web Platform',
    icon: Globe,
    base: 35000,
    weeks: 6,
    hint: 'Next.js apps, custom portals, advanced dashboards',
  },
  {
    id: 'app',
    label: 'Mobile App',
    icon: Smartphone,
    base: 45000,
    weeks: 9,
    hint: 'iOS & Android, cross-platform',
  },
  {
    id: 'ai',
    label: 'AI System',
    icon: BrainCircuit,
    base: 75000,
    weeks: 12,
    hint: 'ML pipelines, agents, forecasting',
  },
] as const

const CATEGORIES = [
  { id: 'business', label: '🏢 Business', desc: 'Corporate sites, B2B, agencies' },
  { id: 'ecommerce', label: '🛒 E-commerce', desc: 'Online stores, cart, inventory' },
  { id: 'healthcare', label: '🏥 Healthcare', desc: 'Clinics, hospitals, telemedicine' },
  { id: 'education', label: '🎓 Education', desc: 'LMS, schools, online courses' },
  { id: 'hospitality', label: '🍽️ Hospitality', desc: 'Restaurants, hotels, food delivery' },
  { id: 'realestate', label: '🏠 Real Estate', desc: 'Property listings, brokerages' },
  { id: 'finance', label: '💰 Finance', desc: 'Fintech, banking, accounting' },
  { id: 'services', label: '⚖️ Professional Services', desc: 'Lawyers, CA, consultants' },
  { id: 'automotive', label: '🚗 Automotive', desc: 'Car sales, servicing, rentals' },
  { id: 'travel', label: '📅 Booking & Travel', desc: 'Tours, ticketing, agencies' },
  { id: 'media', label: '📰 Media', desc: 'News portals, blogs, magazines' },
  { id: 'personal', label: '👤 Personal', desc: 'Portfolios, resumes, branding' },
  { id: 'custom', label: '⚙️ Custom', desc: 'Bespoke solutions & unique ideas' },
] as const

const UNIVERSAL_EXTRA_FEATURES = [
  { id: 'ai_chatbot', label: '🤖 AI Chatbot', cost: 25000, weeks: 2 },
  { id: 'admin', label: '🛠️ Admin Panel', cost: 15000, weeks: 2 },
  { id: 'payment_gw', label: '💳 Payment Gateway', cost: 6000, weeks: 0.5 },
  { id: 'appt_booking', label: '📅 Appointment Booking', cost: 8000, weeks: 1 },
  { id: 'multilang', label: '🌐 Multi-language Support', cost: 8000, weeks: 1 },
  { id: 'api_integ', label: '🔗 API Integration', cost: 12000, weeks: 1.5 },
  { id: 'crm_integ', label: '📈 CRM Integration', cost: 18000, weeks: 2 },
  { id: 'email_notif', label: '📧 Email Notifications', cost: 4000, weeks: 0.5 },
  { id: 'sms_otp', label: '📲 SMS / OTP Verification', cost: 5000, weeks: 0.5 },
  { id: 'live_chat', label: '💬 Live Chat Support', cost: 4000, weeks: 0.5 },
  { id: 'analytics_dash', label: '📊 Analytics Dashboard', cost: 10000, weeks: 1.5 },
  { id: 'mobile_app_view', label: '📱 Mobile App View / PWA', cost: 12000, weeks: 1.5 },
  { id: 'tfa', label: '🔒 Two-Factor Authentication (2FA)', cost: 6000, weeks: 1 },
  { id: 'cloud_storage', label: '☁️ Cloud Storage Integration', cost: 8000, weeks: 1 },
  { id: 'file_upload_univ', label: '📁 File Upload System', cost: 4000, weeks: 0.5 },
]

const CATEGORY_FEATURES: Record<string, { id: string; label: string; cost: number; weeks: number }[]> = {
  business: [
    { id: 'team', label: 'Team Members Showcase', cost: 3000, weeks: 0.5 },
    { id: 'faq', label: 'FAQ Section', cost: 2000, weeks: 0.5 },
    { id: 'brochure', label: 'Brochure Download', cost: 2000, weeks: 0.5 },
    { id: 'clients', label: 'Client Logos & Partners', cost: 2000, weeks: 0.5 },
    { id: 'testimonials', label: 'Testimonials Module', cost: 2000, weeks: 0.5 },
    { id: 'careers', label: 'Careers / Job Portal', cost: 12000, weeks: 1.5 },
    { id: 'blog', label: 'Corporate Blog Section', cost: 6000, weeks: 1 },
    { id: 'inquiry', label: 'Inquiry Management System', cost: 5000, weeks: 1 },
  ],
  ecommerce: [
    { id: 'prod_mgmt', label: 'Product Management System', cost: 10000, weeks: 1.5 },
    { id: 'categories', label: 'Categories & Advanced Filters', cost: 5000, weeks: 1 },
    { id: 'cart', label: 'Shopping Cart & Checkout', cost: 6000, weeks: 1 },
    { id: 'wishlist', label: 'Wishlist System', cost: 3000, weeks: 0.5 },
    { id: 'coupons', label: 'Coupon & Discount Engine', cost: 6000, weeks: 1 },
    { id: 'tracking', label: 'Live Order Tracking', cost: 7000, weeks: 1 },
    { id: 'inventory', label: 'Inventory Management', cost: 12000, weeks: 1.5 },
    { id: 'gst', label: 'GST Invoice Generation', cost: 8000, weeks: 1 },
    { id: 'cust_dash', label: 'Customer Account Dashboard', cost: 8000, weeks: 1.5 },
    { id: 'reviews', label: 'Product Reviews & Ratings', cost: 4000, weeks: 0.5 },
  ],
  healthcare: [
    { id: 'doc_mgmt', label: 'Doctor Profile Management', cost: 8000, weeks: 1 },
    { id: 'dept_mgmt', label: 'Department & Clinic Catalog', cost: 4000, weeks: 0.5 },
    { id: 'appointment', label: 'Doctor Appointment Booking', cost: 12000, weeks: 1.5 },
    { id: 'teleconsult', label: 'Online Teleconsultation', cost: 25000, weeks: 2.5 },
    { id: 'patient_reg', label: 'Patient Registration System', cost: 5000, weeks: 1 },
    { id: 'patient_dash', label: 'Patient Portal Dashboard', cost: 10000, weeks: 1.5 },
    { id: 'reports', label: 'Lab & Medical Reports Upload', cost: 8000, weeks: 1 },
    { id: 'prescription', label: 'E-Prescription Download', cost: 6000, weeks: 1 },
    { id: 'health_pkg', label: 'Health Checkup Packages', cost: 5000, weeks: 0.5 },
  ],
  education: [
    { id: 'student_login', label: 'Student Portal & Login', cost: 10000, weeks: 1.5 },
    { id: 'teacher_login', label: 'Teacher / Instructor Portal', cost: 10000, weeks: 1.5 },
    { id: 'admission', label: 'Online Admission Application', cost: 8000, weeks: 1 },
    { id: 'courses', label: 'Course Catalog & Syllabus', cost: 10000, weeks: 1.5 },
    { id: 'online_class', label: 'Live Online Classes Integration', cost: 20000, weeks: 2 },
    { id: 'study_material', label: 'Study Material & Notes Portal', cost: 5000, weeks: 1 },
    { id: 'assignments', label: 'Assignment Upload & Grading', cost: 8000, weeks: 1 },
    { id: 'exams', label: 'Online Quiz & Exams Engine', cost: 20000, weeks: 2 },
    { id: 'results', label: 'Result & Certificate Generation', cost: 8000, weeks: 1 },
    { id: 'attendance', label: 'Attendance Tracking System', cost: 8000, weeks: 1 },
  ],
  hospitality: [
    { id: 'food_menu', label: 'Digital Interactive Menu', cost: 6000, weeks: 1 },
    { id: 'table_booking', label: 'Table Reservation System', cost: 8000, weeks: 1.5 },
    { id: 'room_booking', label: 'Hotel Room Booking Engine', cost: 15000, weeks: 2 },
    { id: 'online_order', label: 'Food Ordering System', cost: 12000, weeks: 1.5 },
    { id: 'event_booking', label: 'Banquet & Event Booking', cost: 10000, weeks: 1.5 },
  ],
  realestate: [
    { id: 'listings', label: 'Property Listings System', cost: 10000, weeks: 1.5 },
    { id: 'search', label: 'Advanced Property Search', cost: 6000, weeks: 1 },
    { id: 'filters', label: 'BHK, Location & Price Filters', cost: 6000, weeks: 1 },
    { id: 'gallery', label: 'High-Res Photo & Video Gallery', cost: 4000, weeks: 0.5 },
    { id: 'virtual_tour', label: '360° Virtual Tour Integration', cost: 18000, weeks: 2 },
    { id: 'agents', label: 'Agent & Broker Management', cost: 8000, weeks: 1 },
    { id: 'emi_calc', label: 'Home Loan EMI Calculator', cost: 3000, weeks: 0.5 },
  ],
  finance: [
    { id: 'emi_calc', label: 'Financial / EMI Calculator', cost: 3000, weeks: 0.5 },
    { id: 'loan_calc', label: 'Loan Eligibility Estimator', cost: 6000, weeks: 1 },
    { id: 'doc_upload', label: 'KYC Document Vault Upload', cost: 8000, weeks: 1 },
    { id: 'cust_dash', label: 'Account Summary Dashboard', cost: 12000, weeks: 1.5 },
    { id: 'verification', label: 'Automated Document Verification', cost: 12000, weeks: 1.5 },
  ],
  services: [
    { id: 'appointment', label: 'Client Consultation Booking', cost: 8000, weeks: 1 },
    { id: 'consultation', label: 'Custom Inquiry Intake Form', cost: 4000, weeks: 0.5 },
    { id: 'case_studies', label: 'Case Studies & Portfolio', cost: 5000, weeks: 0.5 },
    { id: 'cust_dash', label: 'Client Project Dashboard', cost: 10000, weeks: 1.5 },
  ],
  automotive: [
    { id: 'listings', label: 'Vehicle Inventory Listings', cost: 10000, weeks: 1.5 },
    { id: 'comparison', label: 'Vehicle Comparison Tool', cost: 12000, weeks: 1.5 },
    { id: 'test_drive', label: 'Test Drive Booking System', cost: 7000, weeks: 1 },
    { id: 'service_booking', label: 'Car Maintenance Service Booking', cost: 8000, weeks: 1 },
  ],
  travel: [
    { id: 'calendar', label: 'Interactive Booking Calendar', cost: 8000, weeks: 1 },
    { id: 'online_booking', label: 'Tour Booking & Ticket Engine', cost: 15000, weeks: 1.5 },
    { id: 'packages', label: 'Holiday Package Management', cost: 12000, weeks: 1.5 },
    { id: 'ticket_download', label: 'E-Ticket PDF Download System', cost: 6000, weeks: 1 },
  ],
  media: [
    { id: 'blog', label: 'Article Publishing CMS', cost: 8000, weeks: 1 },
    { id: 'authors', label: 'Multi-Author Management', cost: 5000, weeks: 1 },
    { id: 'comments', label: 'Comments & User Engagement', cost: 6000, weeks: 1 },
    { id: 'ads', label: 'Ad Banner Management System', cost: 10000, weeks: 1 },
  ],
  personal: [
    { id: 'resume', label: 'Interactive Resume / CV Download', cost: 2000, weeks: 0.5 },
    { id: 'skills', label: 'Skills & Timeline Showcase', cost: 2000, weeks: 0.5 },
    { id: 'projects', label: 'Project Portfolio Showcase', cost: 4000, weeks: 0.5 },
  ],
  custom: [
    { id: 'login', label: 'Custom Authentication System', cost: 5000, weeks: 1 },
    { id: 'emp_dash', label: 'Employee Work Dashboard', cost: 12000, weeks: 1.5 },
    { id: 'reports', label: 'Custom Business Reports', cost: 8000, weeks: 1 },
  ],
}

const MOBILE_EXTRA_FEATURES = [
  { id: 'mob_admin', label: '🛠️ App Admin Dashboard', cost: 18000, weeks: 2 },
  { id: 'mob_payment', label: '💳 In-App Payment Gateway', cost: 10000, weeks: 1 },
  { id: 'push_notif', label: '🔔 Push Notifications (FCM)', cost: 6000, weeks: 0.5 },
  { id: 'realtime_gps', label: '📍 Real-time GPS Tracking', cost: 20000, weeks: 2 },
  { id: 'biometric_sec', label: '🔒 Biometric / Face ID Login', cost: 8000, weeks: 1 },
  { id: 'offline_sync', label: '⚡ Offline Data Sync Mode', cost: 15000, weeks: 1.5 },
  { id: 'store_deploy', label: '🚀 Play Store & App Store Deployment', cost: 8000, weeks: 1 },
  { id: 'mob_multilang', label: '🌐 Multi-language Support', cost: 8000, weeks: 1 },
  { id: 'api_conn', label: '🔗 Advanced API Integration', cost: 12000, weeks: 1 },
  { id: 'chat_system', label: '💬 In-App Chat System', cost: 15000, weeks: 1.5 },
]

const AI_EXTRA_FEATURES = [
  { id: 'vector_db', label: '🧠 Vector DB Setup (RAG)', cost: 18000, weeks: 1.5 },
  { id: 'predictive_model', label: '📊 Predictive Analytics & Forecasting', cost: 25000, weeks: 2 },
  { id: 'multi_agents', label: '🤖 Multi-Agent Automation Workflows', cost: 35000, weeks: 3 },
  { id: 'fine_tuning', label: '⚙️ Custom Model Fine-Tuning', cost: 30000, weeks: 2.5 },
  { id: 'ai_dashboard', label: '📈 Custom AI Insights Dashboard', cost: 15000, weeks: 1.5 },
  { id: 'data_scraping', label: '📥 Automated Data Scraping Pipeline', cost: 12000, weeks: 1 },
  { id: 'realtime_pipeline', label: '⚡ Real-time API & CRM Pipeline', cost: 20000, weeks: 2 },
  { id: 'ai_monitoring', label: '🛡️ Advanced AI Monitoring & Logging', cost: 10000, weeks: 1 },
  { id: 'secure_infra', label: '🔒 Secure Cloud/On-Premise Setup', cost: 25000, weeks: 2 },
]

const WEB_PACKAGES = [
  {
    id: 'starter',
    label: 'STARTER',
    price: 9999,
    weeks: 2,
    hint: 'Essential features for small projects & fast online launch',
    deliverables: [
      'Up to 5 Pages: Home, About Us, Services/Products, Portfolio, Contact Us',
      '100% Mobile & Tablet Responsive Layout',
      'Fast Loading Speed Optimization & Click-to-Call Buttons',
      'Interactive Contact Form & Direct Live WhatsApp Chat',
      'Google Maps Integration & Social Media Links',
      'Free SSL Certificate Setup & Basic On-Page SEO',
      '1 Month Free Technical Support',
    ],
    includedFeatureIds: [],
  },
  {
    id: 'growth',
    label: 'GROWTH ⭐ POPULAR',
    price: 24999,
    weeks: 3,
    hint: 'Complete dynamic platform for scaling businesses',
    deliverables: [
      'Up to 15 Dynamic Pages with Custom Admin Panel (CMS)',
      'Advanced Inquiry Management Dashboard',
      'Full Blog Section & Advanced On-Page SEO Setup',
      'Careers / Job Portal Section with Resume Uploads',
      'Automated Email & SMS/OTP Notification System',
      'Multi-language Support (English + Regional)',
      '2 Months Free Technical Support & Maintenance',
    ],
    includedFeatureIds: ['admin', 'blog', 'careers', 'inquiry', 'email_notif', 'sms_otp', 'multilang'],
  },
  {
    id: 'enterprise',
    label: 'ENTERPRISE',
    price: 49999,
    weeks: 5,
    hint: 'Full-scale custom architecture with AI & automation',
    deliverables: [
      'Unlimited Custom Pages Architecture',
      'Custom Trained AI Chatbot Integration',
      'E-Commerce & Secure Payment Gateway Integration',
      'Custom CRM & 3rd Party API Integrations',
      'Advanced Role-Based Security & Cloud Backup',
      'Progressive Web App (PWA) Support',
      '3 Months Priority Technical Support',
    ],
    includedFeatureIds: ['ai_chatbot', 'admin', 'payment_gw', 'crm_integ', 'api_integ', 'tfa', 'mobile_app_view'],
  },
]

const MOBILE_PACKAGES = [
  {
    id: 'starter_app',
    label: 'STARTER APP',
    price: 29999,
    weeks: 3,
    hint: 'Essential utility features for fast cross-platform app launch',
    deliverables: [
      'Up to 5 Mobile Screens (iOS & Android)',
      'Basic User Authentication (Mobile OTP Login)',
      'User Profile Management & Local Storage',
      'Interactive Contact Form & WhatsApp Button',
      'Clean Modern UI/UX Design',
      '1 Month Free Technical Support',
    ],
    includedFeatureIds: [],
  },
  {
    id: 'growth_app',
    label: 'GROWTH ⭐ POPULAR',
    price: 49999,
    weeks: 5,
    hint: 'Complete dynamic app with backend dashboard and payments',
    deliverables: [
      'Up to 15-20 Dynamic Screens with Custom UI/UX',
      'Full Custom Admin CMS Dashboard',
      'In-App Payment Gateway Integration',
      'Push Notifications Integration (Firebase)',
      'Live API Backend Connectivity',
      'Multi-language Support UI',
      '3 Months Free Technical Support',
    ],
    includedFeatureIds: ['mob_admin', 'mob_payment', 'push_notif', 'mob_multilang', 'api_conn'],
  },
  {
    id: 'enterprise_app',
    label: 'ENTERPRISE APP',
    price: 99999,
    weeks: 8,
    hint: 'Full-scale cross-platform architecture with real-time features',
    deliverables: [
      'Unlimited Custom Architecture Screens',
      'Real-time features (Live GPS Tracking / Chat)',
      'Advanced Security (Biometric Login, 2FA)',
      'Offline Data Sync Mode',
      'App Store & Play Store Publishing Support',
      '6 Months Dedicated Priority Support',
    ],
    includedFeatureIds: ['mob_admin', 'mob_payment', 'push_notif', 'realtime_gps', 'biometric_sec', 'offline_sync', 'store_deploy'],
  },
]

const AI_PACKAGES = [
  {
    id: 'starter_ai',
    label: 'STARTER AI',
    price: 79999,
    weeks: 4,
    hint: 'Custom AI chatbot & basic prompt engineering integration',
    deliverables: [
      'Custom LLM / ChatGPT API Integration',
      'Document QA Bot (Train AI on PDFs/FAQs)',
      'Basic Prompt Engineering & Custom Instructions',
      'Simple Chat Widget UI Integration',
      '1 Month Free Technical Support',
    ],
    includedFeatureIds: [],
  },
  {
    id: 'growth_ai',
    label: 'GROWTH ⭐ POPULAR',
    price: 149999,
    weeks: 6,
    hint: 'Predictive analytics, forecasting, and RAG architecture',
    deliverables: [
      'Vector Database Setup (Pinecone/Chroma) for RAG',
      'Predictive Analytics & Data Forecasting Pipelines',
      'Custom Analytics & AI Insights Dashboard',
      'Automated Data Scraping and Processing Workflows',
      '3 Months Free Technical Support',
    ],
    includedFeatureIds: ['vector_db', 'predictive_model', 'ai_dashboard', 'data_scraping'],
  },
  {
    id: 'enterprise_ai',
    label: 'ENTERPRISE AI',
    price: 249999,
    weeks: 10,
    hint: 'Multi-agent workflows, custom model training & automation',
    deliverables: [
      'Multi-Agent Autonomous AI Workflows',
      'Custom Dataset Training & Fine-tuning',
      'Real-time Enterprise API Pipeline & CRM Sync',
      'Advanced AI Model Monitoring & Logging',
      '6 Months Priority Support & Model Upgrades',
    ],
    includedFeatureIds: ['vector_db', 'multi_agents', 'fine_tuning', 'realtime_pipeline', 'ai_monitoring', 'secure_infra'],
  },
]

const STEPS = ['Email Verification', 'Project type', 'Category', 'Package & Add-ons', 'Your estimate']

export function CostEstimator() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  
  const [otpSent, setOtpSent] = useState(false)
  const [otpInput, setOtpInput] = useState('')
  const [isEmailVerified, setIsEmailVerified] = useState(false)

  const [type, setType] = useState<string>('web')
  const [category, setCategory] = useState<string>('business')

  const [selectedPackageId, setSelectedPackageId] = useState<string>('growth')
  const [features, setFeatures] = useState<string[]>([])
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null)

  const [submitted, setSubmitted] = useState(false)
  const [currencyType, setCurrencyType] = useState<'USD' | 'INR'>('INR')
  const [loading, setLoading] = useState(false)

  // Current market conversion rate for USD (1 USD = ~86 INR)
  const USD_RATE = 86

  // Helper function to format price based on selected currency
  const formatPrice = (inrAmount: number) => {
    if (currencyType === 'USD') {
      const usdAmount = Math.round(inrAmount / USD_RATE)
      return `$${usdAmount.toLocaleString()}`
    }
    return `₹${inrAmount.toLocaleString()}`
  }

  const handleTypeChange = (newType: string) => {
    setType(newType)
    setFeatures([])
    if (newType === 'app') {
      setSelectedPackageId('growth_app')
    } else if (newType === 'ai') {
      setSelectedPackageId('growth_ai')
    } else {
      setSelectedPackageId('growth')
    }
  }

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    setFeatures([])
  }

  const activePackages = useMemo(() => {
    if (type === 'app') return MOBILE_PACKAGES
    if (type === 'ai') return AI_PACKAGES
    return WEB_PACKAGES
  }, [type])

  const currentPkgObj = useMemo(() => {
    return activePackages.find((p) => p.id === selectedPackageId) || activePackages[1]
  }, [activePackages, selectedPackageId])

  const groupedFeatures = useMemo(() => {
    const catSpecific = CATEGORY_FEATURES[category] || CATEGORY_FEATURES['business']

    let platformSpecific: { id: string; label: string; cost: number; weeks: number }[] = []
    if (type === 'app') {
      platformSpecific = MOBILE_EXTRA_FEATURES
    } else if (type === 'ai') {
      platformSpecific = AI_EXTRA_FEATURES
    } else {
      platformSpecific = UNIVERSAL_EXTRA_FEATURES
    }

    return {
      categorySpecific: catSpecific,
      platformSpecific: platformSpecific,
    }
  }, [category, type])

  const allAvailableFeatures = useMemo(() => {
    return [...groupedFeatures.categorySpecific, ...groupedFeatures.platformSpecific]
  }, [groupedFeatures])

  const handleSelectPackage = (pkgId: string) => {
    setSelectedPackageId(pkgId)
  }

  const toggleFeature = (id: string) => {
    if (currentPkgObj.includedFeatureIds.includes(id)) {
      return
    }
    setFeatures((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      return next
    })
  }

  const estimate = useMemo(() => {
    let basePrice = currentPkgObj.price
    let baseWeeks = currentPkgObj.weeks

    const addedCost = allAvailableFeatures
      .filter((f) => features.includes(f.id) && !currentPkgObj.includedFeatureIds.includes(f.id))
      .reduce((sum, f) => sum + f.cost, 0)

    basePrice = basePrice + addedCost
    baseWeeks = Math.max(2, baseWeeks)

    const teamCount = Math.max(2, Math.round(basePrice / 30000) + 1)

    return {
      low: Math.max(10000, basePrice),
      high: Math.round(Math.max(10000, basePrice) * 1.2),
      weeks: baseWeeks,
      team: teamCount,
      teamText: teamCount === 1 ? '1 engineer' : `${teamCount} engineers`,
    }
  }, [currentPkgObj, features, allAvailableFeatures])

  const reset = () => {
    setStep(0)
    setName('')
    setEmail('')
    setAddress('')
    setOtpSent(false)
    setOtpInput('')
    setIsEmailVerified(false)
    setType('web')
    setCategory('business')
    setSelectedPackageId('growth')
    setFeatures([])
    setSubmitted(false)
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      alert('Please enter your name.')
      return
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid Gmail ID.')
      return
    }
    if (!address.trim()) {
      alert('Please enter your address.')
      return
    }

    try {
      setLoading(true)
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'send-otp', email }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setOtpSent(true)
        alert('OTP has been successfully sent to your Gmail!')
      } else {
        alert(data.message || 'Failed to send OTP.')
      }
    } catch (err: any) {
      console.error('API Error:', err)
      alert('Failed to send OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otpInput.trim()) {
      alert('Please enter the OTP.')
      return
    }

    try {
      setLoading(true)
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'verify-otp', email, otp: otpInput.trim() }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setIsEmailVerified(true)
        setStep(1)
        alert('Email Verified Successfully!')
      } else {
        alert(data.message || 'Incorrect OTP or expired!')
      }
    } catch (err: any) {
      console.error('API Error:', err)
      alert('An error occurred during verification.')
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    if (step === 0 && !isEmailVerified) {
      alert('Please verify your email first.')
      return
    }
    setStep((s) => Math.min(4, s + 1))
  }

  const handlePayPalSuccess = async (paymentId: string) => {
    try {
      const totalAmount = estimate.low
      const paidAmount = Math.round(totalAmount / 2)
      const remainingAmount = totalAmount - paidAmount

      const packageNameStr = currentPkgObj.label
      const selectedCategory = CATEGORIES.find((c) => c.id === category)?.label || category
      const projectTypeLabel = PROJECT_TYPES.find((p) => p.id === type)?.label || type

      const selectedFeaturesList = allAvailableFeatures
        .filter((f) => features.includes(f.id) && !currentPkgObj.includedFeatureIds.includes(f.id))
        .map((f) => f.label)
        .join(', ')

      const itemsListStr = `${projectTypeLabel} - ${selectedCategory} (${packageNameStr})\nAdd-ons: ${selectedFeaturesList || 'None'}`

      const apiResponse = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'proposal',
          name: name,
          email: email,
          address: address,
          paymentId: paymentId,
          projectType: projectTypeLabel,
          category: selectedCategory,
          packageName: packageNameStr,
          itemsList: itemsListStr,
          total: totalAmount,
          paid: paidAmount,
          remaining: remainingAmount,
          status: 'Pending',
          timeline: `${estimate.weeks} weeks`,
          coreTeam: `${estimate.teamText}`,
        }),
      })

      const data = await apiResponse.json()
      if (apiResponse.ok && data.success) {
        setSubmitted(true)
        alert(`50% Advance Payment (PayPal) Successful! Billing account created in the admin panel and receipt sent to ${email}.`)
      } else {
        alert(data.message || 'Payment successful, but an error occurred while saving data.')
        setSubmitted(true)
      }
    } catch (err) {
      console.error('API Error:', err)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentAndSubmit = async () => {
    try {
      setLoading(true)
      const totalAmount = estimate.low
      const paidAmount = Math.round(totalAmount / 2)
      const remainingAmount = totalAmount - paidAmount
      const amountInPaise = Math.round(paidAmount * 100)

      if (typeof window !== 'undefined' && !window.Razorpay) {
        alert('Razorpay SDK failed to load.')
        setLoading(false)
        return
      }

      const packageNameStr = currentPkgObj.label
      const selectedCategory = CATEGORIES.find((c) => c.id === category)?.label || category
      const projectTypeLabel = PROJECT_TYPES.find((p) => p.id === type)?.label || type

      const selectedFeaturesList = allAvailableFeatures
        .filter((f) => features.includes(f.id) && !currentPkgObj.includedFeatureIds.includes(f.id))
        .map((f) => f.label)
        .join(', ')

      const itemsListStr = `${projectTypeLabel} - ${selectedCategory} (${packageNameStr})\nAdd-ons: ${selectedFeaturesList || 'None'}`

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_TLAmZWNiLRQA5m',
        amount: amountInPaise,
        currency: 'INR',
        name: 'Project Advance Payment',
        description: `50% Advance Payment for ${packageNameStr}`,
        handler: async function (response: { razorpay_payment_id: string }) {
          const paymentId = response.razorpay_payment_id

          try {
            const apiResponse = await fetch('/api', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'proposal',
                name: name,
                email: email,
                address: address,
                paymentId: paymentId,
                projectType: projectTypeLabel,
                category: selectedCategory,
                packageName: packageNameStr,
                itemsList: itemsListStr,
                total: totalAmount,
                paid: paidAmount,
                remaining: remainingAmount,
                status: 'Pending',
                timeline: `${estimate.weeks} weeks`,
                coreTeam: `${estimate.teamText}`,
              }),
            })

            const data = await apiResponse.json()
            if (apiResponse.ok && data.success) {
              setSubmitted(true)
              alert(`50% Advance Payment Successful! Billing account created in the admin panel and receipt sent to ${email}.`)
            } else {
              alert(data.message || 'Payment successful, but an error occurred while saving data.')
              setSubmitted(true)
            }
          } catch (err) {
            console.error('API Error:', err)
            setSubmitted(true)
          } finally {
            setLoading(false)
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: '9999999999',
        },
        theme: { color: '#1565FF' },
      }

      const paymentWindow = new window.Razorpay(options)
      paymentWindow.open()
      paymentWindow.on('payment.failed', function (response: { error: { description: string } }) {
        alert(`Payment failed: ${response.error.description}`)
        setLoading(false)
      })
    } catch (error) {
      console.error('Payment error:', error)
      alert('An error occurred while opening the payment gateway.')
      setLoading(false)
    }
  }

  const renderFeatureButton = (f: { id: string; label: string; cost: number; weeks: number }) => {
    const isIncludedInPackage = currentPkgObj.includedFeatureIds.includes(f.id)
    const checked = isIncludedInPackage || features.includes(f.id)

    return (
      <button
        key={f.id}
        type="button"
        disabled={isIncludedInPackage}
        onClick={() => toggleFeature(f.id)}
        className={cn(
          'flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all',
          isIncludedInPackage
            ? 'border-accent/40 bg-accent/5 opacity-80 cursor-not-allowed'
            : checked
            ? 'border-accent/60 bg-accent/10'
            : 'border-border bg-background/40 hover:border-accent/35',
        )}
      >
        <span className="flex items-center gap-3">
          <span
            className={cn(
              'flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors',
              isIncludedInPackage
                ? 'border-accent bg-accent/20 text-accent'
                : checked
                ? 'border-accent bg-accent text-accent-foreground'
                : 'border-border',
            )}
          >
            {isIncludedInPackage ? <Lock className="size-3" /> : checked && <Check className="size-3.5" />}
          </span>
          <span className={cn('text-sm font-medium', isIncludedInPackage && 'text-foreground/90')}>
            {f.label}
          </span>
        </span>
        <span className="font-mono text-xs whitespace-nowrap">
          {isIncludedInPackage ? (
            <span className="text-accent font-bold text-[10px] uppercase bg-accent/15 px-2 py-0.5 rounded">
              Included
            </span>
          ) : (
            <span className="text-muted-foreground">+{formatPrice(f.cost)}</span>
          )}
        </span>
      </button>
    )
  }

  return (
    <section id="estimator" className="relative scroll-mt-20 py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute top-1/4 right-0 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <SectionHeading
            eyebrow="Project Estimator & Packages"
            title="Choose Project Type & Requirements"
            description="Enter your details & verify email with OTP to calculate your estimate and record your order."
          />
          <div className="flex items-center gap-1 self-start sm:self-center rounded-xl border border-border bg-background/40 p-1">
            <button
              type="button"
              onClick={() => setCurrencyType('USD')}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
                currencyType === 'USD' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              USD ($)
            </button>
            <button
              type="button"
              onClick={() => setCurrencyType('INR')}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
                currencyType === 'INR' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              INR (₹)
            </button>
          </div>
        </div>

        <div className="glass mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl">
          <ol className="flex items-center gap-1 border-b border-border/70 px-4 py-4 sm:gap-2 sm:px-6 overflow-x-auto">
            {STEPS.map((label, i) => (
              <li key={label} className="flex flex-1 items-center gap-1 sm:gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={cn(
                      'flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                      i < step ? 'bg-accent text-accent-foreground' : i === step ? 'bg-primary text-primary-foreground shadow-[0_0_18px_rgba(21,101,255,0.5)]' : 'border border-border text-muted-foreground',
                    )}
                  >
                    {i < step ? <Check className="size-3.5" /> : i + 1}
                  </span>
                  <span className={cn('hidden truncate text-xs font-medium sm:inline lg:text-sm', i === step ? 'text-foreground' : 'text-muted-foreground')}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && <span className={cn('h-px flex-1 transition-colors min-w-[20px]', i < step ? 'bg-accent/60' : 'bg-border')} />}
              </li>
            ))}
          </ol>

          <div className="p-5 sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                {/* STEP 0: Name, Gmail, Address & OTP Verification */}
                {step === 0 && (
                  <div className="max-w-md mx-auto py-4 text-center">
                    {!otpSent ? (
                      <form onSubmit={handleSendOtp}>
                        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent mb-4">
                          <Mail className="size-6" />
                        </span>
                        <h3 className="font-display text-xl font-bold">Enter Your Information</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          We will send a verification OTP and billing updates to this email.
                        </p>
                        
                        <div className="mt-6 space-y-4 text-left">
                          <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">Your Name</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                <User className="size-4" />
                              </span>
                              <input
                                type="text"
                                required
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">Gmail ID</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                <Mail className="size-4" />
                              </span>
                              <input
                                type="email"
                                required
                                placeholder="your-email@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">Address</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                <MapPin className="size-4" />
                              </span>
                              <input
                                type="text"
                                required
                                placeholder="Enter your address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_28px_rgba(21,101,255,0.45)] disabled:opacity-50"
                        >
                          {loading ? 'Sending OTP...' : 'Send OTP'} <ArrowRight className="size-4" />
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyOtp}>
                        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent mb-4">
                          <KeyRound className="size-6" />
                        </span>
                        <h3 className="font-display text-xl font-bold">Enter Verification OTP</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          OTP has been sent to <span className="text-foreground font-semibold">{email}</span>
                        </p>
                        <div className="mt-6">
                          <input
                            type="text"
                            required
                            maxLength={6}
                            placeholder="Enter 6-digit OTP"
                            value={otpInput}
                            onChange={(e) => setOtpInput(e.target.value)}
                            className="w-full text-center tracking-widest font-mono text-lg rounded-xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_28px_rgba(21,101,255,0.45)] disabled:opacity-50"
                        >
                          {loading ? 'Verifying...' : 'Verify OTP & Proceed'} <Check className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="mt-3 text-xs text-muted-foreground hover:text-foreground underline"
                        >
                          Change Details / Email
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* STEP 1: Project Type */}
                {step === 1 && (
                  <fieldset>
                    <legend className="font-display text-lg font-semibold">What are we building?</legend>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {PROJECT_TYPES.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleTypeChange(p.id)}
                          className={cn(
                            'rounded-xl border p-4 text-left transition-all',
                            type === p.id ? 'border-accent/60 bg-accent/10 shadow-[0_0_28px_rgba(0,212,255,0.18)]' : 'border-border bg-background/40 hover:border-accent/30',
                          )}
                        >
                          <p.icon className={cn('size-5', type === p.id ? 'text-accent' : 'text-muted-foreground')} />
                          <p className="mt-3 text-sm font-semibold">{p.label}</p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.hint}</p>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}

                {/* STEP 2: Category */}
                {step === 2 && (
                  <fieldset>
                    <legend className="font-display text-lg font-semibold">Select Project Category</legend>
                    <div className="mt-5 grid gap-2.5 sm:grid-cols-2 md:grid-cols-3 max-h-[320px] overflow-y-auto pr-2">
                      {CATEGORIES.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => handleCategoryChange(c.id)}
                          className={cn(
                            'rounded-xl border p-3.5 text-left transition-all',
                            category === c.id ? 'border-accent/60 bg-accent/10 shadow-[0_0_24px_rgba(0,212,255,0.15)]' : 'border-border bg-background/40 hover:border-accent/30',
                          )}
                        >
                          <p className="text-sm font-semibold">{c.label}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}

                {/* STEP 3: Package Selection & Add-ons */}
                {step === 3 && (
                  <fieldset className="space-y-6">
                    <legend className="font-display text-lg font-semibold">
                      Step 4: Choose Package or Add Custom Add-ons
                    </legend>

                    <div className="grid gap-4 sm:grid-cols-3">
                      {activePackages.map((pkg) => {
                        const isSelected = selectedPackageId === pkg.id
                        const isExpanded = expandedPackageId === pkg.id

                        return (
                          <div
                            key={pkg.id}
                            className={cn(
                              'relative rounded-2xl border p-5 transition-all flex flex-col justify-between',
                              isSelected
                                ? 'border-accent bg-accent/10 shadow-[0_0_30px_rgba(0,212,255,0.25)] ring-2 ring-accent'
                                : 'border-border bg-background/40 hover:border-accent/40',
                            )}
                          >
                            {(pkg.id === 'growth' || pkg.id === 'growth_app' || pkg.id === 'growth_ai') && (
                              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                                ⭐ Popular
                              </span>
                            )}

                            <div onClick={() => handleSelectPackage(pkg.id)} className="cursor-pointer">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-display text-sm font-bold tracking-wider">{pkg.label}</span>
                                <span className={cn('size-5 rounded-full border flex items-center justify-center', isSelected ? 'border-accent bg-accent text-accent-foreground' : 'border-border')}>
                                  {isSelected && <Check className="size-3" />}
                                </span>
                              </div>
                              <p className="font-mono text-2xl font-extrabold text-accent">{formatPrice(pkg.price)}</p>
                              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{pkg.hint}</p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-border/60">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setExpandedPackageId(isExpanded ? null : pkg.id)
                                }}
                                className="w-full flex items-center justify-between text-xs font-semibold text-accent hover:underline py-1"
                              >
                                <span>📦 What's Included?</span>
                                {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                              </button>

                              {isExpanded && (
                                <motion.ul
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-2 space-y-1.5 text-[11px] text-muted-foreground text-left bg-background/60 p-2.5 rounded-xl border border-border/80"
                                >
                                  {pkg.deliverables.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-1.5">
                                      <span className="text-accent font-bold mt-0.5">✔</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </div>

                            <div className="mt-3 pt-2 border-t border-border/40 text-[11px] text-muted-foreground flex items-center justify-between cursor-pointer" onClick={() => handleSelectPackage(pkg.id)}>
                              <span>⏱️ {pkg.weeks} weeks</span>
                              <span className={cn('font-semibold', isSelected ? 'text-accent' : '')}>
                                {isSelected ? 'Selected' : 'Click to select'}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="rounded-xl border border-primary/40 bg-primary/10 p-3 text-xs flex items-center gap-2 text-primary font-medium">
                      <Sparkles className="size-4 shrink-0" />
                      <span>You have selected <strong>{currentPkgObj.label}</strong> ({formatPrice(currentPkgObj.price)}). Add-on costs will be added on top of this package price!</span>
                    </div>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-border"></div>
                      <span className="flex-shrink mx-4 text-xs uppercase font-mono text-muted-foreground">
                        OPTIONAL EXTRA ADD-ONS
                      </span>
                      <div className="flex-grow border-t border-border"></div>
                    </div>

                    <div className="max-h-[300px] overflow-y-auto pr-2 space-y-5">
                      <div>
                        <p className="text-xs font-semibold text-accent mb-2 uppercase tracking-wide">
                          🎯 {CATEGORIES.find((c) => c.id === category)?.label || category} Features
                        </p>
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {groupedFeatures.categorySpecific.map(renderFeatureButton)}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                          ⚙️ {type === 'app' ? 'Mobile App Extras' : type === 'ai' ? 'AI System Extras' : 'Universal Platform Features'}
                        </p>
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {groupedFeatures.platformSpecific.map(renderFeatureButton)}
                        </div>
                      </div>
                    </div>
                  </fieldset>
                )}

                {/* STEP 4: Final Summary */}
                {step === 4 && (
                  <div>
                    {submitted ? (
                      <div className="py-6 text-center">
                        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <Check className="size-7" />
                        </span>
                        <h3 className="font-display mt-5 text-xl font-bold">50% Advance Paid & Order Confirmed!</h3>
                        <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-muted-foreground">
                          Your advance payment was successful. The order has been finalized, billing account created automatically, and receipt dispatched to: <span className="text-foreground font-semibold">{email}</span>.
                        </p>
                        <button
                          type="button"
                          onClick={reset}
                          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent/40"
                        >
                          <RotateCcw className="size-4" />
                          Start a new estimate
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-display text-lg font-semibold">Step 5: Final Summary & Secure Advance Payment</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Name: <span className="text-foreground font-medium">{name}</span> | Email: <span className="text-accent font-medium">{email}</span> | Package: <span className="text-accent font-medium">{currentPkgObj.label}</span>
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-xl border border-accent/40 bg-accent/10 p-5 sm:col-span-3">
                            <p className="flex items-center gap-2 text-xs tracking-wide text-muted-foreground uppercase">
                              <CircleDollarSign className="size-4 text-accent" />
                              Total Investment Price
                            </p>
                            <p className="font-display mt-2 text-3xl font-bold sm:text-4xl">
                              {formatPrice(estimate.low)}/-
                            </p>
                            <p className="mt-2 text-xs text-accent font-medium">
                              Advance Payable Now (50%): {formatPrice(Math.round(estimate.low / 2))}/- | Remaining: {formatPrice(Math.round(estimate.low / 2))}/-
                            </p>
                          </div>

                          <div className="rounded-xl border border-border bg-background/40 p-4">
                            <p className="flex items-center gap-2 text-xs text-muted-foreground">
                              <CalendarClock className="size-4 text-accent" /> Timeline
                            </p>
                            <p className="font-display mt-2 text-xl font-bold">{estimate.weeks} weeks</p>
                          </div>
                          <div className="rounded-xl border border-border bg-background/40 p-4">
                            <p className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Users className="size-4 text-accent" /> Core team
                            </p>
                            <p className="font-display mt-2 text-xl font-bold">{estimate.teamText}</p>
                          </div>
                          <div className="rounded-xl border border-border bg-background/40 p-4">
                            <p className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Gauge className="size-4 text-accent" /> Add-ons
                            </p>
                            <p className="font-display mt-2 text-xl font-bold">{features.filter((f) => !currentPkgObj.includedFeatureIds.includes(f)).length} selected</p>
                          </div>
                        </div>

                        <div className="mt-5 rounded-xl border border-border bg-background/40 p-4">
                          <h4 className="font-display text-sm font-bold mb-3 flex items-center gap-2 text-foreground">
                            <FileText className="size-4 text-accent" /> Extra Add-ons Selected
                          </h4>
                          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 text-xs">
                            {allAvailableFeatures
                              .filter((f) => features.includes(f.id) && !currentPkgObj.includedFeatureIds.includes(f.id))
                              .map((feat) => (
                                <div key={feat.id} className="flex items-center justify-between py-1.5 border-b border-border/50">
                                  <span className="text-foreground font-medium">✔ {feat.label}</span>
                                  <span className="font-mono text-accent font-semibold">+{formatPrice(feat.cost)}</span>
                                </div>
                              ))}

                            {features.filter((f) => !currentPkgObj.includedFeatureIds.includes(f)).length === 0 && (
                              <p className="text-muted-foreground text-center py-2">No additional add-ons selected (Package base only)</p>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-3.5 flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            💳 50% Advance Payment Required to confirm order & create billing record:
                          </span>
                          <span className="font-mono font-bold text-accent text-sm">
                            {formatPrice(Math.round(estimate.low / 2))}/-
                          </span>
                        </div>

                        <div className="mt-5 space-y-3">
                          {/* Razorpay Button */}
                          <button
                            type="button"
                            onClick={handlePaymentAndSubmit}
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_rgba(21,101,255,0.45)] transition-all hover:shadow-[0_0_46px_rgba(0,212,255,0.55)] disabled:opacity-50"
                          >
                            <Send className="size-4" />
                            {loading ? 'Processing Payment...' : `Pay via Razorpay (${formatPrice(Math.round(estimate.low / 2))})`}
                          </button>

                          <div className="relative flex py-1 items-center">
                            <div className="flex-grow border-t border-border"></div>
                            <span className="flex-shrink mx-4 text-xs uppercase font-mono text-muted-foreground">OR</span>
                            <div className="flex-grow border-t border-border"></div>
                          </div>

                          {/* PayPal Buttons */}
                          <div className="w-full z-0">
                            <PayPalButtons
                              style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
                              createOrder={(data, actions) => {
                                const advanceAmountINR = Math.round(estimate.low / 2);
                                // Using accurate market conversion rate (1 USD = 86 INR)
                                const advanceAmountUSD = (advanceAmountINR / USD_RATE).toFixed(2);
                                
                                return actions.order.create({
                                  intent: "CAPTURE",
                                  purchase_units: [
                                    {
                                      amount: {
                                        currency_code: "USD",
                                        value: advanceAmountUSD,
                                      },
                                    },
                                  ],
                                });
                              }}
                              onApprove={async (data, actions) => {
                                if (actions.order) {
                                  setLoading(true);
                                  const details = await actions.order.capture();
                                  const paypalPaymentId = details.id || "PAYPAL_SUCCESS";
                                  await handlePayPalSuccess(paypalPaymentId);
                                }
                              }}
                              onError={(err) => {
                                console.error("PayPal Checkout Error:", err);
                                alert("Something went wrong with PayPal payment.");
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {!submitted && step > 0 && (
              <div className="mt-8 flex items-center justify-between gap-3 border-t border-border/70 pt-5">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent/40"
                >
                  <ArrowLeft className="size-4" /> Back
                </button>

                {step >= 3 ? (
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase font-mono">Total / Advance</p>
                    <p className="font-mono text-sm font-bold text-accent">
                      Total: {formatPrice(estimate.low)} | Advance: {formatPrice(Math.round(estimate.low / 2))}
                    </p>
                  </div>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={step === 4}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_28px_rgba(21,101,255,0.45)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue <ArrowRight className="size-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}