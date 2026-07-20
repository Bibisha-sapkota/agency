import React, { useMemo, useState } from 'react'
import {
  Gift, Send, Users, Heart, TrendingUp, Coins,
  Download, LayoutDashboard, ChevronRight, ChevronDown,
  LayoutGrid, Trophy, Star, BarChart2, Info, ArrowRight, ArrowUp
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0') + ' May')

const periods = {
  'This Month': {
    charisma: {
      total: 12580300, daily: 405170, high: 785400, low: 215300,
      trend: [2.1, 2.3, 2.6, 2.4, 2.8, 3.1, 2.9, 3.3, 3.5, 3.2, 3.8, 4.1, 3.9, 4.4, 4.7, 4.3, 4.9, 5.2, 4.8, 5.5, 5.9, 5.3, 6.1, 6.5, 6.2, 6.8, 7.1, 6.6, 7.4, 7.8, 7.85],
    },
    contribution: {
      total: 9875500, daily: 318403, high: 620800, low: 165200,
      trend: [1.5, 1.7, 1.9, 1.8, 2.1, 2.3, 2.2, 2.5, 2.7, 2.6, 2.9, 3.1, 3.0, 3.3, 3.5, 3.4, 3.7, 4.0, 3.8, 4.2, 4.5, 4.3, 4.7, 5.0, 4.9, 5.3, 5.6, 5.4, 5.9, 6.1, 6.21],
    },
  },
  'Last Month': {
    charisma: {
      total: 10920100, daily: 352265, high: 690200, low: 180400,
      trend: [1.8, 2.0, 2.2, 2.1, 2.4, 2.7, 2.5, 2.9, 3.0, 2.8, 3.3, 3.6, 3.4, 3.8, 4.0, 3.7, 4.2, 4.5, 4.1, 4.7, 5.0, 4.6, 5.2, 5.5, 5.1, 5.7, 6.0, 5.6, 6.2, 6.5, 6.6],
    },
    contribution: {
      total: 8460200, daily: 273000, high: 540600, low: 142100,
      trend: [1.2, 1.4, 1.6, 1.5, 1.8, 2.0, 1.9, 2.2, 2.3, 2.1, 2.5, 2.7, 2.6, 2.9, 3.1, 2.9, 3.3, 3.5, 3.3, 3.7, 3.9, 3.6, 4.1, 4.3, 4.1, 4.5, 4.8, 4.5, 5.0, 5.2, 5.3],
    },
  },
}

const hostsCharismaAll = [
  { name: 'Pooja Singh', monthly: 1250300, daily: 405170, high: 785400, target: 1800000, pct: 69.46 },
  { name: 'Anjali Sharma', monthly: 1020400, daily: 329160, high: 645300, target: 1500000, pct: 68.03 },
  { name: 'Riya Mehta', monthly: 860200, daily: 277490, high: 520800, target: 1200000, pct: 71.68 },
  { name: 'Kavya Reddy', monthly: 780100, daily: 251610, high: 480600, target: 1100000, pct: 70.91 },
  { name: 'Neha Patel', monthly: 690400, daily: 222710, high: 415200, target: 1000000, pct: 69.04 },
  { name: 'Simran Kaur', monthly: 610200, daily: 196800, high: 372100, target: 900000, pct: 67.8 },
  { name: 'Ayesha Khan', monthly: 540800, daily: 174450, high: 331500, target: 800000, pct: 67.6 },
  { name: 'Tanya Verma', monthly: 495300, daily: 159780, high: 302800, target: 730000, pct: 67.85 },
  { name: 'Nisha Gupta', monthly: 452100, daily: 145840, high: 278900, target: 670000, pct: 67.48 },
  { name: 'Meera Joshi', monthly: 410600, daily: 132450, high: 251300, target: 610000, pct: 67.31 },
]

const hostsContributionAll = [
  { name: 'Pooja Singh', monthly: 985500, daily: 318403, high: 620800, target: 1500000, pct: 65.7 },
  { name: 'Anjali Sharma', monthly: 875200, daily: 282330, high: 540600, target: 1300000, pct: 67.32 },
  { name: 'Riya Mehta', monthly: 760300, daily: 245170, high: 475900, target: 1150000, pct: 66.11 },
  { name: 'Kavya Reddy', monthly: 650800, daily: 209920, high: 420500, target: 1000000, pct: 65.08 },
  { name: 'Neha Patel', monthly: 575100, daily: 185520, high: 360100, target: 890000, pct: 64.61 },
  { name: 'Simran Kaur', monthly: 512400, daily: 165290, high: 320700, target: 800000, pct: 64.05 },
  { name: 'Ayesha Khan', monthly: 460900, daily: 148680, high: 289400, target: 720000, pct: 64.01 },
  { name: 'Tanya Verma', monthly: 418200, daily: 134900, high: 262800, target: 655000, pct: 63.85 },
  { name: 'Nisha Gupta', monthly: 381500, daily: 123060, high: 240100, target: 600000, pct: 63.58 },
  { name: 'Meera Joshi', monthly: 349700, daily: 112800, high: 220900, target: 550000, pct: 63.58 },
]

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

const tabs = [
  { key: 'overview', label: 'Overview', icon: LayoutGrid },
  { key: 'charisma', label: 'Gifts Received (Charisma)', icon: Gift },
  { key: 'contribution', label: 'Contributions Sent', icon: Send },
  { key: 'gifters', label: 'Top Gifters', icon: Trophy },
  { key: 'receivers', label: 'Top Receivers', icon: Heart },
  { key: 'contributors', label: 'Top Contributors', icon: BarChart2 },
]

function StatCard({ icon: Icon, label, value, change }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="h-9 w-9 rounded-lg bg-slate-100 text-black flex items-center justify-center">
          <Icon className="h-4.5 w-4.5" strokeWidth={2} />
        </div>
        <span className="text-[11px] text-slate-500 leading-tight">{label}</span>
      </div>
      <p className="text-lg font-bold text-black mb-1">{value}</p>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-black">
          <ArrowUp className="h-3 w-3" /> {change} vs Apr 2025
        </span>
      </div>
      <a href="#" className="text-[11px] font-medium text-black hover:underline mt-1 inline-block">View Details</a>
    </div>
  )
}

