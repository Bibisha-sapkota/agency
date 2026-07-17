import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Zap, PlusCircle, Settings, Gem, Globe, TrendingUp,
  BarChart3, Wallet, Target, ArrowLeft, Building2,
  ChevronRight, Activity, Shield, Users, Send,
  Clock, CheckCircle2, XCircle, RefreshCw, Banknote,
  MapPin, Award, AlertTriangle, LayoutDashboard,
  History, Bell, Sliders, Edit, Trash2, Plus, ChevronDown,
  Lock, FileText, CheckSquare, CreditCard, Webhook, Server,
  Terminal, ShieldCheck, PieChart
} from 'lucide-react'
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

export default function DiamondAgencyPage() {
  const [activeSideTab, setActiveSideTab] = useState('pkg_all')
  const [expandedGroups, setExpandedGroups] = useState({ diamond_packages: true, agency: true })

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }))
  }

  // ---- Diamond Packages State ----
  const [packages, setPackages] = useState([
    { id: 'PK-1', name: 'Small Diamond Pack', diamonds: 100, price: 0.99, bonusPct: 10, sold: 110, status: 'active' },
    { id: 'PK-2', name: 'Medium Diamond Pack', diamonds: 310, price: 2.99, bonusPct: 12, sold: 347, status: 'active' },
    { id: 'PK-3', name: 'Large Diamond Pack', diamonds: 1060, price: 9.99, bonusPct: 14, sold: 1208, status: 'active' },
    { id: 'PK-4', name: 'Mega Diamond Pack', diamonds: 2200, price: 19.99, bonusPct: 18, sold: 2596, status: 'active' },
    { id: 'PK-5', name: 'Super Diamond Pack', diamonds: 5000, price: 39.99, bonusPct: 20, sold: 775, status: 'active' },
    { id: 'PK-6', name: 'Ultra Diamond Pack', diamonds: 10000, price: 79.99, bonusPct: 25, sold: 400, status: 'active' }
  ])
  const [pkgSearch, setPkgSearch] = useState('')
  const [pkgStatusFilter, setPkgStatusFilter] = useState('All Status')
  const [pkgSettings, setPkgSettings] = useState({
    autoPublish: true,
    displayInStore: true,
    allowGift: true,
    maxPerTransaction: 50000
  })

  const totalRevenue = packages.reduce((s, p) => s + p.price * p.sold, 0)
  const activePackages = packages.filter((p) => p.status === 'active').length
  const disabledPackages = packages.filter((p) => p.status === 'disabled').length
  const totalDiamondsSold = packages.reduce((s, p) => s + p.diamonds * p.sold, 0)
  const totalOrders = packages.reduce((s, p) => s + p.sold, 0)

  const togglePackageStatus = (id) => {
    setPackages((ps) => ps.map((p) => (p.id === id ? { ...p, status: p.status === 'active' ? 'disabled' : 'active' } : p)))
  }
  const deletePackage = (id) => {
    setPackages((ps) => ps.filter((p) => p.id !== id))
  }

  const filteredPackages = packages.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(pkgSearch.toLowerCase())
    const matchesStatus = pkgStatusFilter === 'All Status' || p.status === pkgStatusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  // ---- New Package Form State ----
  const [newPkgName, setNewPkgName] = useState('')
  const [newPkgDiamonds, setNewPkgDiamonds] = useState(100)
  const [newPkgPrice, setNewPkgPrice] = useState(0.99)
  const [newPkgBonus, setNewPkgBonus] = useState(10)

  // ---- Withdrawals State ----
  const [withdrawals, setWithdrawals] = useState([
    { id: 'WD-5001', requester: 'Ramesh Kumar', agency: 'Royal Diamond Agency', amount: 123.50, fraudRisk: 'Low', fraudScore: 8, kyc: 'Verified', status: 'Pending' },
    { id: 'WD-5002', requester: 'Priya Sharma', agency: 'Crown Diamonds Pvt Ltd', amount: 427.50, fraudRisk: 'High', fraudScore: 62, kyc: 'Mismatch', status: 'Pending' },
    { id: 'WD-5003', requester: 'Aarav Shrestha', agency: 'Royal Diamond Agency', amount: 31.82, fraudRisk: 'Low', fraudScore: 4, kyc: 'Verified', status: 'Pending' },
    { id: 'WD-5004', requester: 'David Osei', agency: 'Crown Diamonds Pvt Ltd', amount: 989.90, fraudRisk: 'High', fraudScore: 88, kyc: 'Mismatch', status: 'Pending' }
  ])
  const [withdrawalRules, setWithdrawalRules] = useState({ enabled: true, maxAmount: 50, maxScore: 20, requireKyc: true })

  const safeWithdrawals = withdrawals.filter(w => w.amount <= withdrawalRules.maxAmount && w.fraudScore <= withdrawalRules.maxScore && (withdrawalRules.requireKyc ? w.kyc === 'Verified' : true) && w.status === 'Pending')

  // ---- Agent Wallet State ----
  const [agentWallets] = useState([
    { id: 1, name: 'Aarav Shrestha', agency: 'Royal Streamers', region: 'NEPAL', beans: 420, bonus: 170, gift: 250, loanStatus: 'Active' },
    { id: 2, name: 'Sima Koirala', agency: 'Asia Live Group', region: 'INDIA', beans: 310, bonus: 100, gift: 210, loanStatus: 'Approved' },
    { id: 3, name: 'Jay Patel', agency: 'Coin Agency', region: 'SINGAPORE', beans: 280, bonus: 90, gift: 140, loanStatus: 'None' },
    { id: 4, name: 'Nina Tamang', agency: 'Global Talents', region: 'USA', beans: 400, bonus: 200, gift: 250, loanStatus: 'Pending' }
  ])
  const [sendCoinForm, setSendCoinForm] = useState({ agentId: 1, amount: '', note: '' })
  
  // ---- Loans State ----
  const [loans] = useState([
    { id: 'LOAN-101', agent: 'Aarav Shrestha', amount: 1200, tenor: '30 days', status: 'Active', disbursed: '05 Jul 2026' },
    { id: 'LOAN-102', agent: 'Sima Koirala', amount: 800, tenor: '21 days', status: 'Approved', disbursed: '06 Jul 2026' },
    { id: 'LOAN-103', agent: 'Nina Tamang', amount: 1500, tenor: '45 days', status: 'Pending', disbursed: '07 Jul 2026' }
  ])

  // Shared state for sub-agencies
  const [subAgencies, setSubAgencies] = useState([
    { id: 'AG-201', name: 'Alpha Agency', head: 'Karan Sharma', region: 'India', coins: 150000, status: 'Active' },
    { id: 'AG-202', name: 'Sagar Streamers', head: 'Sagar Adhikari', region: 'Nepal', coins: 95000, status: 'Active' },
    { id: 'AG-203', name: 'Royal Gaming', head: 'Sophia Rai', region: 'Nepal', coins: 50000, status: 'Suspended' }
  ])

  // Create Agency Form
  const [newAgencyName, setNewAgencyName] = useState('')
  const [newAgencyHead, setNewAgencyHead] = useState('')
  const [newAgencyRegion, setNewAgencyRegion] = useState('Nepal')
  const [initialCoins, setInitialCoins] = useState(20000)

  // Distribution
  const [distributionLedger, setDistributionLedger] = useState([
    { date: '2026-07-17 07:35', target: 'Alpha Agency', amount: '50,000 Coins', status: 'Success' },
    { date: '2026-07-16 14:20', target: 'Sagar Streamers', amount: '15,000 Blue Diamonds', status: 'Success' }
  ])
  const [distTarget, setDistTarget] = useState('AG-201')
  const [distAmount, setDistAmount] = useState(10000)
  const [distAsset, setDistAsset] = useState('E-Rupee Coins')

  // Platform Integration
  const [webhookLogs, setWebhookLogs] = useState([
    { time: '07:51:02', event: 'Heartbeat Ping', source: 'Super Admin Gateway', status: '200 OK' }
  ])
  const [isApiConnected, setIsApiConnected] = useState(true)

  // Expansion
  const [selectedExpansionRegion, setSelectedExpansionRegion] = useState('All Regions')

  // Commission
  const [availableCommission, setAvailableCommission] = useState(725000)
  const [withdrawAmount, setWithdrawAmount] = useState(100000)
  const [commissionHistory, setCommissionHistory] = useState([
    { id: 'CP-001', agency: 'Alpha Agency', type: 'Monthly Payout', beans: 250000, erupee: 2500, date: '2026-07-01', status: 'Paid' },
    { id: 'CP-002', agency: 'Sagar Streamers', type: 'Bonus Commission', beans: 80000, erupee: 800, date: '2026-07-05', status: 'Paid' },
    { id: 'CP-003', agency: 'Royal Gaming', type: 'Monthly Payout', beans: 45000, erupee: 450, date: '2026-07-10', status: 'Pending' },
    { id: 'CP-004', agency: 'Alpha Agency', type: 'Performance Bonus', beans: 120000, erupee: 1200, date: '2026-07-14', status: 'Processing' },
  ])
  const [payoutForm, setPayoutForm] = useState({ agency: 'AG-201', type: 'Monthly Payout', beans: '' })

  // Target
  const [targetSales] = useState(1500000)
  const [currentSales] = useState(1050000)

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Agency Registered', message: 'Omega Stream Team just joined your network.', time: '2 hours ago', read: false },
    { id: 2, title: 'Commission Processed', message: '100,000 Beans successfully converted to E-Rupee.', time: '5 hours ago', read: false },
    { id: 3, title: 'System Alert', message: 'Scheduled maintenance this weekend.', time: '1 day ago', read: true }
  ])

  // Settings
  const [agencySettings, setAgencySettings] = useState({
    email: 'admin@diamondagency.com',
    phone: '+977-9800000000',
    notifyEmail: true,
    notifySms: false
  })

  // ---- System Configuration State ----
  const [paymentGateways, setPaymentGateways] = useState([
    { id: 'gw_stripe', name: 'Stripe', status: 'Active', type: 'Credit Card', keys: { pub: 'pk_live_********89', sec: 'sk_live_********2x' } },
    { id: 'gw_paypal', name: 'PayPal', status: 'Inactive', type: 'Wallet', keys: { pub: 'client_********ab', sec: 'secret_********9z' } },
    { id: 'gw_esewa', name: 'eSewa', status: 'Active', type: 'Local Wallet', keys: { pub: 'epay_********11', sec: 'esewa_********99' } }
  ])
  const [editingGwId, setEditingGwId] = useState(null)
  const [editGwForm, setEditGwForm] = useState({ pub: '', sec: '' })
  
  const [webhooks, setWebhooks] = useState([
    { id: 'wh_1', url: 'https://api.diamondagency.com/webhook', events: ['package.purchased', 'withdrawal.requested'], status: 'Active' }
  ])
  
  const [webhookLogsList, setWebhookLogsList] = useState([
    { id: 1, time: '10:05 AM', event: 'package.purchased', response: '200 OK', success: true },
    { id: 2, time: '09:12 AM', event: 'withdrawal.requested', response: '500 Server Error', success: false },
    { id: 3, time: '08:45 AM', event: 'package.purchased', response: '200 OK', success: true }
  ])

  const [securityLogs, setSecurityLogs] = useState([
    { id: 1, action: 'Payment Gateway Updated', ip: '192.168.1.45', user: 'Admin (Karan)', date: '2026-07-17 08:30 AM' },
    { id: 2, action: 'Webhook Endpoint Changed', ip: '10.0.0.12', user: 'System', date: '2026-07-16 11:15 AM' },
    { id: 3, action: 'Auto-Approval Rules Edited', ip: '192.168.1.45', user: 'Admin (Karan)', date: '2026-07-15 02:45 PM' }
  ])

  // History
  const [activityHistory] = useState([
    { id: 1, action: 'Created Agency', detail: 'Sagar Streamers created', date: '2026-07-16 10:00' },
    { id: 2, action: 'Distributed Coins', detail: 'Sent 15,000 to Alpha Agency', date: '2026-07-15 14:30' },
    { id: 3, action: 'Withdrew Commission', detail: '50,000 Beans withdrawn', date: '2026-07-14 09:15' }
  ])

  const [systemUsers, setSystemUsers] = useState([
    { id: 'U-1001', name: 'Karan Admin', role: 'Super Admin', email: 'karan@erupai.com', status: 'Active' },
    { id: 'U-1002', name: 'Sagar Support', role: 'Support Agent', email: 'sagar@erupai.com', status: 'Active' },
    { id: 'U-1003', name: 'Ramesh Manager', role: 'Regional Manager', email: 'ramesh@erupai.com', status: 'Inactive' }
  ])
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'Support Agent', status: 'Active' })

  const menuGroups = [
    {
      id: 'dashboard',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      key: 'dashboard'
    },
    {
      id: 'diamond_packages',
      label: 'Diamond Packages',
      icon: Gem,
      subItems: [
        { key: 'pkg_all', label: 'All Packages' },
        { key: 'pkg_add', label: 'Add New Package' },
        { key: 'pkg_analytics', label: 'Sales Analytics' },
        { key: 'pkg_settings', label: 'Package Settings' }
      ]
    },
    {
      id: 'agent_wallet',
      label: 'Agent Wallet',
      icon: Wallet,
      subItems: [
        { key: 'wallet_beans', label: 'Bean Wallet' },
        { key: 'wallet_send', label: 'Send Coin' },
        { key: 'wallet_loans', label: 'Loan Management' }
      ]
    },
    {
      id: 'withdrawals',
      label: 'Withdrawal Approvals',
      icon: CheckSquare,
      key: 'withdrawals'
    },
    {
      id: 'agency',
      label: 'Diamond Agency',
      icon: Building2,
      subItems: [
        { key: 'platform', label: 'Platform Integration' },
        { key: 'create', label: 'Create New Agencies' },
        { key: 'manage', label: 'Manage Agencies' },
        { key: 'distribution', label: 'Coin Distribution' },
        { key: 'expansion', label: 'Business Expansion' },
        { key: 'revenue', label: 'Revenue Generation' },
        { key: 'performance', label: 'Performance Metrics' },
        { key: 'commission', label: 'Commission Payouts' },
        { key: 'target', label: 'Target Monitoring' },
        { key: 'settings', label: 'Agency Settings' }
      ]
    },
    {
      id: 'user_management',
      label: 'Users & Activity',
      icon: Users,
      subItems: [
        { key: 'users', label: 'User Directory' },
        { key: 'history', label: 'Activity History' },
        { key: 'notifications', label: 'Notifications' }
      ]
    },
    {
      id: 'system_config',
      label: 'System Config',
      icon: Server,
      subItems: [
        { key: 'sys_payment', label: 'Payment Gateway' },
        { key: 'sys_security', label: 'Security & Audit' }
      ]
    }
  ]

  const exportSecurityLogsToCSV = () => {
    const headers = ['TIMESTAMP', 'ADMIN / USER', 'ACTION TAKEN', 'IP ADDRESS']
    const csvRows = securityLogs.map(log => `"${log.date}","${log.user}","${log.action}","${log.ip}"`)
    const csvContent = [headers.join(','), ...csvRows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'security_audit_logs.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCreateAgency = (e) => {
    e.preventDefault()
    if (!newAgencyName || !newAgencyHead) return
    const newAg = {
      id: `AG-${Math.floor(200 + Math.random() * 800)}`,
      name: newAgencyName,
      head: newAgencyHead,
      region: newAgencyRegion,
      coins: initialCoins,
      status: 'Active'
    }
    setSubAgencies([newAg, ...subAgencies])
    setNewAgencyName('')
    setNewAgencyHead('')
  }

  const handleDistribute = (e) => {
    e.preventDefault()
    const targetAg = subAgencies.find(a => a.id === distTarget)
    if (!targetAg) return
    setSubAgencies(subAgencies.map(a => {
      if (a.id === distTarget && distAsset === 'E-Rupee Coins') {
        return { ...a, coins: a.coins + distAmount }
      }
      return a
    }))
    const log = {
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      target: targetAg.name,
      amount: `${distAmount.toLocaleString()} ${distAsset}`,
      status: 'Success'
    }
    setDistributionLedger([log, ...distributionLedger])
  }

  const toggleAgencyStatus = (id) => {
    setSubAgencies(subAgencies.map(a => {
      if (a.id === id) return { ...a, status: a.status === 'Active' ? 'Suspended' : 'Active' }
      return a
    }))
  }

  const renderPanel = () => {
    switch (activeSideTab) {
      case 'pkg_all':
        const handleExport = () => {
          const headers = ['Package ID,Name,Diamonds,Price(USD),Bonus(%),Sold,Status']
          const rows = packages.map(p => `${p.id},"${p.name}",${p.diamonds},${p.price},${p.bonusPct},${p.sold},${p.status}`)
          const csv = headers.concat(rows).join('\n')
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'diamond_packages.csv'
          a.click()
          URL.revokeObjectURL(url)
        }
        
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={handleExport}
                className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                Export
              </button>
              <button 
                onClick={() => setActiveSideTab('pkg_add')}
                className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" /> Add Diamond Package
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mb-3">
                  <Gem className="w-4 h-4 text-[#E51E25]" />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Total Diamonds Sold</div>
                <div className="text-2xl font-black text-slate-800 mt-1">{totalDiamondsSold.toLocaleString()}</div>
                <div className="text-xs font-semibold text-green-600 mt-1">↑ vs last 7 days</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mb-3">
                  <Banknote className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Total Revenue</div>
                <div className="text-2xl font-black text-slate-800 mt-1">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                <div className="text-xs font-semibold text-green-600 mt-1">↑ vs last 7 days</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Active Packages</div>
                <div className="text-2xl font-black text-slate-800 mt-1">{activePackages}</div>
                <div className="text-xs font-semibold text-green-600 mt-1">100% active</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center mb-3">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Total Orders</div>
                <div className="text-2xl font-black text-slate-800 mt-1">{totalOrders.toLocaleString()}</div>
                <div className="text-xs font-semibold text-green-600 mt-1">↑ vs last 7 days</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="Search diamond package..." 
                    value={pkgSearch}
                    onChange={(e) => setPkgSearch(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                  <select 
                    value={pkgStatusFilter}
                    onChange={(e) => setPkgStatusFilter(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Disabled</option>
                  </select>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-400 font-bold text-xs uppercase">
                        <tr>
                          <th className="p-4 w-10"></th>
                          <th className="p-4">Package Name</th>
                          <th className="p-4">Diamonds</th>
                          <th className="p-4">Price</th>
                          <th className="p-4">Bonus</th>
                          <th className="p-4">Total</th>
                          <th className="p-4 text-center">Status</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredPackages.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/50">
                            <td className="p-4"><input type="checkbox" className="rounded border-slate-300 text-red-600 focus:ring-red-500" /></td>
                            <td className="p-4 font-bold text-slate-800 flex items-center gap-2">
                              <div className="w-6 h-6 rounded bg-red-50 flex items-center justify-center shrink-0">
                                <Gem className="w-3 h-3 text-[#E51E25]" />
                              </div>
                              {p.name}
                            </td>
                            <td className="p-4 font-mono">{p.diamonds}</td>
                            <td className="p-4 font-mono font-bold">${p.price}</td>
                            <td className="p-4 font-mono text-green-600">+{Math.floor(p.diamonds * (p.bonusPct / 100))} ({p.bonusPct}%)</td>
                            <td className="p-4 font-mono font-black">{p.diamonds + Math.floor(p.diamonds * (p.bonusPct / 100))}</td>
                            <td className="p-4 text-center">
                              <button 
                                onClick={() => togglePackageStatus(p.id)}
                                className={`w-11 h-6 rounded-full relative transition-colors inline-block ${p.status === 'active' ? 'bg-[#E51E25]' : 'bg-slate-200'}`}
                              >
                                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${p.status === 'active' ? 'translate-x-5' : ''}`} />
                              </button>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-2">
                                <button className="p-1.5 text-slate-400 hover:text-[#E51E25] hover:bg-red-50 rounded-lg transition-colors">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => deletePackage(p.id)} className="p-1.5 text-slate-400 hover:text-[#E51E25] hover:bg-red-50 rounded-lg transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Package Settings Sidebar */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit space-y-6">
                <h4 className="font-extrabold text-slate-800 flex items-center gap-2"><Settings className="w-5 h-5 text-slate-400" /> Diamond Package Settings</h4>
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">Auto Publish New Package</div>
                      <div className="text-xs text-slate-500 mt-0.5">Automatically publish new diamond packages</div>
                    </div>
                    <button 
                      onClick={() => setPkgSettings({...pkgSettings, autoPublish: !pkgSettings.autoPublish})}
                      className={`w-10 h-6 rounded-full relative transition-colors shrink-0 ${pkgSettings.autoPublish ? 'bg-[#E51E25]' : 'bg-slate-200'}`}
                    >
                      <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${pkgSettings.autoPublish ? 'translate-x-4' : ''}`} />
                    </button>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">Display In Store</div>
                      <div className="text-xs text-slate-500 mt-0.5">Show diamond packages in user store</div>
                    </div>
                    <button 
                      onClick={() => setPkgSettings({...pkgSettings, displayInStore: !pkgSettings.displayInStore})}
                      className={`w-10 h-6 rounded-full relative transition-colors shrink-0 ${pkgSettings.displayInStore ? 'bg-[#E51E25]' : 'bg-slate-200'}`}
                    >
                      <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${pkgSettings.displayInStore ? 'translate-x-4' : ''}`} />
                    </button>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">Allow Gift</div>
                      <div className="text-xs text-slate-500 mt-0.5">Allow users to send diamonds as gifts</div>
                    </div>
                    <button 
                      onClick={() => setPkgSettings({...pkgSettings, allowGift: !pkgSettings.allowGift})}
                      className={`w-10 h-6 rounded-full relative transition-colors shrink-0 ${pkgSettings.allowGift ? 'bg-[#E51E25]' : 'bg-slate-200'}`}
                    >
                      <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${pkgSettings.allowGift ? 'translate-x-4' : ''}`} />
                    </button>
                  </div>
                  <div className="pt-2">
                    <div className="font-bold text-slate-800 text-sm mb-2">Maximum Diamonds Per Transaction</div>
                    <input 
                      type="number" 
                      value={pkgSettings.maxPerTransaction} 
                      onChange={(e) => setPkgSettings({...pkgSettings, maxPerTransaction: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'pkg_analytics':
        const bestPerformer = packages.reduce((prev, curr) => (curr.sold * curr.price > prev.sold * prev.price) ? curr : prev, packages[0])
        const bestRevenue = bestPerformer.sold * bestPerformer.price
        const avgBonus = Math.round(packages.reduce((s, p) => s + p.bonusPct, 0) / packages.length)
        
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2 mb-2"><Banknote className="w-4 h-4 text-green-500"/> 7-Day Revenue</div>
                <div className="text-2xl lg:text-3xl font-black text-slate-800">${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                <div className="text-xs font-semibold text-green-600 mt-1">all packages</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-blue-500"/> Best Performer</div>
                <div className="text-xl lg:text-2xl font-black text-slate-800 truncate">{bestPerformer.name}</div>
                <div className="text-xs font-semibold text-green-600 mt-1">${bestRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})} revenue</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2 mb-2"><Award className="w-4 h-4 text-[#E51E25]"/> Avg. Bonus Offered</div>
                <div className="text-2xl lg:text-3xl font-black text-slate-800">{avgBonus}%</div>
                <div className="text-xs font-semibold text-green-600 mt-1">across packages</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-lg mb-6">Revenue by Package</h4>
              <div className="space-y-6">
                {[...packages].sort((a,b) => (b.sold*b.price) - (a.sold*a.price)).map(p => {
                  const rev = p.sold * p.price
                  const pct = Math.min(100, (rev / bestRevenue) * 100)
                  return (
                    <div key={p.id} className="flex items-center gap-4">
                      <div className="w-32 sm:w-48 text-sm font-semibold text-slate-600 truncate">{p.name}</div>
                      <div className="flex-1 h-4 bg-slate-100 rounded-r-full overflow-hidden flex items-center">
                        <div className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-r-full" style={{ width: `${pct}%` }}></div>
                      </div>
                      <div className="w-24 text-right font-mono font-bold text-slate-700">${rev.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      
      case 'pkg_settings':
        return (
          <div className="space-y-6 max-w-2xl">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <h4 className="font-extrabold text-slate-800 text-lg flex items-center gap-2"><Settings className="w-5 h-5 text-[#E51E25]" /> Global Package Configurations</h4>
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Auto Publish New Package</div>
                    <div className="text-xs text-slate-500 mt-1">Automatically push newly created diamond packages live to the store immediately.</div>
                  </div>
                  <button 
                    onClick={() => setPkgSettings({...pkgSettings, autoPublish: !pkgSettings.autoPublish})}
                    className={`w-12 h-7 rounded-full relative transition-colors shrink-0 ${pkgSettings.autoPublish ? 'bg-[#E51E25]' : 'bg-slate-300'}`}
                  >
                    <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${pkgSettings.autoPublish ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Display In Store</div>
                    <div className="text-xs text-slate-500 mt-1">Make diamond packages visible and purchasable in the public user store interface.</div>
                  </div>
                  <button 
                    onClick={() => setPkgSettings({...pkgSettings, displayInStore: !pkgSettings.displayInStore})}
                    className={`w-12 h-7 rounded-full relative transition-colors shrink-0 ${pkgSettings.displayInStore ? 'bg-[#E51E25]' : 'bg-slate-300'}`}
                  >
                    <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${pkgSettings.displayInStore ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Allow Gifting Diamonds</div>
                    <div className="text-xs text-slate-500 mt-1">Allow users to purchase diamonds and send them directly to other users as gifts.</div>
                  </div>
                  <button 
                    onClick={() => setPkgSettings({...pkgSettings, allowGift: !pkgSettings.allowGift})}
                    className={`w-12 h-7 rounded-full relative transition-colors shrink-0 ${pkgSettings.allowGift ? 'bg-[#E51E25]' : 'bg-slate-300'}`}
                  >
                    <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${pkgSettings.allowGift ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <div className="font-bold text-slate-800 text-sm mb-1">Maximum Diamonds Per Transaction</div>
                  <div className="text-xs text-slate-500 mb-3">Hard limit on how many diamonds can be purchased or transferred in a single session.</div>
                  <input 
                    type="number" 
                    value={pkgSettings.maxPerTransaction} 
                    onChange={(e) => setPkgSettings({...pkgSettings, maxPerTransaction: Number(e.target.value)})}
                    className="w-full max-w-sm bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 'pkg_add':
        const handleAddPackage = (e) => {
          e.preventDefault()
          if(!newPkgName) return
          const newPkg = {
            id: `PK-${Math.floor(100+Math.random()*900)}`,
            name: newPkgName,
            diamonds: newPkgDiamonds,
            price: newPkgPrice,
            bonusPct: newPkgBonus,
            sold: 0,
            status: 'active'
          }
          setPackages([...packages, newPkg])
          setNewPkgName('')
          setNewPkgDiamonds(100)
          setNewPkgPrice(0.99)
          setNewPkgBonus(10)
          setActiveSideTab('pkg_all')
        }
        return (
          <div className="space-y-6 max-w-2xl">
            <form onSubmit={handleAddPackage} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <h4 className="font-extrabold text-slate-800 text-lg flex items-center gap-2"><Plus className="w-5 h-5 text-[#E51E25]" /> Create Diamond Package</h4>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Package Name</label>
                  <input type="text" required value={newPkgName} onChange={(e) => setNewPkgName(e.target.value)} placeholder="e.g. Starter Diamond Pack" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Diamonds Base Amount</label>
                    <input type="number" required value={newPkgDiamonds} onChange={(e) => setNewPkgDiamonds(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Price (USD)</label>
                    <input type="number" step="0.01" required value={newPkgPrice} onChange={(e) => setNewPkgPrice(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Bonus Diamonds (%)</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min="0" max="100" value={newPkgBonus} onChange={(e) => setNewPkgBonus(Number(e.target.value))} className="flex-1 accent-red-600" />
                    <span className="w-12 text-right font-mono font-bold text-slate-700">{newPkgBonus}%</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-red-100 bg-red-50 flex justify-between items-center">
                  <div className="font-bold text-slate-800 text-sm">Total Diamonds to User:</div>
                  <div className="font-mono font-black text-xl text-[#E51E25]">{newPkgDiamonds + Math.floor(newPkgDiamonds * (newPkgBonus/100))}</div>
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full bg-[#E51E25] hover:bg-[#c4161c] text-white py-3 rounded-xl text-sm font-bold shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    Publish Package
                  </button>
                </div>
              </div>
            </form>
          </div>
        )

      case 'withdrawals':
        const handleBulkApprove = () => {
          const safeIds = safeWithdrawals.map(w => w.id)
          setWithdrawals(withdrawals.map(w => safeIds.includes(w.id) ? { ...w, status: 'Approved' } : w))
        }
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-red-500" />
                <span className="font-extrabold text-slate-800">{withdrawals.filter(w=>w.status==='Pending').length} pending withdrawals</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-xs uppercase">
                    <tr><th className="p-4">ID</th><th className="p-4">Requester</th><th className="p-4">Net Amount</th><th className="p-4">Fraud Risk</th><th className="p-4">KYC</th><th className="p-4">Status</th><th className="p-4 text-center">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {withdrawals.filter(w=>w.status==='Pending').map(w => (
                      <tr key={w.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-mono font-bold text-[#E51E25]">{w.id}</td>
                        <td className="p-4">
                          <div className="font-bold text-slate-800">{w.requester}</div>
                          <div className="text-xs text-slate-500">{w.agency}</div>
                        </td>
                        <td className="p-4 font-mono font-bold">${w.amount.toFixed(2)}</td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${w.fraudRisk==='Low'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{w.fraudRisk} • {w.fraudScore}</span>
                        </td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${w.kyc==='Verified'?'bg-green-100 text-green-700':'bg-amber-100 text-amber-700'}`}>{w.kyc}</span>
                        </td>
                        <td className="p-4"><span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600">{w.status}</span></td>
                        <td className="p-4 text-center"><button className="text-xs font-bold text-[#E51E25] hover:underline">Review</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl mt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-extrabold text-emerald-800 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Bulk Approve — Safe Requests</h4>
                  <p className="text-xs text-emerald-600 mt-1">Meets auto-rules: ≤ ${withdrawalRules.maxAmount} net, fraud score ≤ {withdrawalRules.maxScore}, KYC {withdrawalRules.requireKyc ? 'verified' : 'optional'}.</p>
                </div>
                <button onClick={handleBulkApprove} disabled={safeWithdrawals.length===0} className="bg-emerald-600 disabled:bg-emerald-300 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all">
                  Approve Selected ({safeWithdrawals.length})
                </button>
              </div>
              {safeWithdrawals.length > 0 && (
                <div className="bg-white rounded-xl overflow-hidden border border-emerald-100">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                    <thead className="bg-emerald-50 text-emerald-700 font-bold text-xs uppercase">
                      <tr><th className="p-3 w-10"><input type="checkbox" checked readOnly className="rounded text-emerald-600" /></th><th className="p-3">ID</th><th className="p-3">Requester</th><th className="p-3">Net Amount</th><th className="p-3">Fraud Score</th></tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-50">
                      {safeWithdrawals.map(w => (
                        <tr key={w.id}>
                          <td className="p-3"><input type="checkbox" checked readOnly className="rounded text-emerald-600" /></td>
                          <td className="p-3 font-mono text-[#E51E25] font-bold text-xs">{w.id}</td>
                          <td className="p-3 text-emerald-900">{w.requester}</td>
                          <td className="p-3 font-mono font-bold text-emerald-900">${w.amount.toFixed(2)}</td>
                          <td className="p-3 font-mono text-emerald-700">{w.fraudScore}/100</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h4 className="font-extrabold text-slate-800 flex items-center gap-2 mb-4"><Settings className="w-5 h-5 text-[#E51E25]" /> Auto-Approval Rules</h4>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" checked={withdrawalRules.enabled} onChange={e=>setWithdrawalRules({...withdrawalRules,enabled:e.target.checked})} className="rounded text-red-600 w-4 h-4" />
                    <span className="font-bold text-slate-700 text-sm">Enable auto-eligibility for bulk approval</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Max net amount (USD)</label>
                      <input type="number" value={withdrawalRules.maxAmount} onChange={e=>setWithdrawalRules({...withdrawalRules,maxAmount:Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Max fraud score (0-100)</label>
                      <input type="number" value={withdrawalRules.maxScore} onChange={e=>setWithdrawalRules({...withdrawalRules,maxScore:Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                    </div>
                  </div>
                  <label className="flex items-center gap-3 pt-2">
                    <input type="checkbox" checked={withdrawalRules.requireKyc} onChange={e=>setWithdrawalRules({...withdrawalRules,requireKyc:e.target.checked})} className="rounded text-red-600 w-4 h-4" />
                    <span className="font-bold text-slate-700 text-sm">Require KYC status = Verified</span>
                  </label>
                  <button className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95 w-max mt-2">Save Rules</button>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h4 className="font-extrabold text-slate-800 flex items-center gap-2 mb-4"><Lock className="w-5 h-5 text-slate-400" /> Audit Log <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider ml-2">Immutable • Read-only</span></h4>
                <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <FileText className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-700 text-sm">Panel initialized</div>
                    <div className="text-xs text-slate-500 mt-1">Withdrawal approval workflow enabled for Diamond Agency.</div>
                    <div className="text-xs text-slate-400 mt-2 font-mono">System • Jul 17, 2026, 08:46 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'wallet_beans':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="font-extrabold text-slate-800 flex items-center gap-2 text-lg"><Wallet className="w-5 h-5 text-[#E51E25]" /> Bean Wallet</h4>
                <p className="text-xs text-slate-500 mt-1">Track total beans, gifts, and platform bonuses for all agents.</p>
              </div>
              <div className="flex gap-4 flex-wrap">
                <div className="bg-slate-50 px-5 py-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Beans</div>
                  <div className="text-xl font-black text-slate-800">1,410</div>
                </div>
                <div className="bg-slate-50 px-5 py-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gift Beans</div>
                  <div className="text-xl font-black text-slate-800">850</div>
                </div>
                <div className="bg-slate-50 px-5 py-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Platform Bonus</div>
                  <div className="text-xl font-black text-slate-800">560</div>
                </div>
                <div className="bg-slate-50 px-5 py-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Avg Beans/Agent</div>
                  <div className="text-xl font-black text-slate-800">353</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {agentWallets.map(w => (
                <div key={w.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h5 className="font-extrabold text-slate-800 text-lg">{w.name}</h5>
                      <div className="text-xs text-slate-500">{w.agency}</div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">{w.region}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-6">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Beans</div>
                      <div className="text-xl font-black text-slate-800">{w.beans}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gift Beans</div>
                      <div className="text-xl font-black text-slate-800">{w.gift}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bonus</div>
                      <div className="text-xl font-black text-slate-800">{w.bonus}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Loan Status</div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block mt-1 ${
                        w.loanStatus === 'Active' ? 'bg-green-100 text-green-700' :
                        w.loanStatus === 'Approved' ? 'bg-blue-100 text-blue-700' :
                        w.loanStatus === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-500'
                      }`}>{w.loanStatus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'wallet_send':
        return (
          <div className="space-y-6 max-w-2xl">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div>
                <h4 className="font-extrabold text-slate-800 flex items-center gap-2 text-lg"><Send className="w-5 h-5 text-[#E51E25]" /> Send Coin</h4>
                <p className="text-xs text-slate-500 mt-1">Send beans directly to an agent's wallet from the platform reserve.</p>
              </div>
              <form onSubmit={e => { e.preventDefault(); setSendCoinForm({ agentId: 1, amount: '', note: '' }); alert('Coins Sent successfully!'); }} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2">Recipient agent</label>
                  <select 
                    value={sendCoinForm.agentId} 
                    onChange={e=>setSendCoinForm({...sendCoinForm, agentId: Number(e.target.value)})}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    {agentWallets.map(a => <option key={a.id} value={a.id}>{a.name} — {a.agency}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2">Amount (beans)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 500" 
                    required
                    value={sendCoinForm.amount}
                    onChange={e=>setSendCoinForm({...sendCoinForm, amount: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2">Note (optional)</label>
                  <textarea 
                    rows="3" 
                    placeholder="Reason for this transfer..." 
                    value={sendCoinForm.note}
                    onChange={e=>setSendCoinForm({...sendCoinForm, note: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 resize-none" 
                  />
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full bg-[#E51E25] hover:bg-[#c4161c] text-white py-3.5 rounded-xl text-sm font-bold shadow-sm active:scale-[0.98] transition-all flex justify-center items-center gap-2">
                    <Send className="w-4 h-4" /> Send Coin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )

      case 'wallet_loans':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                  <Banknote className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Active Loans</div>
                <div className="text-3xl font-black text-slate-800 mt-1">{loans.filter(l=>l.status==='Active').length}</div>
                <div className="text-xs font-semibold text-green-600 mt-1">currently active</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Pending Review</div>
                <div className="text-3xl font-black text-slate-800 mt-1">{loans.filter(l=>l.status==='Pending').length}</div>
                <div className="text-xs font-semibold text-green-600 mt-1">awaiting decision</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mb-4">
                  <span className="font-extrabold text-[#E51E25] text-lg">$</span>
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Outstanding</div>
                <div className="text-3xl font-black text-slate-800 mt-1">${loans.filter(l=>l.status!=='Pending').reduce((a,c)=>a+c.amount,0).toLocaleString(undefined,{minimumFractionDigits:2})}</div>
                <div className="text-xs font-semibold text-green-600 mt-1">active + approved</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="font-extrabold text-slate-800 text-lg">Loan Management</h4>
                  <p className="text-xs text-slate-500 mt-1">Track loan requests and outstanding balances for each agent.</p>
                </div>
                <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none text-slate-700">
                  <option>All</option>
                  <option>Active</option>
                  <option>Pending</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-xs uppercase">
                    <tr><th className="p-4">Loan ID</th><th className="p-4">Agent</th><th className="p-4">Amount</th><th className="p-4">Tenor</th><th className="p-4">Status</th><th className="p-4">Disbursed On</th><th className="p-4 text-center">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loans.map(l => (
                      <tr key={l.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-mono font-bold text-[#E51E25]">{l.id}</td>
                        <td className="p-4 font-bold text-slate-800">{l.agent}</td>
                        <td className="p-4 font-mono font-bold">${l.amount.toLocaleString()}</td>
                        <td className="p-4 text-slate-600">{l.tenor}</td>
                        <td className="p-4">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            l.status === 'Active' ? 'bg-green-100 text-green-700' :
                            l.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                            l.status === 'Pending' ? 'bg-amber-100 text-amber-700' : ''
                          }`}>{l.status}</span>
                        </td>
                        <td className="p-4 text-slate-500">{l.disbursed}</td>
                        <td className="p-4 text-center"><button className="text-xs font-bold text-[#E51E25] hover:underline">Review</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'dashboard':
        // Prepare pie chart data
        const pieData = [
          { name: 'Active Agencies', value: subAgencies.filter(a => a.status === 'Active').length, color: '#10B981' },
          { name: 'Suspended Agencies', value: subAgencies.filter(a => a.status === 'Suspended').length, color: '#EF4444' },
          { name: 'Total E-Rupees', value: subAgencies.reduce((acc, a) => acc + a.coins, 0) / 1000, color: '#3B82F6' },
          { name: 'Commission Beans', value: availableCommission / 1000, color: '#8B5CF6' }
        ]

        const regionData = [
          { name: 'Nepal', value: subAgencies.filter(a => a.region === 'Nepal').length, color: '#F59E0B' },
          { name: 'India', value: subAgencies.filter(a => a.region === 'India').length, color: '#06B6D4' },
          { name: 'Global', value: subAgencies.filter(a => a.region === 'Global').length, color: '#EC4899' }
        ]

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { label: 'Total Sub-Agencies', value: subAgencies.length, icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'Total E-Rupees', value: subAgencies.reduce((acc, a) => acc + a.coins, 0).toLocaleString(), icon: Banknote, color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'Active Agencies', value: subAgencies.filter(a => a.status === 'Active').length, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { label: 'Commission (Beans)', value: availableCommission.toLocaleString(), icon: Wallet, color: 'text-purple-500', bg: 'bg-purple-50' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} shrink-0`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-2xl font-black text-slate-800 truncate">{stat.value}</div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart - Agency Distribution */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h4 className="font-extrabold text-slate-800 flex items-center gap-2 mb-6"><PieChart className="w-5 h-5 text-[#E51E25]" /> Agency Distribution</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value.toLocaleString(), '']} />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value, entry) => (
                          <span className="text-xs font-semibold text-slate-600">{value}</span>
                        )}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart - Regional Distribution */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h4 className="font-extrabold text-slate-800 flex items-center gap-2 mb-6"><MapPin className="w-5 h-5 text-[#E51E25]" /> Regional Distribution</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'Agencies']} />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value, entry) => (
                          <span className="text-xs font-semibold text-slate-600">{value}</span>
                        )}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Agencies */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="font-extrabold text-slate-800 flex items-center gap-2"><Users className="w-5 h-5 text-[#E51E25]" /> Recent Agencies</h4>
                  <button onClick={() => setActiveSideTab('manage')} className="text-xs font-bold text-[#E51E25] hover:underline">View All</button>
                </div>
                <div className="divide-y divide-slate-100">
                  {subAgencies.slice(0, 3).map(a => (
                    <div key={a.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-800 truncate">{a.name}</div>
                        <div className="text-xs text-slate-500 truncate">{a.head} • {a.region}</div>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold shrink-0 ml-2 ${a.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Distributions */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="font-extrabold text-slate-800 flex items-center gap-2"><Clock className="w-5 h-5 text-[#E51E25]" /> Recent Transfers</h4>
                  <button onClick={() => setActiveSideTab('distribution')} className="text-xs font-bold text-[#E51E25] hover:underline">View Ledger</button>
                </div>
                <div className="divide-y divide-slate-100">
                  {distributionLedger.slice(0, 3).map((log, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-800 truncate">{log.target}</div>
                        <div className="text-xs text-slate-500 truncate">{log.date}</div>
                      </div>
                      <div className="font-mono font-bold text-[#E51E25] shrink-0 ml-2">{log.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Data Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Commission History */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="font-extrabold text-slate-800 flex items-center gap-2"><Award className="w-5 h-5 text-[#E51E25]" /> Commission History</h4>
                  <button onClick={() => setActiveSideTab('commission')} className="text-xs font-bold text-[#E51E25] hover:underline">View All</button>
                </div>
                <div className="divide-y divide-slate-100">
                  {commissionHistory.slice(0, 3).map((cp, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-800 truncate">{cp.agency}</div>
                        <div className="text-xs text-slate-500">{cp.type} • {cp.date}</div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <div className="font-mono font-bold text-slate-800">{cp.beans.toLocaleString()} Beans</div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${
                          cp.status === 'Paid' ? 'bg-green-50 text-green-600' :
                          cp.status === 'Processing' ? 'bg-blue-50 text-blue-600' :
                          'bg-amber-50 text-amber-600'
                        }`}>{cp.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loan Status */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="font-extrabold text-slate-800 flex items-center gap-2"><Banknote className="w-5 h-5 text-[#E51E25]" /> Loan Status</h4>
                  <button onClick={() => setActiveSideTab('wallet_loans')} className="text-xs font-bold text-[#E51E25] hover:underline">Manage Loans</button>
                </div>
                <div className="divide-y divide-slate-100">
                  {loans.slice(0, 3).map((loan, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-800 truncate">{loan.agent}</div>
                        <div className="text-xs text-slate-500">{loan.tenor} • {loan.disbursed}</div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <div className="font-mono font-bold text-slate-800">${loan.amount.toLocaleString()}</div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${
                          loan.status === 'Active' ? 'bg-green-50 text-green-600' :
                          loan.status === 'Approved' ? 'bg-blue-50 text-blue-600' :
                          'bg-amber-50 text-amber-600'
                        }`}>{loan.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h4 className="font-extrabold text-slate-800 flex items-center gap-2 mb-6"><TrendingUp className="w-5 h-5 text-[#E51E25]" /> Performance Metrics</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Target Sales</div>
                  <div className="text-xl font-black text-slate-800">{targetSales.toLocaleString()}</div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-[#E51E25] h-2 rounded-full transition-all" 
                      style={{ width: `${Math.min(100, (currentSales / targetSales) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{Math.round((currentSales / targetSales) * 100)}% achieved</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Current Sales</div>
                  <div className="text-xl font-black text-green-600">{currentSales.toLocaleString()}</div>
                  <div className="text-xs text-slate-500 mt-1">vs target: {targetSales.toLocaleString()}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Packages</div>
                  <div className="text-xl font-black text-slate-800">{packages.length}</div>
                  <div className="text-xs text-slate-500 mt-1">{activePackages} active</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Orders</div>
                  <div className="text-xl font-black text-slate-800">{totalOrders.toLocaleString()}</div>
                  <div className="text-xs text-green-600 mt-1">↑ vs last month</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'platform':
        return (
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <Activity className={`w-5 h-5 ${isApiConnected ? 'text-green-500 animate-pulse' : 'text-red-500'}`} />
                  <span className="font-extrabold text-slate-800">Gateway Status</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${isApiConnected ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                  {isApiConnected ? '● Connected' : '● Disconnected'}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsApiConnected(!isApiConnected)
                    setWebhookLogs([{
                      time: new Date().toTimeString().split(' ')[0],
                      event: isApiConnected ? 'Gateway Disconnected' : 'Gateway Connected',
                      source: 'Diamond Portal',
                      status: isApiConnected ? '400 Terminated' : '200 Connected'
                    }, ...webhookLogs])
                  }}
                  className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2"
                >
                  {isApiConnected ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  {isApiConnected ? 'Disconnect' : 'Connect'}
                </button>
                <button
                  onClick={() => {
                    setWebhookLogs([{
                      time: new Date().toTimeString().split(' ')[0],
                      event: 'Diagnostic Ping',
                      source: 'Diamond Portal',
                      status: isApiConnected ? '200 OK (6ms)' : '503 Unreachable'
                    }, ...webhookLogs])
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Ping
                </button>
                <button
                  onClick={() => setWebhookLogs([])}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2 ml-auto"
                >
                  <Trash2 className="w-4 h-4" /> Clear Logs
                </button>
              </div>
            </div>

            {/* Logs */}
            <div className="bg-white border border-slate-100 shadow-sm p-5 rounded-2xl font-mono text-xs text-slate-700 space-y-2 max-h-56 overflow-y-auto">
              {webhookLogs.map((log, idx) => (
                <div key={idx} className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400 font-bold">[{log.time}]</span>
                  <span className="flex-1 mx-3 font-semibold">{log.event} — {log.source}</span>
                  <span className={`font-bold ${log.status.includes('OK') || log.status.includes('Connected') ? 'text-green-600' : 'text-[#E51E25]'}`}>{log.status}</span>
                </div>
              ))}
            </div>
          </div>
        )

      case 'create':
        return (
          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border border-red-100">
              <Building2 className="w-10 h-10 text-[#E51E25] shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-extrabold text-slate-800">Register New Sub-Agency</h4>
                <p className="text-slate-500 text-sm mt-1">Agencies registered here inherit your regional commission policies automatically.</p>
              </div>
            </div>
            <form onSubmit={handleCreateAgency} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Agency Brand Name</label>
                <input type="text" required value={newAgencyName} onChange={(e) => setNewAgencyName(e.target.value)} placeholder="e.g. Omega Stream Team" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Representative Head</label>
                <input type="text" required value={newAgencyHead} onChange={(e) => setNewAgencyHead(e.target.value)} placeholder="e.g. Ramesh Adhikari" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Territory</label>
                <select value={newAgencyRegion} onChange={(e) => setNewAgencyRegion(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition-all">
                  <option>Nepal</option><option>India</option><option>Global</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Initial Coin Quota</label>
                <input type="number" value={initialCoins} onChange={(e) => setInitialCoins(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition-all" />
              </div>
              <div className="md:col-span-2 flex justify-end pt-2">
                <button type="submit" className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" /> Launch Agency
                </button>
              </div>
            </form>
          </div>
        )

      case 'manage':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-extrabold text-slate-800 text-lg flex items-center gap-2"><Users className="w-5 h-5 text-[#E51E25]" /> Network Agencies</h4>
                <span className="text-xs bg-red-50 text-[#E51E25] font-bold px-3 py-1 rounded-full">{subAgencies.length} Total</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-xs uppercase">
                    <tr>
                      <th className="p-4">ID</th><th className="p-4">Agency</th><th className="p-4">Head</th>
                      <th className="p-4 text-center">Region</th><th className="p-4 text-right">E-Rupee Coins</th><th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {subAgencies.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-mono font-bold text-slate-700">{a.id}</td>
                        <td className="p-4 font-semibold text-slate-800">{a.name}</td>
                        <td className="p-4 text-slate-500">{a.head}</td>
                        <td className="p-4 text-center"><span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full font-bold text-slate-600">{a.region}</span></td>
                        <td className="p-4 text-right font-mono font-bold text-[#E51E25]">{a.coins.toLocaleString()}</td>
                        <td className="p-4 text-center">
                          <button onClick={() => toggleAgencyStatus(a.id)} className={`text-xs font-bold px-4 py-1.5 rounded-lg active:scale-95 transition-all ${a.status === 'Active' ? 'bg-red-50 text-[#E51E25] hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                            {a.status === 'Active' ? 'Suspend' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'distribution':
        return (
          <div className="space-y-6">
            <form onSubmit={handleDistribute} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-lg flex items-center gap-2 mb-5"><Send className="w-5 h-5 text-[#E51E25]" /> Distribute Assets</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Agency</label>
                  <select value={distTarget} onChange={(e) => setDistTarget(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                    {subAgencies.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Asset</label>
                  <select value={distAsset} onChange={(e) => setDistAsset(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                    <option>E-Rupee Coins</option><option>Blue Diamonds</option><option>Green Diamonds</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Quantity</label>
                  <input type="number" value={distAmount} onChange={(e) => setDistAmount(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                </div>
                <div className="flex items-end">
                  <button type="submit" className="w-full bg-[#E51E25] hover:bg-[#c4161c] text-white py-2.5 px-4 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2">
                    <Gem className="w-4 h-4" /> Transfer
                  </button>
                </div>
              </div>
            </form>
            {/* Ledger */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100">
                <h4 className="font-extrabold text-slate-800 text-base flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /> Transfer Audit Ledger</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-xs uppercase">
                    <tr><th className="p-4">Timestamp</th><th className="p-4">Recipient</th><th className="p-4 text-right">Volume</th><th className="p-4 text-center">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {distributionLedger.map((log, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-4 font-mono text-xs text-slate-500">{log.date}</td>
                        <td className="p-4 font-semibold text-slate-800">{log.target}</td>
                        <td className="p-4 text-right font-mono font-bold text-[#E51E25]">{log.amount}</td>
                        <td className="p-4 text-center"><span className="bg-green-50 text-green-600 text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 w-fit mx-auto"><CheckCircle2 className="w-3 h-3" />{log.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'expansion':
        return (
          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border border-red-100">
              <Globe className="w-10 h-10 text-[#E51E25] shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-extrabold text-slate-800">Network Expansion Hub</h4>
                <p className="text-slate-500 text-sm mt-1">Monitor agency density, host acquisition, and territorial expansion analytics.</p>
              </div>
            </div>
            <div className="flex justify-end">
              <select value={selectedExpansionRegion} onChange={(e) => setSelectedExpansionRegion(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none">
                <option>All Regions</option><option>Nepal</option><option>India</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: 'Sub-Agencies', value: '142', icon: Building2, color: 'text-[#E51E25]' },
                { label: 'Hosts Recruited', value: '850', icon: Users, color: 'text-[#E51E25]' },
                { label: 'M-o-M Growth', value: '+15%', icon: TrendingUp, color: 'text-green-600' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <div className={`text-2xl font-black ${item.color}`}>{item.value}</div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-base mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-[#E51E25]" /> Regional Density</h4>
              <div className="space-y-4">
                {[{ region: 'Nepal', agencies: 85, hosts: 420 }, { region: 'India', agencies: 52, hosts: 380 }, { region: 'Global', agencies: 5, hosts: 50 }].map((r, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="w-16 text-sm font-bold text-slate-600">{r.region}</span>
                    <div className="flex-1 bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#E51E25] to-orange-400 h-full rounded-full" style={{ width: `${(r.agencies / 85) * 100}%` }}></div>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500 w-24 text-right">{r.agencies} agencies</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'revenue': {
        const revenueData = [
          { label: 'Diamond Packages', value: 1240000, color: '#E51E25', pct: 42 },
          { label: 'Commission Fees', value: 740000, color: '#f97316', pct: 25 },
          { label: 'Agency Subscriptions', value: 590000, color: '#eab308', pct: 20 },
          { label: 'Bonus Pool Deductions', value: 295000, color: '#3b82f6', pct: 10 },
          { label: 'Other Income', value: 88500, color: '#22c55e', pct: 3 },
        ]
        const total = revenueData.reduce((s, d) => s + d.value, 0)

        // SVG Pie Chart
        let cumulative = 0
        const radius = 80
        const cx = 100
        const cy = 100
        const slices = revenueData.map((d) => {
          const startAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2
          cumulative += d.pct
          const endAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2
          const x1 = cx + radius * Math.cos(startAngle)
          const y1 = cy + radius * Math.sin(startAngle)
          const x2 = cx + radius * Math.cos(endAngle)
          const y2 = cy + radius * Math.sin(endAngle)
          const largeArc = d.pct > 50 ? 1 : 0
          return { ...d, d: `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z` }
        })

        return (
          <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: 'Total Revenue', value: '₹ 29.5L', sub: 'All time', icon: Banknote, color: 'text-[#E51E25]' },
                { label: 'This Month', value: '₹ 3.8L', sub: '+22% vs last month', icon: TrendingUp, color: 'text-green-600' },
                { label: 'Avg per Agency', value: '₹ 26.7K', sub: 'Monthly average', icon: BarChart3, color: 'text-blue-500' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center"><item.icon className="w-5 h-5 text-[#E51E25]" /></div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                  </div>
                  <div className={`text-2xl font-black ${item.color}`}>{item.value}</div>
                  <div className="text-xs text-green-600 font-bold mt-1">{item.sub}</div>
                </div>
              ))}
            </div>

            {/* Pie Chart + Legend */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-base mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-[#E51E25]" /> Revenue Breakdown</h4>
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* SVG Pie */}
                <div className="shrink-0">
                  <svg viewBox="0 0 200 200" width="200" height="200">
                    {slices.map((slice, i) => (
                      <path key={i} d={slice.d} fill={slice.color} className="hover:opacity-80 transition-opacity cursor-pointer" stroke="white" strokeWidth="2" />
                    ))}
                    <circle cx={cx} cy={cy} r="45" fill="white" />
                    <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">Total</text>
                    <text x={cx} y={cy + 10} textAnchor="middle" fontSize="10" fill="#64748b">₹29.5L</text>
                  </svg>
                </div>
                {/* Legend */}
                <div className="flex-1 w-full space-y-3">
                  {revenueData.map((d, i) => (
                    <div key={i} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
                        <span className="text-sm font-semibold text-slate-700 truncate">{d.label}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden hidden sm:block">
                          <div className="h-full rounded-full" style={{ width: `${d.pct}%`, backgroundColor: d.color }}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-500 w-8 text-right">{d.pct}%</span>
                        <span className="text-sm font-extrabold text-slate-800 w-24 text-right font-mono">₹{(d.value / 100000).toFixed(1)}L</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monthly Bar Chart */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-base mb-6">Monthly Revenue Trend</h4>
              <div className="h-48 flex items-end justify-between gap-2">
                {[{ m: 'Jan', v: 45 }, { m: 'Feb', v: 62 }, { m: 'Mar', v: 55 }, { m: 'Apr', v: 80 }, { m: 'May', v: 75 }, { m: 'Jun', v: 95 }, { m: 'Jul', v: 110 }, { m: 'Aug', v: 85 }, { m: 'Sep', v: 100 }].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="text-[10px] font-mono font-bold text-slate-400">{item.v}K</div>
                    <div className="bg-gradient-to-t from-[#E51E25] to-red-400 rounded-t-lg w-full hover:brightness-110 transition-all cursor-pointer" style={{ height: `${item.v}%` }}></div>
                    <span className="text-[9px] font-bold text-slate-400">{item.m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Data List */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h4 className="font-extrabold text-slate-800 text-base flex items-center gap-2"><FileText className="w-4 h-4 text-[#E51E25]" /> Revenue Source Breakdown</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-xs uppercase">
                    <tr><th className="p-4">Source</th><th className="p-4 text-right">Amount</th><th className="p-4 text-right">Share</th><th className="p-4 text-right">vs Last Month</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { source: 'Diamond Packages', amount: '₹12.4L', share: '42%', change: '+18%', up: true },
                      { source: 'Commission Fees', amount: '₹7.4L', share: '25%', change: '+5%', up: true },
                      { source: 'Agency Subscriptions', amount: '₹5.9L', share: '20%', change: '-2%', up: false },
                      { source: 'Bonus Pool Deductions', amount: '₹2.9L', share: '10%', change: '+11%', up: true },
                      { source: 'Other Income', amount: '₹0.88L', share: '3%', change: '0%', up: true },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-semibold text-slate-800">{row.source}</td>
                        <td className="p-4 text-right font-mono font-bold text-slate-700">{row.amount}</td>
                        <td className="p-4 text-right font-bold text-slate-500">{row.share}</td>
                        <td className={`p-4 text-right font-bold text-xs ${row.up ? 'text-green-600' : 'text-[#E51E25]'}`}>{row.change}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50">
                    <tr>
                      <td className="p-4 font-extrabold text-slate-800">Total</td>
                      <td className="p-4 text-right font-extrabold font-mono text-[#E51E25]">₹29.5L</td>
                      <td className="p-4 text-right font-extrabold text-slate-800">100%</td>
                      <td className="p-4 text-right font-extrabold text-green-600">+9.2%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )
      }

      case 'performance': {
        const perfData = [
          { label: 'On Target (≥80%)', color: '#22c55e', pct: 40 },
          { label: 'Near Target (50–79%)', color: '#f59e0b', pct: 35 },
          { label: 'Below Target (<50%)', color: '#E51E25', pct: 25 },
        ]
        let cumPerf = 0
        const perfSlices = perfData.map((d) => {
          const startAngle = (cumPerf / 100) * 2 * Math.PI - Math.PI / 2
          cumPerf += d.pct
          const endAngle = (cumPerf / 100) * 2 * Math.PI - Math.PI / 2
          const r = 80, cx = 100, cy = 100
          const x1 = cx + r * Math.cos(startAngle), y1 = cy + r * Math.sin(startAngle)
          const x2 = cx + r * Math.cos(endAngle), y2 = cy + r * Math.sin(endAngle)
          return { ...d, d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${d.pct > 50 ? 1 : 0} 1 ${x2} ${y2} Z` }
        })

        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4 bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-2xl border border-red-100">
              <BarChart3 className="w-9 h-9 text-[#E51E25] shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-extrabold text-slate-800">Performance Metrics</h4>
                <p className="text-slate-500 text-sm mt-0.5">eRupai Diamond Agency Protocol</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Agencies', value: subAgencies.length, icon: Building2, color: 'text-[#E51E25]', bg: 'bg-red-50' },
                { label: 'On Target', value: subAgencies.filter(a => Math.floor((a.coins / 180000) * 100) >= 80).length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Avg Score', value: `${Math.floor(subAgencies.reduce((s, a) => s + Math.min(100, (a.coins / 180000) * 100), 0) / subAgencies.length)}%`, icon: Target, color: 'text-amber-500', bg: 'bg-amber-50' },
                { label: 'Top Coins', value: `${Math.max(...subAgencies.map(a => a.coins)).toLocaleString()}`, icon: Gem, color: 'text-blue-500', bg: 'bg-blue-50' },
              ].map((s, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div>
                    <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wide">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pie Chart + Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Donut Pie */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-extrabold text-slate-800 text-base mb-5 flex items-center gap-2"><Activity className="w-4 h-4 text-[#E51E25]" /> Performance Distribution</h4>
                <div className="flex items-center gap-6">
                  <svg viewBox="0 0 200 200" width="160" height="160" className="shrink-0">
                    {perfSlices.map((s, i) => (
                      <path key={i} d={s.d} fill={s.color} stroke="white" strokeWidth="2" className="hover:opacity-80 transition-opacity" />
                    ))}
                    <circle cx="100" cy="100" r="50" fill="white" />
                    <text x="100" y="96" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">Agencies</text>
                    <text x="100" y="112" textAnchor="middle" fontSize="10" fill="#64748b">{subAgencies.length} Total</text>
                  </svg>
                  <div className="space-y-3 flex-1">
                    {perfData.map((d, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
                            <span className="text-xs font-semibold text-slate-600">{d.label}</span>
                          </div>
                          <span className="text-xs font-extrabold" style={{ color: d.color }}>{d.pct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full">
                          <div className="h-full rounded-full" style={{ width: `${d.pct}%`, backgroundColor: d.color }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monthly Trend Bar */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-extrabold text-slate-800 text-base mb-5 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#E51E25]" /> Monthly Coin Volume</h4>
                <div className="h-40 flex items-end justify-between gap-1.5">
                  {[{ m: 'Jan', v: 55 }, { m: 'Feb', v: 70 }, { m: 'Mar', v: 60 }, { m: 'Apr', v: 85 }, { m: 'May', v: 78 }, { m: 'Jun', v: 92 }, { m: 'Jul', v: 100 }].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="text-[9px] font-mono font-bold text-slate-400">{item.v}K</div>
                      <div className="w-full rounded-t-lg hover:brightness-110 transition-all" style={{ height: `${item.v}%`, background: `linear-gradient(to top, #E51E25, #f97316)` }}></div>
                      <span className="text-[9px] font-bold text-slate-400">{item.m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Agency Progress Bars */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h4 className="font-extrabold text-slate-800 text-lg flex items-center gap-2 mb-6"><BarChart3 className="w-5 h-5 text-[#E51E25]" /> Agency Target Performance</h4>
              <div className="space-y-5">
                {subAgencies.map((agency) => {
                  const pct = Math.min(100, Math.floor((agency.coins / 180000) * 100))
                  return (
                    <div key={agency.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${agency.status === 'Active' ? 'bg-green-500' : 'bg-red-400'}`}></span>
                          <span className="text-sm font-extrabold text-slate-800">{agency.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">{agency.id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pct >= 80 ? 'bg-green-50 text-green-600' : pct >= 50 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-[#E51E25]'}`}>
                            {pct >= 80 ? 'On Target' : pct >= 50 ? 'Near Target' : 'Below Target'}
                          </span>
                          <span className="text-sm font-black text-[#E51E25] font-mono">{pct}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-700 ${pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Detailed Data Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h4 className="font-extrabold text-slate-800 text-base flex items-center gap-2"><FileText className="w-4 h-4 text-[#E51E25]" /> Agency Performance Summary</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-xs uppercase">
                    <tr>
                      <th className="p-4">Agency</th>
                      <th className="p-4">Head</th>
                      <th className="p-4 text-right">Coins</th>
                      <th className="p-4 text-center">Score</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-center">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {subAgencies.map((a) => {
                      const pct = Math.min(100, Math.floor((a.coins / 180000) * 100))
                      const rating = pct >= 80 ? '⭐⭐⭐' : pct >= 50 ? '⭐⭐' : '⭐'
                      return (
                        <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-semibold text-slate-800">{a.name}</td>
                          <td className="p-4 text-slate-500">{a.head}</td>
                          <td className="p-4 text-right font-mono font-bold text-[#E51E25]">{a.coins.toLocaleString()}</td>
                          <td className="p-4 text-center">
                            <span className={`font-extrabold text-sm ${pct >= 80 ? 'text-green-600' : pct >= 50 ? 'text-amber-500' : 'text-[#E51E25]'}`}>{pct}%</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${a.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-[#E51E25]'}`}>{a.status}</span>
                          </td>
                          <td className="p-4 text-center text-sm">{rating}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      }

      case 'commission': {
        const totalPaid = commissionHistory.filter(c => c.status === 'Paid').reduce((s, c) => s + c.beans, 0)
        const totalPending = commissionHistory.filter(c => c.status === 'Pending').reduce((s, c) => s + c.beans, 0)
        return (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <Wallet className="w-6 h-6 text-red-400" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Commission Payouts</span>
                  </div>
                  <div className="text-4xl font-black font-mono mt-2">{availableCommission.toLocaleString()} <span className="text-lg font-bold text-slate-400">Beans</span></div>
                  <div className="text-xs text-slate-400 font-semibold mt-1">eRupai Diamond Agency Protocol</div>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-xl font-black text-green-400">{totalPaid.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Total Paid</div>
                  </div>
                  <div className="w-px bg-slate-700"></div>
                  <div className="text-center">
                    <div className="text-xl font-black text-amber-400">{totalPending.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Pending</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Payouts', value: commissionHistory.length, icon: FileText, color: 'text-[#E51E25]', bg: 'bg-red-50' },
                { label: 'Paid', value: commissionHistory.filter(c => c.status === 'Paid').length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Pending', value: commissionHistory.filter(c => c.status === 'Pending').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
                { label: 'Processing', value: commissionHistory.filter(c => c.status === 'Processing').length, icon: RefreshCw, color: 'text-blue-500', bg: 'bg-blue-50' },
              ].map((s, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div>
                    <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wide">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Two column: Withdraw Form + Add Payout Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Withdrawal Request */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-extrabold text-slate-800 text-base mb-5 flex items-center gap-2"><Banknote className="w-5 h-5 text-[#E51E25]" /> Withdrawal Request</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Amount (Beans)</label>
                    <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500">
                    <span className="font-bold text-slate-700">E-Rupee Equivalent: </span>
                    <span className="font-extrabold text-[#E51E25]">₹{(withdrawAmount / 100).toFixed(2)}</span>
                    <span className="ml-2 text-slate-400">(Rate: 100 Beans = ₹1)</span>
                  </div>
                  {withdrawAmount > availableCommission && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Insufficient balance
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (withdrawAmount > availableCommission) return
                      setAvailableCommission(availableCommission - withdrawAmount)
                      setCommissionHistory([{ id: `CP-${String(commissionHistory.length + 1).padStart(3,'0')}`, agency: 'Self Withdrawal', type: 'E-Rupee Conversion', beans: withdrawAmount, erupee: withdrawAmount / 100, date: new Date().toISOString().split('T')[0], status: 'Processing' }, ...commissionHistory])
                    }}
                    disabled={withdrawAmount > availableCommission}
                    className="w-full bg-[#E51E25] hover:bg-[#c4161c] disabled:opacity-50 text-white py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Wallet className="w-4 h-4" /> Withdraw to E-Rupee
                  </button>
                </div>
              </div>

              {/* Add Payout Form */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-extrabold text-slate-800 text-base mb-5 flex items-center gap-2"><Send className="w-5 h-5 text-[#E51E25]" /> Add Commission Payout</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Agency</label>
                    <select value={payoutForm.agency} onChange={(e) => setPayoutForm({...payoutForm, agency: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                      {subAgencies.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Payout Type</label>
                    <select value={payoutForm.type} onChange={(e) => setPayoutForm({...payoutForm, type: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                      <option>Monthly Payout</option>
                      <option>Bonus Commission</option>
                      <option>Performance Bonus</option>
                      <option>Referral Bonus</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Beans Amount</label>
                    <input type="number" placeholder="e.g. 50000" value={payoutForm.beans} onChange={(e) => setPayoutForm({...payoutForm, beans: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                  </div>
                  <button
                    onClick={() => {
                      if (!payoutForm.beans) return
                      const agency = subAgencies.find(a => a.id === payoutForm.agency)
                      const beans = Number(payoutForm.beans)
                      setCommissionHistory([{ id: `CP-${String(commissionHistory.length + 1).padStart(3,'0')}`, agency: agency?.name || '', type: payoutForm.type, beans, erupee: beans / 100, date: new Date().toISOString().split('T')[0], status: 'Pending' }, ...commissionHistory])
                      setPayoutForm({...payoutForm, beans: ''})
                    }}
                    className="w-full bg-[#E51E25] hover:bg-[#c4161c] text-white py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Payout
                  </button>
                </div>
              </div>
            </div>

            {/* Per-Agency Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-base mb-5 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-[#E51E25]" /> Per-Agency Commission Breakdown</h4>
              <div className="space-y-4">
                {subAgencies.map((ag) => {
                  const agTotal = commissionHistory.filter(c => c.agency === ag.name).reduce((s, c) => s + c.beans, 0)
                  const maxBeans = Math.max(...subAgencies.map(a => commissionHistory.filter(c => c.agency === a.name).reduce((s, c) => s + c.beans, 0)), 1)
                  const pct = Math.round((agTotal / maxBeans) * 100)
                  return (
                    <div key={ag.id} className="flex items-center gap-4">
                      <div className="w-32 shrink-0">
                        <div className="font-bold text-slate-700 text-sm truncate">{ag.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{ag.id}</div>
                      </div>
                      <div className="flex-1 bg-slate-100 h-3 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#E51E25] to-orange-400 transition-all duration-700" style={{ width: `${pct}%` }}></div>
                      </div>
                      <div className="w-28 text-right shrink-0">
                        <span className="font-extrabold text-sm text-[#E51E25] font-mono">{agTotal.toLocaleString()}</span>
                        <span className="text-xs text-slate-400 ml-1">Beans</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Payout History List */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-extrabold text-slate-800 text-base flex items-center gap-2"><History className="w-4 h-4 text-[#E51E25]" /> Payout History</h4>
                <span className="text-xs bg-red-50 text-[#E51E25] font-bold px-2.5 py-1 rounded-full">{commissionHistory.length} Records</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-xs uppercase">
                    <tr><th className="p-4">ID</th><th className="p-4">Agency</th><th className="p-4">Type</th><th className="p-4 text-right">Beans</th><th className="p-4 text-right">E-Rupee</th><th className="p-4">Date</th><th className="p-4 text-center">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {commissionHistory.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-mono text-xs font-bold text-slate-500">{c.id}</td>
                        <td className="p-4 font-semibold text-slate-800">{c.agency}</td>
                        <td className="p-4 text-slate-500">{c.type}</td>
                        <td className="p-4 text-right font-mono font-bold text-[#E51E25]">{c.beans.toLocaleString()}</td>
                        <td className="p-4 text-right font-mono font-bold text-slate-700">₹{c.erupee.toLocaleString()}</td>
                        <td className="p-4 text-slate-500 font-mono text-xs">{c.date}</td>
                        <td className="p-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            c.status === 'Paid' ? 'bg-green-50 text-green-600' :
                            c.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                            'bg-blue-50 text-blue-600'
                          }`}>{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      }

      case 'target':
        const targetPct = Math.min(100, Math.floor((currentSales / targetSales) * 100))
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-lg flex items-center gap-2 mb-4"><Target className="w-5 h-5 text-[#E51E25]" /> Monthly Milestone Tracker</h4>
              <div className="flex justify-between items-center text-sm font-bold text-slate-500 mb-3">
                <span>Coin Target Volume</span>
                <span className="font-mono text-[#E51E25]">{currentSales.toLocaleString()} / {targetSales.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-100 h-5 rounded-full overflow-hidden mb-4">
                <div className="bg-gradient-to-r from-[#E51E25] to-amber-500 h-full rounded-full transition-all duration-700" style={{ width: `${targetPct}%` }}></div>
              </div>
              <div className="text-center font-bold text-slate-700">{targetPct}% Complete — Need <span className="text-[#E51E25] font-mono">{(targetSales - currentSales).toLocaleString()}</span> more for Diamond Bonus</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { tier: 'Tier 1 (50%)', bonus: '5% Extra', reached: targetPct >= 50 },
                { tier: 'Tier 2 (80%)', bonus: '10% Extra', reached: targetPct >= 80 },
                { tier: 'Tier 3 (100%)', bonus: '20% Super', reached: targetPct >= 100 }
              ].map((t, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border text-center ${t.reached ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex justify-center mb-2">{t.reached ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Award className="w-5 h-5 text-slate-300" />}</div>
                  <div className={`text-xs font-black ${t.reached ? 'text-green-600' : 'text-slate-400'}`}>{t.tier}</div>
                  <div className="text-[10px] font-bold text-slate-500 mt-1">{t.bonus}</div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'users':
        return (
          <div className="space-y-6">
            {/* Invite User Modal */}
            {showInviteModal && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
                  <button onClick={() => { setShowInviteModal(false); setInviteForm({ name: '', email: '', role: 'Support Agent', status: 'Active' }) }} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition-colors">
                    <XCircle className="w-6 h-6" />
                  </button>
                  <h3 className="text-2xl font-extrabold text-slate-800 mb-6">Invite User</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Adhikari"
                        value={inviteForm.name}
                        onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        placeholder="e.g. ramesh@erupai.com"
                        value={inviteForm.email}
                        onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Role</label>
                      <select
                        value={inviteForm.role}
                        onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      >
                        <option>Super Admin</option>
                        <option>Regional Manager</option>
                        <option>Support Agent</option>
                        <option>Finance Officer</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-7">
                    <button
                      onClick={() => { setShowInviteModal(false); setInviteForm({ name: '', email: '', role: 'Support Agent', status: 'Active' }) }}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold text-sm active:scale-95 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!inviteForm.name || !inviteForm.email) return
                        const newUser = {
                          id: `U-${Math.floor(1000 + Math.random() * 9000)}`,
                          name: inviteForm.name,
                          email: inviteForm.email,
                          role: inviteForm.role,
                          status: 'Active'
                        }
                        setSystemUsers([...systemUsers, newUser])
                        setShowInviteModal(false)
                        setInviteForm({ name: '', email: '', role: 'Support Agent', status: 'Active' })
                      }}
                      className="flex-1 bg-[#E51E25] hover:bg-[#c4161c] text-white py-3 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add User
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-extrabold text-slate-800 text-lg flex items-center gap-2"><Users className="w-5 h-5 text-[#E51E25]" /> System Users <span className="text-xs bg-red-50 text-[#E51E25] font-bold px-2.5 py-1 rounded-full ml-1">{systemUsers.length}</span></h4>
                <button onClick={() => setShowInviteModal(true)} className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2">
                  <Plus className="w-3.5 h-3.5" /> Invite User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-xs uppercase">
                    <tr><th className="p-4">User</th><th className="p-4">Role</th><th className="p-4">Email</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {systemUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-xs font-extrabold text-[#E51E25] shrink-0">{u.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                            <span className="font-semibold text-slate-800">{u.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">{u.role}</span>
                        </td>
                        <td className="p-4 font-mono text-slate-500 text-xs">{u.email}</td>
                        <td className="p-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${u.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => setSystemUsers(systemUsers.filter(x => x.id !== u.id))}
                            className="text-slate-400 hover:text-[#E51E25] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'history':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-extrabold text-slate-800 text-lg flex items-center gap-2"><History className="w-5 h-5 text-[#E51E25]" /> Activity Log</h4>
              </div>
              <div className="divide-y divide-slate-100">
                {activityHistory.map((item) => (
                  <div key={item.id} className="p-5 hover:bg-slate-50 transition-colors flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#E51E25]" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{item.action}</div>
                      <div className="text-slate-500 text-sm mt-0.5">{item.detail}</div>
                      <div className="text-xs font-mono text-slate-400 mt-2">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-extrabold text-slate-800 text-lg flex items-center gap-2"><Bell className="w-5 h-5 text-[#E51E25]" /> Inbox</h4>
              <button
                onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                className="text-xs font-bold text-[#E51E25] hover:underline"
              >
                Mark all as read
              </button>
            </div>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${notif.read ? 'bg-white border-slate-100 shadow-sm' : 'bg-red-50/50 border-red-100 shadow-sm'}`}>
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${notif.read ? 'bg-slate-200' : 'bg-[#E51E25]'}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-slate-800">{notif.title}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{notif.time}</div>
                    </div>
                    <div className="text-sm text-slate-600 mt-1">{notif.message}</div>
                    {!notif.read && (
                      <button
                        onClick={() => setNotifications(notifications.map(n => n.id === notif.id ? { ...n, read: true } : n))}
                        className="mt-3 text-xs font-bold text-[#E51E25] bg-red-100 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-lg flex items-center gap-2 mb-6"><Sliders className="w-5 h-5 text-[#E51E25]" /> General Settings</h4>
              <div className="space-y-5 max-w-lg">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Contact Email</label>
                  <input
                    type="email"
                    value={agencySettings.email}
                    onChange={(e) => setAgencySettings({ ...agencySettings, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Support Phone</label>
                  <input
                    type="text"
                    value={agencySettings.phone}
                    onChange={(e) => setAgencySettings({ ...agencySettings, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <h5 className="font-bold text-slate-800 text-sm mb-4">Notification Preferences</h5>
                  <label className="flex items-center gap-3 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agencySettings.notifyEmail}
                      onChange={(e) => setAgencySettings({ ...agencySettings, notifyEmail: e.target.checked })}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-slate-600">Email Alerts</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agencySettings.notifySms}
                      onChange={(e) => setAgencySettings({ ...agencySettings, notifySms: e.target.checked })}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-slate-600">SMS Alerts</span>
                  </label>
                </div>
                <div className="pt-4">
                  <button className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'sys_payment':
        return (
          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border border-red-100">
              <CreditCard className="w-10 h-10 text-[#E51E25] shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-extrabold text-slate-800">Payment Gateway Integrations</h4>
                <p className="text-slate-500 text-sm mt-1">Configure your payment processors for accepting diamond purchases and processing agency withdrawals.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paymentGateways.map((gw) => (
                <div key={gw.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col h-full relative overflow-hidden">
                  {gw.status === 'Active' && <div className="absolute top-0 left-0 w-full h-1 bg-[#E51E25]"></div>}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="font-extrabold text-slate-800 text-lg">{gw.name}</div>
                      <div className="text-xs text-slate-500 font-bold">{gw.type}</div>
                    </div>
                    <button 
                      onClick={() => setPaymentGateways(paymentGateways.map(p => p.id === gw.id ? {...p, status: p.status === 'Active' ? 'Inactive' : 'Active'} : p))}
                      className={`w-12 h-7 rounded-full relative transition-colors shrink-0 ${gw.status === 'Active' ? 'bg-[#E51E25]' : 'bg-slate-300'}`}
                    >
                      <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${gw.status === 'Active' ? 'translate-x-5' : ''}`} />
                    </button>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Public Key / Client ID</label>
                      {editingGwId === gw.id ? (
                        <input
                          type="text"
                          value={editGwForm.pub}
                          onChange={(e) => setEditGwForm({...editGwForm, pub: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                        />
                      ) : (
                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-600">
                          <Lock className="w-3 h-3 text-slate-400 mr-2" /> {gw.keys.pub}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Secret Key / Token</label>
                      {editingGwId === gw.id ? (
                        <input
                          type="text"
                          value={editGwForm.sec}
                          onChange={(e) => setEditGwForm({...editGwForm, sec: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                        />
                      ) : (
                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-600">
                          <Lock className="w-3 h-3 text-slate-400 mr-2" /> {gw.keys.sec}
                        </div>
                      )}
                    </div>
                  </div>
                  {editingGwId === gw.id ? (
                    <div className="mt-6 flex gap-2">
                      <button
                        onClick={() => {
                          setPaymentGateways(paymentGateways.map(p => p.id === gw.id ? {...p, keys: editGwForm} : p))
                          setEditingGwId(null)
                        }}
                        className="flex-1 bg-[#E51E25] hover:bg-[#c4161c] text-white py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <CheckSquare className="w-4 h-4" /> Save
                      </button>
                      <button
                        onClick={() => setEditingGwId(null)}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center"
                      >
                         Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingGwId(gw.id)
                        setEditGwForm({ pub: gw.keys.pub, sec: gw.keys.sec })
                      }}
                      className="w-full mt-6 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" /> Edit Configuration
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      case 'sys_webhooks':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-lg flex items-center gap-2 mb-6"><Webhook className="w-5 h-5 text-[#E51E25]" /> Webhook Endpoint Configuration</h4>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Payload URL</label>
                  <input type="text" value={webhooks[0].url} onChange={(e) => setWebhooks([{...webhooks[0], url: e.target.value}])} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                </div>
                <div className="md:w-48">
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Status</label>
                  <select value={webhooks[0].status} onChange={(e) => setWebhooks([{...webhooks[0], status: e.target.value}])} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500/30">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="bg-red-50 text-[#E51E25] font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5"><CheckSquare className="w-3.5 h-3.5" /> package.purchased</span>
                <span className="bg-red-50 text-[#E51E25] font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5"><CheckSquare className="w-3.5 h-3.5" /> withdrawal.requested</span>
                <span className="bg-slate-100 text-slate-400 font-bold text-xs px-3 py-1.5 rounded-lg border border-dashed border-slate-300 hover:bg-slate-50 cursor-pointer">+ Add Event</span>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Send Test Payload
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-100 shadow-sm p-5 rounded-2xl">
              <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2 mb-4"><Terminal className="w-4 h-4 text-[#E51E25]" /> Recent Deliveries</h4>
              <div className="space-y-3">
                {webhookLogsList.map((log) => (
                  <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 font-bold font-mono text-xs">[{log.time}]</span>
                      <span className="text-slate-700 font-semibold font-mono text-xs">{log.event}</span>
                    </div>
                    <span className={`font-mono text-xs font-bold ${log.success ? 'text-green-600' : 'text-[#E51E25]'}`}>{log.response}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'sys_security':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7 text-green-500" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-lg">System Secure</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">2FA is enabled for all admin accounts. 0 unauthorized attempts in the last 30 days.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Users className="w-7 h-7 text-[#E51E25]" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-extrabold text-slate-800 text-lg">3 Active Sessions</h4>
                    <button className="text-[10px] font-bold uppercase tracking-wider text-[#E51E25] bg-red-50 hover:bg-red-100 px-2 py-1 rounded">Revoke All</button>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">Current IP: 192.168.1.45 (Kathmandu, NP)</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-extrabold text-slate-800 text-base flex items-center gap-2"><Lock className="w-5 h-5 text-[#E51E25]" /> Immutable Audit Log</h4>
                <button onClick={exportSecurityLogsToCSV} className="text-xs font-bold text-slate-600 hover:text-[#E51E25] bg-slate-50 hover:bg-slate-100 active:scale-95 px-3 py-1.5 rounded-lg border border-slate-200 transition-all">Export CSV</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-400 font-bold text-xs uppercase">
                    <tr><th className="p-4">Timestamp</th><th className="p-4">Admin / User</th><th className="p-4">Action Taken</th><th className="p-4">IP Address</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {securityLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/50">
                        <td className="p-4 text-xs font-mono text-slate-500">{log.date}</td>
                        <td className="p-4 font-bold text-slate-800">{log.user}</td>
                        <td className="p-4 text-slate-600">{log.action}</td>
                        <td className="p-4 text-xs font-mono text-slate-400">{log.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F8FA] flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Top Bar */}
      <header className="w-full bg-[#E51E25] text-white py-3 px-4 md:px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-[100] shadow-md">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-bold hidden sm:inline">Back to Home</span>
          </Link>
          <div className="w-px h-6 bg-white/30"></div>
          <div className="flex items-center gap-2">
            <Gem className="w-5 h-5 text-yellow-300" />
            <span className="font-extrabold text-lg tracking-tight">Diamond Agency</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold bg-white/10 px-3 py-1.5 rounded-full">
          <Activity className="w-3.5 h-3.5 text-green-300 animate-pulse" />
          <span>System Online</span>
        </div>
      </header>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-1 w-full max-w-[1440px] mx-auto">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-100 py-6 px-4 hidden lg:flex flex-col gap-1.5 sticky top-[52px] h-[calc(100vh-52px)] overflow-y-auto shrink-0 pt-20">
          {menuGroups.map((group) => {
            if (group.key) {
              // Single item (Dashboard)
              const Icon = group.icon
              return (
                <button
                  key={group.key}
                  onClick={() => setActiveSideTab(group.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl text-left text-sm font-bold transition-all active:scale-[0.98] ${
                    activeSideTab === group.key
                      ? 'bg-[#E51E25] text-white shadow-lg shadow-red-200/50'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px] shrink-0" />
                  <span className="truncate">{group.label}</span>
                </button>
              )
            }

            // Group with sub-items
            const Icon = group.icon
            const isExpanded = expandedGroups[group.id]
            const isAnyActive = group.subItems.some(i => i.key === activeSideTab)

            return (
              <div key={group.id} className="mb-2">
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-bold transition-all ${
                    isAnyActive && !isExpanded ? 'text-[#E51E25] bg-red-50' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-[18px] h-[18px] shrink-0" />
                    <span className="truncate">{group.label}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                {isExpanded && (
                  <div className="mt-1 flex flex-col gap-1 pl-[22px] border-l-2 border-slate-100 ml-6 relative">
                    {group.subItems.map(sub => (
                      <button
                        key={sub.key}
                        onClick={() => setActiveSideTab(sub.key)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                          activeSideTab === sub.key
                            ? 'bg-[#E51E25] text-white shadow-md shadow-red-200'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </aside>

        {/* Mobile Menu */}
        <div className="lg:hidden w-full overflow-x-auto bg-white border-b border-slate-100 px-4 py-3 flex gap-2 sticky top-[52px] z-40">
          {menuGroups.flatMap(g => g.key ? [g] : g.subItems).map((item) => {
            return (
              <button
                key={item.key}
                onClick={() => setActiveSideTab(item.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeSideTab === item.key
                    ? 'bg-[#E51E25] text-white shadow-md'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 pt-20 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-800">
              {menuGroups.flatMap(g => g.key ? [g] : g.subItems).find(m => m.key === activeSideTab)?.label}
            </h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">eRupai Diamond Agency Protocol</p>
          </div>
          {renderPanel()}
        </main>
      </div>
    </div>
  )
}
