import React from 'react'
import { Gift, TrendingUp, Users } from 'lucide-react'

const contributionStats = [
  { label: 'Total Contribution', value: '₹98,75,500', icon: Gift },
  { label: 'Average Contribution', value: '₹3,250', icon: TrendingUp },
  { label: 'Contribution Hosts', value: '110', icon: Users }
]

export default function AgencyContribution() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Contributions</p>
            <h2 className="text-2xl font-extrabold text-slate-900">Contribution Analytics</h2>
            <p className="mt-2 text-sm text-slate-500 max-w-2xl">Monitor contribution totals, beans earned, and host impact.</p>
          </div>
          <button className="rounded-2xl bg-[#E51E25] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c4161c]">Export report</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {contributionStats.map((stat) => (
          <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-slate-100 p-3 text-slate-900"><stat.icon className="h-5 w-5" /></div>
              <span className="text-xs font-semibold uppercase text-slate-400">{stat.label}</span>
            </div>
            <p className="mt-5 text-3xl font-extrabold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
