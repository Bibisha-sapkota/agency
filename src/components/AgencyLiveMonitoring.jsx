import React, { useMemo, useState, useRef, useEffect } from 'react'
import {
  Radio, Clock, Users, Eye, Heart, Flag,
  Search, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight,
  MoreVertical, Upload, LayoutDashboard, ChevronRight as CrumbChevron, X
} from 'lucide-react'

const firstNames = ['Pooja', 'Anjali', 'Neha', 'Riya', 'Kavya', 'Simran', 'Ayesha', 'Tanya', 'Nisha', 'Meera', 'Priya', 'Sneha', 'Divya', 'Aarti', 'Komal']
const lastNames = ['Singh', 'Sharma', 'Patel', 'Mehta', 'Reddy', 'Kaur', 'Khan', 'Verma', 'Gupta', 'Joshi', 'Rao', 'Nair', 'Iyer', 'Bansal', 'Kapoor']
const rooms = ['Romance Club', 'Music Lounge', 'Chat & Chill', 'Dance Arena', 'Bollywood Beats', 'Talk Show', 'Gaming Zone']

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateHosts(count) {
  const list = []
  for (let i = 0; i < count; i++) {
    const seed = i + 1
    const name = `${firstNames[i % firstNames.length]} ${lastNames[(i * 3) % lastNames.length]}`
    const isLive = seededRandom(seed * 1.7) > 0.18
    const cv = isLive ? Math.round(400 + seededRandom(seed * 2.1) * 1600) : 0
    const pv = isLive ? Math.round(cv * (1.6 + seededRandom(seed * 3.3))) : 0
    const av = isLive ? Math.round(cv * (0.75 + seededRandom(seed * 4.4) * 0.2)) : 0
    const vj = isLive ? Math.round(cv * (2.3 + seededRandom(seed * 5.5))) : 0
    const vl = isLive ? Math.round(vj * (0.55 + seededRandom(seed * 6.6) * 0.2)) : 0
    const ret = isLive ? Math.round((55 + seededRandom(seed * 7.7) * 20) * 100) / 100 : 0
    const inPk = isLive && seededRandom(seed * 8.8) > 0.45
    const pkRes = inPk ? (seededRandom(seed * 9.9) > 0.45 ? 'Win' : 'Lose') : '-'
    const durMin = isLive ? Math.round(20 + seededRandom(seed * 10.1) * 220) : 0
    const monthMin = Math.round(500 + seededRandom(seed * 11.2) * 5500)
    const toHM = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}h ${String(mins % 60).padStart(2, '0')}m`
    list.push({
      id: `HST${100234 + i}`,
      name,
      status: isLive ? 'Live' : 'Offline',
      dur: isLive ? `${String(Math.floor(durMin / 60)).padStart(2, '0')}:${String(durMin % 60).padStart(2, '0')}:${String(Math.round(seededRandom(seed) * 59)).padStart(2, '0')}` : '-',
      room: isLive ? rooms[i % rooms.length] : '-',
      cv, pv, av, vj, vl, ret,
      pk: inPk ? 'In PK' : 'Not in PK',
      res: pkRes,
      today: isLive ? toHM(durMin) : '00h 00m',
      month: toHM(monthMin),
    })
  }
  return list
}

const allHosts = generateHosts(120)

const stats = [
  { icon: Radio, label: 'Live Hosts', value: '120' },
  { icon: Clock, label: 'Total Live Hours (Today)', value: '1,256h 30m' },
  { icon: Users, label: 'Total Viewers (Live)', value: '18,450' },
  { icon: Eye, label: 'Peak Viewers (Live)', value: '45,620' },
  { icon: Heart, label: 'Avg. Viewer Retention', value: '68.45%' },
  { icon: Flag, label: 'PK Battles (Live)', value: '15' },
]

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="h-8 w-8 rounded-lg bg-slate-100 text-black flex items-center justify-center">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </div>
        <span className="text-[11px] text-slate-500">{label}</span>
      </div>
      <p className="text-lg font-bold text-black mb-1">{value}</p>
      <a href="#" className="text-[11px] font-medium text-black hover:underline">View Details</a>
    </div>
  )
}

function StatusPill({ status }) {
  const isLive = status === 'Live'
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-black">
      <span className={`h-1.5 w-1.5 rounded-full ${isLive ? 'bg-black' : 'bg-slate-300'}`} />
      {status}
    </span>
  )
}

function Pill({ children, tone }) {
  const tones = {
    green: 'bg-slate-900 text-white',
    red: 'bg-slate-200 text-black',
    gray: 'bg-slate-100 text-black',
  }
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tones[tone]}`}>{children}</span>
}

