import React, { useState, useEffect } from 'react'
import { Users, Eye, Edit, Ban, Play, Trash2, Clock, Star, Wallet, TrendingUp, Search, Filter, Calendar, Gift, UserCheck } from 'lucide-react'

export default function AgencyHostManagement({ subTab = 'all-hosts' }) {
  const [activeTab, setActiveTab] = useState(subTab)
  const [searchQuery, setSearchQuery] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedHost, setSelectedHost] = useState(null)
  const [actionType, setActionType] = useState('')
  const [reportView, setReportView] = useState('monthly')
  const [applicationStatus, setApplicationStatus] = useState('pending')

  // Sync activeTab with subTab prop
  useEffect(() => {
    if (subTab) {
      setActiveTab(subTab)
    }
  }, [subTab])

  const allHosts = [
    { hostId: 'H-901', userId: 'U-901', hostName: 'Aria Live', nickname: 'Aria', country: 'India', agencyJoinDate: '2024-03-15', agentName: 'Rahul Thapa', level: 25, status: 'active', liveStatus: 'live', wallet: 'W-001', charisma: 2450, contribution: 2800, revenue: 450000, earnings: 125000, targetPercent: 84 },
    { hostId: 'H-902', userId: 'U-902', hostName: 'Gamer Pro', nickname: 'Gamer', country: 'Nepal', agencyJoinDate: '2024-04-20', agentName: 'Priya Gurung', level: 20, status: 'active', liveStatus: 'offline', wallet: 'W-002', charisma: 1980, contribution: 2200, revenue: 280000, earnings: 98000, targetPercent: 80 },
    { hostId: 'H-903', userId: 'U-903', hostName: 'Nisha Sing', nickname: 'Nisha', country: 'India', agencyJoinDate: '2024-02-10', agentName: 'Amit KC', level: 30, status: 'active', liveStatus: 'live', wallet: 'W-003', charisma: 3200, contribution: 3500, revenue: 520000, earnings: 175000, targetPercent: 92 },
    { hostId: 'H-904', userId: 'U-904', hostName: 'Kathmandu Vibe', nickname: 'KV', country: 'Nepal', agencyJoinDate: '2024-05-05', agentName: 'Rahul Thapa', level: 15, status: 'active', liveStatus: 'offline', wallet: 'W-004', charisma: 1200, contribution: 1400, revenue: 150000, earnings: 45000, targetPercent: 72 },
    { hostId: 'H-905', userId: 'U-905', hostName: 'Live King', nickname: 'King', country: 'Bangladesh', agencyJoinDate: '2024-03-25', agentName: 'Priya Gurung', level: 22, status: 'active', liveStatus: 'live', wallet: 'W-005', charisma: 2100, contribution: 2400, revenue: 320000, earnings: 110000, targetPercent: 84 },
    { hostId: 'H-906', userId: 'U-906', hostName: 'Stream Queen', nickname: 'Queen', country: 'India', agencyJoinDate: '2024-04-12', agentName: 'Amit KC', level: 28, status: 'suspended', liveStatus: 'offline', wallet: 'W-006', charisma: 1800, contribution: 2000, revenue: 380000, earnings: 125000, targetPercent: 78 },
    { hostId: 'H-907', userId: 'U-907', hostName: 'Diamond Star', nickname: 'Diamond', country: 'Nepal', agencyJoinDate: '2024-01-20', agentName: 'Suman Shrestha', level: 35, status: 'active', liveStatus: 'offline', wallet: 'W-007', charisma: 3500, contribution: 3800, revenue: 750000, earnings: 250000, targetPercent: 95 },
    { hostId: 'H-908', userId: 'U-908', hostName: 'Golden Voice', nickname: 'Golden', country: 'India', agencyJoinDate: '2024-06-01', agentName: 'Rahul Thapa', level: 18, status: 'inactive', liveStatus: 'offline', wallet: 'W-008', charisma: 1500, contribution: 1700, revenue: 240000, earnings: 73000, targetPercent: 68 }
  ]

  const liveHosts = allHosts.filter(h => h.liveStatus === 'live')
  const offlineHosts = allHosts.filter(h => h.liveStatus === 'offline' && h.status === 'active')
  const inactiveHosts = allHosts.filter(h => h.status === 'inactive')
  const vipHosts = allHosts.filter(h => h.level >= 30)
  const videoHosts = allHosts.filter(h => h.level >= 20 && h.status === 'active')
  const audioHosts = allHosts.filter(h => h.level < 20 && h.status === 'active')
  const newHosts = allHosts.filter(h => h.level <= 15 && h.status === 'active')
  const suspendedHosts = allHosts.filter(h => h.status === 'suspended')

  const hostApplications = [
    { id: 'APP-001', hostName: 'New Star', nickname: 'Star', country: 'India', phone: '+91-9876543210', email: 'star@email.com', status: 'pending', appliedDate: '2026-07-18' },
    { id: 'APP-002', hostName: 'Future Star', nickname: 'Future', country: 'Nepal', phone: '+977-9876543210', email: 'future@email.com', status: 'approved', appliedDate: '2026-07-17' },
    { id: 'APP-003', hostName: 'Wanna Be', nickname: 'Wanna', country: 'Bangladesh', phone: '+880-9876543210', email: 'wanna@email.com', status: 'rejected', appliedDate: '2026-07-16' }
  ]

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Active</span>
      case 'suspended':
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">Suspended</span>
      case 'inactive':
        return <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">Inactive</span>
      case 'pending':
        return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Pending</span>
      case 'approved':
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Approved</span>
      case 'rejected':
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">Rejected</span>
      case 'live':
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />Live</span>
      case 'offline':
        return <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">Offline</span>
      default:
        return <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">{status}</span>
    }
  }

  const handleAction = (host, action) => {
    setSelectedHost(host)
    setActionType(action)
    if (action === 'view' || action === 'edit' || action === 'suspend' || action === 'activate' || action === 'remove') {
      setPopupOpen(true)
    } else if (action === 'history') {
      alert(`Viewing history for ${host.hostName}`)
    }
  }

  const confirmAction = () => {
    if (actionType === 'suspend') {
      alert(`Suspended host ${selectedHost.hostName}`)
    } else if (actionType === 'activate') {
      alert(`Activated host ${selectedHost.hostName}`)
    } else if (actionType === 'remove') {
      alert(`Removed host ${selectedHost.hostName}`)
    }
    setPopupOpen(false)
    setSelectedHost(null)
    setActionType('')
  }

  return (
    <div className="space-y-6">
      {/* All Hosts */}
      {activeTab === 'all-hosts' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4 flex items-center justify-between">
            <h3 className="font-extrabold text-white text-sm">All Hosts - {allHosts.length} hosts</h3>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-white/80" />
              <input
                type="text"
                placeholder="Search hosts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/20 backdrop-blur-sm text-white placeholder-white/60 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3">Host ID</th>
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Host Name</th>
                  <th className="px-4 py-3">Nickname</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Join Date</th>
                  <th className="px-4 py-3">Agent</th>
                  <th className="px-4 py-3">Level</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Live</th>
                  <th className="px-4 py-3">Wallet</th>
                  <th className="px-4 py-3">Charisma</th>
                  <th className="px-4 py-3">Contribution</th>
                  <th className="px-4 py-3">Revenue</th>
                  <th className="px-4 py-3">Earnings</th>
                  <th className="px-4 py-3">Target %</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allHosts.filter(host => 
                  host.hostName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  host.hostId.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((host) => (
                  <tr key={host.hostId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-slate-700 text-xs">{host.hostId}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{host.userId}</td>
                    <td className="px-4 py-3 font-bold text-slate-800 text-xs">{host.hostName}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{host.nickname}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{host.country}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{host.agencyJoinDate}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{host.agentName}</td>
                    <td className="px-4 py-3 font-bold text-purple-600 text-xs">{host.level}</td>
                    <td className="px-4 py-3">{getStatusBadge(host.status)}</td>
                    <td className="px-4 py-3">{getStatusBadge(host.liveStatus)}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{host.wallet}</td>
                    <td className="px-4 py-3 font-bold text-purple-600 text-xs">{host.charisma}</td>
                    <td className="px-4 py-3 font-bold text-blue-600 text-xs">{host.contribution}</td>
                    <td className="px-4 py-3 font-bold text-green-600 text-xs">₹{host.revenue.toLocaleString()}</td>
                    <td className="px-4 py-3 font-bold text-amber-600 text-xs">₹{host.earnings.toLocaleString()}</td>
                    <td className="px-4 py-3 font-bold text-slate-800 text-xs">{host.targetPercent}%</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => handleAction(host, 'view')} className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200" title="View"><Eye className="w-3 h-3" /></button>
                        <button onClick={() => handleAction(host, 'edit')} className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200" title="Edit"><Edit className="w-3 h-3" /></button>
                        <button onClick={() => handleAction(host, 'suspend')} className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200" title="Suspend"><Ban className="w-3 h-3" /></button>
                        <button onClick={() => handleAction(host, 'activate')} className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200" title="Activate"><Play className="w-3 h-3" /></button>
                        <button onClick={() => handleAction(host, 'remove')} className="p-1.5 bg-slate-100 text-slate-600 rounded hover:bg-slate-200" title="Remove"><Trash2 className="w-3 h-3" /></button>
                        <button onClick={() => handleAction(host, 'history')} className="p-1.5 bg-purple-100 text-purple-600 rounded hover:bg-purple-200" title="History"><Clock className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Active Hosts */}
      {activeTab === 'active-hosts' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
            <h3 className="font-extrabold text-white text-sm">Active Hosts - {allHosts.filter(h => h.status === 'active').length} hosts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Host ID</th>
                  <th className="px-6 py-3">Host Name</th>
                  <th className="px-6 py-3">Level</th>
                  <th className="px-6 py-3">Live Status</th>
                  <th className="px-6 py-3">Charisma</th>
                  <th className="px-6 py-3">Revenue</th>
                  <th className="px-6 py-3">Target %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allHosts.filter(h => h.status === 'active').map((host) => (
                  <tr key={host.hostId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-700">{host.hostId}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{host.hostName}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.level}</td>
                    <td className="px-6 py-4">{getStatusBadge(host.liveStatus)}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.charisma}</td>
                    <td className="px-6 py-4 font-bold text-green-600">₹{host.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{host.targetPercent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Live Hosts */}
      {activeTab === 'live-hosts' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
            <h3 className="font-extrabold text-white text-sm">Live Hosts - {liveHosts.length} hosts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Host Name</th>
                  <th className="px-6 py-3">Room ID</th>
                  <th className="px-6 py-3">Viewers</th>
                  <th className="px-6 py-3">Live Time</th>
                  <th className="px-6 py-3">Charisma</th>
                  <th className="px-6 py-3">Gifts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {liveHosts.map((host) => (
                  <tr key={host.hostId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{host.hostName}</td>
                    <td className="px-6 py-4 text-slate-600">{host.wallet}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">{Math.floor(Math.random() * 5000) + 1000}</td>
                    <td className="px-6 py-4 text-slate-600">{Math.floor(Math.random() * 120) + 30}m</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.charisma}</td>
                    <td className="px-6 py-4 font-bold text-green-600">{Math.floor(Math.random() * 20000) + 5000}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Offline Hosts */}
      {activeTab === 'offline-hosts' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
            <h3 className="font-extrabold text-white text-sm">Offline Hosts - {offlineHosts.length} hosts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Host Name</th>
                  <th className="px-6 py-3">Last Live</th>
                  <th className="px-6 py-3">Charisma</th>
                  <th className="px-6 py-3">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {offlineHosts.map((host) => (
                  <tr key={host.hostId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{host.hostName}</td>
                    <td className="px-6 py-4 text-slate-600">{Math.floor(Math.random() * 24) + 1}h ago</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.charisma}</td>
                    <td className="px-6 py-4 font-bold text-green-600">₹{host.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inactive Hosts */}
      {activeTab === 'inactive-hosts' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
            <h3 className="font-extrabold text-white text-sm">Inactive Hosts - {inactiveHosts.length} hosts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Host Name</th>
                  <th className="px-6 py-3">Inactive For</th>
                  <th className="px-6 py-3">Last Live</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inactiveHosts.map((host) => (
                  <tr key={host.hostId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{host.hostName}</td>
                    <td className="px-6 py-4 text-slate-600">{Math.floor(Math.random() * 30) + 7} days</td>
                    <td className="px-6 py-4 text-slate-600">{Math.floor(Math.random() * 60) + 30} days ago</td>
                    <td className="px-6 py-4">{getStatusBadge(host.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIP Hosts */}
      {activeTab === 'vip-hosts' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
            <h3 className="font-extrabold text-white text-sm">VIP Hosts - {vipHosts.length} hosts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Host Name</th>
                  <th className="px-6 py-3">Level</th>
                  <th className="px-6 py-3">Charisma</th>
                  <th className="px-6 py-3">Revenue</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vipHosts.map((host) => (
                  <tr key={host.hostId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      {host.hostName}
                    </td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.level}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.charisma}</td>
                    <td className="px-6 py-4 font-bold text-green-600">₹{host.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(host.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Video Hosts */}
      {activeTab === 'video-hosts' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
            <h3 className="font-extrabold text-white text-sm">Video Hosts - {videoHosts.length} hosts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Host Name</th>
                  <th className="px-6 py-3">Level</th>
                  <th className="px-6 py-3">Charisma</th>
                  <th className="px-6 py-3">Revenue</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {videoHosts.map((host) => (
                  <tr key={host.hostId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{host.hostName}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.level}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.charisma}</td>
                    <td className="px-6 py-4 font-bold text-green-600">₹{host.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(host.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Audio Hosts */}
      {activeTab === 'audio-hosts' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
            <h3 className="font-extrabold text-white text-sm">Audio Hosts - {audioHosts.length} hosts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Host Name</th>
                  <th className="px-6 py-3">Level</th>
                  <th className="px-6 py-3">Charisma</th>
                  <th className="px-6 py-3">Revenue</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {audioHosts.map((host) => (
                  <tr key={host.hostId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{host.hostName}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.level}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.charisma}</td>
                    <td className="px-6 py-4 font-bold text-green-600">₹{host.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(host.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New Hosts */}
      {activeTab === 'new-hosts' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
            <h3 className="font-extrabold text-white text-sm">New Hosts - {newHosts.length} hosts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Host Name</th>
                  <th className="px-6 py-3">Level</th>
                  <th className="px-6 py-3">Charisma</th>
                  <th className="px-6 py-3">Revenue</th>
                  <th className="px-6 py-3">Join Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {newHosts.map((host) => (
                  <tr key={host.hostId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{host.hostName}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.level}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.charisma}</td>
                    <td className="px-6 py-4 font-bold text-green-600">₹{host.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-600">{host.agencyJoinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Suspended Hosts */}
      {activeTab === 'suspended-hosts' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
            <h3 className="font-extrabold text-white text-sm">Suspended Hosts - {suspendedHosts.length} hosts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Host Name</th>
                  <th className="px-6 py-3">Level</th>
                  <th className="px-6 py-3">Charisma</th>
                  <th className="px-6 py-3">Revenue</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {suspendedHosts.map((host) => (
                  <tr key={host.hostId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{host.hostName}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.level}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.charisma}</td>
                    <td className="px-6 py-4 font-bold text-green-600">₹{host.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(host.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Host Applications */}
      {activeTab === 'host-applications' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button 
              onClick={() => setApplicationStatus('pending')}
              className={`px-4 py-2 rounded-xl text-sm font-bold ${
                applicationStatus === 'pending' ? 'bg-[#E51E25] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Pending
            </button>
            <button 
              onClick={() => setApplicationStatus('approved')}
              className={`px-4 py-2 rounded-xl text-sm font-bold ${
                applicationStatus === 'approved' ? 'bg-[#E51E25] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Approved
            </button>
            <button 
              onClick={() => setApplicationStatus('rejected')}
              className={`px-4 py-2 rounded-xl text-sm font-bold ${
                applicationStatus === 'rejected' ? 'bg-[#E51E25] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Rejected
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
              <h3 className="font-extrabold text-white text-sm capitalize">
                {applicationStatus} Applications - {hostApplications.filter(a => a.status === applicationStatus).length}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3">Host Name</th>
                    <th className="px-6 py-3">Nickname</th>
                    <th className="px-6 py-3">Country</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Applied Date</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {hostApplications.filter(a => a.status === applicationStatus).map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{app.hostName}</td>
                      <td className="px-6 py-4 text-slate-600">{app.nickname}</td>
                      <td className="px-6 py-4 text-slate-600">{app.country}</td>
                      <td className="px-6 py-4 text-slate-600">{app.phone}</td>
                      <td className="px-6 py-4 text-slate-600">{app.email}</td>
                      <td className="px-6 py-4 text-slate-600">{app.appliedDate}</td>
                      <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Host Profile */}
      {activeTab === 'host-profile' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-4">Personal Info</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Host ID</span>
                <div className="font-mono text-slate-800">H-901</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">User ID</span>
                <div className="text-slate-800">U-901</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Agency ID</span>
                <div className="text-slate-800">AG-001</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Agent</span>
                <div className="text-slate-800">Rahul Thapa</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Phone</span>
                <div className="text-slate-800">+91-9876543210</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Email</span>
                <div className="text-slate-800">aria@email.com</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Country</span>
                <div className="text-slate-800">India</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Wallet</span>
                <div className="text-slate-800">W-001</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-4">Wallet</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Coin Balance</span>
                <div className="font-bold text-slate-800">125,000</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Frozen Coin</span>
                <div className="font-bold text-red-600">5,000</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Withdrawable Coin</span>
                <div className="font-bold text-green-600">105,000</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Pending Coin</span>
                <div className="font-bold text-amber-600">15,000</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-4">Live</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Total Live</span>
                <div className="font-bold text-slate-800">245</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Live Hours</span>
                <div className="font-bold text-slate-800">1,250</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">PK</span>
                <div className="font-bold text-slate-800">45</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Followers</span>
                <div className="font-bold text-slate-800">15,420</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-4">Earnings</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Revenue</span>
                <div className="font-bold text-green-600">₹450,000</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Bonus</span>
                <div className="font-bold text-blue-600">₹45,000</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Incentive</span>
                <div className="font-bold text-purple-600">₹32,000</div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Total</span>
                <div className="font-bold text-[#E51E25]">₹527,000</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-4">Reports</h3>
            <div className="flex gap-2 mb-4">
              <button 
                onClick={() => setReportView('monthly')}
                className={`px-4 py-2 rounded-xl text-sm font-bold ${
                  reportView === 'monthly' ? 'bg-[#E51E25] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setReportView('weekly')}
                className={`px-4 py-2 rounded-xl text-sm font-bold ${
                  reportView === 'weekly' ? 'bg-[#E51E25] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Weekly
              </button>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-600">
                {reportView === 'monthly' ? 'Showing monthly report data for July 2026' : 'Showing weekly report data for Week 29'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {popupOpen && selectedHost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-full ${
                actionType === 'view' ? 'bg-blue-100' :
                actionType === 'edit' ? 'bg-green-100' :
                actionType === 'activate' ? 'bg-green-100' :
                'bg-red-100'
              }`}>
                {actionType === 'view' && <Eye className="w-6 h-6 text-blue-600" />}
                {actionType === 'edit' && <Edit className="w-6 h-6 text-green-600" />}
                {actionType === 'activate' && <Play className="w-6 h-6 text-green-600" />}
                {actionType === 'suspend' && <Ban className="w-6 h-6 text-red-600" />}
                {actionType === 'remove' && <Trash2 className="w-6 h-6 text-red-600" />}
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-slate-800 text-lg mb-1 capitalize">
                  {actionType} Host
                </h3>
                <p className="text-sm text-slate-600">
                  {actionType === 'view' ? `Viewing details for ${selectedHost.hostName}` :
                   actionType === 'edit' ? `Editing ${selectedHost.hostName}` :
                   actionType === 'activate' ? `Are you sure you want to activate ${selectedHost.hostName}?` :
                   actionType === 'suspend' ? `Are you sure you want to suspend ${selectedHost.hostName}?` :
                   `Are you sure you want to remove ${selectedHost.hostName}?`}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 mb-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Host ID</span>
                  <div className="font-mono text-slate-800">{selectedHost.hostId}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Name</span>
                  <div className="font-bold text-slate-800">{selectedHost.hostName}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Status</span>
                  <div>{getStatusBadge(selectedHost.status)}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Level</span>
                  <div className="font-bold text-purple-600">{selectedHost.level}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setPopupOpen(false)
                  setSelectedHost(null)
                  setActionType('')
                }}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              {actionType !== 'view' && actionType !== 'edit' && (
                <button
                  onClick={confirmAction}
                  className={`flex-1 px-4 py-3 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all ${
                    actionType === 'activate' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  {actionType === 'activate' ? 'Activate' : actionType === 'suspend' ? 'Suspend' : 'Remove'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
