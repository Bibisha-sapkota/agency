import React, { useState } from 'react'
import { ArrowRightLeft, Wallet, Check, X, Ban, Clock, Search, Filter, AlertCircle } from 'lucide-react'

export default function AgencyWithdrawManagement() {
  const [activeTab, setActiveTab] = useState('pending')
  const [searchQuery, setSearchQuery] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [actionType, setActionType] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    status: 'all',
    wallet: 'all',
    minAmount: '',
    maxAmount: '',
    dateFrom: '',
    dateTo: ''
  })
  const [withdrawRequests, setWithdrawRequests] = useState([
    { id: 'WR-001', host: 'Aria Live', hostId: 'H-901', coins: 45000, amount: 4500, wallet: 'Bank Transfer', status: 'pending', date: '2026-07-18' },
    { id: 'WR-002', host: 'Gamer Pro', hostId: 'H-902', coins: 12800, amount: 1280, wallet: 'UPI', status: 'pending', date: '2026-07-18' },
    { id: 'WR-003', host: 'Nisha Sing', hostId: 'H-903', coins: 78900, amount: 7890, wallet: 'PayPal', status: 'approved', date: '2026-07-17' },
    { id: 'WR-004', host: 'Kathmandu Vibe', hostId: 'H-904', coins: 5200, amount: 520, wallet: 'Bank Transfer', status: 'rejected', date: '2026-07-17' },
    { id: 'WR-005', host: 'Live King', hostId: 'H-905', coins: 35000, amount: 3500, wallet: 'UPI', status: 'paid', date: '2026-07-16' },
    { id: 'WR-006', host: 'Stream Queen', hostId: 'H-906', coins: 62000, amount: 6200, wallet: 'Bank Transfer', status: 'pending', date: '2026-07-16' },
    { id: 'WR-007', host: 'Banned User', hostId: 'H-999', coins: 0, amount: 0, wallet: 'N/A', status: 'banned', date: '2026-07-15' },
    { id: 'WR-008', host: 'Diamond Star', hostId: 'H-907', coins: 91000, amount: 9100, wallet: 'PayPal', status: 'approved', date: '2026-07-15' },
    { id: 'WR-009', host: 'Golden Voice', hostId: 'H-908', coins: 28000, amount: 2800, wallet: 'UPI', status: 'paid', date: '2026-07-14' },
    { id: 'WR-010', host: 'Silver Moon', hostId: 'H-909', coins: 41000, amount: 4100, wallet: 'Bank Transfer', status: 'rejected', date: '2026-07-14' }
  ])

  const tabs = [
    { key: 'all', label: 'All', color: 'slate' },
    { key: 'pending', label: 'Pending', color: 'amber' },
    { key: 'approved', label: 'Approved', color: 'green' },
    { key: 'rejected', label: 'Rejected', color: 'red' },
    { key: 'paid', label: 'Paid', color: 'blue' },
    { key: 'banned', label: 'Withdraw Ban', color: 'purple' },
    { key: 'history', label: 'Withdraw History', color: 'slate' }
  ]

  const filteredRequests = withdrawRequests.filter(request => {
    const matchesTab = activeTab === 'all' || activeTab === 'history' ? true : 
                        activeTab === 'banned' ? request.status === 'banned' :
                        request.status === activeTab
    const matchesSearch = searchQuery === '' || 
      request.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filters.status === 'all' || request.status === filters.status
    const matchesWallet = filters.wallet === 'all' || request.wallet === filters.wallet
    const matchesMinAmount = filters.minAmount === '' || request.amount >= parseInt(filters.minAmount)
    const matchesMaxAmount = filters.maxAmount === '' || request.amount <= parseInt(filters.maxAmount)
    const matchesDateFrom = filters.dateFrom === '' || request.date >= filters.dateFrom
    const matchesDateTo = filters.dateTo === '' || request.date <= filters.dateTo
    
    return matchesTab && matchesSearch && matchesStatus && matchesWallet && matchesMinAmount && matchesMaxAmount && matchesDateFrom && matchesDateTo
  })

  const handleApprove = (request) => {
    setSelectedRequest(request)
    setActionType('approve')
    setPopupOpen(true)
  }

  const handleReject = (request) => {
    setSelectedRequest(request)
    setActionType('reject')
    setPopupOpen(true)
  }

  const handleProcessPayment = (request) => {
    setSelectedRequest(request)
    setActionType('process')
    setPopupOpen(true)
  }

  const handleBan = (request) => {
    setSelectedRequest(request)
    setActionType('ban')
    setPopupOpen(true)
  }

  const confirmAction = () => {
    setPopupOpen(false)
    setSelectedRequest(null)
    setActionType('')
    
    if (actionType === 'approve') {
      setWithdrawRequests(withdrawRequests.map(req => 
        req.id === selectedRequest.id ? { ...req, status: 'approved' } : req
      ))
      setTimeout(() => {
        window.location.href = 'http://localhost:5173/agency?tab=withdraw-management'
      }, 100)
    } else if (actionType === 'reject') {
      setWithdrawRequests(withdrawRequests.map(req => 
        req.id === selectedRequest.id ? { ...req, status: 'rejected' } : req
      ))
      setTimeout(() => {
        window.location.href = 'http://localhost:5173/agency?tab=withdraw-management'
      }, 100)
    } else if (actionType === 'process') {
      setWithdrawRequests(withdrawRequests.map(req => 
        req.id === selectedRequest.id ? { ...req, status: 'paid' } : req
      ))
      setTimeout(() => {
        window.location.href = 'http://localhost:5173/agency?tab=withdraw-management'
      }, 100)
    } else if (actionType === 'ban') {
      setWithdrawRequests(withdrawRequests.map(req => 
        req.hostId === selectedRequest.hostId ? { ...req, status: 'banned' } : req
      ))
      setTimeout(() => {
        window.location.href = 'http://localhost:5173/agency?tab=withdraw-management'
      }, 100)
    }
  }

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Pending</span>
      case 'approved':
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Approved</span>
      case 'rejected':
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">Rejected</span>
      case 'paid':
        return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">Paid</span>
      case 'banned':
        return <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">Banned</span>
      default:
        return <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">{status}</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-extrabold text-slate-800 text-sm mb-4">
          Withdraw Management
        </h3>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.key
                  ? `bg-${tab.color}-500 text-white`
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by host name or request ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
              />
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
            >
              <Filter className="w-4 h-4" />
              Advanced Filters
            </button>
            {filterOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-10 p-4 min-w-[300px]">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="paid">Paid</option>
                      <option value="banned">Banned</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Wallet</label>
                    <select
                      value={filters.wallet}
                      onChange={(e) => setFilters({ ...filters, wallet: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                    >
                      <option value="all">All Wallets</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="UPI">UPI</option>
                      <option value="PayPal">PayPal</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Min Amount</label>
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minAmount}
                        onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Max Amount</label>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxAmount}
                        onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">From Date</label>
                      <input
                        type="date"
                        value={filters.dateFrom}
                        onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">To Date</label>
                      <input
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setFilters({ status: 'all', wallet: 'all', minAmount: '', maxAmount: '', dateFrom: '', dateTo: '' })}
                    className="w-full px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Withdraw Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
          <h3 className="font-extrabold text-white text-sm">
            {tabs.find(t => t.key === activeTab)?.label} - {filteredRequests.length} requests
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
              <tr>
                <th className="px-6 py-3">Request ID</th>
                <th className="px-6 py-3">Host</th>
                <th className="px-6 py-3">Coins</th>
                <th className="px-6 py-3">Amount (₹)</th>
                <th className="px-6 py-3">Wallet</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-700">{request.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-bold text-slate-800">{request.host}</div>
                      <div className="text-xs text-slate-500">{request.hostId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800">{request.coins.toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-green-600">₹{request.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-600">{request.wallet}</td>
                  <td className="px-6 py-4">{getStatusBadge(request.status)}</td>
                  <td className="px-6 py-4 text-slate-600">{request.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(request)}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(request)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {request.status === 'approved' && (
                        <button
                          onClick={() => handleProcessPayment(request)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                          title="Process Payment"
                        >
                          <Wallet className="w-4 h-4" />
                        </button>
                      )}
                      {request.status !== 'banned' && (
                        <button
                          onClick={() => handleBan(request)}
                          className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-all"
                          title="Ban Withdrawals"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredRequests.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <ArrowRightLeft className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="font-bold">No withdraw requests found</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase">Pending</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-800">
            {withdrawRequests.filter(r => r.status === 'pending').length}
          </div>
          <div className="text-xs text-slate-600 mt-1">requests</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase">Approved</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-800">
            {withdrawRequests.filter(r => r.status === 'approved').length}
          </div>
          <div className="text-xs text-slate-600 mt-1">requests</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase">Rejected</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-800">
            {withdrawRequests.filter(r => r.status === 'rejected').length}
          </div>
          <div className="text-xs text-slate-600 mt-1">requests</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase">Paid</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-800">
            {withdrawRequests.filter(r => r.status === 'paid').length}
          </div>
          <div className="text-xs text-slate-600 mt-1">completed</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase">Banned</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-800">
            {withdrawRequests.filter(r => r.status === 'banned').length}
          </div>
          <div className="text-xs text-slate-600 mt-1">hosts</div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {popupOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-full ${
                actionType === 'approve' ? 'bg-green-100' :
                actionType === 'reject' ? 'bg-red-100' :
                actionType === 'process' ? 'bg-blue-100' :
                'bg-purple-100'
              }`}>
                {actionType === 'approve' && <Check className="w-6 h-6 text-green-600" />}
                {actionType === 'reject' && <X className="w-6 h-6 text-red-600" />}
                {actionType === 'process' && <Wallet className="w-6 h-6 text-blue-600" />}
                {actionType === 'ban' && <Ban className="w-6 h-6 text-purple-600" />}
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-slate-800 text-lg mb-1">
                  {actionType === 'approve' ? 'Approve Withdraw Request' :
                   actionType === 'reject' ? 'Reject Withdraw Request' :
                   actionType === 'process' ? 'Process Payment' :
                   'Ban Host from Withdrawals'}
                </h3>
                <p className="text-sm text-slate-600">
                  {actionType === 'approve' ? `Are you sure you want to approve withdraw request ${selectedRequest.id}?` :
                   actionType === 'reject' ? `Are you sure you want to reject withdraw request ${selectedRequest.id}?` :
                   actionType === 'process' ? `Are you sure you want to process payment for request ${selectedRequest.id}?` :
                   `Are you sure you want to ban ${selectedRequest.host} from withdrawals?`}
                </p>
              </div>
            </div>

            {selectedRequest && (
              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Request ID</span>
                    <div className="font-mono text-slate-800">{selectedRequest.id}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Host</span>
                    <div className="font-bold text-slate-800">{selectedRequest.host}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Coins</span>
                    <div className="font-bold text-slate-800">{selectedRequest.coins.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Amount</span>
                    <div className="font-bold text-green-600">₹{selectedRequest.amount.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setPopupOpen(false)
                  setSelectedRequest(null)
                  setActionType('')
                }}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-4 py-3 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all ${
                  actionType === 'approve' ? 'bg-green-600' :
                  actionType === 'reject' ? 'bg-red-600' :
                  actionType === 'process' ? 'bg-blue-600' :
                  'bg-purple-600'
                }`}
              >
                {actionType === 'approve' ? 'Approve' :
                 actionType === 'reject' ? 'Reject' :
                 actionType === 'process' ? 'Process' :
                 'Ban'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
