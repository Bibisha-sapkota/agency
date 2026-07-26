import React, { useState } from 'react'
import { Award, Lock, Unlock } from 'lucide-react'

export default function AgencyIncentiveLevels() {
  const [incentiveLevels, setIncentiveLevels] = useState([
    { level: 'Level 1', requiredTarget: 100000, achievedTarget: 100000, remainingTarget: 0, completion: 100, incentive: 100, status: 'unlocked' },
    { level: 'Level 2', requiredTarget: 250000, achievedTarget: 200000, remainingTarget: 50000, completion: 80, incentive: 250, status: 'locked' },
    { level: 'Level 3', requiredTarget: 500000, achievedTarget: 350000, remainingTarget: 150000, completion: 70, incentive: 500, status: 'locked' },
    { level: 'Level 4', requiredTarget: 1000000, achievedTarget: 600000, remainingTarget: 400000, completion: 60, incentive: 1000, status: 'locked' },
    { level: 'Level 5', requiredTarget: 2000000, achievedTarget: 1000000, remainingTarget: 1000000, completion: 50, incentive: 2000, status: 'locked' },
    { level: 'Elite', requiredTarget: 5000000, achievedTarget: 2500000, remainingTarget: 2500000, completion: 50, incentive: 5000, status: 'locked' },
    { level: 'VIP', requiredTarget: 10000000, achievedTarget: 3000000, remainingTarget: 7000000, completion: 30, incentive: 10000, status: 'locked' }
  ])

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-extrabold text-slate-800 text-sm mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#E51E25]" /> Incentive Levels
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {incentiveLevels.map((level) => (
            <div key={level.level} className="bg-slate-50 rounded-xl p-4 border-2 border-transparent hover:border-[#E51E25] transition-all">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-extrabold text-slate-800">{level.level}</h4>
                {level.status === 'unlocked' ? (
                  <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                    <Unlock className="w-3 h-3" /> Unlocked
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Required Target:</span>
                  <span className="font-bold text-slate-800">₹{level.requiredTarget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Achieved Target:</span>
                  <span className="font-bold text-green-600">₹{level.achievedTarget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Remaining Target:</span>
                  <span className="font-bold text-red-600">₹{level.remainingTarget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Completion:</span>
                  <span className="font-bold text-[#E51E25]">{level.completion}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Incentive:</span>
                  <span className="font-bold text-amber-600">${level.incentive}</span>
                </div>
              </div>
              <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${level.status === 'unlocked' ? 'bg-green-500' : 'bg-[#E51E25]'}`}
                  style={{ width: `${level.completion}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
