import React, { useState } from 'react'
import { BarChart, LineChart, PieChart as RechartsPieChart, Bar, Line, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, DollarSign, Star, Clock, Activity, Globe, ChevronDown } from 'lucide-react'

export default function AgencyAnalytics() {
  const [activeAnalytics, setActiveAnalytics] = useState('agency')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const analyticsTypes = [
    { key: 'agency', label: 'Agency Analytics', icon: TrendingUp },
    { key: 'host', label: 'Host Analytics', icon: Users },
    { key: 'revenue', label: 'Revenue Analytics', icon: DollarSign },
    { key: 'charisma', label: 'Charisma Analytics', icon: Star },
    { key: 'contribution', label: 'Contribution Analytics', icon: Clock },
    { key: 'live', label: 'Live Analytics', icon: Activity },
    { key: 'performance', label: 'Performance Analytics', icon: TrendingUp },
    { key: 'country', label: 'Country Analytics', icon: Globe }
  ]

  const COLORS = ['#E51E25', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']

  const getAnalyticsData = () => {
    switch(activeAnalytics) {
      case 'agency':
        return {
          chartData: [
            { month: 'Jan', performance: 75, targetCompletion: 82, activityScore: 78 },
            { month: 'Feb', performance: 78, targetCompletion: 85, activityScore: 80 },
            { month: 'Mar', performance: 82, targetCompletion: 88, activityScore: 84 },
            { month: 'Apr', performance: 85, targetCompletion: 90, activityScore: 86 },
            { month: 'May', performance: 83, targetCompletion: 87, activityScore: 82 },
            { month: 'Jun', performance: 87, targetCompletion: 92, activityScore: 88 }
          ],
          pieData: [
            { name: 'Excellent Performance', value: 35 },
            { name: 'Good Performance', value: 45 },
            { name: 'Needs Improvement', value: 20 }
          ]
        }
      case 'host':
        return {
          chartData: [
            { host: 'Aria Live', performanceScore: 92, targetCompletion: 95, activityLevel: 88 },
            { host: 'Gamer Pro', performanceScore: 78, targetCompletion: 82, activityLevel: 75 },
            { host: 'Nisha Sing', performanceScore: 95, targetCompletion: 98, activityLevel: 92 },
            { host: 'Kathmandu Vibe', performanceScore: 72, targetCompletion: 75, activityLevel: 68 }
          ],
          pieData: [
            { name: 'High Performers', value: 45 },
            { name: 'Average Performers', value: 35 },
            { name: 'Low Performers', value: 20 }
          ]
        }
      case 'revenue':
        return {
          chartData: [
            { source: 'Performance Bonus', amount: 85, percentage: 85 },
            { source: 'Target Achievement', amount: 78, percentage: 78 },
            { source: 'Activity Score', amount: 82, percentage: 82 }
          ],
          pieData: [
            { name: 'Performance Bonus', value: 35 },
            { name: 'Target Achievement', value: 40 },
            { name: 'Activity Score', value: 25 }
          ]
        }
      case 'charisma':
        return {
          chartData: [
            { week: 'Week 1', performanceScore: 82, engagementRate: 78 },
            { week: 'Week 2', performanceScore: 85, engagementRate: 82 },
            { week: 'Week 3', performanceScore: 88, engagementRate: 85 },
            { week: 'Week 4', performanceScore: 90, engagementRate: 88 }
          ],
          pieData: [
            { name: 'High Engagement', value: 45 },
            { name: 'Medium Engagement', value: 35 },
            { name: 'Low Engagement', value: 20 }
          ]
        }
      case 'contribution':
        return {
          chartData: [
            { host: 'Aria Live', contributionScore: 92, performanceRating: 95 },
            { host: 'Gamer Pro', contributionScore: 75, performanceRating: 78 },
            { host: 'Nisha Sing', contributionScore: 95, performanceRating: 98 },
            { host: 'Kathmandu Vibe', contributionScore: 68, performanceRating: 72 }
          ],
          pieData: [
            { name: 'Top Contributors', value: 30 },
            { name: 'Average', value: 50 },
            { name: 'Below Average', value: 20 }
          ]
        }
      case 'live':
        return {
          chartData: [
            { time: '6AM', performanceScore: 65, activeHosts: 8 },
            { time: '9AM', performanceScore: 72, activeHosts: 15 },
            { time: '12PM', performanceScore: 78, activeHosts: 22 },
            { time: '3PM', performanceScore: 82, activeHosts: 28 },
            { time: '6PM', performanceScore: 88, activeHosts: 35 },
            { time: '9PM', performanceScore: 92, activeHosts: 42 },
            { time: '12AM', performanceScore: 75, activeHosts: 25 }
          ],
          pieData: [
            { name: 'Peak Performance', value: 40 },
            { name: 'Normal Performance', value: 45 },
            { name: 'Low Performance', value: 15 }
          ]
        }
      case 'performance':
        return {
          chartData: [
            { month: 'Jan', score: 75, target: 80 },
            { month: 'Feb', score: 78, target: 82 },
            { month: 'Mar', score: 82, target: 85 },
            { month: 'Apr', score: 85, target: 88 },
            { month: 'May', score: 83, target: 90 },
            { month: 'Jun', score: 87, target: 92 }
          ],
          pieData: [
            { name: 'Excellent', value: 35 },
            { name: 'Good', value: 45 },
            { name: 'Needs Improvement', value: 20 }
          ]
        }
      case 'country':
        return {
          chartData: [
            { country: 'India', hosts: 89, avgPerformance: 85 },
            { country: 'Nepal', hosts: 42, avgPerformance: 82 },
            { country: 'Bangladesh', hosts: 15, avgPerformance: 78 },
            { country: 'Sri Lanka', hosts: 10, avgPerformance: 75 }
          ],
          pieData: [
            { name: 'India', value: 56 },
            { name: 'Nepal', value: 27 },
            { name: 'Bangladesh', value: 10 },
            { name: 'Sri Lanka', value: 7 }
          ]
        }
      default:
        return { chartData: [], pieData: [] }
    }
  }

  const analyticsData = getAnalyticsData()

  return (
    <div className="space-y-6">
      {/* Analytics Type Selection */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#E51E25]" /> Select Analytics Type
        </h3>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all"
          >
            <div className="flex items-center gap-2">
              {(() => {
                const Icon = analyticsTypes.find(a => a.key === activeAnalytics)?.icon || TrendingUp
                return <Icon className="w-4 h-4 text-[#E51E25]" />
              })()}
              {analyticsTypes.find(a => a.key === activeAnalytics)?.label}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
              {analyticsTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.key}
                    onClick={() => {
                      setActiveAnalytics(type.key)
                      setDropdownOpen(false)
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all ${
                      activeAnalytics === type.key
                        ? 'bg-[#E51E25] text-white'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {type.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-extrabold text-slate-800 text-sm mb-4">
            {analyticsTypes.find(a => a.key === activeAnalytics)?.label} - Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            {activeAnalytics === 'country' ? (
              <BarChart data={analyticsData.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="country" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="hosts" fill="#E51E25" name="Hosts" />
                <Bar dataKey="avgPerformance" fill="#3B82F6" name="Avg Performance" />
              </BarChart>
            ) : activeAnalytics === 'revenue' ? (
              <BarChart data={analyticsData.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="source" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#E51E25" name="Performance Score" />
              </BarChart>
            ) : (
              <LineChart data={analyticsData.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey={activeAnalytics === 'agency' ? 'month' : activeAnalytics === 'host' ? 'host' : activeAnalytics === 'charisma' || activeAnalytics === 'contribution' ? 'week' : activeAnalytics === 'live' ? 'time' : 'month'} tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                {activeAnalytics === 'agency' && (
                  <>
                    <Line type="monotone" dataKey="performance" stroke="#E51E25" strokeWidth={2} name="Performance" />
                    <Line type="monotone" dataKey="targetCompletion" stroke="#3B82F6" strokeWidth={2} name="Target Completion" />
                    <Line type="monotone" dataKey="activityScore" stroke="#10B981" strokeWidth={2} name="Activity Score" />
                  </>
                )}
                {activeAnalytics === 'host' && (
                  <>
                    <Line type="monotone" dataKey="performanceScore" stroke="#E51E25" strokeWidth={2} name="Performance Score" />
                    <Line type="monotone" dataKey="targetCompletion" stroke="#3B82F6" strokeWidth={2} name="Target Completion" />
                    <Line type="monotone" dataKey="activityLevel" stroke="#10B981" strokeWidth={2} name="Activity Level" />
                  </>
                )}
                {activeAnalytics === 'charisma' && (
                  <>
                    <Line type="monotone" dataKey="performanceScore" stroke="#E51E25" strokeWidth={2} name="Performance Score" />
                    <Line type="monotone" dataKey="engagementRate" stroke="#3B82F6" strokeWidth={2} name="Engagement Rate" />
                  </>
                )}
                {activeAnalytics === 'contribution' && (
                  <>
                    <Line type="monotone" dataKey="contributionScore" stroke="#E51E25" strokeWidth={2} name="Contribution Score" />
                    <Line type="monotone" dataKey="performanceRating" stroke="#3B82F6" strokeWidth={2} name="Performance Rating" />
                  </>
                )}
                {activeAnalytics === 'live' && (
                  <>
                    <Line type="monotone" dataKey="performanceScore" stroke="#E51E25" strokeWidth={2} name="Performance Score" />
                    <Line type="monotone" dataKey="activeHosts" stroke="#3B82F6" strokeWidth={2} name="Active Hosts" />
                  </>
                )}
                {activeAnalytics === 'performance' && (
                  <>
                    <Line type="monotone" dataKey="score" stroke="#E51E25" strokeWidth={2} name="Score" />
                    <Line type="monotone" dataKey="target" stroke="#3B82F6" strokeWidth={2} name="Target" />
                  </>
                )}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-extrabold text-slate-800 text-sm mb-4">
            {analyticsTypes.find(a => a.key === activeAnalytics)?.label} - Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={analyticsData.pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Records</span>
            <Activity className="w-5 h-5 text-[#E51E25]" />
          </div>
          <div className="text-3xl font-extrabold text-slate-800">{analyticsData.chartData.length}</div>
          <div className="text-xs text-slate-500 mt-1">data points</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Active Period</span>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-lg font-extrabold text-slate-800">Last 6 months</div>
          <div className="text-xs text-slate-500 mt-1">time range</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Categories</span>
            <Globe className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-800">{analyticsData.pieData.length}</div>
          <div className="text-xs text-slate-500 mt-1">categories</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Analytics Type</span>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-lg font-extrabold text-slate-800">
            {analyticsTypes.find(a => a.key === activeAnalytics)?.label}
          </div>
          <div className="text-xs text-slate-500 mt-1">selected</div>
        </div>
      </div>
    </div>
  )
}
