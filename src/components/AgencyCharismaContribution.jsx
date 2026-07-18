import React, { useState } from 'react'
import { Star, TrendingUp, BarChart3 } from 'lucide-react'
import { PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function AgencyCharismaContribution() {
  const [activeTab, setActiveTab] = useState('charisma')
  const [charismaView, setCharismaView] = useState('daily')
  const [contributionView, setContributionView] = useState('daily')

  const COLORS = ['#E51E25', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']

  const charismaData = {
    daily: [
      { date: '2026-07-18', charisma: 2450, contribution: 2800 },
      { date: '2026-07-17', charisma: 2380, contribution: 2680 },
      { date: '2026-07-16', charisma: 2250, contribution: 2550 },
      { date: '2026-07-15', charisma: 2100, contribution: 2400 },
      { date: '2026-07-14', charisma: 1980, contribution: 2250 }
    ],
    weekly: [
      { week: 'Week 28', charisma: 16800, contribution: 19200 },
      { week: 'Week 27', charisma: 15600, contribution: 17800 },
      { week: 'Week 26', charisma: 14200, contribution: 16200 },
      { week: 'Week 25', charisma: 13500, contribution: 15400 }
    ],
    monthly: [
      { month: 'July 2026', charisma: 72000, contribution: 82000 },
      { month: 'June 2026', charisma: 68000, contribution: 77500 },
      { month: 'May 2026', charisma: 64000, contribution: 73000 },
      { month: 'April 2026', charisma: 61000, contribution: 69500 }
    ],
    lifetime: [
      { year: '2026', charisma: 265000, contribution: 302000 },
      { year: '2025', charisma: 890000, contribution: 1015000 },
      { year: '2024', charisma: 720000, contribution: 820000 }
    ]
  }

  const contributionData = {
    daily: [
      { date: '2026-07-18', contribution: 2800, beans: 28000 },
      { date: '2026-07-17', contribution: 2680, beans: 26800 },
      { date: '2026-07-16', contribution: 2550, beans: 25500 },
      { date: '2026-07-15', contribution: 2400, beans: 24000 },
      { date: '2026-07-14', contribution: 2250, beans: 22500 }
    ],
    weekly: [
      { week: 'Week 28', contribution: 19200, beans: 192000 },
      { week: 'Week 27', contribution: 17800, beans: 178000 },
      { week: 'Week 26', contribution: 16200, beans: 162000 },
      { week: 'Week 25', contribution: 15400, beans: 154000 }
    ],
    monthly: [
      { month: 'July 2026', contribution: 82000, beans: 820000 },
      { month: 'June 2026', contribution: 77500, beans: 775000 },
      { month: 'May 2026', contribution: 73000, beans: 730000 },
      { month: 'April 2026', contribution: 69500, beans: 695000 }
    ],
    lifetime: [
      { year: '2026', contribution: 302000, beans: 3020000 },
      { year: '2025', contribution: 1015000, beans: 10150000 },
      { year: '2024', contribution: 820000, beans: 8200000 }
    ]
  }

  const targetProgress = [
    { hostName: 'Aria Live', target: 50000, achieved: 42000, completion: 84 },
    { hostName: 'Gamer Pro', target: 35000, achieved: 28000, completion: 80 },
    { hostName: 'Nisha Sing', target: 60000, achieved: 55000, completion: 92 },
    { hostName: 'Kathmandu Vibe', target: 25000, achieved: 18000, completion: 72 },
    { hostName: 'Live King', target: 45000, achieved: 38000, completion: 84 }
  ]

  const getCurrentData = (type, view) => {
    if (type === 'charisma') {
      return charismaData[view] || []
    } else {
      return contributionData[view] || []
    }
  }

  const getCompletionColor = (completion) => {
    if (completion >= 90) return 'bg-green-500'
    if (completion >= 75) return 'bg-blue-500'
    if (completion >= 50) return 'bg-amber-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-extrabold text-slate-800 text-sm mb-4">
          Charisma & Contribution
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('charisma')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'charisma'
                ? 'bg-[#E51E25] text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Charisma
          </button>
          <button
            onClick={() => setActiveTab('contribution')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'contribution'
                ? 'bg-[#E51E25] text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Contribution
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'reports'
                ? 'bg-[#E51E25] text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Reports
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'charts'
                ? 'bg-[#E51E25] text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Charts
          </button>
          <button
            onClick={() => setActiveTab('target-progress')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'target-progress'
                ? 'bg-[#E51E25] text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Target Progress
          </button>
        </div>
      </div>

      {/* Charisma Section */}
      {activeTab === 'charisma' && (
        <div className="space-y-6">
          <div className="flex gap-2">
            {['daily', 'weekly', 'monthly', 'lifetime'].map((view) => (
              <button
                key={view}
                onClick={() => setCharismaView(view)}
                className={`px-4 py-2 rounded-xl text-sm font-bold capitalize ${
                  charismaView === view
                    ? 'bg-[#E51E25] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
              <h3 className="font-extrabold text-white text-sm capitalize">
                Charisma - {charismaView}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3">
                      {charismaView === 'daily' ? 'Date' : charismaView === 'weekly' ? 'Week' : charismaView === 'monthly' ? 'Month' : 'Year'}
                    </th>
                    <th className="px-6 py-3">Charisma</th>
                    <th className="px-6 py-3">Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {getCurrentData('charisma', charismaView).map((item) => (
                    <tr key={item.date || item.week || item.month || item.year} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-600">{item.date || item.week || item.month || item.year}</td>
                      <td className="px-6 py-4 font-bold text-purple-600">{item.charisma.toLocaleString()}</td>
                      <td className="px-6 py-4 font-bold text-blue-600">{item.contribution.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Contribution Section */}
      {activeTab === 'contribution' && (
        <div className="space-y-6">
          <div className="flex gap-2">
            {['daily', 'weekly', 'monthly', 'lifetime'].map((view) => (
              <button
                key={view}
                onClick={() => setContributionView(view)}
                className={`px-4 py-2 rounded-xl text-sm font-bold capitalize ${
                  contributionView === view
                    ? 'bg-[#E51E25] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
              <h3 className="font-extrabold text-white text-sm capitalize">
                Contribution - {contributionView}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3">
                      {contributionView === 'daily' ? 'Date' : contributionView === 'weekly' ? 'Week' : contributionView === 'monthly' ? 'Month' : 'Year'}
                    </th>
                    <th className="px-6 py-3">Contribution</th>
                    <th className="px-6 py-3">Beans</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {getCurrentData('contribution', contributionView).map((item) => (
                    <tr key={item.date || item.week || item.month || item.year} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-600">{item.date || item.week || item.month || item.year}</td>
                      <td className="px-6 py-4 font-bold text-blue-600">{item.contribution.toLocaleString()}</td>
                      <td className="px-6 py-4 font-bold text-green-600">{item.beans.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Reports Section */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-extrabold text-slate-800 text-sm mb-4">Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-[#E51E25]" />
                <span className="font-bold text-slate-800">Charisma Report</span>
              </div>
              <p className="text-sm text-slate-600">Detailed charisma analysis and trends</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-slate-800">Contribution Report</span>
              </div>
              <p className="text-sm text-slate-600">Contribution metrics and performance</p>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      {activeTab === 'charts' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-4">Charisma Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={charismaData.daily}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="charisma" stroke="#E51E25" strokeWidth={2} name="Charisma" />
                <Line type="monotone" dataKey="contribution" stroke="#3B82F6" strokeWidth={2} name="Contribution" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-4">Contribution Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={[
                    { name: 'Daily', value: 2800 },
                    { name: 'Weekly', value: 19200 },
                    { name: 'Monthly', value: 82000 }
                  ]}
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

      {/* Target Progress Section */}
      {activeTab === 'target-progress' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
            <h3 className="font-extrabold text-white text-sm">Target Progress</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Host Name</th>
                  <th className="px-6 py-3">Target</th>
                  <th className="px-6 py-3">Achieved</th>
                  <th className="px-6 py-3">Completion %</th>
                  <th className="px-6 py-3">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {targetProgress.map((host) => (
                  <tr key={host.hostName} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{host.hostName}</td>
                    <td className="px-6 py-4 font-bold text-slate-600">{host.target.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-green-600">{host.achieved.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{host.completion}%</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${getCompletionColor(host.completion)}`}
                            style={{ width: `${host.completion}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{host.completion}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
