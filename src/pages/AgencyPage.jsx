import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Users, UserCheck, Activity, Settings, Target, ShieldAlert,
  ArrowLeft, Gem, PlusCircle, Search, Trash2, Edit, CheckSquare,
  Award, TrendingUp, HelpCircle, BarChart3, Coins, PieChart,
  UserPlus, Play, RefreshCw, Send, DollarSign, Wallet, CheckCircle2,
  Lock, FileText, Bell, Sliders, ChevronDown, ChevronRight, XCircle, Menu
} from 'lucide-react'
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

export default function AgencyPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') || 'agency'
  const [activeTab, setActiveTab] = useState(tabParam)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // Sync state with URL search parameters
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  const selectTab = (tab) => {
    setActiveTab(tab)
    setSearchParams({ tab })
    setMobileSidebarOpen(false)
  }

  // --- GENERAL SIMULATION STATES ---
  
  // 1. Agency / Host Recruitment Tab States
  const [hosts, setHosts] = useState([
    { id: 'H-901', name: 'Aria Live', agent: 'Agent Rahul', status: 'Streaming', beans: 45200, target: 'Gold', tier: 'Completed' },
    { id: 'H-902', name: 'Gamer Pro', agent: 'Direct Agency', status: 'Offline', beans: 12800, target: 'Silver', tier: 'In Progress' },
    { id: 'H-903', name: 'Nisha Sing', agent: 'Agent Rahul', status: 'Streaming', beans: 78900, target: 'Diamond', tier: 'Completed' },
    { id: 'H-904', name: 'Kathmandu Vibe', agent: 'Direct Agency', status: 'Offline', beans: 5200, target: 'Bronze', tier: 'In Progress' }
  ])
  const [hostSearch, setHostSearch] = useState('')
  const [newHostName, setNewHostName] = useState('')
  const [newHostAgent, setNewHostAgent] = useState('Direct Agency')
  const [newHostTarget, setNewHostTarget] = useState('Silver')

  // 2. Agent Binding Tab States
  const [agents, setAgents] = useState([
    { id: 'AG-801', name: 'Agent Rahul', status: 'Active', hostsBound: 8, commissionRate: 10, totalEarned: 84300 },
    { id: 'AG-802', name: 'Karan Stream Manager', status: 'Active', hostsBound: 12, commissionRate: 12, totalEarned: 145000 },
    { id: 'AG-803', name: 'Sonia Live Agency', status: 'Pending Verification', hostsBound: 3, commissionRate: 8, totalEarned: 18200 }
  ])
  const [newAgentName, setNewAgentName] = useState('')
  const [newAgentCommission, setNewAgentCommission] = useState(10)
  const [calcBeans, setCalcBeans] = useState(100000)
  const [calcRate, setCalcRate] = useState(10)

  // 3. Host Simulator Tab States
  const [streamingHostId, setStreamingHostId] = useState('H-901')
  const [battleOpponent, setBattleOpponent] = useState('Alpha Gamer')
  const [battleStatus, setBattleStatus] = useState('idle') // idle, loading, won, lost
  const [battleBeansWon, setBattleBeansWon] = useState(0)

  // 4. Target Engine Tab States
  const [coinSalesProgress, setCoinSalesProgress] = useState(65)
  const [targetTiers, setTargetTiers] = useState([
    { level: 'Tier 1 (50%)', salesRequired: 500000, bonus: '5% Extra Bonus', achieved: true },
    { level: 'Tier 2 (80%)', salesRequired: 800000, bonus: '10% Extra Bonus', achieved: false },
    { level: 'Tier 3 (100%)', salesRequired: 1000000, bonus: '20% Super Bonus', achieved: false }
  ])
  const [customGoal, setCustomGoal] = useState(1000000)

  // 5. Revenue Sharing Tab States
  const [revPlatform, setRevPlatform] = useState(40)
  const [revDiamond, setRevDiamond] = useState(10)
  const [revAgency, setRevAgency] = useState(20)
  const [revAgent, setRevAgent] = useState(10)
  const [revHost, setRevHost] = useState(20)

  // 6. Agency Dashboard Tab States
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [kpiTimeline, setKpiTimeline] = useState([80000, 120000, 95000, 140000, 110000, 165000, 150000])

  // 7. Agent Dashboard Tab States
  const [withdrawalBeans, setWithdrawalBeans] = useState(50000)
  const [availableBeans, setAvailableBeans] = useState(245000)
  const [auditLedger, setAuditLedger] = useState([
    { text: 'Commission credited from Host H-901 live show', date: '2026-07-17 07:15', beans: '+4,500 Beans', type: 'credit' },
    { text: 'Agent tier reward payout: Gold Level achieved', date: '2026-07-16 18:30', beans: '+12,000 Beans', type: 'credit' },
    { text: 'Withdrawal to E-Rupee Coin wallet approved by Admin', date: '2026-07-15 12:00', beans: '-8,000 Beans', type: 'debit' }
  ])

  // --- ACTIONS ---

  const handleAddHost = (e) => {
    e.preventDefault()
    if (!newHostName) return
    const newHost = {
      id: `H-${Math.floor(100 + Math.random() * 900)}`,
      name: newHostName,
      agent: newHostAgent,
      status: 'Offline',
      beans: 0,
      target: newHostTarget,
      tier: 'In Progress'
    }
    setHosts([newHost, ...hosts])
    setNewHostName('')
    // Update bound hosts counter in matching Agent if any
    setAgents(agents.map(a => a.name === newHostAgent ? { ...a, hostsBound: a.hostsBound + 1 } : a))
  }

  const handleCreateAgent = (e) => {
    e.preventDefault()
    if (!newAgentName) return
    const newAg = {
      id: `AG-${Math.floor(800 + Math.random() * 200)}`,
      name: newAgentName,
      status: 'Active',
      hostsBound: 0,
      commissionRate: newAgentCommission,
      totalEarned: 0
    }
    setAgents([...agents, newAg])
    setNewAgentName('')
  }

  const simulatePKBattle = () => {
    if (battleStatus === 'loading') return
    setBattleStatus('loading')
    setTimeout(() => {
      const victory = Math.random() > 0.4
      const amount = Math.floor(2000 + Math.random() * 8000)
      if (victory) {
        setBattleStatus('won')
        setBattleBeansWon(amount)
        // Add beans to selected host
        setHosts(hosts.map(h => h.id === streamingHostId ? { ...h, beans: h.beans + amount } : h))
        // Append to ledger
        const targetHost = hosts.find(h => h.id === streamingHostId)
        setAuditLedger([
          { text: `PK Battle Victory! ${targetHost?.name} vs ${battleOpponent}`, date: new Date().toISOString().replace('T', ' ').substring(0,16), beans: `+${amount.toLocaleString()} Beans`, type: 'credit' },
          ...auditLedger
        ])
      } else {
        setBattleStatus('lost')
        setBattleBeansWon(0)
      }
    }, 1500)
  }

  const handleWithdrawalRequest = (e) => {
    e.preventDefault()
    if (withdrawalBeans <= 0 || withdrawalBeans > availableBeans) return
    setAvailableBeans(availableBeans - withdrawalBeans)
    setAuditLedger([
      { text: `Withdrawal request for E-Rupee Conversion`, date: new Date().toISOString().replace('T', ' ').substring(0,16), beans: `-${withdrawalBeans.toLocaleString()} Beans`, type: 'debit' },
      ...auditLedger
    ])
    setWithdrawalBeans(0)
    alert('Withdrawal request successfully logged and queued for audit!')
  }

  const applyRevSharePreset = (preset) => {
    switch (preset) {
      case 'host-focused':
        setRevPlatform(25); setRevDiamond(5); setRevAgency(10); setRevAgent(10); setRevHost(50)
        break
      case 'platform-focused':
        setRevPlatform(50); setRevDiamond(10); setRevAgency(15); setRevAgent(10); setRevHost(15)
        break
      case 'balanced':
        setRevPlatform(30); setRevDiamond(10); setRevAgency(20); setRevAgent(10); setRevHost(30)
        break
      default:
        break
    }
  }

  // --- MENU CONFIG ---
  const menuItems = [
    { key: 'agency', label: 'Recruitment Hub', icon: Users },
    { key: 'agent', label: 'Agent Binding', icon: UserCheck },
    { key: 'host', label: 'Host PK Battle Simulator', icon: Play },
    { key: 'target', label: 'Milestone Targets', icon: Target },
    { key: 'revenue', label: 'Revenue Share Settings', icon: Sliders },
    { key: 'agency-dash', label: 'Agency Analytics', icon: BarChart3 },
    { key: 'agent-dash', label: 'Agent Dashboard', icon: Wallet }
  ]

  // Filtered Hosts list
  const filteredHosts = hosts.filter(h => 
    h.name.toLowerCase().includes(hostSearch.toLowerCase()) || 
    h.agent.toLowerCase().includes(hostSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8F8FA] flex flex-col font-sans selection:bg-red-500 selection:text-white overflow-x-hidden">
      
      {/* Top Header */}
      <header className="w-full bg-[#E51E25] text-white py-3 px-4 md:px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-[9999] shadow-md min-h-[56px] sm:min-h-[60px]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-bold hidden sm:inline">Back</span>
          </Link>
          <div className="w-px h-5 bg-white/30 hidden sm:block"></div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
            <span className="font-extrabold text-sm sm:text-lg tracking-tight select-none">eRupai Agency Portal</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold bg-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
          <Activity className="w-3.5 h-3.5 text-green-300 animate-pulse" />
          <span>Portal Connected</span>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[10000] lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <aside className={`fixed top-0 left-0 h-full w-72 max-w-[80vw] bg-white z-[10001] transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto shadow-2xl ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#E51E25]" />
            <span className="font-black text-slate-800">Agency Portal</span>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        <div className="py-3 px-3 flex flex-col gap-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.key}
                onClick={() => selectTab(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold transition-all ${
                  activeTab === item.key
                    ? 'bg-[#E51E25] text-white shadow-lg shadow-red-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      {/* Main Core Flex Layout */}
      <div className="flex flex-1 w-full max-w-[1440px] mx-auto overflow-x-hidden pt-14 sm:pt-16">
        
        {/* Desktop Sidebar (Permanent) */}
        <aside className="w-64 bg-white border-r border-slate-150 py-6 px-4 hidden lg:flex flex-col gap-1.5 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto shrink-0">
          <div className="mb-6 px-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Portal Navigation</span>
            <div className="h-0.5 bg-slate-100 mt-2"></div>
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.key}
                onClick={() => selectTab(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold transition-all active:scale-[0.98] ${
                  activeTab === item.key
                    ? 'bg-[#E51E25] text-white shadow-lg shadow-red-200/50'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </aside>

        {/* Dynamic Center Workstation */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 overflow-x-hidden">
          
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              {menuItems.find(m => m.key === activeTab)?.label}
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">eRupai Agency Operations Manager</p>
          </div>

          {/* DYNAMIC CONTENT SWITCHBOARD */}

          {/* Tab 1: Recruitment Hub */}
          {activeTab === 'agency' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-r from-red-50 to-orange-50/50 p-4 sm:p-6 rounded-2xl border border-red-100">
                <h3 className="text-base sm:text-lg font-extrabold text-[#E51E25]">Recruitment Hub & Bindings</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Bind new digital streaming hosts directly to verification IDs and support agents to track commission performance.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Form to bind host */}
                <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4 h-fit">
                  <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-[#E51E25]" /> Bind New Host
                  </h4>
                  <form onSubmit={handleAddHost} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Host Display Name</label>
                      <input
                        type="text"
                        required
                        value={newHostName}
                        onChange={(e) => setNewHostName(e.target.value)}
                        placeholder="e.g. Maya Sharma"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Linked Recruiter / Agent</label>
                      <select
                        value={newHostAgent}
                        onChange={(e) => setNewHostAgent(e.target.value)}
                        className="w-full bg-slate-55 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      >
                        <option value="Direct Agency">Direct Agency (No recruiter)</option>
                        {agents.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1">Initial Target Level</label>
                      <select
                        value={newHostTarget}
                        onChange={(e) => setNewHostTarget(e.target.value)}
                        className="w-full bg-slate-55 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      >
                        <option value="Bronze">Bronze (5k Beans/mo)</option>
                        <option value="Silver">Silver (20k Beans/mo)</option>
                        <option value="Gold">Gold (60k Beans/mo)</option>
                        <option value="Diamond">Diamond (150k Beans/mo)</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#E51E25] hover:bg-[#c4161c] text-white py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <PlusCircle className="w-3.5 h-3.5" /> Bind to Platform
                    </button>
                  </form>
                </div>

                {/* Hosts List Table Container */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <h4 className="font-extrabold text-slate-800 text-sm">Bound Active Hosts</h4>
                    <div className="relative w-full sm:w-60">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search bound hosts..."
                        value={hostSearch}
                        onChange={(e) => setHostSearch(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      />
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                        <tr>
                          <th className="p-3">Host ID</th>
                          <th className="p-3">Name</th>
                          <th className="p-3">Recruiter / Agent</th>
                          <th className="p-3 text-center">Status</th>
                          <th className="p-3 text-right">Beans Earned</th>
                          <th className="p-3 text-center">Target Tier</th>
                          <th className="p-3 text-center font-bold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredHosts.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="p-6 text-center text-slate-400 font-semibold">
                              No bound hosts matching criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredHosts.map(host => (
                            <tr key={host.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-3 font-mono font-bold text-[#E51E25] text-xs">{host.id}</td>
                              <td className="p-3 font-bold text-slate-800">{host.name}</td>
                              <td className="p-3 text-slate-500 font-medium">{host.agent}</td>
                              <td className="p-3 text-center">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold inline-block ${
                                  host.status === 'Streaming' ? 'bg-red-50 text-[#E51E25] animate-pulse' : 'bg-slate-50 text-slate-500'
                                }`}>{host.status}</span>
                              </td>
                              <td className="p-3 text-right font-mono font-bold text-[#E51E25]">{host.beans.toLocaleString()}</td>
                              <td className="p-3 text-center">
                                <span className="text-[10px] bg-red-50 text-[#E51E25] font-bold px-2 py-0.5 rounded-full border border-red-100">
                                  {host.target}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => setHosts(hosts.filter(h => h.id !== host.id))}
                                  className="p-1 text-slate-400 hover:text-[#E51E25] hover:bg-red-50 rounded transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 2: Agent Binding */}
          {activeTab === 'agent' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-r from-red-50 to-orange-50/50 p-4 sm:p-6 rounded-2xl border border-red-100">
                <h3 className="text-base sm:text-lg font-extrabold text-[#E51E25]">Sub-Agent Recruiting</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Configure direct recruiting rates, bind sub-agents to commission pools, and analyze earnings payouts.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Bind Agent Form */}
                <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4 h-fit">
                  <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-[#E51E25]" /> Onboard Agent
                  </h4>
                  <form onSubmit={handleCreateAgent} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Agent Full Name</label>
                      <input
                        type="text"
                        required
                        value={newAgentName}
                        onChange={(e) => setNewAgentName(e.target.value)}
                        placeholder="e.g. Suman Tamang"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Commission Rate Share (%)</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="1"
                          max="25"
                          value={newAgentCommission}
                          onChange={(e) => setNewAgentCommission(Number(e.target.value))}
                          className="flex-1 accent-red-600"
                        />
                        <span className="font-mono font-bold text-slate-700 w-8 text-right">{newAgentCommission}%</span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#E51E25] hover:bg-[#c4161c] text-white py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <PlusCircle className="w-3.5 h-3.5" /> Bind Agent Link
                    </button>
                  </form>
                </div>

                {/* Agents Directory */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-100">
                    <h4 className="font-extrabold text-slate-800 text-sm">Active Sub-Agents Network</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                        <tr>
                          <th className="p-3">Agent ID</th>
                          <th className="p-3">Name</th>
                          <th className="p-3 text-center">Bound Hosts</th>
                          <th className="p-3 text-center">Commission Cut</th>
                          <th className="p-3 text-right">Total Generated</th>
                          <th className="p-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {agents.map((ag) => (
                          <tr key={ag.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3 font-mono font-bold text-[#E51E25] text-xs">{ag.id}</td>
                            <td className="p-3 font-bold text-slate-800">{ag.name}</td>
                            <td className="p-3 text-center font-bold text-slate-700">{ag.hostsBound}</td>
                            <td className="p-3 text-center font-mono font-bold text-slate-700">{ag.commissionRate}%</td>
                            <td className="p-3 text-right font-mono font-extrabold text-green-600">{ag.totalEarned.toLocaleString()} Beans</td>
                            <td className="p-3 text-center">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold inline-block ${
                                ag.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                              }`}>{ag.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Calculator Section */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" /> Commission Revenue Estimator
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Total Host Earnings (Beans)</label>
                    <input
                      type="number"
                      value={calcBeans}
                      onChange={(e) => setCalcBeans(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Agent Cut Rate (%)</label>
                    <input
                      type="number"
                      max="100"
                      value={calcRate}
                      onChange={(e) => setCalcRate(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-mono focus:outline-none"
                    />
                  </div>
                  <div className="bg-[#F8F8FA] p-3 rounded-xl border border-slate-150 flex flex-col justify-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Estimated Agent Payout</span>
                    <span className="text-xl font-black text-green-600 mt-1 font-mono">
                      {((calcBeans * calcRate) / 100).toLocaleString()} Beans
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab 3: Host PK Battle Simulator */}
          {activeTab === 'host' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-r from-red-50 to-orange-50/50 p-4 sm:p-6 rounded-2xl border border-red-100">
                <h3 className="text-base sm:text-lg font-extrabold text-[#E51E25]">Live Stream PK Battle Arena</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  PK Battles are interactive live competitions where users support hosts with gifts. Choose a bound host, simulate battle matching, and earn Beans!
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Battle Simulator Dashboard */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                      <Play className="w-4 h-4 text-[#E51E25]" /> PK Simulation Configuration
                    </h4>
                    
                    <div>
                      <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1">Select Streaming Host</label>
                      <select
                        value={streamingHostId}
                        onChange={(e) => setStreamingHostId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      >
                        {hosts.map(h => <option key={h.id} value={h.id}>{h.name} ({h.id})</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1">Matched Opponent Host</label>
                      <input
                        type="text"
                        value={battleOpponent}
                        onChange={(e) => setBattleOpponent(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <button
                      onClick={simulatePKBattle}
                      disabled={battleStatus === 'loading'}
                      className="w-full bg-gradient-to-r from-[#E51E25] to-orange-500 disabled:opacity-50 text-white py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      {battleStatus === 'loading' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> Matching Battle...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" /> Start Battle Match
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Live Simulation Arena Box */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between items-center shadow-lg relative overflow-hidden min-h-[300px]">
                  
                  {/* Neon Grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                  <div className="w-full flex justify-between items-center z-10 border-b border-white/10 pb-3">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest animate-pulse">● Live Simulation</span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded uppercase font-mono">VS Matches</span>
                  </div>

                  <div className="w-full flex justify-around items-center z-10 my-6">
                    {/* Host */}
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-xl font-bold border-2 border-red-400">
                        {hosts.find(h => h.id === streamingHostId)?.name[0] || 'H'}
                      </div>
                      <div className="font-extrabold text-sm truncate w-24">
                        {hosts.find(h => h.id === streamingHostId)?.name}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Host</span>
                    </div>

                    <div className="text-center font-black text-xl italic text-red-500 bg-white/5 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                      VS
                    </div>

                    {/* Opponent */}
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-xl font-bold border-2 border-slate-500">
                        {battleOpponent[0] || 'O'}
                      </div>
                      <div className="font-extrabold text-sm truncate w-24">{battleOpponent}</div>
                      <span className="text-[10px] text-slate-400 font-mono">Opponent</span>
                    </div>
                  </div>

                  <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center z-10">
                    {battleStatus === 'idle' && (
                      <span className="text-slate-400 text-xs sm:text-sm">Initiate battle simulator to check PK battle status.</span>
                    )}
                    {battleStatus === 'loading' && (
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-yellow-400 font-extrabold tracking-widest animate-bounce">FIGHTING...</span>
                        <div className="w-full max-w-[200px] bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-yellow-500 h-full animate-[shimmer_1.5s_infinite] w-2/3"></div>
                        </div>
                      </div>
                    )}
                    {battleStatus === 'won' && (
                      <div className="space-y-1">
                        <div className="text-green-400 font-black text-sm uppercase">🎉 VICTORY!</div>
                        <div className="text-xs text-slate-300">Earned <span className="font-mono font-black text-green-400">+{battleBeansWon.toLocaleString()}</span> Beans during simulated PK Battle</div>
                      </div>
                    )}
                    {battleStatus === 'lost' && (
                      <div className="space-y-1">
                        <div className="text-red-400 font-black text-sm uppercase">DEFEAT</div>
                        <div className="text-xs text-slate-350">Better luck next match! Opponent won the simulated round.</div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 4: Target System */}
          {activeTab === 'target' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-r from-red-50 to-orange-50/50 p-4 sm:p-6 rounded-2xl border border-red-100">
                <h3 className="text-base sm:text-lg font-extrabold text-[#E51E25]">Target & Incentives Matrix</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Simulate current monthly goals. Achieved goals unlock incremental commission payouts and reward pools.
                </p>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <h4 className="font-extrabold text-slate-800 text-sm">Monthly Target Volume Completion</h4>
                  <span className="text-lg font-black text-[#E51E25] font-mono">{coinSalesProgress}% Achieved</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="bg-gradient-to-r from-[#E51E25] to-orange-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(100, coinSalesProgress)}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {targetTiers.map((tier, i) => {
                    const progressVal = (customGoal * (i === 0 ? 0.5 : i === 1 ? 0.8 : 1.0))
                    const reached = coinSalesProgress >= (i === 0 ? 50 : i === 1 ? 80 : 100)
                    return (
                      <div key={i} className={`p-4 rounded-2xl border transition-all ${
                        reached ? 'bg-green-50 border-green-200 text-green-800' : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}>
                        <div className="flex justify-between items-center font-black text-xs sm:text-sm">
                          <span>{tier.level}</span>
                          {reached ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Award className="w-4 h-4 text-slate-300" />}
                        </div>
                        <p className="text-[10px] sm:text-xs font-semibold mt-1">Requires: {progressVal.toLocaleString()} Coins</p>
                        <div className="text-xs font-black mt-2 text-slate-700">{tier.bonus}</div>
                      </div>
                    )
                  })}
                </div>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-450 uppercase mb-2">Simulate Current Sales Progress</label>
                    <input
                      type="range"
                      min="0"
                      max="120"
                      value={coinSalesProgress}
                      onChange={(e) => setCoinSalesProgress(Number(e.target.value))}
                      className="w-full accent-[#E51E25]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-450 uppercase mb-2">Customize Target Milestone Goal</label>
                    <input
                      type="number"
                      value={customGoal}
                      onChange={(e) => setCustomGoal(Number(e.target.value))}
                      className="w-full bg-slate-55 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-mono focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Revenue Share Settings */}
          {activeTab === 'revenue' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-r from-red-50 to-orange-50/50 p-4 sm:p-6 rounded-2xl border border-red-100">
                <h3 className="text-base sm:text-lg font-extrabold text-[#E51E25]">Platform Revenue Split configuration</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Admins can dynamically calibrate commission share limits across the distribution system. Split ratios must sum exactly to 100%.
                </p>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-100">
                  <h4 className="font-extrabold text-slate-800 text-sm">Hierarchy Split Percentage Config</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Sum Split:</span>
                    <span className={`text-base font-black px-3 py-1 rounded-full ${
                      (revPlatform + revDiamond + revAgency + revAgent + revHost) === 100 
                        ? 'bg-green-50 text-green-600 border border-green-100' 
                        : 'bg-red-50 text-red-500 border border-red-100'
                    }`}>
                      {(revPlatform + revDiamond + revAgency + revAgent + revHost)}%
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button onClick={() => applyRevSharePreset('host-focused')} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">Host-Focused Split (50% Host)</button>
                  <button onClick={() => applyRevSharePreset('platform-focused')} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">Platform-Focused Split (50% Plat)</button>
                  <button onClick={() => applyRevSharePreset('balanced')} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">Balanced Split</button>
                </div>

                <div className="space-y-4 pt-2">
                  {[
                    { label: 'Platform Infrastructure Split', val: revPlatform, set: setRevPlatform, color: 'accent-[#E51E25]' },
                    { label: 'Diamond Agency share', val: revDiamond, set: setRevDiamond, color: 'accent-[#E51E25]' },
                    { label: 'Recruiter Agency share', val: revAgency, set: setRevAgency, color: 'accent-[#E51E25]' },
                    { label: 'Recruit Agent share', val: revAgent, set: setRevAgent, color: 'accent-[#E51E25]' },
                    { label: 'Streaming Host share', val: revHost, set: setRevHost, color: 'accent-[#E51E25]' }
                  ].map((slice, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="w-52 shrink-0 flex justify-between font-bold text-xs sm:text-sm text-slate-700">
                        <span>{slice.label}</span>
                        <span className="font-mono text-[#E51E25] font-black">{slice.val}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={slice.val}
                        onChange={(e) => slice.set(Number(e.target.value))}
                        className={`flex-1 ${slice.color}`}
                      />
                    </div>
                  ))}
                </div>

                {(revPlatform + revDiamond + revAgency + revAgent + revHost) !== 100 && (
                  <div className="p-3 bg-red-50 border border-red-100 text-[#E51E25] rounded-xl text-xs font-bold text-center">
                    ⚠️ Split configuration error: All fields must sum up to exactly 100%. Adjust ranges before saving.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 6: Agency Analytics */}
          {activeTab === 'agency-dash' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Main KPI blocks */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Bound Hosts', val: hosts.length, color: 'text-[#E51E25]', label: 'All verified' },
                  { title: 'Simulated Sales', val: '₹ 15.6L', color: 'text-slate-800', label: 'Month to date' },
                  { title: 'Sub-Agents', val: agents.length, color: 'text-slate-800', label: 'Verified bound' },
                  { title: 'Milestone Progress', val: `${coinSalesProgress}%`, color: 'text-green-600', label: 'Next tier' }
                ].map((kpi, idx) => (
                  <div key={idx} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.title}</span>
                    <div className={`text-xl sm:text-3xl font-black ${kpi.color} mt-1`}>{kpi.val}</div>
                    <span className="text-[10px] text-slate-450 mt-1 font-bold">{kpi.label}</span>
                  </div>
                ))}
              </div>

              {/* Bar Chart Panel */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <h4 className="font-extrabold text-slate-800 text-sm">Simulated Agency 7-Day Performance Trend</h4>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="bg-slate-55 border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none font-semibold text-slate-700"
                  >
                    <option value="All">All Regions</option>
                    <option value="NP">Nepal</option>
                    <option value="IN">India</option>
                  </select>
                </div>

                <div className="h-44 flex items-end gap-2 sm:gap-4 justify-between pt-6 border-b border-slate-150">
                  {kpiTimeline.map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-[9px] font-mono font-bold text-slate-400">₹{(val/1000).toFixed(0)}K</div>
                      <div
                        className="bg-gradient-to-t from-[#E51E25] to-orange-400 rounded-t-lg w-full transition-all duration-500 hover:brightness-110 cursor-pointer"
                        style={{ height: `${(val / 180000) * 100}%` }}
                      ></div>
                      <span className="text-[9px] font-bold text-slate-400">Day {idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 7: Agent Dashboard */}
          {activeTab === 'agent-dash' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Available Balance Box */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 sm:p-6 rounded-3xl shadow-lg flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available Rewards Pool</span>
                    <div className="text-2xl sm:text-3xl font-black font-mono">{availableBeans.toLocaleString()} <span className="text-sm font-normal text-slate-400">Beans</span></div>
                  </div>
                  <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs text-slate-450">
                    <span>Rate: 100 Beans = ₹1</span>
                    <span className="font-extrabold text-green-400">₹{(availableBeans / 100).toFixed(2)} Equiv.</span>
                  </div>
                </div>

                {/* Simulated Withdrawal Request */}
                <div className="md:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#E51E25]" /> Request Commission Cashout
                  </h4>
                  <form onSubmit={handleWithdrawalRequest} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1">Cashout Amount (Beans)</label>
                      <input
                        type="number"
                        min="100"
                        value={withdrawalBeans}
                        onChange={(e) => setWithdrawalBeans(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-mono focus:outline-none"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="submit"
                        disabled={withdrawalBeans <= 0 || withdrawalBeans > availableBeans}
                        className="w-full bg-[#E51E25] hover:bg-[#c4161c] disabled:opacity-50 text-white py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <Wallet className="w-4 h-4" /> Request E-Rupee Cashout
                      </button>
                    </div>
                  </form>
                </div>

              </div>

              {/* Audit logs list */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="font-extrabold text-slate-800 text-sm">Agent Payout Audit Logs</h4>
                  <span className="text-[10px] bg-red-50 text-[#E51E25] font-bold px-2 py-0.5 rounded-full">Immutable Ledger</span>
                </div>
                <div className="p-4 space-y-3">
                  {auditLedger.map((log, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 hover:bg-slate-50/50 rounded-xl transition-all border border-slate-100 bg-slate-50/20">
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-800">{log.text}</div>
                        <div className="text-[10px] font-bold text-slate-400 mt-1">{log.date}</div>
                      </div>
                      <span className="text-xs sm:text-sm font-black font-mono shrink-0 ml-2 text-slate-600">
                        {log.beans}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  )
}