function RowMenu({ host, onAction }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const actions = ['View profile', 'Message host', host.status === 'Live' ? 'End live' : 'Send invite', 'Suspend host']

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className="text-black hover:opacity-60">
        <MoreVertical className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-1 w-40 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          {actions.map((a) => (
            <button
              key={a}
              onClick={() => { onAction(a, host); setOpen(false) }}
              className="block w-full px-3 py-1.5 text-left text-xs text-black hover:bg-slate-50"
            >
              {a}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function LiveAnalytics() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [roomFilter, setRoomFilter] = useState('All Rooms')
  const [pkFilter, setPkFilter] = useState('PK Status')
  const [minRetention, setMinRetention] = useState(0)
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [toast, setToast] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return allHosts.filter((h) => {
      if (q && !h.id.toLowerCase().includes(q) && !h.name.toLowerCase().includes(q)) return false
      if (statusFilter !== 'All Status' && h.status !== statusFilter) return false
      if (roomFilter !== 'All Rooms' && h.room !== roomFilter) return false
      if (pkFilter !== 'PK Status' && h.pk !== pkFilter) return false
      if (h.ret < minRetention) return false
      return true
    })
  }, [search, statusFilter, roomFilter, pkFilter, minRetention])

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage))
  const currentPage = Math.min(page, totalPages)
  const pageRows = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  function resetPage() { setPage(1) }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2000)
  }

  function handleRowAction(action, host) {
    showToast(`${action}: ${host.name}`)
  }

  function handleExport() {
    const header = ['Host ID', 'Host Name', 'Live Status', 'Live Duration', 'Current Room', 'Current Viewers', 'Peak Viewers', 'Average Viewers', 'Visitors Joined', 'Visitors Left', 'Viewer Retention', 'PK Status', 'PK Result', 'Live Hours Today', 'Live Hours This Month']
    const rows = filtered.map((h) => [h.id, h.name, h.status, h.dur, h.room, h.cv, h.pv, h.av, h.vj, h.vl, `${h.ret}%`, h.pk, h.res, h.today, h.month])
    const csv = [header, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'live-analytics.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showToast(`Exported ${filtered.length} rows`)
  }

  function clearFilters() {
    setSearch('')
    setStatusFilter('All Status')
    setRoomFilter('All Rooms')
    setPkFilter('PK Status')
    setMinRetention(0)
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-6 text-black">
      <div className="max-w-[1200px] mx-auto">

        {toast && (
          <div className="fixed top-4 right-4 z-50 rounded-lg bg-black text-white text-xs px-4 py-2 shadow-lg">
            {toast}
          </div>
        )}

        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-black mb-1">Live Analytics</h1>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
              <CrumbChevron className="h-3 w-3" /> Live Analytics
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={handleExport} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-slate-50">
              <Upload className="h-3.5 w-3.5" /> Export
            </button>
            <button onClick={() => setShowMoreFilters((s) => !s)} className="inline-flex items-center gap-1.5 rounded-lg bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <div className="flex-1 min-w-[220px] flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5">
            <Search className="h-4 w-4 text-black" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPage() }}
              placeholder="Search by Host ID or Name..."
              className="flex-1 text-xs outline-none placeholder:text-slate-400 text-black"
            />
            {search && (
              <button onClick={() => { setSearch(''); resetPage() }}><X className="h-3.5 w-3.5 text-slate-400" /></button>
            )}
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); resetPage() }}
              className="appearance-none rounded-lg border border-slate-300 bg-white pl-3.5 pr-8 py-2.5 text-xs text-black cursor-pointer"
            >
              <option>All Status</option>
              <option>Live</option>
              <option>Offline</option>
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-black absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={roomFilter}
              onChange={(e) => { setRoomFilter(e.target.value); resetPage() }}
              className="appearance-none rounded-lg border border-slate-300 bg-white pl-3.5 pr-8 py-2.5 text-xs text-black cursor-pointer"
            >
              <option>All Rooms</option>
              {rooms.map((r) => <option key={r}>{r}</option>)}
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-black absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={pkFilter}
              onChange={(e) => { setPkFilter(e.target.value); resetPage() }}
              className="appearance-none rounded-lg border border-slate-300 bg-white pl-3.5 pr-8 py-2.5 text-xs text-black cursor-pointer"
            >
              <option>PK Status</option>
              <option>In PK</option>
              <option>Not in PK</option>
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-black absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button onClick={() => setShowMoreFilters((s) => !s)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-black">
            <SlidersHorizontal className="h-3.5 w-3.5" /> More Filters
          </button>

          {(search || statusFilter !== 'All Status' || roomFilter !== 'All Rooms' || pkFilter !== 'PK Status' || minRetention > 0) && (
            <button onClick={clearFilters} className="text-xs text-black underline">Clear all</button>
          )}
        </div>

        {showMoreFilters && (
          <div className="mb-4 flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-3">
            <span className="text-xs text-black font-medium">Min. viewer retention</span>
            <input
              type="range" min="0" max="90" step="5"
              value={minRetention}
              onChange={(e) => { setMinRetention(Number(e.target.value)); resetPage() }}
              className="flex-1 accent-black"
            />
            <span className="text-xs text-black w-10">{minRetention}%</span>
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[11px] text-slate-500">
                <th className="text-left font-semibold px-4 py-3 border-b border-slate-200 whitespace-nowrap">Host ID</th>
                <th className="text-left font-semibold px-4 py-3 border-b border-slate-200 whitespace-nowrap">Host Name</th>
                <th className="text-left font-semibold px-4 py-3 border-b border-slate-200 whitespace-nowrap">Live Status</th>
                <th className="text-left font-semibold px-4 py-3 border-b border-slate-200 whitespace-nowrap">Live Duration</th>
                <th className="text-left font-semibold px-4 py-3 border-b border-slate-200 whitespace-nowrap">Current Room</th>
                <th className="text-left font-semibold px-4 py-3 border-b border-slate-200 whitespace-nowrap">Current Viewers</th>
                <th className="text-left font-semibold px-4 py-3 border-b border-slate-200 whitespace-nowrap">Peak Viewers</th>
                <th className="text-left font-semibold px-4 py-3 border-b border-slate-200 whitespace-nowrap">Average Viewers</th>
                <th className="text-left font-semibold px-4 py-3 border-b border-slate-200 whitespace-nowrap">Visitors Joined</th>
                <th className="text-left font-semibold px-4 py-3 border-b border-slate-200 whitespace-nowrap">Visitors Left</th>
                <th className="text-left font-semibold px-4 py-3 border-b border-slate-200 whitespace-nowrap">Viewer Retention</th>
                <th className="text-left font-semibold px-4 py-3 border-b border-slate-200 whitespace-nowrap">PK Status</th>
                <th className="text-left font-semibold px-4 py-3 border-b border-slate-200 whitespace-nowrap">PK Result</th>
                <th className="text-left font-semibold px-4 py-3 border-b border-slate-200 whitespace-nowrap">Live Hours Today</th>
                <th className="text-left font-semibold px-4 py-3 border-b border-slate-200 whitespace-nowrap">Live Hours This Month</th>
                <th className="px-4 py-3 border-b border-slate-200"></th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 && (
                <tr><td colSpan={16} className="px-4 py-8 text-center text-slate-400">No hosts match your filters.</td></tr>
              )}
              {pageRows.map((h, i) => (
                <tr key={h.id} className={i !== pageRows.length - 1 ? 'border-b border-slate-100' : ''}>
                  <td className="px-4 py-3 whitespace-nowrap text-black">{h.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-black">{h.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap"><StatusPill status={h.status} /></td>
                  <td className="px-4 py-3 whitespace-nowrap text-black">{h.dur}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-black">{h.room}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-black">{h.cv.toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-black">{h.pv.toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-black">{h.av.toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-black">{h.vj.toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-black">{h.vl.toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-semibold text-black">{h.ret}%</td>
                  <td className="px-4 py-3 whitespace-nowrap"><Pill tone={h.pk === 'In PK' ? 'green' : 'gray'}>{h.pk}</Pill></td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {h.res === 'Win' ? <Pill tone="green">Win</Pill> : h.res === 'Lose' ? <Pill tone="red">Lose</Pill> : <span className="text-slate-400">-</span>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-black">{h.today}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-black">{h.month}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <RowMenu host={h} onAction={handleRowAction} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-3 px-1">
          <span className="text-xs text-slate-500">
            Showing {filtered.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filtered.length)} of {filtered.length} hosts
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-7 w-7 rounded-md border border-slate-300 bg-white flex items-center justify-center text-black disabled:opacity-30"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...')
                acc.push(p)
                return acc
              }, [])
              .map((p, idx) =>
                p === '...' ? (
                  <span key={`gap-${idx}`} className="text-xs text-slate-400 px-1">...</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-7 w-7 rounded-md text-xs font-semibold flex items-center justify-center ${p === currentPage ? 'bg-black text-white' : 'border border-slate-300 bg-white text-black hover:bg-slate-50'}`}
                  >
                    {p}
                  </button>
                )
              )}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-7 w-7 rounded-md border border-slate-300 bg-white flex items-center justify-center text-black disabled:opacity-30"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-black">
            Rows per page
            <select
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); resetPage() }}
              className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-black"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  )
}