function TrendChart({ data, color }) {
  const chartData = data.map((v, i) => ({ day: days[i], value: v }))
  return (
    <div className="h-44">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="#eceef1" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94a3b8' }} interval={5} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} tickFormatter={(v) => `${v}L`} axisLine={false} tickLine={false} width={26} />
          <Tooltip formatter={(v) => [`₹${v}L`, 'Value']} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #eceef1' }} />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ r: 2, fill: color, strokeWidth: 0 }} activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function HostTable({ hosts, barColor, showAll }) {
  const rows = showAll ? hosts : hosts.slice(0, 5)
  return (
    <table className="w-full text-[12px] mt-1.5">
      <thead>
        <tr className="text-[10.5px] text-slate-500">
          <th className="text-left font-semibold py-2 border-b border-slate-200">#</th>
          <th className="text-left font-semibold py-2 border-b border-slate-200">Host Name</th>
          <th className="text-left font-semibold py-2 border-b border-slate-200">Monthly</th>
          <th className="text-left font-semibold py-2 border-b border-slate-200">Daily Avg.</th>
          <th className="text-left font-semibold py-2 border-b border-slate-200">Highest Day</th>
          <th className="text-left font-semibold py-2 border-b border-slate-200">Target</th>
          <th className="text-left font-semibold py-2 border-b border-slate-200">Achievement %</th>
          <th className="text-left font-semibold py-2 border-b border-slate-200">Progress</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((h, i) => (
          <tr key={h.name} className={i !== rows.length - 1 ? 'border-b border-slate-100' : ''}>
            <td className="py-2.5 text-black">{i + 1}</td>
            <td className="py-2.5 text-black font-medium">{h.name}</td>
            <td className="py-2.5 text-black">{fmt(h.monthly)}</td>
            <td className="py-2.5 text-black">{fmt(h.daily)}</td>
            <td className="py-2.5 text-black">{fmt(h.high)}</td>
            <td className="py-2.5 text-black">{fmt(h.target)}</td>
            <td className="py-2.5 text-black">{h.pct}%</td>
            <td className="py-2.5">
              <div className="w-20 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${h.pct}%`, backgroundColor: barColor }} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Panel({ title, subtitle, accentColor, periodData, hosts, tableTitle, showAll, onToggleAll }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-sm font-semibold text-black mb-3">{title}</div>

      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <div className="space-y-3">
          <div>
            <div className="text-[11px] text-slate-500 mb-1">{subtitle}</div>
            <div className="text-lg font-bold" style={{ color: accentColor }}>{fmt(periodData.total)}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 mb-1">Daily Average</div>
            <div className="text-sm font-semibold text-black">{fmt(periodData.daily)}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 mb-1">Highest Day</div>
            <div className="text-sm font-semibold text-black">{fmt(periodData.high)}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 mb-1">Lowest Day</div>
            <div className="text-sm font-semibold text-black">{fmt(periodData.low)}</div>
          </div>
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-600 mb-1">Trend (Selected Period)</div>
          <TrendChart data={periodData.trend} color={accentColor} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm font-semibold text-black">{tableTitle}</div>
        <button onClick={onToggleAll} className="text-[12px] font-medium text-black hover:underline">
          {showAll ? 'View Top 5' : 'View All'}
        </button>
      </div>
      <HostTable hosts={hosts} barColor={accentColor} showAll={showAll} />
      <div className="flex justify-center mt-2.5">
        <button onClick={onToggleAll} className="text-[12.5px] font-medium text-black hover:underline flex items-center gap-1">
          {showAll ? 'View Top 5' : 'View All Hosts'} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

function RankingTable({ hosts, valueLabel, barColor }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="text-[10.5px] text-slate-500">
            <th className="text-left font-semibold py-2 border-b border-slate-200">Rank</th>
            <th className="text-left font-semibold py-2 border-b border-slate-200">Host Name</th>
            <th className="text-left font-semibold py-2 border-b border-slate-200">{valueLabel}</th>
            <th className="text-left font-semibold py-2 border-b border-slate-200">Target</th>
            <th className="text-left font-semibold py-2 border-b border-slate-200">Achievement %</th>
            <th className="text-left font-semibold py-2 border-b border-slate-200">Progress</th>
          </tr>
        </thead>
        <tbody>
          {hosts.map((h, i) => (
            <tr key={h.name} className={i !== hosts.length - 1 ? 'border-b border-slate-100' : ''}>
              <td className="py-2.5 text-black font-semibold">#{i + 1}</td>
              <td className="py-2.5 text-black font-medium">{h.name}</td>
              <td className="py-2.5 text-black">{fmt(h.monthly)}</td>
              <td className="py-2.5 text-black">{fmt(h.target)}</td>
              <td className="py-2.5 text-black">{h.pct}%</td>
              <td className="py-2.5">
                <div className="w-24 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${h.pct}%`, backgroundColor: barColor }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function GiftContribution() {
  const [activeTab, setActiveTab] = useState('overview')
  const [hostFilter, setHostFilter] = useState('All Hosts')
  const [countryFilter, setCountryFilter] = useState('All Countries')
  const [paymentFilter, setPaymentFilter] = useState('All Payment Methods')
  const [period, setPeriod] = useState('This Month')
  const [showAllCharisma, setShowAllCharisma] = useState(false)
  const [showAllContribution, setShowAllContribution] = useState(false)
  const [toast, setToast] = useState('')

  const hostNames = useMemo(() => ['All Hosts', ...hostsCharismaAll.map((h) => h.name)], [])

  const filteredCharisma = useMemo(
    () => hostsCharismaAll.filter((h) => hostFilter === 'All Hosts' || h.name === hostFilter),
    [hostFilter]
  )
  const filteredContribution = useMemo(
    () => hostsContributionAll.filter((h) => hostFilter === 'All Hosts' || h.name === hostFilter),
    [hostFilter]
  )

  const stats = [
    { icon: Gift, label: 'Total Gifts Received (Charisma)', value: fmt(periods[period].charisma.total), change: '18.2%' },
    { icon: Send, label: 'Total Gifts Sent (Contribution)', value: fmt(periods[period].contribution.total), change: '14.8%' },
    { icon: Users, label: 'Total Unique Gifters', value: '18,450', change: '11.3%' },
    { icon: Heart, label: 'Total Unique Receivers', value: '1,250', change: '9.7%' },
    { icon: TrendingUp, label: 'Avg. Gift Value (Received)', value: '₹68.12', change: '6.2%' },
    { icon: Coins, label: 'Avg. Contribution Value (Sent)', value: '₹54.35', change: '5.4%' },
  ]

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2000)
  }

  function handleExport() {
    const lines = []
    lines.push('Gift & Contribution Report')
    lines.push(`Period,${period}`)
    lines.push('')
    lines.push('Summary')
    stats.forEach((s) => lines.push(`${s.label},${s.value}`))
    lines.push('')
    lines.push('Top Hosts by Gifts Received (Charisma)')
    lines.push('Rank,Host Name,Monthly,Daily Avg,Highest Day,Target,Achievement %')
    filteredCharisma.forEach((h, i) => lines.push(`${i + 1},${h.name},${h.monthly},${h.daily},${h.high},${h.target},${h.pct}%`))
    lines.push('')
    lines.push('Top Hosts by Contributions Sent')
    lines.push('Rank,Host Name,Monthly,Daily Avg,Highest Day,Target,Achievement %')
    filteredContribution.forEach((h, i) => lines.push(`${i + 1},${h.name},${h.monthly},${h.daily},${h.high},${h.target},${h.pct}%`))

    const csv = lines.join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'gift-contribution-report.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showToast('Report exported')
  }

  const topGifters = [...hostsCharismaAll].sort((a, b) => b.monthly - a.monthly).slice(0, 8)
  const topReceivers = [...hostsContributionAll].sort((a, b) => b.pct - a.pct).slice(0, 8)
  const topContributors = [...hostsContributionAll].sort((a, b) => b.monthly - a.monthly).slice(0, 8)

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-6 text-black">
      <div className="max-w-[1180px] mx-auto">

        {toast && (
          <div className="fixed top-4 right-4 z-50 rounded-lg bg-black text-white text-xs px-4 py-2 shadow-lg">
            {toast}
          </div>
        )}

        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-black mb-1">Gift & Contribution</h1>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
              <ChevronRight className="h-3 w-3" /> Gift & Contribution
            </div>
          </div>
          <button onClick={handleExport} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-slate-50">
            <Download className="h-3.5 w-3.5" /> Export Report
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          {tabs.map((t) => {
            const Icon = t.icon
            const active = activeTab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium border ${
                  active ? 'bg-black text-white border-black' : 'bg-white text-black border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className="h-3.5 w-3.5" /> {t.label}
              </button>
            )
          })}

          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <select
                value={hostFilter}
                onChange={(e) => setHostFilter(e.target.value)}
                className="appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-7 py-2 text-xs text-black cursor-pointer"
              >
                {hostNames.map((h) => <option key={h}>{h}</option>)}
              </select>
              <ChevronDown className="h-3.5 w-3.5 text-black absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-7 py-2 text-xs text-black cursor-pointer"
              >
                <option>All Countries</option>
                <option>Nepal</option>
                <option>India</option>
                <option>USA</option>
              </select>
              <ChevronDown className="h-3.5 w-3.5 text-black absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-7 py-2 text-xs text-black cursor-pointer"
              >
                <option>All Payment Methods</option>
                <option>Card</option>
                <option>Wallet</option>
                <option>UPI</option>
              </select>
              <ChevronDown className="h-3.5 w-3.5 text-black absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-7 py-2 text-xs text-black cursor-pointer"
              >
                <option>This Month</option>
                <option>Last Month</option>
              </select>
              <ChevronDown className="h-3.5 w-3.5 text-black absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
            <Panel
              title="Gifts Received (Charisma) Overview"
              subtitle={`Total Charisma (${period})`}
              accentColor="#7c5cff"
              periodData={periods[period].charisma}
              hosts={filteredCharisma}
              tableTitle="Top Hosts by Gifts Received (Charisma)"
              showAll={showAllCharisma}
              onToggleAll={() => setShowAllCharisma((s) => !s)}
            />
            <Panel
              title="Contributions Sent Overview"
              subtitle={`Total Contribution (${period})`}
              accentColor="#f5872e"
              periodData={periods[period].contribution}
              hosts={filteredContribution}
              tableTitle="Top Hosts by Contributions Sent"
              showAll={showAllContribution}
              onToggleAll={() => setShowAllContribution((s) => !s)}
            />
          </div>
        )}

        {activeTab === 'charisma' && (
          <div className="mb-5">
            <Panel
              title="Gifts Received (Charisma) Overview"
              subtitle={`Total Charisma (${period})`}
              accentColor="#7c5cff"
              periodData={periods[period].charisma}
              hosts={filteredCharisma}
              tableTitle="Top Hosts by Gifts Received (Charisma)"
              showAll={showAllCharisma}
              onToggleAll={() => setShowAllCharisma((s) => !s)}
            />
          </div>
        )}

        {activeTab === 'contribution' && (
          <div className="mb-5">
            <Panel
              title="Contributions Sent Overview"
              subtitle={`Total Contribution (${period})`}
              accentColor="#f5872e"
              periodData={periods[period].contribution}
              hosts={filteredContribution}
              tableTitle="Top Hosts by Contributions Sent"
              showAll={showAllContribution}
              onToggleAll={() => setShowAllContribution((s) => !s)}
            />
          </div>
        )}

        {activeTab === 'gifters' && (
          <div className="mb-5">
            <div className="text-sm font-semibold text-black mb-2">Top Gifters (by Charisma Sent)</div>
            <RankingTable hosts={topGifters} valueLabel="Monthly Charisma" barColor="#7c5cff" />
          </div>
        )}

        {activeTab === 'receivers' && (
          <div className="mb-5">
            <div className="text-sm font-semibold text-black mb-2">Top Receivers (by Achievement %)</div>
            <RankingTable hosts={topReceivers} valueLabel="Monthly Contribution" barColor="#f5872e" />
          </div>
        )}

        {activeTab === 'contributors' && (
          <div className="mb-5">
            <div className="text-sm font-semibold text-black mb-2">Top Contributors (by Monthly Contribution)</div>
            <RankingTable hosts={topContributors} valueLabel="Monthly Contribution" barColor="#f5872e" />
          </div>
        )}

        <div className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[12px] text-slate-600">
          <Info className="h-4 w-4 text-black shrink-0 mt-0.5" />
          <span>
            <b className="text-black">Note:</b> Agency can only see target progress and summarized data. Individual gift sender/receiver details and history are visible only to the respective host on their own profile.
          </span>
        </div>

      </div>
    </div>
  )
}