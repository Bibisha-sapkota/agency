import React, { useMemo, useState } from 'react'

const HOURLY_RECORDS = [
  {
    id: 'HLR-001',
    hostName: 'Aria Live',
    hostId: 'H-901',
    liveSessionId: 'LIVE-20260718-001',
    date: '2026-07-18',
    hourSlot: '18:00 – 19:00',
    liveStart: '18:02',
    liveEnd: '19:00',
    totalMinutes: 58,
    visitorsJoined: 342,
    visitorsLeft: 89,
    peakViewers: 1245,
    averageViewers: 876,
    charismaEarned: 420,
    revenue: 18500,
    liveHours: 0.97,
    followers: 28,
    likes: 156,
    comments: 43,
    shares: 12,
    firstCharismaTime: '18:05',
    lastCharismaTime: '18:58'
  },
  {
    id: 'HLR-002',
    hostName: 'Aria Live',
    hostId: 'H-901',
    liveSessionId: 'LIVE-20260718-001',
    date: '2026-07-18',
    hourSlot: '19:00 – 20:00',
    liveStart: '19:00',
    liveEnd: '20:00',
    totalMinutes: 60,
    visitorsJoined: 489,
    visitorsLeft: 156,
    peakViewers: 1890,
    averageViewers: 1342,
    charismaEarned: 680,
    revenue: 32400,
    liveHours: 1.0,
    followers: 45,
    likes: 312,
    comments: 87,
    shares: 24,
    firstCharismaTime: '19:03',
    lastCharismaTime: '19:57'
  },
  {
    id: 'HLR-003',
    hostName: 'Aria Live',
    hostId: 'H-901',
    liveSessionId: 'LIVE-20260718-001',
    date: '2026-07-18',
    hourSlot: '20:00 – 21:00',
    liveStart: '20:00',
    liveEnd: '21:00',
    totalMinutes: 60,
    visitorsJoined: 612,
    visitorsLeft: 203,
    peakViewers: 2450,
    averageViewers: 1789,
    charismaEarned: 920,
    revenue: 45800,
    liveHours: 1.0,
    followers: 62,
    likes: 489,
    comments: 124,
    shares: 38,
    firstCharismaTime: '20:01',
    lastCharismaTime: '20:59'
  },
  {
    id: 'HLR-004',
    hostName: 'Nisha Sing',
    hostId: 'H-903',
    liveSessionId: 'LIVE-20260718-002',
    date: '2026-07-18',
    hourSlot: '20:00 – 21:00',
    liveStart: '20:15',
    liveEnd: '21:00',
    totalMinutes: 45,
    visitorsJoined: 278,
    visitorsLeft: 67,
    peakViewers: 1560,
    averageViewers: 1120,
    charismaEarned: 540,
    revenue: 28900,
    liveHours: 0.75,
    followers: 34,
    likes: 245,
    comments: 56,
    shares: 18,
    firstCharismaTime: '20:18',
    lastCharismaTime: '20:55'
  },
  {
    id: 'HLR-005',
    hostName: 'Gamer Pro',
    hostId: 'H-902',
    liveSessionId: 'LIVE-20260717-003',
    date: '2026-07-17',
    hourSlot: '14:00 – 15:00',
    liveStart: '14:10',
    liveEnd: '15:00',
    totalMinutes: 50,
    visitorsJoined: 198,
    visitorsLeft: 45,
    peakViewers: 890,
    averageViewers: 620,
    charismaEarned: 310,
    revenue: 12400,
    liveHours: 0.83,
    followers: 15,
    likes: 98,
    comments: 22,
    shares: 8,
    firstCharismaTime: '14:12',
    lastCharismaTime: '14:58'
  },
  {
    id: 'HLR-006',
    hostName: 'Gamer Pro',
    hostId: 'H-902',
    liveSessionId: 'LIVE-20260717-003',
    date: '2026-07-17',
    hourSlot: '15:00 – 16:00',
    liveStart: '15:00',
    liveEnd: '16:00',
    totalMinutes: 60,
    visitorsJoined: 256,
    visitorsLeft: 78,
    peakViewers: 1120,
    averageViewers: 845,
    charismaEarned: 450,
    revenue: 19800,
    liveHours: 1.0,
    followers: 22,
    likes: 167,
    comments: 34,
    shares: 11,
    firstCharismaTime: '15:04',
    lastCharismaTime: '15:56'
  }
]

