import React, { useState } from 'react'
import { FileText, Download, Calendar, Users, DollarSign, ArrowRightLeft, Clock, TrendingUp, Filter, Search, ChevronDown } from 'lucide-react'

export default function AgencyReports() {
  const [activeReport, setActiveReport] = useState('daily')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [searchQuery, setSearchQuery] = useState('')
  const [reportDropdownOpen, setReportDropdownOpen] = useState(false)
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false)

  const reportTypes = [
    { key: 'daily', label: 'Daily Report', icon: Calendar },
    { key: 'weekly', label: 'Weekly Report', icon: Calendar },
    { key: 'monthly', label: 'Monthly Report', icon: Calendar },
    { key: 'host', label: 'Host Report', icon: Users },
    { key: 'revenue', label: 'Revenue Report', icon: DollarSign },
    { key: 'withdraw', label: 'Withdraw Report', icon: ArrowRightLeft },
    { key: 'attendance', label: 'Attendance Report', icon: Clock },
    { key: 'commission', label: 'Commission Report', icon: TrendingUp }
  ]

  const exportFormats = [
    { key: 'pdf', label: 'PDF Export', icon: FileText },
    { key: 'excel', label: 'Excel Export', icon: FileText },
    { key: 'csv', label: 'CSV Export', icon: FileText }
  ]

  const handleExport = (format) => {
    const reportName = reportTypes.find(r => r.key === activeReport)?.label || 'Report'
    const timestamp = new Date().toISOString().slice(0, 10)
    const filename = `${reportName}_${timestamp}`

    if (format === 'csv') {
      // CSV Export
      const headers = columns.join(',')
      const rows = reportData.map(row => Object.values(row).join(','))
      const csvContent = [headers, ...rows].join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${filename}.csv`
      link.click()
      URL.revokeObjectURL(link.href)
    } else if (format === 'excel') {
      // Excel Export (simplified - creates CSV with .xls extension)
      const headers = columns.join('\t')
      const rows = reportData.map(row => Object.values(row).join('\t'))
      const excelContent = [headers, ...rows].join('\n')
      const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${filename}.xls`
      link.click()
      URL.revokeObjectURL(link.href)
    } else if (format === 'pdf') {
      // PDF Export (simplified - creates text file with .pdf extension)
      // For real PDF generation, you would need a library like jsPDF
      const headers = columns.join(' | ')
      const rows = reportData.map(row => Object.values(row).join(' | '))
      const pdfContent = [reportName, `Generated: ${timestamp}`, '', headers, ...rows].join('\n')
      const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${filename}.pdf`
      link.click()
      URL.revokeObjectURL(link.href)
    }

    setExportDropdownOpen(false)
  }

  const getReportData = () => {
    switch(activeReport) {
      case 'daily':
        return [
          { date: '2026-07-18', revenue: 125000, hosts: 28, agents: 45, commission: 12500 },
          { date: '2026-07-17', revenue: 118000, hosts: 32, agents: 43, commission: 11800 },
          { date: '2026-07-16', revenue: 132000, hosts: 35, agents: 47, commission: 13200 }
        ]
      case 'weekly':
        return [
          { week: 'Week 28', revenue: 875000, hosts: 196, agents: 315, commission: 87500 },
          { week: 'Week 27', revenue: 820000, hosts: 189, agents: 308, commission: 82000 },
          { week: 'Week 26', revenue: 790000, hosts: 182, agents: 295, commission: 79000 }
        ]
      case 'monthly':
        return [
          { month: 'July 2026', revenue: 3750000, hosts: 156, agents: 45, commission: 375000 },
          { month: 'June 2026', revenue: 3520000, hosts: 148, agents: 42, commission: 352000 },
          { month: 'May 2026', revenue: 3280000, hosts: 142, agents: 40, commission: 328000 }
        ]
      case 'host':
        return [
          { hostName: 'Aria Live', hostId: 'H-901', liveHours: 156, revenue: 45000, beans: 45200, status: 'Active' },
          { hostName: 'Gamer Pro', hostId: 'H-902', liveHours: 89, revenue: 12800, beans: 12800, status: 'Active' },
          { hostName: 'Nisha Sing', hostId: 'H-903', liveHours: 201, revenue: 78900, beans: 78900, status: 'Active' }
        ]
      case 'revenue':
        return [
          { source: 'Live Streaming', amount: 2500000, percentage: 66.7, transactions: 1250 },
          { source: 'Gifts', amount: 750000, percentage: 20.0, transactions: 3200 },
          { source: 'Commission', amount: 500000, percentage: 13.3, transactions: 890 }
        ]
      case 'withdraw':
        return [
          { agentName: 'Rahul Agent', amount: 50000, date: '2026-07-18', status: 'Pending', method: 'Bank Transfer' },
          { agentName: 'Karan Manager', amount: 75000, date: '2026-07-17', status: 'Approved', method: 'UPI' },
          { agentName: 'Sonia Live', amount: 25000, date: '2026-07-16', status: 'Completed', method: 'Wallet' }
        ]
      case 'attendance':
        return [
          { hostName: 'Aria Live', presentDays: 28, totalDays: 30, attendance: 93.3, status: 'Excellent' },
          { hostName: 'Gamer Pro', presentDays: 25, totalDays: 30, attendance: 83.3, status: 'Good' },
          { hostName: 'Nisha Sing', presentDays: 29, totalDays: 30, attendance: 96.7, status: 'Excellent' }
        ]
      case 'commission':
        return [
          { agentName: 'Rahul Agent', totalRevenue: 500000, commission: 50000, rate: 10, status: 'Paid' },
          { agentName: 'Karan Manager', totalRevenue: 750000, commission: 75000, rate: 10, status: 'Pending' },
          { agentName: 'Sonia Live', totalRevenue: 300000, commission: 30000, rate: 10, status: 'Paid' }
        ]
      default:
        return []
    }
  }

  const getReportColumns = () => {
    switch(activeReport) {
      case 'daily':
        return ['Date', 'Revenue', 'Hosts', 'Agents', 'Commission']
      case 'weekly':
        return ['Week', 'Revenue', 'Hosts', 'Agents', 'Commission']
      case 'monthly':
        return ['Month', 'Revenue', 'Hosts', 'Agents', 'Commission']
      case 'host':
        return ['Host Name', 'Host ID', 'Live Hours', 'Revenue', 'Beans', 'Status']
      case 'revenue':
        return ['Source', 'Amount', 'Percentage', 'Transactions']
      case 'withdraw':
        return ['Agent Name', 'Amount', 'Date', 'Status', 'Method']
      case 'attendance':
        return ['Host Name', 'Present Days', 'Total Days', 'Attendance %', 'Status']
      case 'commission':
        return ['Agent Name', 'Total Revenue', 'Commission', 'Rate %', 'Status']
      default:
        return []
    }
  }

  const reportData = getReportData()
  const columns = getReportColumns()

  return (
    <div className="space-y-6">
      {/* Report Type Selection */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#E51E25]" /> Select Report Type
        </h3>
        <div className="relative">
          <button
            onClick={() => setReportDropdownOpen(!reportDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all"
          >
            <div className="flex items-center gap-2">
              {(() => {
                const Icon = reportTypes.find(r => r.key === activeReport)?.icon || Calendar
                return <Icon className="w-4 h-4 text-[#E51E25]" />
              })()}
              {reportTypes.find(r => r.key === activeReport)?.label}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${reportDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {reportDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
              {reportTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.key}
                    onClick={() => {
                      setActiveReport(type.key)
                      setReportDropdownOpen(false)
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all ${
                      activeReport === type.key
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

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Date Range</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
              />
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Report Data Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4 flex items-center justify-between">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
            <FileText className="w-4 h-4" /> {reportTypes.find(r => r.key === activeReport)?.label}
          </h3>
          <div className="relative">
            <button
              onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-lg text-xs font-bold hover:bg-white/30 transition-all"
            >
              <Download className="w-3 h-3" />
              Export
              <ChevronDown className={`w-3 h-3 transition-transform ${exportDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {exportDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-[140px]">
                {exportFormats.map((format) => {
                  const Icon = format.icon
                  return (
                    <button
                      key={format.key}
                      onClick={() => handleExport(format.key)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
                    >
                      <Icon className="w-4 h-4" />
                      {format.label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
              <tr>
                {columns.map((col, index) => (
                  <th key={index} className="px-6 py-3">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50 transition-colors">
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      {typeof value === 'number' && colIndex > 0 && colIndex < columns.length - 1 ? (
                        <span className="font-bold text-slate-800">
                          {value.toLocaleString()}
                        </span>
                      ) : typeof value === 'number' && value.toString().includes('.') ? (
                        <span className="font-bold text-slate-800">{value.toFixed(1)}%</span>
                      ) : (
                        <span className={`${
                          value === 'Active' || value === 'Excellent' || value === 'Paid' || value === 'Completed' ? 'text-green-600 font-bold' :
                          value === 'Pending' ? 'text-amber-600 font-bold' :
                          value === 'Good' ? 'text-blue-600 font-bold' :
                          'text-slate-700'
                        }`}>
                          {value}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Records</span>
            <FileText className="w-5 h-5 text-[#E51E25]" />
          </div>
          <div className="text-3xl font-extrabold text-slate-800">{reportData.length}</div>
          <div className="text-xs text-slate-500 mt-1">records found</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Date Range</span>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-lg font-extrabold text-slate-800">
            {dateRange.start || 'Not set'} - {dateRange.end || 'Not set'}
          </div>
          <div className="text-xs text-slate-500 mt-1">selected range</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Export Options</span>
            <Download className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-sm font-bold text-slate-800">
            PDF, Excel, CSV
          </div>
          <div className="text-xs text-slate-500 mt-1">formats available</div>
        </div>
      </div>
    </div>
  )
}
