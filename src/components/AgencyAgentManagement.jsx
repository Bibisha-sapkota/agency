import React, { useState, useEffect } from 'react'
import { UserCheck, Eye, Edit, Ban, UserPlus, Calendar, DollarSign, Clock, Search, Filter, MapPin, Phone, Mail, Award, TrendingUp, FileText, Lock, Unlock, MessageSquare, Monitor, CheckCircle2, Calendar as CalendarIcon, Users, Radio, UserCircle, ArrowLeft, AlertCircle, X } from 'lucide-react'

// Mock superadmin/platform user database
const superadminUserDB = {
  'SA-1001': { superadminId: 'SA-1001', name: 'Priya Sharma', nickname: 'PriyaLive', gender: 'Female', dob: '1998-05-12', country: 'India', state: 'Maharashtra', city: 'Mumbai', mobile: '+91-9876540001', email: 'priya.sharma@mail.com', level: 18, totalBeans: 124500, status: 'Active', joinedPlatform: '2023-11-10', avatar: '🎤' },
  'SA-1002': { superadminId: 'SA-1002', name: 'Rohan Thakur', nickname: 'RohanKing', gender: 'Male', dob: '1996-08-25', country: 'Nepal', state: 'Bagmati', city: 'Kathmandu', mobile: '+977-9811223344', email: 'rohan.thakur@mail.com', level: 22, totalBeans: 210300, status: 'Active', joinedPlatform: '2023-07-14', avatar: '🎸' },
  'SA-1003': { superadminId: 'SA-1003', name: 'Anita Rai', nickname: 'AnitaStar', gender: 'Female', dob: '2000-02-18', country: 'Nepal', state: 'Gandaki', city: 'Pokhara', mobile: '+977-9800112233', email: 'anita.rai@mail.com', level: 14, totalBeans: 87200, status: 'Active', joinedPlatform: '2024-01-05', avatar: '⭐' },
  'SA-1004': { superadminId: 'SA-1004', name: 'Suresh Patel', nickname: 'SureshVibe', gender: 'Male', dob: '1995-11-30', country: 'India', state: 'Gujarat', city: 'Ahmedabad', mobile: '+91-9988776655', email: 'suresh.patel@mail.com', level: 31, totalBeans: 450000, status: 'Active', joinedPlatform: '2023-03-20', avatar: '🎵' },
}

