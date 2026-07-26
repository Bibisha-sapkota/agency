import React from 'react'
import { Package, CheckCircle2, XCircle } from 'lucide-react'

export default function AgencyPackageDetails({ packageDetails }) {
  const calculateDaysRemaining = () => {
    const expiry = new Date(packageDetails.renewal.expiryDate)
    const today = new Date()
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const daysRemaining = calculateDaysRemaining()

  return (
    <div className="space-y-6">
      {/* Package Information Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
            <Package className="w-4 h-4" /> Package Information
          </h3>
        </div>
        <table className="w-full text-left text-sm">
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-slate-500 w-1/3">Package ID</td>
              <td className="px-6 py-4 text-slate-800 font-mono">{packageDetails.packageId}</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-slate-500">Package Name</td>
              <td className="px-6 py-4 text-slate-800 font-bold">{packageDetails.packageName}</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-slate-500">Agency Level</td>
              <td className="px-6 py-4 text-slate-800">{packageDetails.agencyLevel}</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-slate-500">Package Status</td>
              <td className="px-6 py-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                  {packageDetails.packageStatus}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Limits Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
          <h3 className="font-extrabold text-white text-sm">Limits</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
            <tr>
              <th className="px-6 py-3">Resource</th>
              <th className="px-6 py-3">Current</th>
              <th className="px-6 py-3">Maximum</th>
              <th className="px-6 py-3">Usage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { label: 'Hosts', current: 156, max: packageDetails.limits.maxHosts },
              { label: 'Agents', current: 45, max: packageDetails.limits.maxAgents },
              { label: 'Managers', current: 8, max: packageDetails.limits.maxManagers },
              { label: 'Recruiters', current: 12, max: packageDetails.limits.maxRecruiters }
            ].map((item, index) => {
              const percentage = Math.round((item.current / item.max) * 100)
              const isNearLimit = percentage > 80
              return (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-800">{item.label}</td>
                  <td className="px-6 py-4 text-slate-600">{item.current}</td>
                  <td className="px-6 py-4 text-slate-600">{item.max}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            isNearLimit ? 'bg-red-500' : 'bg-[#E51E25]'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className={`text-xs font-bold ${isNearLimit ? 'text-red-600' : 'text-slate-600'}`}>
                        {percentage}%
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Revenue Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
          <h3 className="font-extrabold text-white text-sm">Revenue</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
            <tr>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Percentage</th>
              <th className="px-6 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-slate-800">Revenue Share</td>
              <td className="px-6 py-4">
                <span className="text-green-600 font-bold text-lg">{packageDetails.revenue.revenueShare}%</span>
              </td>
              <td className="px-6 py-4 text-slate-600">Share of platform revenue</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-slate-800">Commission</td>
              <td className="px-6 py-4">
                <span className="text-blue-600 font-bold text-lg">{packageDetails.revenue.commission}%</span>
              </td>
              <td className="px-6 py-4 text-slate-600">Commission on transactions</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-slate-800">Incentive</td>
              <td className="px-6 py-4">
                <span className="text-purple-600 font-bold text-lg">{packageDetails.revenue.incentive}%</span>
              </td>
              <td className="px-6 py-4 text-slate-600">Performance incentives</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Features Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
          <h3 className="font-extrabold text-white text-sm">Features Enabled</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
            <tr>
              <th className="px-6 py-3">Feature</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {Object.entries(packageDetails.features).map(([key, value]) => (
              <tr key={key} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-800">
                  {key === 'hostRecruitment' ? 'Host Recruitment' :
                   key === 'agentManagement' ? 'Agent Management' :
                   key === 'withdraw' ? 'Withdraw' :
                   key === 'reports' ? 'Reports' :
                   key === 'analytics' ? 'Analytics' :
                   key === 'liveMonitoring' ? 'Live Monitoring' : key}
                </td>
                <td className="px-6 py-4">
                  {value ? (
                    <span className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-bold">Enabled</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-slate-400">
                      <XCircle className="w-4 h-4" />
                      <span className="font-bold">Disabled</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Renewal Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
          <h3 className="font-extrabold text-white text-sm">Renewal Information</h3>
        </div>
        <table className="w-full text-left text-sm">
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-slate-500 w-1/3">Start Date</td>
              <td className="px-6 py-4 text-slate-800">{packageDetails.renewal.startDate}</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-slate-500">Expiry Date</td>
              <td className="px-6 py-4">
                <span className="text-red-600 font-bold">{packageDetails.renewal.expiryDate}</span>
                <span className="ml-2 text-xs text-slate-500">({daysRemaining} days remaining)</span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-slate-500">Renewal Date</td>
              <td className="px-6 py-4">
                <span className="text-amber-600 font-bold">{packageDetails.renewal.renewalDate}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
