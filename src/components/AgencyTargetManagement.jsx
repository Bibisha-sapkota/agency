import React, { useState } from 'react'
import { Target, TrendingUp, Award, Crown, Clock, CheckCircle2, AlertCircle, Edit, X, Save, Calendar, Trophy, Lock, Unlock, ChevronDown, Search } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function AgencyTargetManagement() {
  const [targets, setTargets] = useState([
    {
      id: 'T-001',
      hostName: 'Aria Live',
      hostId: 'H-901',
      currentTarget: 500000,
      requiredCharisma: 2500,
      achieved: 420000,
      remaining: 80000,
      eliteTarget: 750000,
      vipTarget: 1000000,
      daysRemaining: 15,
      status: 'on-track'
    },
    {
      id: 'T-002',
      hostName: 'Gamer Pro',
      hostId: 'H-902',
      currentTarget: 350000,
      requiredCharisma: 2000,
      achieved: 280000,
      remaining: 70000,
      eliteTarget: 500000,
      vipTarget: 750000,
      daysRemaining: 15,
      status: 'on-track'
    },
    {
      id: 'T-003',
      hostName: 'Nisha Sing',
      hostId: 'H-903',
      currentTarget: 600000,
      requiredCharisma: 3000,
      achieved: 550000,
      remaining: 50000,
      eliteTarget: 850000,
      vipTarget: 1200000,
      daysRemaining: 15,
      status: 'ahead'
    },
    {
      id: 'T-004',
      hostName: 'Kathmandu Vibe',
      hostId: 'H-904',
      currentTarget: 250000,
      requiredCharisma: 1500,
      achieved: 180000,
      remaining: 70000,
      eliteTarget: 400000,
      vipTarget: 600000,
      daysRemaining: 15,
      status: 'behind'
    },
    {
      id: 'T-005',
      hostName: 'Live King',
      hostId: 'H-905',
      currentTarget: 450000,
      requiredCharisma: 2200,
      achieved: 380000,
      remaining: 70000,
      eliteTarget: 650000,
      vipTarget: 900000,
      daysRemaining: 15,
      status: 'on-track'
    }
  ])

  const [dailyTarget, setDailyTarget] = useState({
    required: 50000,
    achieved: 35000,
    remaining: 15000,
    completion: 70
  })

  const [weeklyTarget, setWeeklyTarget] = useState({
    required: 350000,
    achieved: 245000,
    remaining: 105000,
    completion: 70
  })

  const [monthlyTarget, setMonthlyTarget] = useState({
    required: 1500000,
    achieved: 1050000,
    remaining: 450000,
    completion: 70
  })

  const [agencyTarget, setAgencyTarget] = useState({
    required: 5000000,
    achieved: 3500000,
    remaining: 1500000,
    completion: 70
  })

  const [incentiveLevels, setIncentiveLevels] = useState([
    { level: 'Level 1', requiredTarget: 100000, achievedTarget: 100000, remainingTarget: 0, completion: 100, incentive: 100, status: 'unlocked' },
    { level: 'Level 2', requiredTarget: 250000, achievedTarget: 200000, remainingTarget: 50000, completion: 80, incentive: 250, status: 'locked' },
    { level: 'Level 3', requiredTarget: 500000, achievedTarget: 350000, remainingTarget: 150000, completion: 70, incentive: 500, status: 'locked' },
    { level: 'Level 4', requiredTarget: 1000000, achievedTarget: 600000, remainingTarget: 400000, completion: 60, incentive: 1000, status: 'locked' },
    { level: 'Level 5', requiredTarget: 2000000, achievedTarget: 1000000, remainingTarget: 1000000, completion: 50, incentive: 2000, status: 'locked' },
    { level: 'Elite', requiredTarget: 5000000, achievedTarget: 2500000, remainingTarget: 2500000, completion: 50, incentive: 5000, status: 'locked' },
    { level: 'VIP', requiredTarget: 10000000, achievedTarget: 3000000, remainingTarget: 7000000, completion: 30, incentive: 10000, status: 'locked' }
  ])

  const COLORS = ['#E51E25', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']

  const getProgressChartData = () => {
    return [
      { name: 'Daily', completed: dailyTarget.completion, remaining: 100 - dailyTarget.completion },
      { name: 'Weekly', completed: weeklyTarget.completion, remaining: 100 - weeklyTarget.completion },
      { name: 'Monthly', completed: monthlyTarget.completion, remaining: 100 - monthlyTarget.completion },
      { name: 'Agency', completed: agencyTarget.completion, remaining: 100 - agencyTarget.completion }
    ]
  }

  const getPieChartData = () => {
    return [
      { name: 'Completed', value: monthlyTarget.completion },
      { name: 'Remaining', value: 100 - monthlyTarget.completion }
    ]
  }

  const [editingTarget, setEditingTarget] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [editForm, setEditForm] = useState({
    currentTarget: 0,
    requiredCharisma: 0,
    eliteTarget: 0,
    vipTarget: 0,
    daysRemaining: 0
  })

  const getStatusBadge = (status) => {
    switch(status) {
      case 'ahead':
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Ahead</span>
      case 'on-track':
        return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">On Track</span>
      case 'behind':
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">Behind</span>
      default:
        return <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">{status}</span>
    }
  }

  const getProgressColor = (achieved, target) => {
    const percentage = (achieved / target) * 100
    if (percentage >= 100) return 'bg-green-500'
    if (percentage >= 75) return 'bg-blue-500'
    if (percentage >= 50) return 'bg-amber-500'
    return 'bg-red-500'
  }

  const getProgressPercentage = (achieved, target) => {
    return Math.min((achieved / target) * 100, 100)
  }

  const handleEdit = (target) => {
    setEditingTarget(target.id)
    setEditForm({
      currentTarget: target.currentTarget,
      requiredCharisma: target.requiredCharisma,
      eliteTarget: target.eliteTarget,
      vipTarget: target.vipTarget,
      daysRemaining: target.daysRemaining
    })
  }

  const handleSave = () => {
    setTargets(targets.map(target => 
      target.id === editingTarget 
        ? {
            ...target,
            currentTarget: editForm.currentTarget,
            requiredCharisma: editForm.requiredCharisma,
            eliteTarget: editForm.eliteTarget,
            vipTarget: editForm.vipTarget,
            daysRemaining: editForm.daysRemaining,
            remaining: editForm.currentTarget - target.achieved > 0 ? editForm.currentTarget - target.achieved : 0
          }
        : target
    ))
    setEditingTarget(null)
  }

  const handleCancel = () => {
    setEditingTarget(null)
    setEditForm({
      currentTarget: 0,
      requiredCharisma: 0,
      eliteTarget: 0,
      vipTarget: 0,
      daysRemaining: 0
    })
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Total Targets</span>
              </div>
              <div className="text-3xl font-extrabold text-slate-800">{targets.length}</div>
              <div className="text-xs text-slate-600 mt-1">hosts</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">On Track</span>
              </div>
              <div className="text-3xl font-extrabold text-blue-600">
                {targets.filter(t => t.status === 'on-track').length}
              </div>
              <div className="text-xs text-slate-600 mt-1">hosts</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Ahead</span>
              </div>
              <div className="text-3xl font-extrabold text-green-600">
                {targets.filter(t => t.status === 'ahead').length}
              </div>
              <div className="text-xs text-slate-600 mt-1">hosts</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Behind</span>
              </div>
              <div className="text-3xl font-extrabold text-red-600">
                {targets.filter(t => t.status === 'behind').length}
              </div>
              <div className="text-xs text-slate-600 mt-1">hosts</div>
            </div>
          </div>

          {/* Target Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4 flex items-center justify-between">
              <h3 className="font-extrabold text-white text-sm">Host Target Management</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search hosts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Search className="w-4 h-4 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3">Host Name</th>
                    <th className="px-6 py-3">Host ID</th>
                    <th className="px-6 py-3">Current Target</th>
                    <th className="px-6 py-3">Required Charisma</th>
                    <th className="px-6 py-3">Achieved</th>
                    <th className="px-6 py-3">Remaining</th>
                    <th className="px-6 py-3">Progress</th>
                    <th className="px-6 py-3">Elite Target</th>
                    <th className="px-6 py-3">VIP Target</th>
                    <th className="px-6 py-3">Days Remaining</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {targets.filter(t => 
                    t.hostName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    t.hostId.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((target) => (
                    <tr key={target.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{target.hostName}</td>
                      <td className="px-6 py-4 text-slate-600">{target.hostId}</td>
                      <td className="px-6 py-4">
                        {editingTarget === target.id ? (
                          <input
                            type="number"
                            value={editForm.currentTarget}
                            onChange={(e) => setEditForm({ ...editForm, currentTarget: parseInt(e.target.value) })}
                            className="w-32 px-2 py-1 border border-slate-200 rounded text-sm"
                          />
                        ) : (
                          <span className="font-bold text-slate-800">₹{target.currentTarget.toLocaleString()}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingTarget === target.id ? (
                          <input
                            type="number"
                            value={editForm.requiredCharisma}
                            onChange={(e) => setEditForm({ ...editForm, requiredCharisma: parseInt(e.target.value) })}
                            className="w-24 px-2 py-1 border border-slate-200 rounded text-sm"
                          />
                        ) : (
                          <span className="font-bold text-purple-600">{target.requiredCharisma.toLocaleString()}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-bold text-green-600">₹{target.achieved.toLocaleString()}</td>
                      <td className="px-6 py-4 font-bold text-red-600">₹{target.remaining.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${getProgressColor(target.achieved, target.currentTarget)}`}
                              style={{ width: `${getProgressPercentage(target.achieved, target.currentTarget)}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-600">
                            {getProgressPercentage(target.achieved, target.currentTarget).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {editingTarget === target.id ? (
                          <input
                            type="number"
                            value={editForm.eliteTarget}
                            onChange={(e) => setEditForm({ ...editForm, eliteTarget: parseInt(e.target.value) })}
                            className="w-32 px-2 py-1 border border-slate-200 rounded text-sm"
                          />
                        ) : (
                          <span className="font-bold text-amber-600">₹{target.eliteTarget.toLocaleString()}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingTarget === target.id ? (
                          <input
                            type="number"
                            value={editForm.vipTarget}
                            onChange={(e) => setEditForm({ ...editForm, vipTarget: parseInt(e.target.value) })}
                            className="w-32 px-2 py-1 border border-slate-200 rounded text-sm"
                          />
                        ) : (
                          <span className="font-bold text-purple-600">₹{target.vipTarget.toLocaleString()}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingTarget === target.id ? (
                          <input
                            type="number"
                            value={editForm.daysRemaining}
                            onChange={(e) => setEditForm({ ...editForm, daysRemaining: parseInt(e.target.value) })}
                            className="w-16 px-2 py-1 border border-slate-200 rounded text-sm"
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="font-bold text-slate-800">{target.daysRemaining}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(target.status)}</td>
                      <td className="px-6 py-4">
                        {editingTarget === target.id ? (
                          <div className="flex gap-1">
                            <button onClick={handleSave} className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200" title="Save">
                              <Save className="w-3 h-3" />
                            </button>
                            <button onClick={handleCancel} className="p-1.5 bg-slate-100 text-slate-600 rounded hover:bg-slate-200" title="Cancel">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => handleEdit(target)} className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200" title="Edit">
                            <Edit className="w-3 h-3" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Target Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-[#E51E25]" />
                <h3 className="font-extrabold text-slate-800 text-sm">Current Target Progress</h3>
              </div>
              <div className="space-y-3">
                {targets.slice(0, 3).map((target) => (
                  <div key={target.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">{target.hostName}</span>
                      <span className="text-xs font-bold text-slate-600">
                        {getProgressPercentage(target.achieved, target.currentTarget).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${getProgressColor(target.achieved, target.currentTarget)}`}
                        style={{ width: `${getProgressPercentage(target.achieved, target.currentTarget)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-slate-800 text-sm">Elite Target Progress</h3>
              </div>
              <div className="space-y-3">
                {targets.slice(0, 3).map((target) => (
                  <div key={target.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">{target.hostName}</span>
                      <span className="text-xs font-bold text-slate-600">
                        {getProgressPercentage(target.achieved, target.eliteTarget).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${getProgressColor(target.achieved, target.eliteTarget)}`}
                        style={{ width: `${getProgressPercentage(target.achieved, target.eliteTarget)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-5 h-5 text-purple-500" />
                <h3 className="font-extrabold text-slate-800 text-sm">VIP Target Progress</h3>
              </div>
              <div className="space-y-3">
                {targets.slice(0, 3).map((target) => (
                  <div key={target.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">{target.hostName}</span>
                      <span className="text-xs font-bold text-slate-600">
                        {getProgressPercentage(target.achieved, target.vipTarget).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${getProgressColor(target.achieved, target.vipTarget)}`}
                        style={{ width: `${getProgressPercentage(target.achieved, target.vipTarget)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
    </div>
  )
}