function MetricGroup({ title, children }) {
  return (
    <div className="space-y-2">
      <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wide">
        {title}
      </div>
      <div className="grid grid-cols-2 gap-2">{children}</div>
    </div>
  )
}

function MetricItem({ label, value, accent }) {
  return (
    <div className="bg-slate-50 rounded-lg px-3 py-2">
      <span className="text-[10px] font-bold text-slate-600 uppercase block">{label}</span>
      <span className={`text-sm font-extrabold mt-0.5 block ${accent || 'text-slate-800'}`}>{value}</span>
    </div>
  )
}

export default function AgencyHourlyLiveHistory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [hostFilter, setHostFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)

  const hosts = useMemo(
    () => [...new Set(HOURLY_RECORDS.map((r) => r.hostName))],
    []
  )

  const dates = useMemo(
    () => [...new Set(HOURLY_RECORDS.map((r) => r.date))].sort().reverse(),
    []
  )

  const filteredRecords = useMemo(() => {
    return HOURLY_RECORDS.filter((record) => {
      const matchesSearch =
        !searchQuery ||
        record.hostName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.hostId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.liveSessionId.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDate = !dateFilter || record.date === dateFilter
      const matchesHost = hostFilter === 'all' || record.hostName === hostFilter
      return matchesSearch && matchesDate && matchesHost
    })
  }, [searchQuery, dateFilter, hostFilter])

  const totals = useMemo(() => ({
    records: filteredRecords.length,
    minutes: filteredRecords.reduce((sum, r) => sum + r.totalMinutes, 0),
    sessions: new Set(filteredRecords.map((r) => r.liveSessionId)).size
  }), [filteredRecords])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <span className="text-xs font-bold text-slate-800 uppercase">Hourly Records</span>
          <div className="text-3xl font-extrabold text-slate-800 mt-2">{totals.records}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <span className="text-xs font-bold text-slate-800 uppercase">Live Sessions</span>
          <div className="text-3xl font-extrabold text-[#E51E25] mt-2">{totals.sessions}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <span className="text-xs font-bold text-slate-800 uppercase">Total Minutes</span>
          <div className="text-3xl font-extrabold text-blue-600 mt-2">{totals.minutes}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search host, ID, or session..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/30"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={hostFilter}
              onChange={(e) => setHostFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/30"
            >
              <option value="all">All Hosts</option>
              {hosts.map((host) => (
                <option key={host} value={host}>{host}</option>
              ))}
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/30"
            >
              <option value="">All Dates</option>
              {dates.map((date) => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center text-slate-600 font-semibold">
            No hourly records found
          </div>
        ) : (
          filteredRecords.map((record) => {
            const isExpanded = expandedId === record.id
            return (
              <div
                key={record.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : record.id)}
                  className="w-full px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors text-left"
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-slate-800">{record.hostName}</span>
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">{record.hostId}</span>
                      <span className="text-[10px] font-bold bg-red-50 text-[#E51E25] px-2 py-0.5 rounded-full">{record.hourSlot}</span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1">
                      {record.date} · Session {record.liveSessionId} · Record {record.id}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 text-sm">
                    <div className="text-center">
                      <span className="text-[10px] font-bold text-slate-600 uppercase block">Charisma</span>
                      <span className="font-extrabold text-purple-600">{record.charismaEarned}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] font-bold text-slate-600 uppercase block">Revenue</span>
                      <span className="font-extrabold text-green-600">₹{record.revenue.toLocaleString()}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] font-bold text-slate-600 uppercase block">Peak</span>
                      <span className="font-extrabold text-slate-800">{record.peakViewers.toLocaleString()}</span>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-slate-100 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      <MetricGroup title="Live">
                        <MetricItem label="Live Start" value={record.liveStart} />
                        <MetricItem label="Live End" value={record.liveEnd} />
                        <MetricItem label="Total Minutes" value={`${record.totalMinutes} min`} accent="text-blue-600" />
                        <MetricItem label="Live Hours" value={record.liveHours} accent="text-blue-600" />
                      </MetricGroup>

                      <MetricGroup title="Audience">
                        <MetricItem label="Visitors Joined" value={record.visitorsJoined} accent="text-green-600" />
                        <MetricItem label="Visitors Left" value={record.visitorsLeft} accent="text-red-600" />
                        <MetricItem label="Peak Viewers" value={record.peakViewers.toLocaleString()} accent="text-[#E51E25]" />
                        <MetricItem label="Average Viewers" value={record.averageViewers.toLocaleString()} />
                      </MetricGroup>

                      <MetricGroup title="Performance">
                        <MetricItem label="Charisma Earned" value={record.charismaEarned} accent="text-purple-600" />
                        <MetricItem label="Revenue" value={`₹${record.revenue.toLocaleString()}`} accent="text-green-600" />
                        <MetricItem label="Live Hours" value={record.liveHours} accent="text-blue-600" />
                      </MetricGroup>

                      <MetricGroup title="Engagement">
                        <MetricItem label="Followers" value={`+${record.followers}`} accent="text-blue-600" />
                        <MetricItem label="Likes" value={record.likes} accent="text-[#E51E25]" />
                        <MetricItem label="Comments" value={record.comments} />
                        <MetricItem label="Shares" value={record.shares} />
                      </MetricGroup>

                      <MetricGroup title="Timeline">
                        <MetricItem label="First Charisma Time" value={record.firstCharismaTime} accent="text-amber-600" />
                        <MetricItem label="Last Charisma Time" value={record.lastCharismaTime} accent="text-amber-600" />
                      </MetricGroup>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h4 className="font-extrabold text-slate-800 text-sm">All Hourly Records</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[1400px]">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
              <tr>
                <th className="px-3 py-3" colSpan="4">Live</th>
                <th className="px-3 py-3 border-l border-slate-200" colSpan="4">Audience</th>
                <th className="px-3 py-3 border-l border-slate-200" colSpan="3">Performance</th>
                <th className="px-3 py-3 border-l border-slate-200" colSpan="4">Engagement</th>
                <th className="px-3 py-3 border-l border-slate-200" colSpan="2">Timeline</th>
              </tr>
              <tr className="border-b border-slate-100">
                <th className="px-3 py-2">Host</th>
                <th className="px-3 py-2">Hour</th>
                <th className="px-3 py-2">Start</th>
                <th className="px-3 py-2">End</th>
                <th className="px-3 py-2 border-l border-slate-200">Joined</th>
                <th className="px-3 py-2">Left</th>
                <th className="px-3 py-2">Peak</th>
                <th className="px-3 py-2">Avg</th>
                <th className="px-3 py-2 border-l border-slate-200">Charisma</th>
                <th className="px-3 py-2">Revenue</th>
                <th className="px-3 py-2">Minutes</th>
                <th className="px-3 py-2 border-l border-slate-200">Followers</th>
                <th className="px-3 py-2">Likes</th>
                <th className="px-3 py-2">Comments</th>
                <th className="px-3 py-2">Shares</th>
                <th className="px-3 py-2 border-l border-slate-200">First</th>
                <th className="px-3 py-2">Last</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-3">
                    <div className="font-bold text-slate-800">{record.hostName}</div>
                    <div className="text-[10px] font-mono text-slate-600">{record.id}</div>
                  </td>
                  <td className="px-3 py-3 font-bold text-[#E51E25]">{record.hourSlot}</td>
                  <td className="px-3 py-3 text-slate-800">{record.liveStart}</td>
                  <td className="px-3 py-3 text-slate-800">{record.liveEnd}</td>
                  <td className="px-3 py-3 border-l border-slate-100 font-bold text-green-600">{record.visitorsJoined}</td>
                  <td className="px-3 py-3 font-bold text-red-600">{record.visitorsLeft}</td>
                  <td className="px-3 py-3 font-bold text-slate-800">{record.peakViewers.toLocaleString()}</td>
                  <td className="px-3 py-3 font-bold text-slate-800">{record.averageViewers.toLocaleString()}</td>
                  <td className="px-3 py-3 border-l border-slate-100 font-bold text-purple-600">{record.charismaEarned}</td>
                  <td className="px-3 py-3 font-bold text-green-600">₹{record.revenue.toLocaleString()}</td>
                  <td className="px-3 py-3 font-bold text-blue-600">{record.totalMinutes}</td>
                  <td className="px-3 py-3 border-l border-slate-100 font-bold text-blue-600">+{record.followers}</td>
                  <td className="px-3 py-3 font-bold text-[#E51E25]">{record.likes}</td>
                  <td className="px-3 py-3 font-bold text-slate-800">{record.comments}</td>
                  <td className="px-3 py-3 font-bold text-slate-800">{record.shares}</td>
                  <td className="px-3 py-3 border-l border-slate-100 font-bold text-amber-600">{record.firstCharismaTime}</td>
                  <td className="px-3 py-3 font-bold text-amber-600">{record.lastCharismaTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
