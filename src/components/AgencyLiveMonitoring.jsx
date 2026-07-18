import React, { useState, useEffect } from 'react'
import { Monitor, Users, Clock, Eye, Star, Calendar, Gift, Trophy, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts'

export default function AgencyLiveMonitoring({ subTab = 'live-now' }) {
  const [activeTab, setActiveTab] = useState(subTab)
  const [dateFilter, setDateFilter] = useState('')

  // Sync activeTab with subTab prop
  useEffect(() => {
    if (subTab) {
      setActiveTab(subTab)
    }
  }, [subTab])

  const COLORS = ['#E51E25', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']

  const liveNowData = [
    { host: 'Aria Live', hostId: 'H-901', room: 'Room 101', time: '2h 35m', viewers: 2845, charisma: 2450, status: 'live' },
    { host: 'Gamer Pro', hostId: 'H-902', room: 'Room 102', time: '1h 45m', viewers: 1890, charisma: 1980, status: 'live' },
    { host: 'Nisha Sing', hostId: 'H-903', room: 'Room 103', time: '3h 20m', viewers: 3560, charisma: 3200, status: 'live' },
    { host: 'Kathmandu Vibe', hostId: 'H-904', room: 'Room 104', time: '0h 55m', viewers: 890, charisma: 1200, status: 'live' },
    { host: 'Live King', hostId: 'H-905', room: 'Room 105', time: '2h 10m', viewers: 2340, charisma: 2100, status: 'live' }
  ]

  const liveHistoryData = [
    { host: 'Aria Live', hostId: 'H-901', room: 'Room 101', date: '2026-07-18', duration: '4h 30m', viewers: 4520, charisma: 3200, gifts: 12500 },
    { host: 'Gamer Pro', hostId: 'H-902', room: 'Room 102', date: '2026-07-18', duration: '3h 15m', viewers: 2890, charisma: 2450, gifts: 8900 },
    { host: 'Nisha Sing', hostId: 'H-903', room: 'Room 103', date: '2026-07-17', duration: '5h 45m', viewers: 6200, charisma: 4500, gifts: 18500 },
    { host: 'Kathmandu Vibe', hostId: 'H-904', room: 'Room 104', date: '2026-07-17', duration: '2h 30m', viewers: 1450, charisma: 1800, gifts: 4200 },
    { host: 'Live King', hostId: 'H-905', room: 'Room 105', date: '2026-07-16', duration: '3h 50m', viewers: 3100, charisma: 2800, gifts: 9800 }
  ]

  const roomMonitoringData = [
    { roomId: 'R-101', roomName: 'Room 101', onlineUsers: 2845, gifts: 12500, status: 'active' },
    { roomId: 'R-102', roomName: 'Room 102', onlineUsers: 1890, gifts: 8900, status: 'active' },
    { roomId: 'R-103', roomName: 'Room 103', onlineUsers: 3560, gifts: 18500, status: 'active' },
    { roomId: 'R-104', roomName: 'Room 104', onlineUsers: 890, gifts: 4200, status: 'active' },
    { roomId: 'R-105', roomName: 'Room 105', onlineUsers: 2340, gifts: 9800, status: 'active' }
  ]

  const pkMonitoringData = [
    { roomId: 'R-101', host1: 'Aria Live', host2: 'Gamer Pro', winner: 'Aria Live', score1: 12500, score2: 9800, date: '2026-07-18' },
    { roomId: 'R-103', host1: 'Nisha Sing', host2: 'Live King', winner: 'Nisha Sing', score1: 18500, score2: 14200, date: '2026-07-17' },
    { roomId: 'R-105', host1: 'Kathmandu Vibe', host2: 'Diamond Star', winner: 'Diamond Star', score1: 8900, score2: 11200, date: '2026-07-16' }
  ]

  const liveAnalyticsData = [
    { time: '6AM', viewers: 450, gifts: 2500 },
    { time: '9AM', viewers: 1200, gifts: 5800 },
    { time: '12PM', viewers: 2800, gifts: 12500 },
    { time: '3PM', viewers: 3500, gifts: 15800 },
    { time: '6PM', viewers: 5200, gifts: 24500 },
    { time: '9PM', viewers: 6800, gifts: 32000 },
    { time: '12AM', viewers: 4200, gifts: 18500 }
  ]

  const viewerDistribution = [
    { name: 'Mobile', value: 45 },
    { name: 'Desktop', value: 35 },
    { name: 'Tablet', value: 20 }
  ]

  const filteredHistory = dateFilter 
    ? liveHistoryData.filter(item => item.date === dateFilter)
    : liveHistoryData

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-extrabold text-slate-800 text-sm mb-4">
          Live Monitoring
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('live-now')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'live-now'
                ? 'bg-[#E51E25] text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Live Now
          </button>
          <button
            onClick={() => setActiveTab('live-history')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'live-history'
                ? 'bg-[#E51E25] text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Live History
          </button>
          <button
            onClick={() => setActiveTab('live-rooms')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'live-rooms'
                ? 'bg-[#E51E25] text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Live Rooms
          </button>
          <button
            onClick={() => setActiveTab('pk-monitoring')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'pk-monitoring'
                ? 'bg-[#E51E25] text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            PK Monitoring
          </button>
          <button
            onClick={() => setActiveTab('live-analytics')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'live-analytics'
                ? 'bg-[#E51E25] text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Live Analytics
          </button>
        </div>
      </div>

      {/* Live Now */}
      {activeTab === 'live-now' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4 flex items-center justify-between">
            <h3 className="font-extrabold text-white text-sm">Live Now - {liveNowData.length} hosts</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-white">Live</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Host</th>
                  <th className="px-6 py-3">Room</th>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Viewers</th>
                  <th className="px-6 py-3">Charisma</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {liveNowData.map((host) => (
                  <tr key={host.hostId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{host.host}</td>
                    <td className="px-6 py-4 text-slate-600">{host.room}</td>
                    <td className="px-6 py-4 text-slate-600">{host.time}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">{host.viewers.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.charisma.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Live
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Live History */}
      {activeTab === 'live-history' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-slate-400" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
              />
              <button
                onClick={() => setDateFilter('')}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
              >
                Clear Filter
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
              <h3 className="font-extrabold text-white text-sm">Live History - {filteredHistory.length} records</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3">Host</th>
                    <th className="px-6 py-3">Room</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Duration</th>
                    <th className="px-6 py-3">Viewers</th>
                    <th className="px-6 py-3">Charisma</th>
                    <th className="px-6 py-3">Gifts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredHistory.map((history) => (
                    <tr key={`${history.hostId}-${history.date}`} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{history.host}</td>
                      <td className="px-6 py-4 text-slate-600">{history.room}</td>
                      <td className="px-6 py-4 text-slate-600">{history.date}</td>
                      <td className="px-6 py-4 text-slate-600">{history.duration}</td>
                      <td className="px-6 py-4 font-bold text-blue-600">{history.viewers.toLocaleString()}</td>
                      <td className="px-6 py-4 font-bold text-purple-600">{history.charisma.toLocaleString()}</td>
                      <td className="px-6 py-4 font-bold text-green-600">{history.gifts.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Live Rooms */}
      {activeTab === 'live-rooms' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
            <h3 className="font-extrabold text-white text-sm">Live Rooms - {roomMonitoringData.length} rooms</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Room ID</th>
                  <th className="px-6 py-3">Room Name</th>
                  <th className="px-6 py-3">Online Users</th>
                  <th className="px-6 py-3">Gifts</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {roomMonitoringData.map((room) => (
                  <tr key={room.roomId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-700">{room.roomId}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{room.roomName}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">{room.onlineUsers.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-green-600">{room.gifts.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PK Monitoring */}
      {activeTab === 'pk-monitoring' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
            <h3 className="font-extrabold text-white text-sm">PK Monitoring - {pkMonitoringData.length} battles</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Room ID</th>
                  <th className="px-6 py-3">Host 1</th>
                  <th className="px-6 py-3">Host 2</th>
                  <th className="px-6 py-3">PK Winner</th>
                  <th className="px-6 py-3">Score 1</th>
                  <th className="px-6 py-3">Score 2</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pkMonitoringData.map((pk) => (
                  <tr key={pk.roomId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-700">{pk.roomId}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{pk.host1}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{pk.host2}</td>
                    <td className="px-6 py-4 font-bold text-[#E51E25]">{pk.winner}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">{pk.score1.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{pk.score2.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-600">{pk.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Live Analytics */}
      {activeTab === 'live-analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-4">Viewer & Gift Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={liveAnalyticsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="viewers" stroke="#E51E25" strokeWidth={2} name="Viewers" />
                <Line type="monotone" dataKey="gifts" stroke="#3B82F6" strokeWidth={2} name="Gifts" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-4">Viewer Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={viewerDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COLORS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
