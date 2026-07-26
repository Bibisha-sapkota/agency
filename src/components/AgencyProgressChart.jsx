import React, { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function AgencyProgressChart() {
  const COLORS = ['#E51E25', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']

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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-extrabold text-slate-800 text-sm mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#E51E25]" /> Target Progress Chart
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h4 className="font-extrabold text-slate-800 mb-4">All Targets Progress</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={getProgressChartData()}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#10B981" name="Completed %" />
                <Bar dataKey="remaining" fill="#EF4444" name="Remaining %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h4 className="font-extrabold text-slate-800 mb-4">Monthly Progress Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={getPieChartData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getPieChartData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-slate-50 rounded-xl p-6">
            <h4 className="font-extrabold text-slate-800 mb-4">Monthly Progress</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600">Completed</span>
                  <span className="text-sm font-bold text-green-600">{monthlyTarget.completion}%</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${monthlyTarget.completion}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600">Remaining</span>
                  <span className="text-sm font-bold text-red-600">{100 - monthlyTarget.completion}%</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${100 - monthlyTarget.completion}%` }} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-6">
            <h4 className="font-extrabold text-slate-800 mb-4">Today's Progress</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600">Completed</span>
                  <span className="text-sm font-bold text-green-600">{dailyTarget.completion}%</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${dailyTarget.completion}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600">Remaining</span>
                  <span className="text-sm font-bold text-red-600">{100 - dailyTarget.completion}%</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${100 - dailyTarget.completion}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