function HostRecruitForm({ agents, onCancel, selectedAgent }) {
  const [lookupId, setLookupId] = useState('')
  const [foundUser, setFoundUser] = useState(null)
  const [lookupError, setLookupError] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    hostType: '',
    vipStatus: 'no',
    recruitingAgent: selectedAgent ? selectedAgent.id : '',
    status: 'pending',
  })

  const handleLookup = () => {
    if (!lookupId.trim()) { setLookupError('Please enter a Superadmin ID'); return }
    setIsSearching(true)
    setLookupError('')
    setFoundUser(null)
    setTimeout(() => {
      const user = superadminUserDB[lookupId.trim().toUpperCase()]
      if (user) {
        setFoundUser(user)
        setShowForm(false)
      } else {
        setLookupError(`No user found with ID "${lookupId}". Try: SA-1001, SA-1002, SA-1003, SA-1004`)
      }
      setIsSearching(false)
    }, 600)
  }

  const handleProceed = () => setShowForm(true)
  const handleReset = () => { setFoundUser(null); setLookupId(''); setShowForm(false); setLookupError('') }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onCancel} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all text-slate-600">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="font-extrabold text-slate-800 text-lg">Recruit Host</h2>
          <p className="text-xs text-slate-400 mt-0.5">Enter Superadmin ID to fetch host details from the platform</p>
        </div>
      </div>

      {/* Step 1: ID Lookup */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
          <Search className="w-4 h-4 text-[#E51E25]" /> Step 1 — Enter Superadmin ID
        </h3>
        <div className="flex gap-3">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="e.g. SA-1001"
              value={lookupId}
              onChange={e => { setLookupId(e.target.value); setLookupError('') }}
              onKeyDown={e => e.key === 'Enter' && handleLookup()}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 pr-10"
            />
            {lookupId && (
              <button onClick={handleReset} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={handleLookup}
            disabled={isSearching}
            className="px-6 py-3 bg-[#E51E25] text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all flex items-center gap-2 disabled:opacity-60"
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
        {lookupError && (
          <div className="mt-3 flex items-start gap-2 text-red-600 bg-red-50 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span className="text-xs font-medium">{lookupError}</span>
          </div>
        )}
      </div>

      {/* Step 2: User Found Card */}
      {foundUser && !showForm && (
        <div className="bg-white rounded-2xl border-2 border-green-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Step 2 — User Found
            </h3>
            <span className="text-xs bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full">Verified</span>
          </div>

          {/* Profile Card */}
          <div className="flex items-center gap-5 bg-gradient-to-r from-slate-50 to-slate-100/60 rounded-2xl p-5">
            <div className="w-16 h-16 bg-gradient-to-br from-[#E51E25] to-[#c4161c] rounded-2xl flex items-center justify-center text-3xl shadow-md">
              {foundUser.avatar}
            </div>
            <div className="flex-1">
              <div className="font-extrabold text-slate-800 text-base">{foundUser.name}</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">@{foundUser.nickname} · {foundUser.superadminId}</div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">Lv.{foundUser.level}</span>
                <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">{foundUser.totalBeans.toLocaleString()} Beans</span>
                <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">{foundUser.status}</span>
              </div>
            </div>
          </div>

          {/* Detail Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: <UserCircle className="w-3.5 h-3.5" />, label: 'Gender', value: foundUser.gender },
              { icon: <CalendarIcon className="w-3.5 h-3.5" />, label: 'Date of Birth', value: foundUser.dob },
              { icon: <MapPin className="w-3.5 h-3.5" />, label: 'Country', value: foundUser.country },
              { icon: <MapPin className="w-3.5 h-3.5" />, label: 'State / City', value: `${foundUser.state}, ${foundUser.city}` },
              { icon: <Phone className="w-3.5 h-3.5" />, label: 'Mobile', value: foundUser.mobile },
              { icon: <Mail className="w-3.5 h-3.5" />, label: 'Email', value: foundUser.email },
              { icon: <CalendarIcon className="w-3.5 h-3.5" />, label: 'Joined Platform', value: foundUser.joinedPlatform },
              { icon: <Award className="w-3.5 h-3.5" />, label: 'Platform Level', value: `Level ${foundUser.level}` },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">{item.icon}<span className="text-[10px] font-bold uppercase">{item.label}</span></div>
                <div className="text-xs font-bold text-slate-800 truncate">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={handleProceed} className="px-6 py-3 bg-[#E51E25] text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Proceed to Recruit
            </button>
            <button onClick={handleReset} className="px-5 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
              Search Again
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Full Recruitment Form */}
      {foundUser && showForm && (
        <>
          {/* User Summary Bar */}
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] rounded-2xl p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">{foundUser.avatar}</div>
              <div>
                <div className="font-extrabold text-sm">{foundUser.name} <span className="opacity-70 font-medium text-xs">@{foundUser.nickname}</span></div>
                <div className="text-xs opacity-70">{foundUser.superadminId} · {foundUser.country}</div>
              </div>
            </div>
            <button onClick={() => setShowForm(false)} className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg font-bold transition-all">
              ← Back to Details
            </button>
          </div>

          {/* Step 3: Platform Details */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-6 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-[#E51E25]" /> Step 3 — Platform & Recruitment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Host Name (Auto-filled)</label>
                <input type="text" value={foundUser.name} disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm opacity-70" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Nickname (Auto-filled)</label>
                <input type="text" value={foundUser.nickname} disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm opacity-70" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Mobile (Auto-filled)</label>
                <input type="text" value={foundUser.mobile} disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm opacity-70" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email (Auto-filled)</label>
                <input type="text" value={foundUser.email} disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm opacity-70" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Country (Auto-filled)</label>
                <input type="text" value={`${foundUser.country} · ${foundUser.city}`} disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm opacity-70" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Agency (Auto)</label>
                <input type="text" value="Diamond Agency" disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm opacity-70" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Host Type</label>
                <select value={formData.hostType} onChange={e => setFormData({...formData, hostType: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                  <option value="">Select type</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">VIP Status</label>
                <select value={formData.vipStatus} onChange={e => setFormData({...formData, vipStatus: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Recruiting Agent</label>
                <select value={formData.recruitingAgent} onChange={e => setFormData({...formData, recruitingAgent: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                  <option value="">Select agent</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* KYC Documents */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-6 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#E51E25]" /> KYC Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Citizenship', 'Passport', 'Selfie Verification'].map((doc, i) => (
                <div key={i}>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{doc}</label>
                  <input type="file" accept={doc === 'Selfie Verification' ? 'image/*' : 'image/*,.pdf'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30" />
                </div>
              ))}
            </div>
          </div>

          {/* Application Status */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E51E25]" /> Application Status
            </h3>
            <div className="max-w-xs">
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                <option value="pending">Pending Approval</option>
                <option value="approved">Approved</option>
                <option value="draft">Draft</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-[#E51E25] text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Submit Recruitment
            </button>
            <button className="px-5 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">Save Draft</button>
            <button onClick={onCancel} className="px-5 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">Cancel</button>
          </div>
        </>
      )}
    </div>
  )
}

export default function AgencyAgentManagement({ subTab = 'all-agents' }) {
  const [activeTab, setActiveTab] = useState(subTab)
  const [searchQuery, setSearchQuery] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [actionType, setActionType] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [editingAgent, setEditingAgent] = useState(null)
  const [newAgent, setNewAgent] = useState({
    name: '',
    mobile: '',
    email: '',
    whatsapp: '',
    country: '',
    state: '',
    city: '',
    address: '',
    gender: '',
    dob: '',
    username: '',
    password: '',
    assignedAgency: '',
    recruiterType: '',
    status: 'active',
    kycStatus: 'pending'
  })
  const [filters, setFilters] = useState({
    country: '',
    state: '',
    city: '',
    status: '',
    performance: '',
    joinDate: '',
    recruiterType: ''
  })
  
  const [historyFilters, setHistoryFilters] = useState({
    dateRange: '',
    country: '',
    agentId: '',
    status: ''
  })

  // Sync activeTab with subTab prop
  useEffect(() => {
    if (subTab) {
      setActiveTab(subTab)
    }
  }, [subTab])

  const agents = [
    { id: 'AG-001', name: 'Rahul Thapa', email: 'rahul@agency.com', mobile: '+977-9876543210', country: 'Nepal', state: 'Bagmati', city: 'Kathmandu', status: 'active', registeredHosts: 25, activeHosts: 20, liveHosts: 5, monthlyRecruitment: 3, commissionEarned: 45000, performance: 92, kycStatus: 'verified', joinDate: '2024-01-15', lastLogin: '2026-07-18 10:30', recruiterType: 'Senior Recruiter', assignedAgency: 'Diamond Agency', profilePhoto: '👤' },
    { id: 'AG-002', name: 'Priya Gurung', email: 'priya@agency.com', mobile: '+977-9876543211', country: 'Nepal', state: 'Bagmati', city: 'Lalitpur', status: 'active', registeredHosts: 18, activeHosts: 15, liveHosts: 3, monthlyRecruitment: 2, commissionEarned: 38000, performance: 88, kycStatus: 'verified', joinDate: '2024-02-20', lastLogin: '2026-07-18 09:15', recruiterType: 'Junior Recruiter', assignedAgency: 'Diamond Agency', profilePhoto: '👤' },
    { id: 'AG-003', name: 'Amit KC', email: 'amit@agency.com', mobile: '+977-9876543212', country: 'Nepal', state: 'Gandaki', city: 'Pokhara', status: 'active', registeredHosts: 32, activeHosts: 28, liveHosts: 8, monthlyRecruitment: 4, commissionEarned: 52000, performance: 95, kycStatus: 'verified', joinDate: '2024-03-10', lastLogin: '2026-07-18 11:45', recruiterType: 'Senior Recruiter', assignedAgency: 'Diamond Agency', profilePhoto: '👤' },
    { id: 'AG-004', name: 'Nisha Rai', email: 'nisha@agency.com', mobile: '+91-9876543210', country: 'India', state: 'Delhi', city: 'New Delhi', status: 'suspended', registeredHosts: 15, activeHosts: 10, liveHosts: 2, monthlyRecruitment: 1, commissionEarned: 28000, performance: 78, kycStatus: 'pending', joinDate: '2024-04-05', lastLogin: '2026-07-15 14:20', recruiterType: 'Junior Recruiter', assignedAgency: 'Diamond Agency', profilePhoto: '👤' },
    { id: 'AG-005', name: 'Suman Shrestha', email: 'suman@agency.com', mobile: '+977-9876543213', country: 'Nepal', state: 'Bagmati', city: 'Bhaktapur', status: 'active', registeredHosts: 28, activeHosts: 23, liveHosts: 6, monthlyRecruitment: 3, commissionEarned: 41000, performance: 85, kycStatus: 'verified', joinDate: '2024-05-12', lastLogin: '2026-07-18 08:00', recruiterType: 'Senior Recruiter', assignedAgency: 'Diamond Agency', profilePhoto: '👤' }
  ]

  const recruitmentHistory = [
    { host: 'Aria Live', hostId: 'H-901', agent: 'Rahul Thapa', agentId: 'AG-001', joinDate: '2026-07-15', status: 'active', commission: 15000 },
    { host: 'Gamer Pro', hostId: 'H-902', agent: 'Priya Gurung', agentId: 'AG-002', joinDate: '2026-07-14', status: 'active', commission: 12000 },
    { host: 'Nisha Sing', hostId: 'H-903', agent: 'Amit KC', agentId: 'AG-003', joinDate: '2026-07-13', status: 'active', commission: 18000 },
    { host: 'Kathmandu Vibe', hostId: 'H-904', agent: 'Rahul Thapa', agentId: 'AG-001', joinDate: '2026-07-12', status: 'pending', commission: 8000 },
    { host: 'Live King', hostId: 'H-905', agent: 'Priya Gurung', agentId: 'AG-002', joinDate: '2026-07-11', status: 'active', commission: 14000 }
  ]

  const recruitmentCommission = [
    { agent: 'Rahul Thapa', agentId: 'AG-001', totalCommission: 45000, paid: 38000, pending: 7000 },
    { agent: 'Priya Gurung', agentId: 'AG-002', totalCommission: 38000, paid: 32000, pending: 6000 },
    { agent: 'Amit KC', agentId: 'AG-003', totalCommission: 52000, paid: 45000, pending: 7000 },
    { agent: 'Nisha Rai', agentId: 'AG-004', totalCommission: 28000, paid: 25000, pending: 3000 },
    { agent: 'Suman Shrestha', agentId: 'AG-005', totalCommission: 41000, paid: 36000, pending: 5000 }
  ]

  const hostTargetsData = [
    { hostId: 'H-901', hostName: 'Aria Live', agentName: 'Rahul Thapa', targetLevel: 'Level 1', targetHours: 20, completedHours: 15 },
    { hostId: 'H-902', hostName: 'Gamer Pro', agentName: 'Priya Gurung', targetLevel: 'Level 3', targetHours: 60, completedHours: 65 },
    { hostId: 'H-903', hostName: 'Nisha Sing', agentName: 'Amit KC', targetLevel: 'Level 2', targetHours: 40, completedHours: 10 },
    { hostId: 'H-905', hostName: 'Live King', agentName: 'Priya Gurung', targetLevel: 'Level 1', targetHours: 20, completedHours: 20 },
    { hostId: 'H-906', hostName: 'Music Star', agentName: 'Suman Shrestha', targetLevel: 'Level 2', targetHours: 40, completedHours: 35 },
  ]

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Active</span>
      case 'suspended':
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">Suspended</span>
      case 'pending':
        return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Pending</span>
      default:
        return <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">{status}</span>
    }
  }

  const getKycBadge = (status) => {
    switch(status) {
      case 'verified':
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Verified</span>
      case 'pending':
        return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Pending</span>
      default:
        return <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">{status}</span>
    }
  }

  const handleAction = (agent, action) => {
    setSelectedAgent(agent)
    setActionType(action)
    if (action === 'view') {
      setEditingAgent(agent)
      setActiveTab('agent-profile')
    } else if (action === 'edit') {
      setEditingAgent(agent)
      setActiveTab('edit-agent')
    } else if (action === 'notes') {
      setPopupOpen(true)
    } else if (action === 'recruit') {
      setActiveTab('host-registration')
    } else if (action === 'performance') {
      setActiveTab('agent-performance')
    } else if (action === 'commission') {
      setActiveTab('recruitment-commission')
    } else if (action === 'suspend' || action === 'activate') {
      setPopupOpen(true)
    }
  }

  const confirmAction = () => {
    if (actionType === 'suspend' && selectedAgent) {
      const updatedAgents = agents.map(a => 
        a.id === selectedAgent.id ? { ...a, status: 'suspended' } : a
      )
      // Update agents state (would need to use setAgents if it was state)
      alert(`Suspended agent ${selectedAgent.name}`)
    } else if (actionType === 'activate' && selectedAgent) {
      const updatedAgents = agents.map(a => 
        a.id === selectedAgent.id ? { ...a, status: 'active' } : a
      )
      alert(`Activated agent ${selectedAgent.name}`)
    } else if (actionType === 'edit' && selectedAgent) {
      alert(`Edited agent ${selectedAgent.name}`)
    } else if (actionType === 'notes' && selectedAgent) {
      alert(`Added notes for agent ${selectedAgent.name}`)
    }
    setPopupOpen(false)
    setSelectedAgent(null)
    setActionType('')
  }

  const cancelAction = () => {
    setPopupOpen(false)
    setSelectedAgent(null)
    setActionType('')
  }

  return (
    <div className="space-y-6">
      {/* All Agents */}
      {activeTab === 'all-agents' && (
        <div className="space-y-6">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Total Agents</span>
              </div>
              <div className="text-3xl font-extrabold text-slate-800">{agents.length}</div>
              <div className="text-xs text-slate-600 mt-1">registered</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Active Agents</span>
              </div>
              <div className="text-3xl font-extrabold text-green-600">{agents.filter(a => a.status === 'active').length}</div>
              <div className="text-xs text-slate-600 mt-1">currently active</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Inactive Agents</span>
              </div>
              <div className="text-3xl font-extrabold text-amber-600">{agents.filter(a => a.status === 'pending').length}</div>
              <div className="text-xs text-slate-600 mt-1">pending approval</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Suspended Agents</span>
              </div>
              <div className="text-3xl font-extrabold text-red-600">{agents.filter(a => a.status === 'suspended').length}</div>
              <div className="text-xs text-slate-600 mt-1">temporarily suspended</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">New This Month</span>
              </div>
              <div className="text-3xl font-extrabold text-purple-600">2</div>
              <div className="text-xs text-slate-600 mt-1">new registrations</div>
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Total Recruited Hosts</span>
              </div>
              <div className="text-3xl font-extrabold text-blue-600">{agents.reduce((sum, a) => sum + a.registeredHosts, 0)}</div>
              <div className="text-xs text-slate-600 mt-1">all time</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Active Hosts</span>
              </div>
              <div className="text-3xl font-extrabold text-green-600">{agents.reduce((sum, a) => sum + a.activeHosts, 0)}</div>
              <div className="text-xs text-slate-600 mt-1">currently active</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Live Hosts</span>
              </div>
              <div className="text-3xl font-extrabold text-purple-600">{agents.reduce((sum, a) => sum + a.liveHosts, 0)}</div>
              <div className="text-xs text-slate-600 mt-1">currently live</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Total Commission</span>
              </div>
              <div className="text-3xl font-extrabold text-green-600">₹{agents.reduce((sum, a) => sum + a.commissionEarned, 0).toLocaleString()}</div>
              <div className="text-xs text-slate-600 mt-1">total earnings</div>
            </div>
          </div>

          {/* Top Performing Agent */}
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase opacity-80 mb-2">Top Performing Agent</div>
                <div className="text-2xl font-extrabold">{agents.reduce((max, a) => a.performance > max.performance ? a : max).name}</div>
                <div className="text-sm opacity-80 mt-1">{agents.reduce((max, a) => a.performance > max.performance ? a : max).performance}% Performance Score</div>
              </div>
              <Award className="w-16 h-16 opacity-80" />
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-slate-800 text-sm">Filters</h3>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
              >
                <Filter className="w-4 h-4" />
                {filterOpen ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            
            {filterOpen && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Search</label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="ID / Name / Mobile"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Country</label>
                  <select
                    value={filters.country}
                    onChange={(e) => setFilters({...filters, country: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    <option value="">All Countries</option>
                    <option value="Nepal">Nepal</option>
                    <option value="India">India</option>
                    <option value="UAE">UAE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">State</label>
                  <select
                    value={filters.state}
                    onChange={(e) => setFilters({...filters, state: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    <option value="">All States</option>
                    <option value="Bagmati">Bagmati</option>
                    <option value="Gandaki">Gandaki</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">City</label>
                  <select
                    value={filters.city}
                    onChange={(e) => setFilters({...filters, city: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    <option value="">All Cities</option>
                    <option value="Kathmandu">Kathmandu</option>
                    <option value="Lalitpur">Lalitpur</option>
                    <option value="Pokhara">Pokhara</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Performance</label>
                  <select
                    value={filters.performance}
                    onChange={(e) => setFilters({...filters, performance: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    <option value="">All Performance</option>
                    <option value="high">High (80%+)</option>
                    <option value="medium">Medium (60-80%)</option>
                    <option value="low">Low (&lt;60%)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Recruiter Type</label>
                  <select
                    value={filters.recruiterType}
                    onChange={(e) => setFilters({...filters, recruiterType: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    <option value="">All Types</option>
                    <option value="Senior Recruiter">Senior Recruiter</option>
                    <option value="Junior Recruiter">Junior Recruiter</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Agents Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-5 flex items-center justify-between shadow-md">
              <div>
                <h3 className="font-extrabold text-white text-lg">All Agents</h3>
                <p className="text-white/80 text-xs mt-1">{agents.length} agents registered</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white/20 text-white rounded-lg text-xs font-bold hover:bg-white/30 transition-all">
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gradient-to-b from-slate-50 to-slate-100 text-slate-600 font-bold uppercase text-[11px] tracking-wider border-b-2 border-slate-200">
                  <tr>
                    <th className="px-5 py-4">Agent</th>
                    <th className="px-5 py-4">Contact</th>
                    <th className="px-5 py-4">Location</th>
                    <th className="px-5 py-4">Commission</th>
                    <th className="px-5 py-4">Performance</th>
                    <th className="px-5 py-4">KYC</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Join Date</th>
                    <th className="px-5 py-4">Last Login</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {agents.filter(agent => {
                    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                         agent.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                         agent.mobile.includes(searchQuery)
                    const matchesCountry = !filters.country || agent.country === filters.country
                    const matchesState = !filters.state || agent.state === filters.state
                    const matchesCity = !filters.city || agent.city === filters.city
                    const matchesStatus = !filters.status || agent.status === filters.status
                    const matchesPerformance = !filters.performance || 
                                          (filters.performance === 'high' && agent.performance >= 80) ||
                                          (filters.performance === 'medium' && agent.performance >= 60 && agent.performance < 80) ||
                                          (filters.performance === 'low' && agent.performance < 60)
                    const matchesRecruiter = !filters.recruiterType || agent.recruiterType === filters.recruiterType
                    
                    return matchesSearch && matchesCountry && matchesState && matchesCity && matchesStatus && matchesPerformance && matchesRecruiter
                  }).map((agent) => (
                    <tr key={agent.id} className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-white transition-all duration-200 group">
                      <td className="px-5 py-5">
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{agent.name}</div>
                          <div className="text-xs text-slate-400 font-mono">{agent.id}</div>
                        </div>
                      </td>
                      <td className="px-5 py-5">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-xs font-medium">{agent.mobile}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-xs font-medium truncate max-w-[140px]">{agent.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5">
                        <div className="space-y-1.5">
                          <div className="text-xs font-medium text-slate-800">{agent.country}</div>
                          <div className="text-xs text-slate-500">{agent.state}</div>
                          <div className="text-xs text-slate-500">{agent.city}</div>
                        </div>
                      </td>
                      <td className="px-5 py-5">
                        <div className="px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                          <span className="text-sm font-bold text-green-700">₹{agent.commissionEarned.toLocaleString()}</span>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] h-2.5 rounded-full transition-all duration-300" 
                                style={{ width: `${agent.performance}%` }}
                              ></div>
                            </div>
                            <span className="font-bold text-slate-800 text-sm w-12 text-right">{agent.performance}%</span>
                          </div>
                          <div className={`text-xs font-bold px-2 py-1 rounded-full text-center ${
                            agent.performance >= 90 ? 'bg-yellow-100 text-yellow-700' :
                            agent.performance >= 80 ? 'bg-slate-100 text-slate-700' :
                            agent.performance >= 60 ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {agent.performance >= 90 ? 'Excellent' : agent.performance >= 80 ? 'Good' : agent.performance >= 60 ? 'Average' : 'Poor'}
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">{getKycBadge(agent.kycStatus)}</td>
                      <td className="px-5 py-4">{getStatusBadge(agent.status)}</td>
                      <td className="px-5 py-4">
                        <div className="text-xs font-medium text-slate-600">{agent.joinDate}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-xs font-medium text-slate-600">{agent.lastLogin}</div>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleAction(agent, 'edit')}
                          className="p-2.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 hover:scale-105 transition-all shadow-sm"
                          title="Edit Agent"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Host Registration Form */}
      {activeTab === 'host-registration' && (
        <HostRecruitForm agents={agents} onCancel={() => setActiveTab('all-agents')} selectedAgent={selectedAgent} />
      )}

      {/* Recruitment History */}
      {activeTab === 'recruitment-history' && (
        <div className="space-y-6">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Total Registered Hosts</span>
              </div>
              <div className="text-3xl font-extrabold text-slate-800">{recruitmentHistory.length}</div>
              <div className="text-xs text-slate-600 mt-1">all time</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Approved Hosts</span>
              </div>
              <div className="text-3xl font-extrabold text-green-600">{recruitmentHistory.filter(r => r.status === 'active').length}</div>
              <div className="text-xs text-slate-600 mt-1">approved</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Pending Hosts</span>
              </div>
              <div className="text-3xl font-extrabold text-amber-600">{recruitmentHistory.filter(r => r.status === 'pending').length}</div>
              <div className="text-xs text-slate-600 mt-1">pending approval</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Rejected Hosts</span>
              </div>
              <div className="text-3xl font-extrabold text-red-600">0</div>
              <div className="text-xs text-slate-600 mt-1">rejected</div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-slate-800 text-sm">Filters</h3>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
              >
                <Filter className="w-4 h-4" />
                {filterOpen ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            
            {filterOpen && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Date Range</label>
                  <input
                    type="date"
                    value={historyFilters.dateRange}
                    onChange={(e) => setHistoryFilters({...historyFilters, dateRange: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Country</label>
                  <select 
                    value={historyFilters.country}
                    onChange={(e) => setHistoryFilters({...historyFilters, country: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    <option value="">All Countries</option>
                    <option value="Nepal">Nepal</option>
                    <option value="India">India</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Agent</label>
                  <select 
                    value={historyFilters.agentId}
                    onChange={(e) => setHistoryFilters({...historyFilters, agentId: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    <option value="">All Agents</option>
                    {agents.map(agent => (
                      <option key={agent.id} value={agent.id}>{agent.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Status</label>
                  <select 
                    value={historyFilters.status}
                    onChange={(e) => setHistoryFilters({...historyFilters, status: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Recruitment History Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4 flex items-center justify-between">
              <h3 className="font-extrabold text-white text-sm">Recruitment History - {recruitmentHistory.length} records</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3">Host ID</th>
                    <th className="px-4 py-3">Host Name</th>
                    <th className="px-4 py-3">Agent</th>
                    <th className="px-4 py-3">Country</th>
                    <th className="px-4 py-3">Applied Date</th>
                    <th className="px-4 py-3">Approved Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recruitmentHistory.filter(record => {
                    const matchesDate = !historyFilters.dateRange || record.joinDate.startsWith(historyFilters.dateRange)
                    const matchesCountry = !historyFilters.country || record.country === historyFilters.country
                    const matchesAgent = !historyFilters.agentId || record.agentId === historyFilters.agentId
                    const matchesStatus = !historyFilters.status || record.status === historyFilters.status
                    return matchesDate && matchesCountry && matchesAgent && matchesStatus
                  }).map((record) => (
                    <tr key={`${record.hostId}-${record.joinDate}`} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-4 font-mono text-slate-700">{record.hostId}</td>
                      <td className="px-4 py-4 font-bold text-slate-800">{record.host}</td>
                      <td className="px-4 py-4 text-slate-600">{record.agent}</td>
                      <td className="px-4 py-4 text-slate-600">Nepal</td>
                      <td className="px-4 py-4 text-slate-600">{record.joinDate}</td>
                      <td className="px-4 py-4 text-slate-600">{record.status === 'active' ? record.joinDate : '-'}</td>
                      <td className="px-4 py-4">{getStatusBadge(record.status)}</td>
                      <td className="px-4 py-4 text-slate-600">Agent</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all"
                            title="Host Profile"
                          >
                            <UserPlus className="w-4 h-4" />
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
      )}

      {/* Recruitment Commission */}
      {activeTab === 'recruitment-commission' && (
        <div className="space-y-6">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Total Commission</span>
              </div>
              <div className="text-3xl font-extrabold text-slate-800">
                ₹{recruitmentCommission.reduce((sum, r) => sum + r.totalCommission, 0).toLocaleString()}
              </div>
              <div className="text-xs text-slate-600 mt-1">all time</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Pending Commission</span>
              </div>
              <div className="text-3xl font-extrabold text-amber-600">
                ₹{recruitmentCommission.reduce((sum, r) => sum + r.pending, 0).toLocaleString()}
              </div>
              <div className="text-xs text-slate-600 mt-1">to be paid</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Paid Commission</span>
              </div>
              <div className="text-3xl font-extrabold text-green-600">
                ₹{recruitmentCommission.reduce((sum, r) => sum + r.paid, 0).toLocaleString()}
              </div>
              <div className="text-xs text-slate-600 mt-1">completed</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">This Month</span>
              </div>
              <div className="text-3xl font-extrabold text-blue-600">₹125K</div>
              <div className="text-xs text-slate-600 mt-1">current month</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Last Month</span>
              </div>
              <div className="text-3xl font-extrabold text-purple-600">₹98K</div>
              <div className="text-xs text-slate-600 mt-1">previous month</div>
            </div>
          </div>

          {/* Commission Rules */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-6 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#E51E25]" /> Commission Rules
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    50%
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Direct Agency Recruitment</div>
                    <div className="text-xs text-slate-600">Host Joined Directly</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Agency Share</span>
                    <span className="font-bold text-slate-800">100%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Agent Share</span>
                    <span className="font-bold text-slate-800">0%</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    50%
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Agent Recruitment</div>
                    <div className="text-xs text-slate-600">Host Joined Through Agent</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Agency Share</span>
                    <span className="font-bold text-slate-800">50%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Agent Share</span>
                    <span className="font-bold text-slate-800">50%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Commission Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4 flex items-center justify-between">
              <h3 className="font-extrabold text-white text-sm">Commission Transactions</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-white/20 text-white rounded-lg text-xs font-bold hover:bg-white/30 transition-all">
                  Export PDF
                </button>
                <button className="px-3 py-1 bg-white/20 text-white rounded-lg text-xs font-bold hover:bg-white/30 transition-all">
                  Export Excel
                </button>
                <button className="px-3 py-1 bg-white/20 text-white rounded-lg text-xs font-bold hover:bg-white/30 transition-all">
                  Export CSV
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3">Transaction ID</th>
                    <th className="px-4 py-3">Host</th>
                    <th className="px-4 py-3">Agent</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Commission %</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recruitmentCommission.map((commission) => (
                    <tr key={commission.agentId} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-4 font-mono text-slate-700">TXN-{commission.agentId}-001</td>
                      <td className="px-4 py-4 text-slate-600">Host-{commission.agentId}</td>
                      <td className="px-4 py-4 font-bold text-slate-800">{commission.agent}</td>
                      <td className="px-4 py-4 text-slate-600">Agent Recruitment</td>
                      <td className="px-4 py-4 text-slate-600">₹{(commission.totalCommission / 0.5).toLocaleString()}</td>
                      <td className="px-4 py-4 font-bold text-purple-600">50%</td>
                      <td className="px-4 py-4 font-bold text-green-600">₹{commission.totalCommission.toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          commission.pending === 0 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {commission.pending === 0 ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-600">2026-07-18</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all"
                            title="Payment Details"
                          >
                            <DollarSign className="w-4 h-4" />
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
      )}

      {/* Add Agent */}
      {activeTab === 'add-agent' && (
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-6">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Agent Name</label>
                <input
                  type="text"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Gender</label>
                <select value={newAgent.gender} onChange={(e) => setNewAgent({ ...newAgent, gender: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={newAgent.dob}
                  onChange={(e) => setNewAgent({ ...newAgent, dob: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Mobile Number</label>
                <input
                  type="tel"
                  value={newAgent.mobile}
                  onChange={(e) => setNewAgent({ ...newAgent, mobile: e.target.value })}
                  placeholder="Enter mobile number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email</label>
                <input
                  type="email"
                  value={newAgent.email}
                  onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                  placeholder="Enter email address"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">WhatsApp</label>
                <input
                  type="tel"
                  value={newAgent.whatsapp}
                  onChange={(e) => setNewAgent({ ...newAgent, whatsapp: e.target.value })}
                  placeholder="Enter WhatsApp number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Country</label>
                <select value={newAgent.country} onChange={(e) => setNewAgent({ ...newAgent, country: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                  <option value="">Select country</option>
                  <option value="Nepal">Nepal</option>
                  <option value="India">India</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="UAE">UAE</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">State</label>
                <input
                  type="text"
                  value={newAgent.state}
                  onChange={(e) => setNewAgent({ ...newAgent, state: e.target.value })}
                  placeholder="Enter state/province"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">City</label>
                <input
                  type="text"
                  value={newAgent.city}
                  onChange={(e) => setNewAgent({ ...newAgent, city: e.target.value })}
                  placeholder="Enter city"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Full Address</label>
                <textarea
                  value={newAgent.address}
                  onChange={(e) => setNewAgent({ ...newAgent, address: e.target.value })}
                  placeholder="Enter full address"
                  rows="2"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
            </div>
          </div>

          {/* Login Details */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-6">Login Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Username</label>
                <input
                  type="text"
                  value={newAgent.username}
                  onChange={(e) => setNewAgent({ ...newAgent, username: e.target.value })}
                  placeholder="Enter username"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Password</label>
                <input
                  type="password"
                  value={newAgent.password}
                  onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
                  placeholder="Enter password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
            </div>
          </div>

          {/* Agency Assignment */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-6">Agency Assignment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Agency</label>
                <input
                  type="text"
                  value={newAgent.assignedAgency}
                  onChange={(e) => setNewAgent({ ...newAgent, assignedAgency: e.target.value })}
                  placeholder="Enter agency name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Manager</label>
                <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                  <option value="">Select manager</option>
                  <option value="M-001">Karan Sharma</option>
                  <option value="M-002">Sita Adhikari</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Recruiter Type</label>
                <select value={newAgent.recruiterType} onChange={(e) => setNewAgent({ ...newAgent, recruiterType: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                  <option value="">Select type</option>
                  <option value="Senior Recruiter">Senior Recruiter</option>
                  <option value="Junior Recruiter">Junior Recruiter</option>
                </select>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-6">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Citizenship / Passport</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">PAN / Tax Number</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Bank Details</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">KYC Upload</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-6">Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Status</label>
                <select value={newAgent.status} onChange={(e) => setNewAgent({ ...newAgent, status: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button onClick={() => {
              if (!newAgent.name || !newAgent.mobile || !newAgent.email) {
                alert('Please fill in required fields: Name, Mobile, and Email')
                return
              }
              const newId = `AG-${String(agents.length + 1).padStart(3, '0')}`
              const agentToAdd = {
                id: newId,
                name: newAgent.name,
                email: newAgent.email,
                mobile: newAgent.mobile,
                country: newAgent.country,
                state: newAgent.state,
                city: newAgent.city,
                status: newAgent.status,
                registeredHosts: 0,
                activeHosts: 0,
                liveHosts: 0,
                monthlyRecruitment: 0,
                commissionEarned: 0,
                performance: 0,
                kycStatus: newAgent.kycStatus,
                joinDate: new Date().toISOString().split('T')[0],
                lastLogin: 'Never',
                recruiterType: newAgent.recruiterType,
                assignedAgency: newAgent.assignedAgency,
                profilePhoto: '👤'
              }
              agents.push(agentToAdd)
              alert(`Agent ${newAgent.name} added successfully! Agent ID: ${newId}`)
              setNewAgent({
                name: '',
                mobile: '',
                email: '',
                whatsapp: '',
                country: '',
                state: '',
                city: '',
                address: '',
                gender: '',
                dob: '',
                username: '',
                password: '',
                assignedAgency: '',
                recruiterType: '',
                status: 'active',
                kycStatus: 'pending'
              })
              setActiveTab('all-agents')
            }} className="px-6 py-3 bg-[#E51E25] text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all">
              Save Agent
            </button>
            <button onClick={() => setNewAgent({
              name: '',
              mobile: '',
              email: '',
              whatsapp: '',
              country: '',
              state: '',
              city: '',
              address: '',
              gender: '',
              dob: '',
              username: '',
              password: '',
              assignedAgency: '',
              recruiterType: '',
              status: 'active',
              kycStatus: 'pending'
            })} className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
              Reset
            </button>
            <button onClick={() => setActiveTab('all-agents')} className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit Agent */}
      {activeTab === 'edit-agent' && editingAgent && (
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-6 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-[#E51E25]" /> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Agent ID</label>
                <input
                  type="text"
                  value={editingAgent.id}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Agent Name</label>
                <input
                  type="text"
                  defaultValue={editingAgent.name}
                  placeholder="Enter full name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Gender</label>
                <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Date of Birth</label>
                <input
                  type="date"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-6 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#E51E25]" /> Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Mobile Number</label>
                <input
                  type="tel"
                  defaultValue={editingAgent.mobile}
                  placeholder="Enter mobile number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={editingAgent.email}
                  placeholder="Enter email address"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">WhatsApp</label>
                <input
                  type="tel"
                  defaultValue={editingAgent.mobile}
                  placeholder="Enter WhatsApp number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Country</label>
                <select defaultValue={editingAgent.country} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                  <option value="">Select country</option>
                  <option value="Nepal">Nepal</option>
                  <option value="India">India</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="UAE">UAE</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">State</label>
                <input
                  type="text"
                  defaultValue={editingAgent.state}
                  placeholder="Enter state/province"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">City</label>
                <input
                  type="text"
                  defaultValue={editingAgent.city}
                  placeholder="Enter city"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
            </div>
          </div>

          {/* Login Details */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-6 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#E51E25]" /> Login Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Username</label>
                <input
                  type="text"
                  defaultValue={editingAgent.name.toLowerCase().replace(' ', '.')}
                  placeholder="Enter username"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
            </div>
          </div>

          {/* Agency Assignment */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-6 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#E51E25]" /> Agency Assignment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Assigned Agency</label>
                <select defaultValue={editingAgent.assignedAgency} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                  <option value="">Select agency</option>
                  <option value="Diamond Agency">Diamond Agency</option>
                  <option value="Gold Agency">Gold Agency</option>
                  <option value="Silver Agency">Silver Agency</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Recruiter Type</label>
                <select defaultValue={editingAgent.recruiterType} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                  <option value="">Select type</option>
                  <option value="Senior Recruiter">Senior Recruiter</option>
                  <option value="Junior Recruiter">Junior Recruiter</option>
                  <option value="Trainee">Trainee</option>
                </select>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E51E25]" /> Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Status</label>
                <select defaultValue={editingAgent.status} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">KYC Status</label>
                <select defaultValue={editingAgent.kycStatus} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30">
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={() => {
                alert(`Agent ${editingAgent.name} updated successfully!`)
                setActiveTab('all-agents')
                setEditingAgent(null)
              }}
              className="px-6 py-3 bg-[#E51E25] text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all"
            >
              Update Agent
            </button>
            <button className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
              Reset
            </button>
            <button onClick={() => setActiveTab('all-agents')} className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Host Targets */}
      {activeTab === 'host-targets' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4 flex items-center justify-between">
              <h3 className="font-extrabold text-white text-sm">Host Targets Monitoring</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3">Host ID</th>
                    <th className="px-4 py-3">Host Name</th>
                    <th className="px-4 py-3">Recruiter Agent</th>
                    <th className="px-4 py-3">Target Level</th>
                    <th className="px-4 py-3">Progress (Hours)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {hostTargetsData.map((host) => {
                    const progressPercent = Math.min((host.completedHours / host.targetHours) * 100, 100)
                    const isCompleted = host.completedHours >= host.targetHours

                    return (
                      <tr key={host.hostId} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-4 font-mono text-xs text-slate-500">{host.hostId}</td>
                        <td className="px-4 py-4 font-bold text-slate-800">{host.hostName}</td>
                        <td className="px-4 py-4 text-slate-600">
                          <div className="flex items-center gap-2">
                            <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                            {host.agentName}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {host.targetLevel}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-1.5 w-48">
                            <div className="flex justify-between text-xs">
                              <span className="font-bold text-slate-700">{host.completedHours} / {host.targetHours} hrs</span>
                              <span className={`font-bold ${isCompleted ? 'text-green-600' : 'text-slate-500'}`}>
                                {Math.round(progressPercent)}%
                              </span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Agent Profile */}
      {activeTab === 'agent-profile' && (
        editingAgent ? (
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                {editingAgent.profilePhoto}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-extrabold mb-1">{editingAgent.name}</h2>
                <div className="text-white/80 text-sm font-mono">{editingAgent.id}</div>
                <div className="flex gap-3 mt-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">{editingAgent.recruiterType}</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">{editingAgent.assignedAgency}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold">{editingAgent.performance}%</div>
                <div className="text-white/80 text-xs">Performance Score</div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-extrabold text-slate-800 text-sm mb-6 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E51E25]" /> Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">Mobile</span>
                  <span className="text-sm text-slate-800">{editingAgent.mobile}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">Email</span>
                  <span className="text-sm text-slate-800">{editingAgent.email}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">Country</span>
                  <span className="text-sm text-slate-800">{editingAgent.country}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">State</span>
                  <span className="text-sm text-slate-800">{editingAgent.state}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">City</span>
                  <span className="text-sm text-slate-800">{editingAgent.city}</span>
                </div>
              </div>
            </div>

            {/* Recruitment Stats */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-extrabold text-slate-800 text-sm mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#E51E25]" /> Recruitment Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">Total Hosts</span>
                  <span className="text-sm font-bold text-slate-800">{editingAgent.registeredHosts}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">Active Hosts</span>
                  <span className="text-sm font-bold text-green-600">{editingAgent.activeHosts}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">Live Hosts</span>
                  <span className="text-sm font-bold text-purple-600">{editingAgent.liveHosts}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">Monthly Recruitment</span>
                  <span className="text-sm font-bold text-blue-600">{editingAgent.monthlyRecruitment}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Commission Earned</span>
                  <span className="text-sm font-bold text-green-600">₹{editingAgent.commissionEarned.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-extrabold text-slate-800 text-sm mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E51E25]" /> Account Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">Status</span>
                  <div>{getStatusBadge(editingAgent.status)}</div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">KYC Status</span>
                  <div>{getKycBadge(editingAgent.kycStatus)}</div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">Join Date</span>
                  <span className="text-sm text-slate-800">{editingAgent.joinDate}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Last Login</span>
                  <span className="text-sm text-slate-800">{editingAgent.lastLogin}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button onClick={() => { setEditingAgent(editingAgent); setActiveTab('edit-agent'); }} className="px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all">
              Edit Agent
            </button>
            <button onClick={() => setActiveTab('agent-performance')} className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all">
              View Performance
            </button>
            <button onClick={() => setActiveTab('recruitment-commission')} className="px-6 py-3 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-all">
              View Commission
            </button>
            <button onClick={() => setActiveTab('all-agents')} className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
              Back to All Agents
            </button>
          </div>
        </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="text-center py-12">
              <div className="text-slate-400 text-sm">No agent selected. Please select an agent from the All Agents table.</div>
            </div>
          </div>
        )
      )}

      {/* Agent Performance */}
      {activeTab === 'agent-performance' && (
        <div className="space-y-6">
          {/* Top Agents Ranking */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-6 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#E51E25]" /> Top Agents Ranking
            </h3>
            <div className="space-y-4">
              {agents.sort((a, b) => b.performance - a.performance).map((agent, index) => (
                <div key={agent.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-slate-400' : index === 2 ? 'bg-amber-600' : 'bg-slate-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800">{agent.name}</div>
                    <div className="text-xs text-slate-500">{agent.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#E51E25]">{agent.performance}%</div>
                    <div className="text-xs text-slate-500">{agent.registeredHosts} hosts</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">₹{agent.commissionEarned.toLocaleString()}</div>
                    <div className="text-xs text-slate-500">commission</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
              <h3 className="font-extrabold text-white text-sm">Agent Performance Details</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3">Agent</th>
                    <th className="px-4 py-3">Performance</th>
                    <th className="px-4 py-3">Registered</th>
                    <th className="px-4 py-3">Active</th>
                    <th className="px-4 py-3">Live</th>
                    <th className="px-4 py-3">Success Rate</th>
                    <th className="px-4 py-3">Commission</th>
                    <th className="px-4 py-3">Monthly Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {agents.map((agent) => (
                    <tr key={agent.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-lg">
                            {agent.profilePhoto}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800">{agent.name}</div>
                            <div className="text-xs text-slate-500 font-mono">{agent.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-[#E51E25] h-2 rounded-full" 
                              style={{ width: `${agent.performance}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-slate-800">{agent.performance}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-bold text-slate-800">{agent.registeredHosts}</td>
                      <td className="px-4 py-4 font-bold text-green-600">{agent.activeHosts}</td>
                      <td className="px-4 py-4 font-bold text-purple-600">{agent.liveHosts}</td>
                      <td className="px-4 py-4 font-bold text-blue-600">
                        {Math.round((agent.activeHosts / agent.registeredHosts) * 100)}%
                      </td>
                      <td className="px-4 py-4 font-bold text-green-600">₹{agent.commissionEarned.toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          agent.performance >= 90 ? 'bg-yellow-100 text-yellow-700' :
                          agent.performance >= 80 ? 'bg-slate-100 text-slate-700' :
                          'bg-slate-200 text-slate-600'
                        }`}>
                          {agent.performance >= 90 ? 'Gold' : agent.performance >= 80 ? 'Silver' : 'Bronze'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {popupOpen && selectedAgent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-full ${
                actionType === 'view' ? 'bg-blue-100' :
                actionType === 'edit' ? 'bg-green-100' :
                actionType === 'notes' ? 'bg-purple-100' :
                actionType === 'activate' ? 'bg-green-100' :
                'bg-red-100'
              }`}>
                {actionType === 'view' && <Eye className="w-6 h-6 text-blue-600" />}
                {actionType === 'edit' && <Edit className="w-6 h-6 text-green-600" />}
                {actionType === 'notes' && <MessageSquare className="w-6 h-6 text-purple-600" />}
                {actionType === 'activate' && <Unlock className="w-6 h-6 text-green-600" />}
                {(actionType === 'suspend' || actionType === 'activate') && actionType === 'suspend' && <Ban className="w-6 h-6 text-red-600" />}
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-slate-800 text-lg mb-1 capitalize">
                  {actionType === 'view' ? 'Agent Profile' :
                   actionType === 'edit' ? 'Edit Agent' :
                   actionType === 'notes' ? 'Agent Notes' :
                   actionType === 'activate' ? 'Activate Agent' :
                   'Suspend Agent'}
                </h3>
                <p className="text-sm text-slate-600">
                  {actionType === 'view' ? `Viewing details for ${selectedAgent.name}` :
                   actionType === 'edit' ? `Editing ${selectedAgent.name}` :
                   actionType === 'notes' ? `Add notes for ${selectedAgent.name}` :
                   actionType === 'activate' ? `Are you sure you want to activate ${selectedAgent.name}?` :
                   `Are you sure you want to suspend ${selectedAgent.name}?`}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 mb-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Agent ID</span>
                  <div className="font-mono text-slate-800">{selectedAgent.id}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Name</span>
                  <div className="font-bold text-slate-800">{selectedAgent.name}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Mobile</span>
                  <div className="text-slate-800">{selectedAgent.mobile}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Email</span>
                  <div className="text-slate-800">{selectedAgent.email}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Status</span>
                  <div>{getStatusBadge(selectedAgent.status)}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Performance</span>
                  <div className="font-bold text-purple-600">{selectedAgent.performance}%</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Total Hosts</span>
                  <div className="font-bold text-slate-800">{selectedAgent.registeredHosts}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Commission</span>
                  <div className="font-bold text-green-600">₹{selectedAgent.commissionEarned.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {actionType === 'notes' && (
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Add Notes</label>
                <textarea
                  placeholder="Enter notes about this agent..."
                  rows="3"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={cancelAction}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              {(actionType === 'suspend' || actionType === 'activate' || actionType === 'edit' || actionType === 'notes') && (
                <button
                  onClick={confirmAction}
                  className={`flex-1 px-4 py-3 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all ${
                    actionType === 'suspend' ? 'bg-red-600' :
                    actionType === 'activate' ? 'bg-green-600' :
                    actionType === 'edit' ? 'bg-green-600' :
                    'bg-purple-600'
                  }`}
                >
                  {actionType === 'suspend' ? 'Suspend' :
                   actionType === 'activate' ? 'Activate' :
                   actionType === 'edit' ? 'Save Changes' :
                   'Save Notes'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
