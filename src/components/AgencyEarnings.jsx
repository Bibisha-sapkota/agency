import React, { useState } from 'react'
import { DollarSign, Wallet, Gift, TrendingUp, Users, Calendar, BarChart3, Clock, Search, Filter } from 'lucide-react'

export default function AgencyEarnings() {
  const [activeTab, setActiveTab] = useState('summary')
  const [searchQuery, setSearchQuery] = useState('')
  const [revenueView, setRevenueView] = useState('daily')

  const tabs = [
    { key: 'summary', label: 'Earnings Summary', icon: DollarSign },
    { key: 'host-earnings', label: 'Host Earnings', icon: Users },
    { key: 'revenue', label: 'Revenue', icon: BarChart3 },
    { key: 'bonus', label: 'Bonus', icon: Gift },
    { key: 'incentives', label: 'Incentives', icon: TrendingUp }
  ]

  const earningsData = {
    summary: {
      totalRevenue: 3750000,
      totalSalary: 1250000,
      totalBonus: 450000,
      totalIncentive: 320000,
      currentMonth: 'July 2026'
    },
    hostEarnings: [
      { hostName: 'Aria Live', hostId: 'H-901', revenue: 450000, salary: 150000, bonus: 45000, incentive: 32000, total: 627000 },
      { hostName: 'Gamer Pro', hostId: 'H-902', revenue: 280000, salary: 95000, bonus: 28000, incentive: 20000, total: 383000 },
      { hostName: 'Nisha Sing', hostId: 'H-903', revenue: 520000, salary: 175000, bonus: 52000, incentive: 38000, total: 725000 },
      { hostName: 'Kathmandu Vibe', hostId: 'H-904', revenue: 150000, salary: 50000, bonus: 15000, incentive: 11000, total: 206000 },
      { hostName: 'Live King', hostId: 'H-905', revenue: 320000, salary: 110000, bonus: 32000, incentive: 23000, total: 435000 }
    ],
    revenue: {
      daily: [
        { date: '2026-07-18', amount: 125000 },
        { date: '2026-07-17', amount: 118000 },
        { date: '2026-07-16', amount: 132000 },
        { date: '2026-07-15', amount: 98000 },
        { date: '2026-07-14', amount: 145000 }
      ],
      monthly: [
        { month: 'July 2026', amount: 3750000 },
        { month: 'June 2026', amount: 3520000 },
        { month: 'May 2026', amount: 3280000 },
        { month: 'April 2026', amount: 3100000 },
        { month: 'March 2026', amount: 2950000 }
      ]
    },
    bonus: [
      { id: 'B-001', hostName: 'Aria Live', amount: 45000, date: '2026-07-15', reason: 'Top performer of the month', status: 'paid' },
      { id: 'B-002', hostName: 'Nisha Sing', amount: 52000, date: '2026-07-15', reason: 'Highest live hours', status: 'paid' },
      { id: 'B-003', hostName: 'Live King', amount: 32000, date: '2026-07-10', reason: 'Revenue milestone achieved', status: 'paid' },
      { id: 'B-004', hostName: 'Gamer Pro', amount: 28000, date: '2026-07-08', reason: 'New follower milestone', status: 'pending' },
      { id: 'B-005', hostName: 'Kathmandu Vibe', amount: 15000, date: '2026-07-05', reason: 'Consistency bonus', status: 'paid' }
    ],
    incentives: [
      { hostName: 'Aria Live', baseSalary: 150000, performanceScore: 92, incentiveRate: 15, incentiveAmount: 22500, totalSalary: 172500 },
      { hostName: 'Gamer Pro', baseSalary: 95000, performanceScore: 88, incentiveRate: 12, incentiveAmount: 11400, totalSalary: 106400 },
      { hostName: 'Nisha Sing', baseSalary: 175000, performanceScore: 95, incentiveRate: 18, incentiveAmount: 31500, totalSalary: 206500 },
      { hostName: 'Kathmandu Vibe', baseSalary: 50000, performanceScore: 78, incentiveRate: 8, incentiveAmount: 4000, totalSalary: 54000 },
      { hostName: 'Live King', baseSalary: 110000, performanceScore: 85, incentiveRate: 11, incentiveAmount: 12100, totalSalary: 122100 }
    ]
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-extrabold text-slate-800 text-sm mb-4">
          Earnings
        </h3>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-[#E51E25] text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Earnings Summary */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Total Revenue</span>
              </div>
              <div className="text-3xl font-extrabold text-slate-800">₹{(earningsData.summary.totalRevenue / 100000).toFixed(1)}L</div>
              <div className="text-xs text-slate-600 mt-1">{earningsData.summary.currentMonth}</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Total Salary</span>
              </div>
              <div className="text-3xl font-extrabold text-blue-600">₹{(earningsData.summary.totalSalary / 100000).toFixed(1)}L</div>
              <div className="text-xs text-slate-600 mt-1">{earningsData.summary.currentMonth}</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Total Bonus</span>
              </div>
              <div className="text-3xl font-extrabold text-green-600">₹{(earningsData.summary.totalBonus / 1000).toFixed(0)}K</div>
              <div className="text-xs text-slate-600 mt-1">{earningsData.summary.currentMonth}</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Total Incentive</span>
              </div>
              <div className="text-3xl font-extrabold text-purple-600">₹{(earningsData.summary.totalIncentive / 1000).toFixed(0)}K</div>
              <div className="text-xs text-slate-600 mt-1">{earningsData.summary.currentMonth}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-4">Earnings Breakdown</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">Revenue</span>
                <span className="text-sm font-bold text-slate-800">₹{earningsData.summary.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#E51E25] rounded-full" style={{ width: '100%' }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">Salary</span>
                <span className="text-sm font-bold text-blue-600">₹{earningsData.summary.totalSalary.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '33%' }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">Bonus</span>
                <span className="text-sm font-bold text-green-600">₹{earningsData.summary.totalBonus.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full" style={{ width: '12%' }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">Incentive</span>
                <span className="text-sm font-bold text-purple-600">₹{earningsData.summary.totalIncentive.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: '8.5%' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Host Earnings */}
      {activeTab === 'host-earnings' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4 flex items-center justify-between">
            <h3 className="font-extrabold text-white text-sm">Host-wise Earnings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Host Name</th>
                  <th className="px-6 py-3">Host ID</th>
                  <th className="px-6 py-3">Revenue</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Bonus</th>
                  <th className="px-6 py-3">Incentive</th>
                  <th className="px-6 py-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {earningsData.hostEarnings.map((host) => (
                  <tr key={host.hostId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{host.hostName}</td>
                    <td className="px-6 py-4 text-slate-600">{host.hostId}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">₹{host.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">₹{host.salary.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-green-600">₹{host.bonus.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">₹{host.incentive.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-[#E51E25]">₹{host.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Revenue */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <div className="flex gap-2">
            <button 
              onClick={() => setRevenueView('daily')}
              className={`px-4 py-2 rounded-xl text-sm font-bold ${revenueView === 'daily' ? 'bg-[#E51E25] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Daily
            </button>
            <button 
              onClick={() => setRevenueView('monthly')}
              className={`px-4 py-2 rounded-xl text-sm font-bold ${revenueView === 'monthly' ? 'bg-[#E51E25] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Monthly
            </button>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
              <h3 className="font-extrabold text-white text-sm">{revenueView === 'daily' ? 'Daily Revenue' : 'Monthly Revenue'}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3">{revenueView === 'daily' ? 'Date' : 'Month'}</th>
                    <th className="px-6 py-3">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(revenueView === 'daily' ? earningsData.revenue.daily : earningsData.revenue.monthly).map((item) => (
                    <tr key={item.date || item.month} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-600">{item.date || item.month}</td>
                      <td className="px-6 py-4 font-bold text-green-600">₹{item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Bonus */}
      {activeTab === 'bonus' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
            <h3 className="font-extrabold text-white text-sm">Bonus History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Bonus ID</th>
                  <th className="px-6 py-3">Host Name</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Reason</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {earningsData.bonus.map((bonus) => (
                  <tr key={bonus.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-700">{bonus.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{bonus.hostName}</td>
                    <td className="px-6 py-4 font-bold text-green-600">₹{bonus.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-600">{bonus.date}</td>
                    <td className="px-6 py-4 text-slate-600">{bonus.reason}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        bonus.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {bonus.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Incentives */}
      {activeTab === 'incentives' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
            <h3 className="font-extrabold text-white text-sm">Monthly Incentive Calculation</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Host Name</th>
                  <th className="px-6 py-3">Base Salary</th>
                  <th className="px-6 py-3">Performance Score</th>
                  <th className="px-6 py-3">Incentive Rate %</th>
                  <th className="px-6 py-3">Incentive Amount</th>
                  <th className="px-6 py-3">Total Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {earningsData.incentives.map((incentive) => (
                  <tr key={incentive.hostName} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{incentive.hostName}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">₹{incentive.baseSalary.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{incentive.performanceScore}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{incentive.incentiveRate}%</td>
                    <td className="px-6 py-4 font-bold text-green-600">₹{incentive.incentiveAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-[#E51E25]">₹{incentive.totalSalary.toLocaleString()}</td>
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
