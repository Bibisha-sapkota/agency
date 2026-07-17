import React, { useState } from 'react'
import DiamondAgencyViewer from './DiamondAgencyViewer'

export default function AgencyViewer({ activeTab, onClose }) {
  // Common states for simulation
  const [distributeAmount, setDistributeAmount] = useState(10000)
  const [distributeType, setDistributeType] = useState('E-Rupee Coin')
  const [agencies, setAgencies] = useState([
    { id: 'DA-101', name: 'Elite Diamonds', activeAgencies: 14, coinSales: '1,240,000', status: 'Active' },
    { id: 'DA-102', name: 'Apex Distribution', activeAgencies: 8, coinSales: '780,000', status: 'Active' }
  ])

  // Revenue Sharing State Sliders
  const [revPlatform, setRevPlatform] = useState(40)
  const [revDiamond, setRevDiamond] = useState(10)
  const [revAgency, setRevAgency] = useState(20)
  const [revAgent, setRevAgent] = useState(10)
  const [revHost, setRevHost] = useState(20)

  // Target Simulation State
  const [coinSalesProgress, setCoinSalesProgress] = useState(65)

  // Form states
  const [newHostName, setNewHostName] = useState('')
  const [newHostAgent, setNewHostAgent] = useState('')
  const [hosts, setHosts] = useState([
    { id: 'H-901', name: 'Aria Live', agent: 'Agent Rahul', status: 'Streaming', beans: '45,200', target: 'Completed' },
    { id: 'H-902', name: 'Gamer Pro', agent: 'Direct Agency', status: 'Offline', beans: '12,800', target: 'In Progress' }
  ])

  const handleAddHost = (e) => {
    e.preventDefault()
    if (!newHostName) return
    const newHost = {
      id: `H-${Math.floor(100 + Math.random() * 900)}`,
      name: newHostName,
      agent: newHostAgent || 'Direct Agency',
      status: 'Offline',
      beans: '0',
      target: 'In Progress'
    }
    setHosts([newHost, ...hosts])
    setNewHostName('')
    setNewHostAgent('')
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Diamond Agency':
        return <DiamondAgencyViewer />

      case 'Agency':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-red-50 to-red-100/50 p-6 rounded-2xl border border-red-100">
              <h3 className="text-xl font-bold text-[#E51E25] mb-2">Agency Recruitment Hub</h3>
              <p className="text-slate-600 text-sm">
                Recruit, verify, and track hosts and agents. Setup targets and training to maximize coin generation and platform interaction.
              </p>
            </div>

            {/* Add Host Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-extrabold text-slate-800 text-base">Recruit New Host</h4>
              <form onSubmit={handleAddHost} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Host Name</label>
                  <input
                    type="text"
                    required
                    value={newHostName}
                    onChange={(e) => setNewHostName(e.target.value)}
                    placeholder="Enter host display name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Linked Agent (Optional)</label>
                  <input
                    type="text"
                    value={newHostAgent}
                    onChange={(e) => setNewHostAgent(e.target.value)}
                    placeholder="e.g. Agent Rahul"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-[#E51E25] hover:bg-[#c4161c] text-white py-2 px-4 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all"
                  >
                    Add & Bind Host
                  </button>
                </div>
              </form>
            </div>

            {/* Hosts List */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100">
                <h4 className="font-extrabold text-slate-800 text-base">Active Agency Hosts</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase">
                    <tr>
                      <th className="p-4">Host ID</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Recruiter / Agent</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-right">Beans Earned</th>
                      <th className="p-4 text-center">Target Tier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {hosts.map((host) => (
                      <tr key={host.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-mono font-bold text-slate-800">{host.id}</td>
                        <td className="p-4 font-semibold text-slate-800">{host.name}</td>
                        <td className="p-4 text-slate-500">{host.agent}</td>
                        <td className="p-4 text-center">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                            host.status === 'Streaming' ? 'bg-red-50 text-[#E51E25] animate-pulse' : 'bg-slate-50 text-slate-500'
                          }`}>{host.status}</span>
                        </td>
                        <td className="p-4 text-right font-mono font-semibold text-[#E51E25]">{host.beans}</td>
                        <td className="p-4 text-center">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                            host.target === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                          }`}>{host.target}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'Agent':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-red-50 to-red-100/50 p-6 rounded-2xl border border-red-100">
              <h3 className="text-xl font-bold text-[#E51E25] mb-2">Agent Dashboard & Binding</h3>
              <p className="text-slate-600 text-sm">
                Track direct host recruitments, verified signups, and commission payouts generated by your active hosts.
              </p>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recruited Hosts</span>
                <span className="text-3xl font-black text-slate-800 mt-2">12</span>
                <span className="text-xs text-green-600 mt-1 font-bold">↑ 2 New this month</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Commission</span>
                <span className="text-3xl font-black text-[#E51E25] mt-2">42,500 Beans</span>
                <span className="text-xs text-slate-500 mt-1">Pending payment: 12,000</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Status</span>
                <span className="text-3xl font-black text-green-600 mt-2">82%</span>
                <span className="text-xs text-slate-500 mt-1">18% remaining for Tier Bonus</span>
              </div>
            </div>
          </div>
        )

      case 'Host':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-red-50 to-red-100/50 p-6 rounded-2xl border border-red-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#E51E25] mb-2">Host Dashboard</h3>
                <p className="text-slate-600 text-sm">
                  Track your Live streaming performance, target progress, and digital wallets.
                </p>
              </div>
              <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex flex-col">
                <span className="text-[10px] font-bold text-slate-400">Host Badge ID</span>
                <span className="font-mono font-bold text-[#E51E25] text-sm">ER-H-938210</span>
              </div>
            </div>

            {/* Performance Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Hours</div>
                <div className="text-2xl font-black text-slate-800 mt-1">45.5 h</div>
                <div className="text-[10px] text-green-600 font-bold mt-1">Target: 60h</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">PK Battles</div>
                <div className="text-2xl font-black text-slate-800 mt-1">28</div>
                <div className="text-[10px] text-slate-550 font-medium mt-1">Won: 18 | Lost: 10</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gifts Received</div>
                <div className="text-2xl font-black text-slate-800 mt-1">104,200</div>
                <div className="text-[10px] text-slate-550 font-medium mt-1">Value in E-Rupee Coins</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Earnings (Beans)</div>
                <div className="text-2xl font-black text-[#E51E25] mt-1">83,360</div>
                <div className="text-[10px] text-green-600 font-bold mt-1">Withdrawal Available</div>
              </div>
            </div>
          </div>
        )

      case 'Target System':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-red-50 to-red-100/50 p-6 rounded-2xl border border-red-100">
              <h3 className="text-xl font-bold text-[#E51E25] mb-2">Target & Incentive Engine</h3>
              <p className="text-slate-600 text-sm">
                Set and monitor target configurations. Agencies, Agents, and Hosts can secure extra commission bonuses when milestone targets are hit.
              </p>
            </div>

            {/* Target Slider Simulation */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-slate-800 text-base">Monthly Coin Sales Volume</h4>
                <span className="text-lg font-black text-[#E51E25] font-mono">{coinSalesProgress}% Completed</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#E51E25] to-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${coinSalesProgress}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                <div className="p-3 bg-red-50/50 border border-red-100 rounded-xl">
                  <div className="text-[#E51E25]">Tier 1 (50%)</div>
                  <div className="text-slate-500 font-semibold mt-1">5% Extra Bonus</div>
                </div>
                <div className={`p-3 border rounded-xl ${coinSalesProgress >= 80 ? 'bg-red-50/50 border-red-100' : 'bg-slate-55 border-slate-200 text-slate-400'}`}>
                  <div className={coinSalesProgress >= 80 ? 'text-[#E51E25]' : ''}>Tier 2 (80%)</div>
                  <div className="font-semibold mt-1">10% Extra Bonus</div>
                </div>
                <div className={`p-3 border rounded-xl ${coinSalesProgress >= 100 ? 'bg-red-50/50 border-red-100' : 'bg-slate-55 border-slate-200 text-slate-400'}`}>
                  <div className={coinSalesProgress >= 100 ? 'text-[#E51E25]' : ''}>Tier 3 (100%+)</div>
                  <div className="font-semibold mt-1">20% Super Bonus</div>
                </div>
              </div>

              {/* Simulation Sliders */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Simulate Progress</label>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={coinSalesProgress}
                  onChange={(e) => setCoinSalesProgress(Number(e.target.value))}
                  className="w-full accent-[#E51E25]"
                />
              </div>
            </div>
          </div>
        )

      case 'Revenue Distribution':
        const totalShare = revPlatform + revDiamond + revAgency + revAgent + revHost
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-red-50 to-red-100/50 p-6 rounded-2xl border border-red-100">
              <h3 className="text-xl font-bold text-[#E51E25] mb-2">Revenue Share Configuration</h3>
              <p className="text-slate-600 text-sm">
                Super Admins can dynamically adjust the split ratio (commission percentages) across all levels of the hierarchy.
              </p>
            </div>

            {/* Sliders Grid */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <h4 className="font-extrabold text-slate-800 text-base">Hierarchy Commission Share</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-500">Total:</span>
                  <span className={`text-lg font-black ${totalShare === 100 ? 'text-green-600' : 'text-red-500'}`}>{totalShare}%</span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Platform Fee', val: revPlatform, set: setRevPlatform },
                  { label: 'Diamond Agency', val: revDiamond, set: setRevDiamond },
                  { label: 'Agency Share', val: revAgency, set: setRevAgency },
                  { label: 'Agent Share', val: revAgent, set: setRevAgent },
                  { label: 'Host Share', val: revHost, set: setRevHost }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="w-40 flex justify-between">
                      <span className="text-sm font-bold text-slate-700">{item.label}</span>
                      <span className="text-sm font-black text-[#E51E25] font-mono">{item.val}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={item.val}
                      onChange={(e) => item.set(Number(e.target.value))}
                      className="flex-1 accent-[#E51E25]"
                    />
                  </div>
                ))}
              </div>

              {totalShare !== 100 && (
                <div className="p-3 bg-red-50 border border-red-100 text-[#E51E25] rounded-xl text-xs font-semibold text-center">
                  ⚠️ Error: Total commission must sum up exactly to 100% (Current: {totalShare}%)
                </div>
              )}
            </div>
          </div>
        )

      case 'Agency Dashboard':
        return (
          <div className="space-y-6 animate-fadeIn">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Active Hosts</span>
                <span className="text-3xl font-black text-slate-800 mt-2">124</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Coin Sales</span>
                <span className="text-3xl font-black text-[#E51E25] mt-2">1,500K</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Beans Generated</span>
                <span className="text-3xl font-black text-slate-800 mt-2">320K</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Progress</span>
                <span className="text-3xl font-black text-green-600 mt-2">92%</span>
              </div>
            </div>

            {/* Performance breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-extrabold text-slate-800 text-base">Agency Performance Metrics</h4>
              <div className="h-40 flex items-end gap-3 justify-between pt-6 border-b border-slate-100">
                {[60, 80, 45, 90, 70, 95, 85].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="bg-red-500 rounded-t-lg w-full transition-all duration-500 hover:bg-red-600"
                      style={{ height: `${val}%` }}
                    ></div>
                    <span className="text-[10px] font-bold text-slate-400">Day {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'Agent Dashboard':
        return (
          <div className="space-y-6 animate-fadeIn">
            {/* Info Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-md space-y-2">
                <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Linked Host Growth</span>
                <div className="text-3xl font-black">+24 Hosts</div>
                <p className="text-slate-400 text-xs">Hosts recruited directly using your referral agent link.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">This Month Commission</span>
                <span className="text-3xl font-black text-[#E51E25] mt-2">830K Beans</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Level</span>
                <span className="text-3xl font-black text-amber-500 mt-2">Gold Agent</span>
              </div>
            </div>

            {/* Audit Log / History */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100">
                <h4 className="font-extrabold text-slate-800 text-base">Agent Commission Audit Ledger</h4>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { text: 'Commission credited from Host H-901 live show', date: '2026-07-17 07:15', coins: '+4,500 Beans' },
                  { text: 'Agent tier reward payout: Gold Level achieved', date: '2026-07-16 18:30', coins: '+12,000 Beans' },
                  { text: 'Withdrawal to E-Rupee Coin wallet approved by Admin', date: '2026-07-15 12:00', coins: '-8,000 Beans' }
                ].map((log, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-all border border-slate-50">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{log.text}</div>
                      <div className="text-[10px] font-medium text-slate-400 mt-0.5">{log.date}</div>
                    </div>
                    <span className={`text-sm font-black font-mono ${log.coins.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                      {log.coins}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 mb-6">
      <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
        {/* Navigation Toolbar */}
        <div className="flex justify-between items-center pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <span className="bg-[#E51E25] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">
              ★
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-850">
              Agency Portal: <span className="text-[#E51E25]">{activeTab}</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 bg-white border border-slate-200 hover:border-slate-300 p-2 rounded-xl transition-all shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Dynamic Inner Dashboard */}
        <div className="pt-6">
          {renderContent()}
        </div>
      </div>
    </section>
  )
}
