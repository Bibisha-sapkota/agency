import React, { useState } from 'react'
import { Wallet, Coins, Clock, Lock, ArrowUpRight, TrendingUp, Search, Filter } from 'lucide-react'

export default function AgencyHostWallet() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    minCoins: '',
    maxCoins: '',
    status: 'all'
  })

  const hostWallets = [
    { walletId: 'W-001', hostName: 'Aria Live', hostId: 'H-901', currentCoin: 125000, pendingCoin: 15000, frozenCoin: 5000, withdrawableCoin: 105000, totalEarnedCoin: 450000, totalWithdrawnCoin: 325000, status: 'active' },
    { walletId: 'W-002', hostName: 'Gamer Pro', hostId: 'H-902', currentCoin: 89000, pendingCoin: 8000, frozenCoin: 2000, withdrawableCoin: 79000, totalEarnedCoin: 280000, totalWithdrawnCoin: 191000, status: 'active' },
    { walletId: 'W-003', hostName: 'Nisha Sing', hostId: 'H-903', currentCoin: 156000, pendingCoin: 12000, frozenCoin: 8000, withdrawableCoin: 136000, totalEarnedCoin: 520000, totalWithdrawnCoin: 364000, status: 'active' },
    { walletId: 'W-004', hostName: 'Kathmandu Vibe', hostId: 'H-904', currentCoin: 45000, pendingCoin: 5000, frozenCoin: 1000, withdrawableCoin: 39000, totalEarnedCoin: 150000, totalWithdrawnCoin: 105000, status: 'active' },
    { walletId: 'W-005', hostName: 'Live King', hostId: 'H-905', currentCoin: 78000, pendingCoin: 10000, frozenCoin: 3000, withdrawableCoin: 65000, totalEarnedCoin: 320000, totalWithdrawnCoin: 242000, status: 'active' },
    { walletId: 'W-006', hostName: 'Stream Queen', hostId: 'H-906', currentCoin: 95000, pendingCoin: 7000, frozenCoin: 4000, withdrawableCoin: 84000, totalEarnedCoin: 380000, totalWithdrawnCoin: 285000, status: 'active' },
    { walletId: 'W-007', hostName: 'Diamond Star', hostId: 'H-907', currentCoin: 210000, pendingCoin: 18000, frozenCoin: 10000, withdrawableCoin: 182000, totalEarnedCoin: 750000, totalWithdrawnCoin: 540000, status: 'active' },
    { walletId: 'W-008', hostName: 'Golden Voice', hostId: 'H-908', currentCoin: 67000, pendingCoin: 6000, frozenCoin: 2000, withdrawableCoin: 59000, totalEarnedCoin: 240000, totalWithdrawnCoin: 173000, status: 'active' },
    { walletId: 'W-009', hostName: 'Silver Moon', hostId: 'H-909', currentCoin: 89000, pendingCoin: 9000, frozenCoin: 3500, withdrawableCoin: 76500, totalEarnedCoin: 310000, totalWithdrawnCoin: 221000, status: 'active' },
    { walletId: 'W-010', hostName: 'Bronze Beat', hostId: 'H-910', currentCoin: 54000, pendingCoin: 4000, frozenCoin: 1500, withdrawableCoin: 48500, totalEarnedCoin: 190000, totalWithdrawnCoin: 136000, status: 'active' }
  ]

  const filteredWallets = hostWallets.filter(wallet => {
    const matchesSearch = searchQuery === '' || 
      wallet.hostName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wallet.walletId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wallet.hostId.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesMinCoins = filters.minCoins === '' || wallet.currentCoin >= parseInt(filters.minCoins)
    const matchesMaxCoins = filters.maxCoins === '' || wallet.currentCoin <= parseInt(filters.maxCoins)
    const matchesStatus = filters.status === 'all' || wallet.status === filters.status
    
    return matchesSearch && matchesMinCoins && matchesMaxCoins && matchesStatus
  })

  const totalStats = {
    totalCurrentCoin: hostWallets.reduce((sum, w) => sum + w.currentCoin, 0),
    totalPendingCoin: hostWallets.reduce((sum, w) => sum + w.pendingCoin, 0),
    totalFrozenCoin: hostWallets.reduce((sum, w) => sum + w.frozenCoin, 0),
    totalWithdrawableCoin: hostWallets.reduce((sum, w) => sum + w.withdrawableCoin, 0),
    totalEarnedCoin: hostWallets.reduce((sum, w) => sum + w.totalEarnedCoin, 0),
    totalWithdrawnCoin: hostWallets.reduce((sum, w) => sum + w.totalWithdrawnCoin, 0)
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase">Total Current</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-800">{totalStats.totalCurrentCoin.toLocaleString()}</div>
          <div className="text-xs text-slate-600 mt-1">coins</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase">Total Pending</span>
          </div>
          <div className="text-2xl font-extrabold text-amber-600">{totalStats.totalPendingCoin.toLocaleString()}</div>
          <div className="text-xs text-slate-600 mt-1">coins</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase">Total Frozen</span>
          </div>
          <div className="text-2xl font-extrabold text-red-600">{totalStats.totalFrozenCoin.toLocaleString()}</div>
          <div className="text-xs text-slate-600 mt-1">coins</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase">Total Withdrawable</span>
          </div>
          <div className="text-2xl font-extrabold text-green-600">{totalStats.totalWithdrawableCoin.toLocaleString()}</div>
          <div className="text-xs text-slate-600 mt-1">coins</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase">Total Earned</span>
          </div>
          <div className="text-2xl font-extrabold text-blue-600">{totalStats.totalEarnedCoin.toLocaleString()}</div>
          <div className="text-xs text-slate-600 mt-1">coins</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase">Total Withdrawn</span>
          </div>
          <div className="text-2xl font-extrabold text-purple-600">{totalStats.totalWithdrawnCoin.toLocaleString()}</div>
          <div className="text-xs text-slate-600 mt-1">coins</div>
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
                placeholder="Search by host name, wallet ID, or host ID..."
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
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Min Coins</label>
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minCoins}
                        onChange={(e) => setFilters({ ...filters, minCoins: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Max Coins</label>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxCoins}
                        onChange={(e) => setFilters({ ...filters, maxCoins: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setFilters({ minCoins: '', maxCoins: '', status: 'all' })}
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

      {/* Wallet Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#E51E25] to-[#c4161c] px-6 py-4">
          <h3 className="font-extrabold text-white text-sm">
            Host Wallets
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
              <tr>
                <th className="px-6 py-3">Wallet ID</th>
                <th className="px-6 py-3">Host Name</th>
                <th className="px-6 py-3">Host ID</th>
                <th className="px-6 py-3">Current Coin</th>
                <th className="px-6 py-3">Pending Coin</th>
                <th className="px-6 py-3">Frozen Coin</th>
                <th className="px-6 py-3">Withdrawable Coin</th>
                <th className="px-6 py-3">Total Earned</th>
                <th className="px-6 py-3">Total Withdrawn</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWallets.map((wallet) => (
                <tr key={wallet.walletId} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-700">{wallet.walletId}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{wallet.hostName}</td>
                  <td className="px-6 py-4 text-slate-600">{wallet.hostId}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{wallet.currentCoin.toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-amber-600">{wallet.pendingCoin.toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-red-600">{wallet.frozenCoin.toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-green-600">{wallet.withdrawableCoin.toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-blue-600">{wallet.totalEarnedCoin.toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-purple-600">{wallet.totalWithdrawnCoin.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredWallets.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Wallet className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="font-bold">No host wallets found</p>
          </div>
        )}
      </div>
    </div>
  )
}
