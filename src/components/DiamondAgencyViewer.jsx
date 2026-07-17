import React, { useState, useCallback, useMemo, useEffect } from 'react'

/* ---------------------------------------------------------
   Small reusable pieces
--------------------------------------------------------- */
function useToasts() {
  const [toasts, setToasts] = useState([])
  const pushToast = useCallback((message, tone = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { id, message, tone }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])
  return { toasts, pushToast }
}

function ToastStack({ toasts }) {
  return (
    <div className="fixed bottom-4 right-4 z-[120] flex flex-col gap-2 items-end pointer-events-none max-w-[90vw]">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto max-w-xs px-4 py-3 rounded-xl shadow-lg text-sm font-bold text-white animate-slideIn ${
            t.tone === 'error' ? 'bg-slate-800' : t.tone === 'warn' ? 'bg-amber-600' : 'bg-violet-600'
          }`}
        >
          {t.message}
        </div>
      ))}
      <style>{`@keyframes slideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.animate-slideIn{animation:slideIn .2s ease-out}`}</style>
    </div>
  )
}

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${
        disabled ? 'opacity-40 cursor-not-allowed' : ''
      } ${checked ? 'bg-violet-600' : 'bg-slate-200'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
          checked ? 'translate-x-5' : ''
        }`}
      />
    </button>
  )
}

function Badge({ children, tone = 'slate' }) {
  const tones = {
    green: 'bg-green-50 text-green-700',
    red: 'bg-red-50 text-red-600',
    amber: 'bg-amber-50 text-amber-700',
    violet: 'bg-violet-50 text-violet-700',
    slate: 'bg-slate-100 text-slate-600'
  }
  return <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${tones[tone]}`}>{children}</span>
}

function StatCard({ label, value, hint, hintTone = 'slate' }) {
  const hintColor = hintTone === 'green' ? 'text-green-600' : hintTone === 'red' ? 'text-red-500' : 'text-slate-450'
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm min-w-0">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wide truncate">{label}</div>
      <div className="text-2xl sm:text-3xl font-black text-slate-800 mt-1 truncate">{value}</div>
      {hint && <div className={`text-xs font-semibold mt-1 ${hintColor}`}>{hint}</div>}
    </div>
  )
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-[100] p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-md p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-black text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm leading-none px-2">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase">{label}</label>
      {children}
    </div>
  )
}

const inputCls =
  'w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500'
const inputClsRed =
  'w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500'

/* ---------------------------------------------------------
   Main component — Diamond Admin Suite
   (Diamond Admin control center + eRupai Diamond Agency portal, combined)
--------------------------------------------------------- */
export default function DiamondAdminSuite() {
  const { toasts, pushToast } = useToasts()

  // ---- Navigation state ----
  const [section, setSection] = useState('Dashboard')
  const [subtabs, setSubtabs] = useState({
    'Diamond Packages': 'All Packages',
    'Diamond Agency': 'Agencies',
    'Agent Wallet': 'Bean Wallet',
    'eRupai Diamond Agency': 'Overview'
  })
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [expanded, setExpanded] = useState({ 'Diamond Packages': true, 'Diamond Agency': true, 'Agent Wallet': true, 'eRupai Diamond Agency': true })
  const [search, setSearch] = useState('')

  // ---- Activity history (shared across every action, both portals) ----
  const [history, setHistory] = useState([
    { id: 'h1', category: 'Settings', message: 'Panel initialized', who: 'System', time: 'earlier' }
  ])
  const addActivity = useCallback((category, message) => {
    setHistory((h) => [{ id: Math.random().toString(36).slice(2), category, message, who: 'Admin (You)', time: 'just now' }, ...h])
  }, [])

  // ---- Diamond Packages ----
  const [packages, setPackages] = useState([
    { id: 'PK-1', name: 'Small Diamond Pack', diamonds: 100, price: 0.99, bonusPct: 10, sold: 110, status: 'active' },
    { id: 'PK-2', name: 'Medium Diamond Pack', diamonds: 310, price: 2.99, bonusPct: 12, sold: 347, status: 'active' },
    { id: 'PK-3', name: 'Large Diamond Pack', diamonds: 1060, price: 9.99, bonusPct: 14, sold: 1208, status: 'active' },
    { id: 'PK-4', name: 'Mega Diamond Pack', diamonds: 2200, price: 19.99, bonusPct: 18, sold: 2596, status: 'active' }
  ])
  const [pkgSearch, setPkgSearch] = useState('')
  const [pkgStatusFilter, setPkgStatusFilter] = useState('All Status')
  const [pkgModal, setPkgModal] = useState(null)
  const [pkgSettings, setPkgSettings] = useState({
    autoPublish: true,
    displayInStore: true,
    allowGift: true,
    maxPerTransaction: 50000
  })

  const totalRevenue = useMemo(() => packages.reduce((s, p) => s + p.price * p.sold, 0), [packages])
  const activePackages = packages.filter((p) => p.status === 'active').length

  const togglePackageStatus = (id) => {
    const pkg = packages.find((p) => p.id === id)
    setPackages((ps) => ps.map((p) => (p.id === id ? { ...p, status: p.status === 'active' ? 'disabled' : 'active' } : p)))
    if (pkg) {
      addActivity('Package', `${pkg.name} ${pkg.status === 'active' ? 'disabled' : 'enabled'}`)
      pushToast(`${pkg.name} ${pkg.status === 'active' ? 'disabled' : 'enabled'}`)
    }
  }
  const deletePackage = (id) => {
    const pkg = packages.find((p) => p.id === id)
    setPackages((ps) => ps.filter((p) => p.id !== id))
    if (pkg) {
      addActivity('Package', `${pkg.name} deleted`)
      pushToast(`${pkg.name} removed`, 'error')
    }
  }
  const savePackage = (form) => {
    if (!form.name.trim() || !form.diamonds || !form.price) {
      pushToast('Fill in name, diamonds and price.', 'error')
      return
    }
    if (pkgModal.mode === 'add') {
      const id = `PK-${Math.floor(Math.random() * 9000 + 1000)}`
      setPackages((ps) => [{ id, sold: 0, status: 'active', ...form }, ...ps])
      addActivity('Package', `${form.name} created`)
      pushToast(`${form.name} added`)
    } else {
      setPackages((ps) => ps.map((p) => (p.id === form.id ? { ...p, ...form } : p)))
      addActivity('Package', `${form.name} updated`)
      pushToast(`${form.name} updated`)
    }
    setPkgModal(null)
  }
  const filteredPackages = packages.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(pkgSearch.toLowerCase())
    const matchesStatus = pkgStatusFilter === 'All Status' || p.status === pkgStatusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  // ---- Diamond Agency ----
  const [agencies, setAgencies] = useState([
    { id: 'DA-001', name: 'Royal Diamond Agency', manager: 'Ramesh Kumar', commission: 12.5, agents: 12, status: 'active' },
    { id: 'DA-002', name: 'Crown Diamonds Pvt Ltd', manager: 'Priya Sharma', commission: 15, agents: 18, status: 'active' }
  ])
  const [agencyModal, setAgencyModal] = useState(null)
  const [agencySearch, setAgencySearch] = useState('')

  const saveAgency = (form) => {
    if (!form.name.trim() || !form.manager.trim()) {
      pushToast('Agency name and manager are required.', 'error')
      return
    }
    if (agencyModal.mode === 'add') {
      const id = `DA-${String(agencies.length + 1).padStart(3, '0')}`
      setAgencies((a) => [{ id, agents: 0, status: 'active', ...form, commission: Number(form.commission) || 0 }, ...a])
      addActivity('Agency', `${form.name} onboarded`)
      pushToast(`${form.name} added`)
    } else {
      setAgencies((a) => a.map((x) => (x.id === form.id ? { ...x, ...form, commission: Number(form.commission) || 0 } : x)))
      addActivity('Agency', `${form.name} updated`)
      pushToast(`${form.name} updated`)
    }
    setAgencyModal(null)
  }
  const toggleAgencyStatus = (id) => {
    const agency = agencies.find((a) => a.id === id)
    setAgencies((a) => a.map((x) => (x.id === id ? { ...x, status: x.status === 'active' ? 'suspended' : 'active' } : x)))
    if (agency) {
      addActivity('Agency', `${agency.name} ${agency.status === 'active' ? 'suspended' : 'reactivated'}`)
      pushToast(`${agency.name} ${agency.status === 'active' ? 'suspended' : 'reactivated'}`, agency.status === 'active' ? 'error' : 'success')
    }
  }
  const deleteAgency = (id) => {
    const agency = agencies.find((a) => a.id === id)
    setAgencies((a) => a.filter((x) => x.id !== id))
    if (agency) {
      addActivity('Agency', `${agency.name} removed`)
      pushToast(`${agency.name} removed`, 'error')
    }
  }
  const filteredAgencies = agencies.filter((a) => a.name.toLowerCase().includes(agencySearch.toLowerCase()))

  // ---- Withdrawal approvals ----
  const [withdrawals, setWithdrawals] = useState([
    { id: 'WD-5001', requester: 'Ramesh Kumar', agency: 'Royal Diamond Agency', amount: 123.5, fraudScore: 8, kyc: 'Verified', status: 'pending' },
    { id: 'WD-5002', requester: 'Priya Sharma', agency: 'Crown Diamonds Pvt Ltd', amount: 427.5, fraudScore: 62, kyc: 'Mismatch', status: 'pending' },
    { id: 'WD-5003', requester: 'Aarav Shrestha', agency: 'Royal Diamond Agency', amount: 31.82, fraudScore: 4, kyc: 'Verified', status: 'pending' },
    { id: 'WD-5004', requester: 'David Osei', agency: 'Crown Diamonds Pvt Ltd', amount: 989.9, fraudScore: 88, kyc: 'Mismatch', status: 'pending' }
  ])
  const [autoRules, setAutoRules] = useState({ enabled: true, maxNet: 50, maxFraud: 20, requireKyc: true })
  const [selectedSafe, setSelectedSafe] = useState([])

  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'pending')
  const safeWithdrawals = pendingWithdrawals.filter(
    (w) => w.amount <= autoRules.maxNet && w.fraudScore <= autoRules.maxFraud && (!autoRules.requireKyc || w.kyc === 'Verified')
  )

  const reviewWithdrawal = (id, decision) => {
    if (maintenanceMode) {
      pushToast('Maintenance mode is on — withdrawals are disabled.', 'warn')
      return
    }
    const w = withdrawals.find((x) => x.id === id)
    setWithdrawals((ws) => ws.map((x) => (x.id === id ? { ...x, status: decision } : x)))
    if (w) {
      addActivity('Withdrawal', `${w.id} ${decision} for ${w.requester}`)
      pushToast(`${w.id} ${decision}`, decision === 'approved' ? 'success' : 'error')
    }
  }
  const bulkApproveSafe = () => {
    if (maintenanceMode) {
      pushToast('Maintenance mode is on — withdrawals are disabled.', 'warn')
      return
    }
    if (selectedSafe.length === 0) return
    setWithdrawals((ws) => ws.map((w) => (selectedSafe.includes(w.id) ? { ...w, status: 'approved' } : w)))
    addActivity('Withdrawal', `Bulk approved ${selectedSafe.length} safe withdrawal(s)`)
    pushToast(`${selectedSafe.length} withdrawal(s) approved`)
    setSelectedSafe([])
  }

  // ---- Agent Wallet ----
  const [agents, setAgents] = useState([
    { id: 'AG-1', name: 'Aarav Shrestha', agency: 'Royal Streamers', region: 'Nepal', beans: 420, giftBeans: 250, bonus: 170, loanStatus: 'Active' },
    { id: 'AG-2', name: 'Sima Koirala', agency: 'Asia Live Group', region: 'India', beans: 310, giftBeans: 210, bonus: 100, loanStatus: 'Approved' },
    { id: 'AG-3', name: 'Jay Patel', agency: 'Coin Agency', region: 'Singapore', beans: 280, giftBeans: 140, bonus: 90, loanStatus: 'None' },
    { id: 'AG-4', name: 'Nina Tamang', agency: 'Global Talents', region: 'USA', beans: 400, giftBeans: 250, bonus: 200, loanStatus: 'Pending' }
  ])
  const totalBeans = agents.reduce((s, a) => s + a.beans, 0)
  const totalGiftBeans = agents.reduce((s, a) => s + a.giftBeans, 0)
  const totalBonus = agents.reduce((s, a) => s + a.bonus, 0)
  const avgBeansPerAgent = agents.length ? Math.round(totalBeans / agents.length) : 0

  const [sendCoinForm, setSendCoinForm] = useState({ agentId: agents[0]?.id || '', amount: '', note: '' })
  const [recentlySent, setRecentlySent] = useState([])
  const handleSendCoin = (e) => {
    e.preventDefault()
    if (maintenanceMode) {
      pushToast('Maintenance mode is on — sending coin is disabled.', 'warn')
      return
    }
    const amount = Number(sendCoinForm.amount)
    const recipient = agents.find((a) => a.id === sendCoinForm.agentId)
    if (!recipient) {
      pushToast('Select a recipient agent.', 'error')
      return
    }
    if (!amount || amount <= 0) {
      pushToast('Enter an amount greater than zero.', 'error')
      return
    }
    if (amount > pkgSettings.maxPerTransaction) {
      pushToast(`Amount exceeds max per transaction (${pkgSettings.maxPerTransaction.toLocaleString()}).`, 'error')
      return
    }
    setAgents((as) => as.map((a) => (a.id === recipient.id ? { ...a, beans: a.beans + amount } : a)))
    setRecentlySent((r) => [{ id: Math.random().toString(36).slice(2), name: recipient.name, amount, note: sendCoinForm.note, time: 'just now' }, ...r])
    addActivity('Wallet', `${amount.toLocaleString()} beans sent to ${recipient.name}`)
    pushToast(`Sent ${amount.toLocaleString()} beans to ${recipient.name}`)
    setSendCoinForm({ agentId: recipient.id, amount: '', note: '' })
  }

  const [loans, setLoans] = useState([
    { id: 'LOAN-101', agent: 'Aarav Shrestha', amount: 1200, tenor: 30, status: 'active', disbursed: '05 Jul 2026' },
    { id: 'LOAN-102', agent: 'Sima Koirala', amount: 800, tenor: 21, status: 'approved', disbursed: '06 Jul 2026' },
    { id: 'LOAN-103', agent: 'Nina Tamang', amount: 1500, tenor: 45, status: 'pending', disbursed: '07 Jul 2026' }
  ])
  const outstanding = loans.filter((l) => l.status === 'active' || l.status === 'approved').reduce((s, l) => s + l.amount, 0)
  const reviewLoan = (id, decision) => {
    const loan = loans.find((l) => l.id === id)
    setLoans((ls) => ls.map((l) => (l.id === id ? { ...l, status: decision } : l)))
    if (loan) {
      addActivity('Loan', `${loan.id} ${decision} for ${loan.agent}`)
      pushToast(`${loan.id} ${decision}`, decision === 'rejected' ? 'error' : 'success')
    }
  }

  const [walletAccounts, setWalletAccounts] = useState([
    { id: 'WA-01', owner: 'Aarav Shrestha', type: 'Bean Wallet', balance: '670 beans', status: 'active' },
    { id: 'WA-02', owner: 'Aarav Shrestha', type: 'Cash Wallet', balance: '$145.20', status: 'active' },
    { id: 'WA-03', owner: 'Sima Koirala', type: 'Bean Wallet', balance: '520 beans', status: 'active' },
    { id: 'WA-04', owner: 'Jay Patel', type: 'Bean Wallet', balance: '420 beans', status: 'frozen' },
    { id: 'WA-05', owner: 'Nina Tamang', type: 'Cash Wallet', balance: '$88.50', status: 'active' }
  ])
  const toggleFreeze = (id) => {
    const acc = walletAccounts.find((a) => a.id === id)
    setWalletAccounts((as) => as.map((a) => (a.id === id ? { ...a, status: a.status === 'active' ? 'frozen' : 'active' } : a)))
    if (acc) {
      addActivity('Wallet', `${acc.id} (${acc.owner}) ${acc.status === 'active' ? 'frozen' : 'unfrozen'}`)
      pushToast(`${acc.owner}'s ${acc.type} ${acc.status === 'active' ? 'frozen' : 'unfrozen'}`, acc.status === 'active' ? 'error' : 'success')
    }
  }
  const frozenCount = walletAccounts.filter((a) => a.status === 'frozen').length

  const [hostConnections, setHostConnections] = useState([
    { id: 'HC-1', host: 'Aarav Shrestha', agency: 'Royal Streamers', platform: 'Live Stream', since: '19 May 2025', status: 'connected' },
    { id: 'HC-2', host: 'Sima Koirala', agency: 'Asia Live Group', platform: 'Live Stream', since: '02 Apr 2025', status: 'connected' },
    { id: 'HC-3', host: 'Jay Patel', agency: 'Coin Agency', platform: 'Voice Room', since: '—', status: 'pending' },
    { id: 'HC-4', host: 'Nina Tamang', agency: 'Global Talents', platform: 'Live Stream', since: '11 Jun 2025', status: 'disconnected' }
  ])
  const [hostModal, setHostModal] = useState(false)
  const toggleHostConnection = (id) => {
    const hc = hostConnections.find((h) => h.id === id)
    setHostConnections((hs) => hs.map((h) => (h.id === id ? { ...h, status: h.status === 'connected' ? 'disconnected' : 'connected' } : h)))
    if (hc) {
      addActivity('Wallet', `${hc.host} ${hc.status === 'connected' ? 'disconnected' : 'connected'}`)
      pushToast(`${hc.host} ${hc.status === 'connected' ? 'disconnected' : 'connected'}`)
    }
  }
  const addHostConnection = (form) => {
    if (!form.host.trim() || !form.agency.trim()) {
      pushToast('Host name and agency are required.', 'error')
      return
    }
    const id = `HC-${Math.floor(Math.random() * 9000 + 1000)}`
    setHostConnections((hs) => [{ id, since: 'Just now', status: 'pending', ...form }, ...hs])
    addActivity('Wallet', `New host connection requested for ${form.host}`)
    pushToast(`Connection request sent for ${form.host}`)
    setHostModal(false)
  }

  // ---- Users ----
  const [users, setUsers] = useState([
    { id: 'U-1', name: 'Sushil Thapa', email: 'sushil@diamondapp.com', role: 'Super Admin', agency: '—', diamonds: 0, joined: '02 Jan 2025', status: 'active' },
    { id: 'U-2', name: 'Ramesh Kumar', email: 'ramesh@royal.com', role: 'Agency Manager', agency: 'Royal Diamond Agency', diamonds: 128400, joined: '14 Mar 2025', status: 'active' },
    { id: 'U-3', name: 'Priya Sharma', email: 'priya@crown.com', role: 'Agency Manager', agency: 'Crown Diamonds Pvt Ltd', diamonds: 96200, joined: '02 Feb 2025', status: 'active' },
    { id: 'U-4', name: 'Aarav Shrestha', email: 'aarav@royal.com', role: 'Host', agency: 'Royal Streamers', diamonds: 4200, joined: '19 May 2025', status: 'active' },
    { id: 'U-5', name: 'David Osei', email: 'david@crown.com', role: 'Host', agency: 'Crown Diamonds Pvt Ltd', diamonds: 1800, joined: '01 Jun 2025', status: 'suspended' }
  ])
  const [userModal, setUserModal] = useState(null)
  const [userSearch, setUserSearch] = useState('')
  const [userRoleFilter, setUserRoleFilter] = useState('All Roles')
  const [userStatusFilter, setUserStatusFilter] = useState('All Status')

  const toggleUserStatus = (id) => {
    const u = users.find((x) => x.id === id)
    setUsers((us) => us.map((x) => (x.id === id ? { ...x, status: x.status === 'active' ? 'suspended' : 'active' } : x)))
    if (u) {
      addActivity('User', `${u.name} ${u.status === 'active' ? 'suspended' : 'reactivated'}`)
      pushToast(`${u.name} ${u.status === 'active' ? 'suspended' : 'reactivated'}`, u.status === 'active' ? 'error' : 'success')
    }
  }
  const deleteUser = (id) => {
    const u = users.find((x) => x.id === id)
    setUsers((us) => us.filter((x) => x.id !== id))
    if (u) {
      addActivity('User', `${u.name} removed`)
      pushToast(`${u.name} removed`, 'error')
    }
  }
  const saveUser = (form) => {
    if (!form.name.trim() || !form.email.trim()) {
      pushToast('Name and email are required.', 'error')
      return
    }
    if (userModal.mode === 'add') {
      const id = `U-${Math.floor(Math.random() * 9000 + 1000)}`
      setUsers((us) => [{ id, diamonds: 0, joined: 'Just now', status: 'active', agency: form.agency || '—', ...form }, ...us])
      addActivity('User', `${form.name} added`)
      pushToast(`${form.name} added`)
    } else {
      setUsers((us) => us.map((x) => (x.id === form.id ? { ...x, ...form } : x)))
      addActivity('User', `${form.name} updated`)
      pushToast(`${form.name} updated`)
    }
    setUserModal(null)
  }
  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
    const matchesRole = userRoleFilter === 'All Roles' || u.role === userRoleFilter
    const matchesStatus = userStatusFilter === 'All Status' || u.status === userStatusFilter.toLowerCase()
    return matchesSearch && matchesRole && matchesStatus
  })

  // ---- Settings ----
  const [profile, setProfile] = useState({ name: 'Sushil Thapa', email: 'sushil@diamondapp.com', phone: '+977-9801122334' })
  const [platformSettings, setPlatformSettings] = useState({ currency: 'USD - US Dollar', timezone: 'Asia/Kathmandu (GMT+5:45)', maintenanceMode: false })
  const maintenanceMode = platformSettings.maintenanceMode
  const saveProfile = () => {
    addActivity('Settings', 'Admin profile updated')
    pushToast('Profile saved')
  }
  const toggleMaintenance = (val) => {
    setPlatformSettings((s) => ({ ...s, maintenanceMode: val }))
    addActivity('Settings', `Maintenance mode ${val ? 'enabled' : 'disabled'}`)
    pushToast(`Maintenance mode ${val ? 'enabled' : 'disabled'}`, val ? 'warn' : 'success')
  }

  // ---- History filter ----
  const [historyFilter, setHistoryFilter] = useState('All')
  const [historySearch, setHistorySearch] = useState('')
  const filteredHistory = history.filter((h) => {
    const matchesCat = historyFilter === 'All' || h.category === historyFilter
    const matchesSearch = h.message.toLowerCase().includes(historySearch.toLowerCase())
    return matchesCat && matchesSearch
  })

  /* =========================================================
     eRupai Diamond Agency portal — merged in as its own section
  ========================================================= */
  const [epSubAgencies, setEpSubAgencies] = useState([
    { id: 'AG-201', name: 'Alpha Agency', head: 'Karan Sharma', region: 'India', coins: 150000, status: 'Active' },
    { id: 'AG-202', name: 'Sagar Streamers', head: 'Sagar Adhikari', region: 'Nepal', coins: 95000, status: 'Active' },
    { id: 'AG-203', name: 'Royal Gaming', head: 'Sophia Rai', region: 'Nepal', coins: 50000, status: 'Suspended' }
  ])
  const [epNewAgencyName, setEpNewAgencyName] = useState('')
  const [epNewAgencyHead, setEpNewAgencyHead] = useState('')
  const [epNewAgencyRegion, setEpNewAgencyRegion] = useState('Nepal')
  const [epInitialCoins, setEpInitialCoins] = useState(20000)
  const [epFormError, setEpFormError] = useState('')

  const [epLedger, setEpLedger] = useState([
    { date: '2026-07-17 07:35', target: 'Alpha Agency', amount: '50,000 Coins', status: 'Success' },
    { date: '2026-07-16 14:20', target: 'Sagar Streamers', amount: '15,000 Blue Diamonds', status: 'Success' }
  ])
  const [epDistTarget, setEpDistTarget] = useState('AG-201')
  const [epDistAmount, setEpDistAmount] = useState(10000)
  const [epDistAsset, setEpDistAsset] = useState('E-Rupee Coins')
  const [epDistError, setEpDistError] = useState('')

  const [epWebhookLogs, setEpWebhookLogs] = useState([
    { time: '07:51:02', event: 'Ping Received', source: 'Super Admin Gateway', status: '200 OK' }
  ])
  const [epIsApiConnected, setEpIsApiConnected] = useState(true)
  const [epExpansionRegion, setEpExpansionRegion] = useState('All Regions')
  const [epAvailableCommission, setEpAvailableCommission] = useState(725000)
  const [epWithdrawAmount, setEpWithdrawAmount] = useState(100000)
  const [epWithdrawError, setEpWithdrawError] = useState('')
  const [epTargetSales, setEpTargetSales] = useState(1500000)
  const [epCurrentSales, setEpCurrentSales] = useState(1050000)

  useEffect(() => {
    if (!epSubAgencies.find((a) => a.id === epDistTarget) && epSubAgencies.length > 0) {
      setEpDistTarget(epSubAgencies[0].id)
    }
  }, [epSubAgencies, epDistTarget])

  const epTotalAgencies = epSubAgencies.length
  const epActiveAgencies = epSubAgencies.filter((a) => a.status === 'Active').length
  const epSuspendedAgencies = epTotalAgencies - epActiveAgencies
  const epTotalCoins = epSubAgencies.reduce((s, a) => s + a.coins, 0)
  const epTargetPercent = Math.min(100, Math.floor((epCurrentSales / epTargetSales) * 100))
  const epRecentActivity = [
    ...epLedger.slice(0, 3).map((l) => ({ label: `${l.amount} sent to ${l.target}`, meta: l.date })),
    ...epWebhookLogs.slice(0, 2).map((l) => ({ label: l.event, meta: `${l.time} · ${l.source}` }))
  ].slice(0, 5)

  const epGoTo = (tab) => setSubtabs((s) => ({ ...s, 'eRupai Diamond Agency': tab }))

  const epHandleCreateAgency = (e) => {
    e.preventDefault()
    setEpFormError('')
    if (!epNewAgencyName.trim() || !epNewAgencyHead.trim()) {
      setEpFormError('Agency name and representative head are both required.')
      return
    }
    if (epInitialCoins < 0) {
      setEpFormError('Initial coin allocation cannot be negative.')
      return
    }
    if (maintenanceMode) {
      setEpFormError('Maintenance mode is on — new agencies cannot be created right now.')
      return
    }
    const existingIds = new Set(epSubAgencies.map((a) => a.id))
    let newId
    do {
      newId = `AG-${Math.floor(200 + Math.random() * 800)}`
    } while (existingIds.has(newId))
    const newAg = { id: newId, name: epNewAgencyName.trim(), head: epNewAgencyHead.trim(), region: epNewAgencyRegion, coins: epInitialCoins, status: 'Active' }
    setEpSubAgencies([newAg, ...epSubAgencies])
    setEpNewAgencyName('')
    setEpNewAgencyHead('')
    setEpInitialCoins(20000)
    addActivity('eRupai', `Sub-agency "${newAg.name}" created`)
    pushToast(`Sub-agency "${newAg.name}" created`)
  }

  const epHandleDistribute = (e) => {
    e.preventDefault()
    setEpDistError('')
    if (maintenanceMode) {
      setEpDistError('Maintenance mode is on — distribution is disabled.')
      return
    }
    const targetAg = epSubAgencies.find((a) => a.id === epDistTarget)
    if (!targetAg) {
      setEpDistError('Select a valid agency to distribute to.')
      return
    }
    if (!epDistAmount || epDistAmount <= 0) {
      setEpDistError('Enter a transfer quantity greater than zero.')
      return
    }
    if (targetAg.status === 'Suspended') {
      setEpDistError(`${targetAg.name} is suspended and cannot receive assets.`)
      return
    }
    setEpSubAgencies(epSubAgencies.map((a) => (a.id === epDistTarget && epDistAsset === 'E-Rupee Coins' ? { ...a, coins: a.coins + epDistAmount } : a)))
    const log = { date: new Date().toISOString().replace('T', ' ').substring(0, 16), target: targetAg.name, amount: `${epDistAmount.toLocaleString()} ${epDistAsset}`, status: 'Success' }
    setEpLedger([log, ...epLedger])
    addActivity('eRupai', `${epDistAmount.toLocaleString()} ${epDistAsset} sent to ${targetAg.name}`)
    pushToast(`Transferred ${epDistAmount.toLocaleString()} ${epDistAsset} to ${targetAg.name}`)
  }

  const epToggleAgencyStatus = (id) => {
    const agency = epSubAgencies.find((a) => a.id === id)
    setEpSubAgencies(epSubAgencies.map((a) => (a.id === id ? { ...a, status: a.status === 'Active' ? 'Suspended' : 'Active' } : a)))
    if (agency) {
      addActivity('eRupai', `${agency.name} ${agency.status === 'Active' ? 'suspended' : 'unsuspended'}`)
      pushToast(`${agency.name} ${agency.status === 'Active' ? 'suspended' : 'unsuspended'}`, agency.status === 'Active' ? 'error' : 'success')
    }
  }

  const epHandleWithdraw = () => {
    setEpWithdrawError('')
    if (maintenanceMode) {
      setEpWithdrawError('Maintenance mode is on — withdrawals are disabled.')
      return
    }
    if (!epWithdrawAmount || epWithdrawAmount <= 0) {
      setEpWithdrawError('Enter a withdrawal amount greater than zero.')
      return
    }
    if (epWithdrawAmount > epAvailableCommission) {
      setEpWithdrawError('Insufficient balance!')
      return
    }
    setEpAvailableCommission(epAvailableCommission - epWithdrawAmount)
    addActivity('eRupai', `Withdrawal of ${epWithdrawAmount.toLocaleString()} Beans requested`)
    pushToast(`Withdrawal of ${epWithdrawAmount.toLocaleString()} Beans requested`)
  }

  const epTabs = ['Overview', 'Platform Integration', 'Create New Agencies', 'Manage Agencies', 'Asset Distribution', 'Business Expansion', 'Revenue Generation', 'Performance Metrics', 'Commission Payouts', 'Target Monitoring']

  const renderErupai = () => {
    const tab = subtabs['eRupai Diamond Agency']
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {epTabs.map((t) => (
            <button key={t} onClick={() => epGoTo(t)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${tab === t ? 'bg-red-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'Overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Agencies" value={epTotalAgencies} hint={`${epActiveAgencies} active${epSuspendedAgencies ? ` · ${epSuspendedAgencies} suspended` : ''}`} hintTone="green" />
              <StatCard label="Network Coin Volume" value={epTotalCoins.toLocaleString()} hint="E-Rupee Coins across all agencies" />
              <StatCard label="Commission Balance" value={epAvailableCommission.toLocaleString()} hint="Beans available to withdraw" />
              <StatCard label="Gateway Status" value={epIsApiConnected ? 'Linked' : 'Down'} hint="Super Admin control hub" hintTone={epIsApiConnected ? 'green' : 'red'} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-slate-800 text-lg">Monthly Target Progress</h4>
                  <button onClick={() => epGoTo('Target Monitoring')} className="text-xs font-bold text-red-600 hover:underline">View details</button>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                  <span>Monthly Coin Target Volume</span>
                  <span className="font-mono text-red-600">{epCurrentSales.toLocaleString()} / {epTargetSales.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-red-500 to-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${epTargetPercent}%` }} />
                </div>
                <div className="text-sm font-bold text-slate-700">{epTargetPercent}% acquired. {(epTargetSales - epCurrentSales).toLocaleString()} more to lock in Diamond Bonuses.</div>
                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button onClick={() => epGoTo('Create New Agencies')} className="bg-slate-50 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-bold py-3 rounded-xl transition-colors">New Agency</button>
                  <button onClick={() => epGoTo('Asset Distribution')} className="bg-slate-50 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-bold py-3 rounded-xl transition-colors">Distribute Assets</button>
                  <button onClick={() => epGoTo('Manage Agencies')} className="bg-slate-50 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-bold py-3 rounded-xl transition-colors">Manage Agencies</button>
                  <button onClick={() => epGoTo('Commission Payouts')} className="bg-slate-50 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-bold py-3 rounded-xl transition-colors">Withdraw</button>
                </div>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-800 text-lg">Recent Activity</h4>
                {epRecentActivity.length === 0 ? (
                  <p className="text-sm text-slate-450">No activity yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {epRecentActivity.map((item, idx) => (
                      <li key={idx}>
                        <div className="text-sm font-semibold text-slate-700">{item.label}</div>
                        <div className="text-xs text-slate-400 font-mono">{item.meta}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-extrabold text-slate-800 text-lg">Agencies at a Glance</h4>
                <button onClick={() => epGoTo('Manage Agencies')} className="text-xs font-bold text-red-600 hover:underline">Manage all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 min-w-[520px]">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase">
                    <tr><th className="p-4">Agency</th><th className="p-4 text-center">Region</th><th className="p-4 text-right">Coins</th><th className="p-4 text-center">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {epSubAgencies.map((agency) => (
                      <tr key={agency.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-slate-800">{agency.name}</td>
                        <td className="p-4 text-center">{agency.region}</td>
                        <td className="p-4 text-right font-mono font-semibold text-red-600">{agency.coins.toLocaleString()}</td>
                        <td className="p-4 text-center"><Badge tone={agency.status === 'Active' ? 'green' : 'red'}>{agency.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === 'Platform Integration' && (
          <div className="space-y-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-slate-800 text-lg">Direct Platform Integration Protocol</h4>
                <Badge tone={epIsApiConnected ? 'green' : 'red'}>{epIsApiConnected ? 'Linked' : 'Disconnected'}</Badge>
              </div>
              <p className="text-slate-500 text-sm">Diamond Agencies link directly to the Super Admin control hub. Enabling API gateways registers transactions dynamically onto the platform service charge ledger.</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setEpIsApiConnected(!epIsApiConnected)
                    const log = { time: new Date().toTimeString().split(' ')[0], event: epIsApiConnected ? 'API Gateway Severed' : 'API Connection Established', source: 'Super Admin Gateway', status: epIsApiConnected ? '400 Terminated' : '200 Connected' }
                    setEpWebhookLogs([log, ...epWebhookLogs])
                    addActivity('eRupai', log.event)
                    pushToast(epIsApiConnected ? 'Gateway disconnected' : 'Gateway connected', epIsApiConnected ? 'error' : 'success')
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-sm font-bold"
                >
                  {epIsApiConnected ? 'Disconnect Gateway' : 'Establish Connection'}
                </button>
                <button
                  onClick={() => {
                    const log = { time: new Date().toTimeString().split(' ')[0], event: 'Manual Heartbeat Ping', source: 'Diamond Portal Client', status: epIsApiConnected ? '200 OK (8ms)' : '503 Fail' }
                    setEpWebhookLogs([log, ...epWebhookLogs])
                    pushToast(epIsApiConnected ? 'Diagnostic ping succeeded' : 'Diagnostic ping failed', epIsApiConnected ? 'success' : 'error')
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2 rounded-xl text-sm font-bold"
                >
                  Trigger API Diagnostic Ping
                </button>
              </div>
            </div>
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-extrabold text-slate-800 text-base">API Transaction & Gateway Logs</h4>
              <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-green-400 space-y-2 max-h-48 overflow-y-auto">
                {epWebhookLogs.map((log, idx) => (
                  <div key={idx} className="flex flex-wrap justify-between gap-2 border-b border-slate-900 pb-1.5">
                    <span>[{log.time}] {log.event} ({log.source})</span>
                    <span className={log.status.includes('OK') || log.status.includes('Connected') ? 'text-green-400' : 'text-red-400'}>{log.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'Create New Agencies' && (
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 max-w-2xl">
            <h4 className="font-extrabold text-slate-800 text-lg">Add New Agency Node</h4>
            <p className="text-slate-500 text-sm">Registers a sub-level agency under your Diamond network. It instantly inherits your regional policy splits and commissions.</p>
            {epFormError && <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-semibold px-4 py-2.5 rounded-xl">{epFormError}</div>}
            <form onSubmit={epHandleCreateAgency} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Agency Brand Name"><input required value={epNewAgencyName} onChange={(e) => setEpNewAgencyName(e.target.value)} placeholder="e.g. Omega Stream Team" className={inputClsRed} /></Field>
              <Field label="Representative Head"><input required value={epNewAgencyHead} onChange={(e) => setEpNewAgencyHead(e.target.value)} placeholder="e.g. Ramesh Adhikari" className={inputClsRed} /></Field>
              <Field label="Territory Region">
                <select value={epNewAgencyRegion} onChange={(e) => setEpNewAgencyRegion(e.target.value)} className={inputClsRed}>
                  <option>Nepal</option><option>India</option><option>Global</option>
                </select>
              </Field>
              <Field label="Initial Quota Coin Allocation"><input type="number" min="0" value={epInitialCoins} onChange={(e) => setEpInitialCoins(Number(e.target.value))} className={inputClsRed} /></Field>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-xl text-sm font-bold">Authorize and Launch Agency</button>
              </div>
            </form>
          </div>
        )}

        {tab === 'Manage Agencies' && (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 font-extrabold text-slate-800 text-lg">Manage Network Agencies</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 min-w-[720px]">
                <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase">
                  <tr><th className="p-4">ID</th><th className="p-4">Agency Name</th><th className="p-4">Representative</th><th className="p-4 text-center">Region</th><th className="p-4 text-right">Coins</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {epSubAgencies.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-slate-400">No agencies yet.</td></tr>}
                  {epSubAgencies.map((agency) => (
                    <tr key={agency.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-mono font-bold text-slate-800">{agency.id}</td>
                      <td className="p-4 font-semibold text-slate-800">{agency.name}</td>
                      <td className="p-4 text-slate-500">{agency.head}</td>
                      <td className="p-4 text-center">{agency.region}</td>
                      <td className="p-4 text-right font-mono font-semibold text-red-600">{agency.coins.toLocaleString()}</td>
                      <td className="p-4 text-center"><Badge tone={agency.status === 'Active' ? 'green' : 'red'}>{agency.status}</Badge></td>
                      <td className="p-4 text-center">
                        <button onClick={() => epToggleAgencyStatus(agency.id)} className={`text-xs font-bold px-3 py-1.5 rounded-lg ${agency.status === 'Active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                          {agency.status === 'Active' ? 'Suspend' : 'Unsuspend'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'Asset Distribution' && (
          <div className="space-y-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-extrabold text-slate-800 text-lg">Distribute Digital Assets</h4>
              {epDistError && <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-semibold px-4 py-2.5 rounded-xl">{epDistError}</div>}
              <form onSubmit={epHandleDistribute} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Field label="Select Agency">
                  <select value={epDistTarget} onChange={(e) => setEpDistTarget(e.target.value)} className={inputClsRed}>
                    {epSubAgencies.map((a) => <option key={a.id} value={a.id}>{a.name}{a.status === 'Suspended' ? ' (Suspended)' : ''}</option>)}
                  </select>
                </Field>
                <Field label="Select Asset">
                  <select value={epDistAsset} onChange={(e) => setEpDistAsset(e.target.value)} className={inputClsRed}>
                    <option>E-Rupee Coins</option><option>Blue Diamonds</option><option>Green Diamonds</option>
                  </select>
                </Field>
                <Field label="Transfer Quantity"><input type="number" min="1" value={epDistAmount} onChange={(e) => setEpDistAmount(Number(e.target.value))} className={inputClsRed} /></Field>
                <div className="flex items-end">
                  <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl text-sm font-bold">Authorize Distribution</button>
                </div>
              </form>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 font-extrabold text-slate-800 text-base">Asset Transfer Ledger (Audit Log)</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 min-w-[560px]">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase">
                    <tr><th className="p-4">Timestamp</th><th className="p-4">Recipient Agency</th><th className="p-4 text-right">Volume</th><th className="p-4 text-center">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {epLedger.map((log, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-4 font-mono text-xs">{log.date}</td>
                        <td className="p-4 font-semibold text-slate-800">{log.target}</td>
                        <td className="p-4 text-right font-mono font-extrabold text-red-600">{log.amount}</td>
                        <td className="p-4 text-center"><Badge tone="green">{log.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === 'Business Expansion' && (
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <h4 className="font-extrabold text-slate-800 text-lg">Expansion Analytics Hub</h4>
              <select value={epExpansionRegion} onChange={(e) => setEpExpansionRegion(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none">
                <option>All Regions</option><option>Nepal</option><option>India</option>
              </select>
            </div>
            <p className="text-slate-500 text-sm">Expanding agency footholds across key cities and states. Select a territory to analyze host acquisition density.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50/30 p-5 rounded-2xl border border-red-100 text-center">
                <div className="text-2xl font-black text-red-600">{epExpansionRegion === 'All Regions' ? 142 : epSubAgencies.filter((a) => a.region === epExpansionRegion).length + 40}</div>
                <div className="text-xs text-slate-500 font-bold mt-1 uppercase">Total Sub-agencies</div>
              </div>
              <div className="bg-red-50/30 p-5 rounded-2xl border border-red-100 text-center">
                <div className="text-2xl font-black text-red-600">850</div>
                <div className="text-xs text-slate-500 font-bold mt-1 uppercase">Hosts Recruited</div>
              </div>
              <div className="bg-red-50/30 p-5 rounded-2xl border border-red-100 text-center">
                <div className="text-2xl font-black text-green-600">+15%</div>
                <div className="text-xs text-slate-500 font-bold mt-1 uppercase">M-o-M Network Growth</div>
              </div>
            </div>
          </div>
        )}

        {tab === 'Revenue Generation' && (
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h4 className="font-extrabold text-slate-800 text-lg">Total Network Revenue Analytics</h4>
            <p className="text-slate-500 text-sm">Aggregated business profits generated by direct coin sales, host virtual gifts, and platform referral overrides.</p>
            <div className="h-40 flex items-end justify-between pt-6 gap-2">
              {[45, 62, 55, 80, 75, 95, 110, 85, 100].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="text-[10px] font-mono font-bold text-slate-400">{val}K</div>
                  <div className="bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg w-full" style={{ height: `${val}%` }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Performance Metrics' && (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 font-extrabold text-slate-800 text-lg">Agency Performance Breakdown</div>
            <div className="p-5 sm:p-6 space-y-6">
              {epSubAgencies.length === 0 && <p className="text-sm text-slate-400 text-center">No agencies to display yet.</p>}
              {epSubAgencies.map((agency) => {
                const pct = Math.min(100, Math.floor((agency.coins / 180000) * 100))
                return (
                  <div key={agency.id} className="space-y-2">
                    <div className="flex justify-between items-center text-sm flex-wrap gap-1">
                      <span className="font-extrabold text-slate-800">{agency.name} ({agency.id})</span>
                      <span className="font-mono font-black text-red-600">{pct}% target met</span>
                    </div>
                    <div className="w-full bg-slate-150 h-3 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {tab === 'Commission Payouts' && (
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h4 className="font-extrabold text-slate-800 text-lg">Payout and Commission Claims</h4>
            <p className="text-slate-500 text-sm">Withdraw accumulated Diamond overrides directly into your E-Rupee Coin wallet. Conversion processing rates are policy-governed by Admin.</p>
            {epWithdrawError && <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-semibold px-4 py-2.5 rounded-xl">{epWithdrawError}</div>}
            <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200/50 justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accumulated Commission</div>
                <div className="text-3xl font-black text-red-600 font-mono mt-1">{epAvailableCommission.toLocaleString()} Beans</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input type="number" min="1" value={epWithdrawAmount} onChange={(e) => setEpWithdrawAmount(Number(e.target.value))} className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 w-full sm:w-36" />
                <button onClick={epHandleWithdraw} className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-xl text-sm font-bold">Withdraw to E-Rupee Coins</button>
              </div>
            </div>
          </div>
        )}

        {tab === 'Target Monitoring' && (
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h4 className="font-extrabold text-slate-800 text-lg">Monthly Performance Milestone Tracker</h4>
            <div className="flex justify-between items-center text-sm font-bold text-slate-500">
              <span>Monthly Coin Target Volume</span>
              <span className="font-mono text-red-600">{epCurrentSales.toLocaleString()} / {epTargetSales.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${epTargetPercent}%` }} />
            </div>
            <div className="text-center text-sm font-bold text-slate-700">{epTargetPercent}% Target Acquired. Need {(epTargetSales - epCurrentSales).toLocaleString()} more to lock in Diamond Bonuses.</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <Field label="Adjust Current Sales"><input type="number" min="0" value={epCurrentSales} onChange={(e) => setEpCurrentSales(Math.max(0, Number(e.target.value)))} className={inputClsRed} /></Field>
              <Field label="Adjust Monthly Target"><input type="number" min="1" value={epTargetSales} onChange={(e) => setEpTargetSales(Math.max(1, Number(e.target.value)))} className={inputClsRed} /></Field>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ---- Global search across both portals ----
  const globalResults = useMemo(() => {
    if (!search.trim()) return []
    const q = search.toLowerCase()
    const results = []
    packages.filter((p) => p.name.toLowerCase().includes(q)).forEach((p) => results.push({ label: p.name, sub: 'Diamond Package', go: () => goTo('Diamond Packages', 'All Packages') }))
    agencies.filter((a) => a.name.toLowerCase().includes(q)).forEach((a) => results.push({ label: a.name, sub: 'Agency', go: () => goTo('Diamond Agency', 'Agencies') }))
    users.filter((u) => u.name.toLowerCase().includes(q)).forEach((u) => results.push({ label: u.name, sub: 'User', go: () => goTo('Users') }))
    epSubAgencies.filter((a) => a.name.toLowerCase().includes(q)).forEach((a) => results.push({ label: a.name, sub: 'eRupai Agency', go: () => goTo('eRupai Diamond Agency', 'Manage Agencies') }))
    return results.slice(0, 6)
  }, [search, packages, agencies, users, epSubAgencies])

  // ---- Nav structure ----
  const navGroups = [
    { key: 'Dashboard' },
    { key: 'Diamond Packages', children: ['All Packages', 'Sales Analytics', 'Package Settings'] },
    { key: 'Diamond Agency', children: ['Agencies', 'Withdrawal Approvals'], badge: pendingWithdrawals.length },
    { key: 'Agent Wallet', children: ['Bean Wallet', 'Send Coin', 'Loan', 'Wallet Accounts', 'Host Connections'], badge: loans.filter((l) => l.status === 'pending').length },
    { key: 'eRupai Diamond Agency', children: epTabs, badge: epSuspendedAgencies },
    { key: 'Users' },
    { key: 'Reports' },
    { key: 'History' },
    { key: 'Settings' }
  ]

  const goTo = (key, sub) => {
    setSection(key)
    if (sub) setSubtabs((s) => ({ ...s, [key]: sub }))
    setMobileNavOpen(false)
  }

  /* ---------------------------------------------------------
     Other section renderers (Dashboard, Packages, Agency, Wallet, Users, Reports, History, Settings)
  --------------------------------------------------------- */
  const renderDashboard = () => {
    const revenueSeries = [62, 72, 68, 80, 88, 98]
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white">
          <div className="text-xs font-bold uppercase tracking-widest text-violet-200">Welcome back, {profile.name.split(' ')[0]}</div>
          <h2 className="text-2xl sm:text-3xl font-black mt-2">Here's how the Diamond platform is doing</h2>
          <p className="text-violet-100 mt-2 text-sm sm:text-base max-w-xl">
            Revenue is trending up this week, {activePackages} package(s) are active, and {pendingWithdrawals.length} withdrawal request(s) need your review.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Total Revenue" value={`$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} hint="all packages" hintTone="green" />
          <StatCard label="Diamond Agencies" value={agencies.length} hint={`${agencies.filter((a) => a.status === 'active').length} active`} hintTone="green" />
          <StatCard label="Pending Withdrawals" value={pendingWithdrawals.length} hint="needs review" hintTone={pendingWithdrawals.length ? 'red' : 'green'} />
          <StatCard label="eRupai Coin Volume" value={epTotalCoins.toLocaleString()} hint={`${epTotalAgencies} sub-agencies`} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-extrabold text-slate-800 text-lg mb-4">Revenue — Last 6 Months</h4>
            <div className="h-40 flex items-end justify-between gap-2">
              {revenueSeries.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="text-[10px] font-mono font-bold text-slate-400">${v}K</div>
                  <div className="bg-gradient-to-t from-violet-600 to-violet-400 rounded-t-lg w-full" style={{ height: `${v}%` }} />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-extrabold text-slate-800 text-lg mb-4">Recent Activity</h4>
            <ul className="space-y-3">
              {history.slice(0, 5).map((h) => (
                <li key={h.id} className="text-sm">
                  <div className="font-semibold text-slate-700">{h.message}</div>
                  <div className="text-xs text-slate-400">{h.who} · {h.time}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button onClick={() => goTo('Diamond Packages', 'All Packages')} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-left hover:border-violet-300 transition-colors">
            <div className="font-extrabold text-slate-800">Diamond Packages</div>
            <div className="text-sm text-slate-500 mt-1">Manage in-app diamond packages, pricing and bonuses.</div>
          </button>
          <button onClick={() => goTo('Diamond Agency', 'Withdrawal Approvals')} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-left hover:border-violet-300 transition-colors">
            <div className="font-extrabold text-slate-800 flex items-center gap-2">
              Withdrawal Approvals {pendingWithdrawals.length > 0 && <Badge tone="red">{pendingWithdrawals.length} pending</Badge>}
            </div>
            <div className="text-sm text-slate-500 mt-1">Review, approve, or reject agency withdrawal requests.</div>
          </button>
          <button onClick={() => goTo('eRupai Diamond Agency', 'Overview')} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-left hover:border-red-300 transition-colors">
            <div className="font-extrabold text-slate-800">eRupai Diamond Agency</div>
            <div className="text-sm text-slate-500 mt-1">Manage the eRupai sub-agency network, coins and targets.</div>
          </button>
        </div>
      </div>
    )
  }

  const renderPackages = () => {
    const tab = subtabs['Diamond Packages']
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {['All Packages', 'Sales Analytics', 'Package Settings'].map((t) => (
            <button key={t} onClick={() => goTo('Diamond Packages', t)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${tab === t ? 'bg-violet-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'All Packages' && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
              <StatCard label="Diamonds Sold" value={packages.reduce((s, p) => s + p.sold, 0).toLocaleString()} />
              <StatCard label="Total Revenue" value={`$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} hint="vs last 7 days" hintTone="green" />
              <StatCard label="Active Packages" value={activePackages} hint={`${packages.length ? Math.round((activePackages / packages.length) * 100) : 0}% active`} hintTone="green" />
              <StatCard label="Total Orders" value={packages.reduce((s, p) => s + p.sold, 0).toLocaleString()} />
              <StatCard label="Disabled" value={packages.length - activePackages} />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <input value={pkgSearch} onChange={(e) => setPkgSearch(e.target.value)} placeholder="Search diamond package..." className={`${inputCls} sm:max-w-xs`} />
                <select value={pkgStatusFilter} onChange={(e) => setPkgStatusFilter(e.target.value)} className={`${inputCls} sm:max-w-[160px]`}>
                  <option>All Status</option><option>Active</option><option>Disabled</option>
                </select>
              </div>
              <button onClick={() => setPkgModal({ mode: 'add', data: { name: '', diamonds: '', price: '', bonusPct: '' } })} className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shrink-0">Add Diamond Package</button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 min-w-[640px]">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase">
                    <tr><th className="p-4">Package</th><th className="p-4">Diamonds</th><th className="p-4">Price</th><th className="p-4">Bonus</th><th className="p-4">Sold</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPackages.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-slate-400">No packages match your filters.</td></tr>}
                    {filteredPackages.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-slate-800">{p.name}</td>
                        <td className="p-4">{p.diamonds.toLocaleString()}</td>
                        <td className="p-4">${Number(p.price).toFixed(2)}</td>
                        <td className="p-4 text-green-600 font-semibold">+{p.bonusPct}%</td>
                        <td className="p-4">{p.sold.toLocaleString()}</td>
                        <td className="p-4 text-center"><Toggle checked={p.status === 'active'} onChange={() => togglePackageStatus(p.id)} /></td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-3">
                            <button onClick={() => setPkgModal({ mode: 'edit', data: p })} className="text-violet-600 font-bold text-xs hover:underline">Edit</button>
                            <button onClick={() => deletePackage(p.id)} className="text-red-500 font-bold text-xs hover:underline">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === 'Sales Analytics' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="7-Day Revenue" value={`$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} hint="all packages" hintTone="green" />
              <StatCard label="Best Performer" value={packages.length ? [...packages].sort((a, b) => b.price * b.sold - a.price * a.sold)[0].name : '—'} />
              <StatCard label="Avg. Bonus Offered" value={`${packages.length ? Math.round(packages.reduce((s, p) => s + p.bonusPct, 0) / packages.length) : 0}%`} hint="across packages" hintTone="green" />
            </div>
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-lg mb-4">Revenue by Package</h4>
              <div className="space-y-4">
                {[...packages].sort((a, b) => b.price * b.sold - a.price * a.sold).map((p) => {
                  const rev = p.price * p.sold
                  const max = Math.max(...packages.map((x) => x.price * x.sold), 1)
                  return (
                    <div key={p.id} className="flex items-center gap-3">
                      <span className="w-32 sm:w-40 text-sm font-semibold text-slate-700 shrink-0 truncate">{p.name}</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden"><div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(rev / max) * 100}%` }} /></div>
                      <span className="text-sm font-mono font-bold text-slate-700 w-20 text-right shrink-0">${rev.toFixed(0)}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {tab === 'Package Settings' && (
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5 max-w-xl">
            <h4 className="font-extrabold text-slate-800 text-lg">Diamond Package Settings</h4>
            <div className="flex items-center justify-between gap-4">
              <div><div className="font-semibold text-slate-700">Auto Publish New Package</div><div className="text-xs text-slate-450">Automatically publish new diamond packages</div></div>
              <Toggle checked={pkgSettings.autoPublish} onChange={(v) => setPkgSettings((s) => ({ ...s, autoPublish: v }))} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div><div className="font-semibold text-slate-700">Display In Store</div><div className="text-xs text-slate-450">Show diamond packages in user store</div></div>
              <Toggle checked={pkgSettings.displayInStore} onChange={(v) => setPkgSettings((s) => ({ ...s, displayInStore: v }))} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div><div className="font-semibold text-slate-700">Allow Gift</div><div className="text-xs text-slate-450">Allow users to send diamonds as gifts</div></div>
              <Toggle checked={pkgSettings.allowGift} onChange={(v) => setPkgSettings((s) => ({ ...s, allowGift: v }))} />
            </div>
            <Field label="Maximum Diamonds Per Transaction"><input type="number" min="0" value={pkgSettings.maxPerTransaction} onChange={(e) => setPkgSettings((s) => ({ ...s, maxPerTransaction: Number(e.target.value) }))} className={inputCls} /></Field>
            <p className="text-xs text-slate-450">This limit is enforced live on the Send Coin form in Agent Wallet.</p>
          </div>
        )}
      </div>
    )
  }

  const renderAgency = () => {
    const tab = subtabs['Diamond Agency']
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {['Agencies', 'Withdrawal Approvals'].map((t) => (
            <button key={t} onClick={() => goTo('Diamond Agency', t)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 ${tab === t ? 'bg-violet-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              {t}
              {t === 'Withdrawal Approvals' && pendingWithdrawals.length > 0 && <Badge tone={tab === t ? 'slate' : 'red'}>{pendingWithdrawals.length}</Badge>}
            </button>
          ))}
        </div>

        {tab === 'Agencies' && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard label="Total Agencies" value={agencies.length} hint="registered" hintTone="green" />
              <StatCard label="Active" value={agencies.filter((a) => a.status === 'active').length} hint="in good standing" hintTone="green" />
              <StatCard label="Total Agents" value={agencies.reduce((s, a) => s + a.agents, 0)} hint="across agencies" />
              <StatCard label="Avg. Commission" value={`${agencies.length ? (agencies.reduce((s, a) => s + a.commission, 0) / agencies.length).toFixed(1) : 0}%`} />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <input value={agencySearch} onChange={(e) => setAgencySearch(e.target.value)} placeholder="Search agencies..." className={`${inputCls} sm:max-w-xs`} />
              <button onClick={() => setAgencyModal({ mode: 'add', data: { name: '', manager: '', commission: '' } })} className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shrink-0">Add Agency</button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 min-w-[640px]">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase">
                    <tr><th className="p-4">ID</th><th className="p-4">Agency</th><th className="p-4">Manager</th><th className="p-4">Commission</th><th className="p-4">Agents</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAgencies.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-slate-400">No agencies found.</td></tr>}
                    {filteredAgencies.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-mono font-bold">{a.id}</td>
                        <td className="p-4 font-semibold text-slate-800">{a.name}</td>
                        <td className="p-4">{a.manager}</td>
                        <td className="p-4">{a.commission}%</td>
                        <td className="p-4">{a.agents}</td>
                        <td className="p-4 text-center"><Badge tone={a.status === 'active' ? 'green' : 'red'}>{a.status}</Badge></td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-3 flex-wrap">
                            <button onClick={() => setAgencyModal({ mode: 'edit', data: a })} className="text-violet-600 font-bold text-xs hover:underline">Edit</button>
                            <button onClick={() => toggleAgencyStatus(a.id)} className="text-amber-600 font-bold text-xs hover:underline">{a.status === 'active' ? 'Suspend' : 'Reactivate'}</button>
                            <button onClick={() => deleteAgency(a.id)} className="text-red-500 font-bold text-xs hover:underline">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === 'Withdrawal Approvals' && (
          <>
            {maintenanceMode && <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold px-4 py-3 rounded-xl">Maintenance mode is active — withdrawal actions are disabled until it's turned off in Settings.</div>}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 font-extrabold text-slate-800">{pendingWithdrawals.length} pending withdrawals</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 min-w-[720px]">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase">
                    <tr><th className="p-4">ID</th><th className="p-4">Requester</th><th className="p-4">Net Amount</th><th className="p-4">Fraud Risk</th><th className="p-4">KYC</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {withdrawals.map((w) => (
                      <tr key={w.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-mono font-bold">{w.id}</td>
                        <td className="p-4"><div className="font-semibold text-slate-800">{w.requester}</div><div className="text-xs text-slate-450">{w.agency}</div></td>
                        <td className="p-4 font-mono">${w.amount.toFixed(2)}</td>
                        <td className="p-4"><Badge tone={w.fraudScore > 40 ? 'red' : 'green'}>{w.fraudScore > 40 ? 'High' : 'Low'} · {w.fraudScore}</Badge></td>
                        <td className="p-4"><Badge tone={w.kyc === 'Verified' ? 'green' : 'amber'}>{w.kyc}</Badge></td>
                        <td className="p-4 text-center"><Badge tone={w.status === 'pending' ? 'slate' : w.status === 'approved' ? 'green' : 'red'}>{w.status}</Badge></td>
                        <td className="p-4 text-center">
                          {w.status === 'pending' ? (
                            <div className="flex items-center justify-center gap-3">
                              <button disabled={maintenanceMode} onClick={() => reviewWithdrawal(w.id, 'approved')} className="text-green-600 font-bold text-xs hover:underline disabled:opacity-40">Approve</button>
                              <button disabled={maintenanceMode} onClick={() => reviewWithdrawal(w.id, 'rejected')} className="text-red-500 font-bold text-xs hover:underline disabled:opacity-40">Reject</button>
                            </div>
                          ) : <span className="text-xs text-slate-400">Reviewed</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-extrabold text-slate-800">Bulk Approve — Safe Requests</div>
                  <div className="text-xs text-slate-500">Meets auto-rules: ≤ ${autoRules.maxNet} net, fraud score ≤ {autoRules.maxFraud}{autoRules.requireKyc ? ', KYC verified' : ''}.</div>
                </div>
                <button disabled={selectedSafe.length === 0 || maintenanceMode} onClick={bulkApproveSafe} className="bg-emerald-600 disabled:bg-slate-300 text-white px-5 py-2.5 rounded-xl text-sm font-bold shrink-0">Approve Selected ({selectedSafe.length})</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm min-w-[480px]">
                  <thead className="text-slate-550 font-bold text-xs uppercase">
                    <tr><th className="p-4 w-10"></th><th className="p-4">ID</th><th className="p-4">Requester</th><th className="p-4">Net Amount</th><th className="p-4">Fraud Score</th></tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-100/70">
                    {safeWithdrawals.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-slate-400">No pending requests currently meet the auto-rules.</td></tr>}
                    {safeWithdrawals.map((w) => (
                      <tr key={w.id}>
                        <td className="p-4"><input type="checkbox" checked={selectedSafe.includes(w.id)} onChange={(e) => setSelectedSafe((sel) => (e.target.checked ? [...sel, w.id] : sel.filter((x) => x !== w.id)))} /></td>
                        <td className="p-4 font-mono text-violet-600 font-bold">{w.id}</td>
                        <td className="p-4">{w.requester}</td>
                        <td className="p-4">${w.amount.toFixed(2)}</td>
                        <td className="p-4">{w.fraudScore}/100</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-800">Auto-Approval Rules</h4>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <input type="checkbox" checked={autoRules.enabled} onChange={(e) => setAutoRules((r) => ({ ...r, enabled: e.target.checked }))} />
                  Enable auto-eligibility for bulk approval
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Max net amount (USD)"><input type="number" value={autoRules.maxNet} onChange={(e) => setAutoRules((r) => ({ ...r, maxNet: Number(e.target.value) }))} className={inputCls} /></Field>
                  <Field label="Max fraud score (0-100)"><input type="number" value={autoRules.maxFraud} onChange={(e) => setAutoRules((r) => ({ ...r, maxFraud: Number(e.target.value) }))} className={inputCls} /></Field>
                </div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <input type="checkbox" checked={autoRules.requireKyc} onChange={(e) => setAutoRules((r) => ({ ...r, requireKyc: e.target.checked }))} />
                  Require KYC status = Verified
                </label>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-extrabold text-slate-800">Audit Log</h4>
                  <Badge>Immutable · Read-only</Badge>
                </div>
                <ul className="space-y-3 max-h-56 overflow-y-auto">
                  {history.filter((h) => h.category === 'Withdrawal').slice(0, 8).map((h) => (
                    <li key={h.id} className="text-sm"><div className="font-semibold text-slate-700">{h.message}</div><div className="text-xs text-slate-400">{h.who} · {h.time}</div></li>
                  ))}
                  {history.filter((h) => h.category === 'Withdrawal').length === 0 && <li className="text-sm text-slate-400">No withdrawal activity yet.</li>}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  const renderWallet = () => {
    const tab = subtabs['Agent Wallet']
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {['Bean Wallet', 'Send Coin', 'Loan', 'Wallet Accounts', 'Host Connections'].map((t) => (
            <button key={t} onClick={() => goTo('Agent Wallet', t)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${tab === t ? 'bg-violet-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{t}</button>
          ))}
        </div>

        {tab === 'Bean Wallet' && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard label="Total Beans" value={totalBeans.toLocaleString()} />
              <StatCard label="Gift Beans" value={totalGiftBeans.toLocaleString()} />
              <StatCard label="Platform Bonus" value={totalBonus.toLocaleString()} />
              <StatCard label="Avg Beans/Agent" value={avgBeansPerAgent.toLocaleString()} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {agents.map((a) => (
                <div key={a.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div><div className="font-extrabold text-slate-800">{a.name}</div><div className="text-sm text-slate-450">{a.agency}</div></div>
                    <Badge>{a.region}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div><div className="text-xs font-bold text-slate-400 uppercase">Beans</div><div className="font-black text-slate-800">{a.beans.toLocaleString()}</div></div>
                    <div><div className="text-xs font-bold text-slate-400 uppercase">Gift Beans</div><div className="font-black text-slate-800">{a.giftBeans.toLocaleString()}</div></div>
                    <div><div className="text-xs font-bold text-slate-400 uppercase">Bonus</div><div className="font-black text-slate-800">{a.bonus.toLocaleString()}</div></div>
                    <div><div className="text-xs font-bold text-slate-400 uppercase">Loan Status</div><Badge tone={a.loanStatus === 'Active' ? 'green' : a.loanStatus === 'Pending' ? 'amber' : a.loanStatus === 'Approved' ? 'violet' : 'slate'}>{a.loanStatus}</Badge></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'Send Coin' && (
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 max-w-xl">
            <h4 className="font-extrabold text-slate-800 text-lg">Send Coin</h4>
            <p className="text-sm text-slate-500">Send beans directly to an agent's wallet from the platform reserve. Max {pkgSettings.maxPerTransaction.toLocaleString()} per transaction.</p>
            {maintenanceMode && <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold px-4 py-2.5 rounded-xl">Maintenance mode is active — sending is disabled.</div>}
            <form onSubmit={handleSendCoin} className="space-y-4">
              <Field label="Recipient agent">
                <select value={sendCoinForm.agentId} onChange={(e) => setSendCoinForm((f) => ({ ...f, agentId: e.target.value }))} className={inputCls}>
                  {agents.map((a) => <option key={a.id} value={a.id}>{a.name} — {a.agency}</option>)}
                </select>
              </Field>
              <Field label="Amount (beans)"><input type="number" min="1" placeholder="e.g. 500" value={sendCoinForm.amount} onChange={(e) => setSendCoinForm((f) => ({ ...f, amount: e.target.value }))} className={inputCls} /></Field>
              <Field label="Note (optional)"><textarea rows={3} placeholder="Reason for this transfer..." value={sendCoinForm.note} onChange={(e) => setSendCoinForm((f) => ({ ...f, note: e.target.value }))} className={inputCls} /></Field>
              <button type="submit" disabled={maintenanceMode} className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 text-white py-2.5 rounded-xl text-sm font-bold">Send Coin</button>
            </form>
            <div className="pt-4 border-t border-slate-100">
              <h5 className="font-bold text-slate-700 text-sm mb-2">Recently Sent</h5>
              {recentlySent.length === 0 ? <p className="text-sm text-slate-400">Nothing sent yet.</p> : (
                <ul className="space-y-2">
                  {recentlySent.map((r) => (
                    <li key={r.id} className="text-sm flex justify-between"><span className="font-semibold text-slate-700">{r.amount.toLocaleString()} beans → {r.name}</span><span className="text-xs text-slate-400">{r.time}</span></li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {tab === 'Loan' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Active Loans" value={loans.filter((l) => l.status === 'active').length} hint="currently active" hintTone="green" />
              <StatCard label="Pending Review" value={loans.filter((l) => l.status === 'pending').length} hint="awaiting decision" hintTone={loans.some((l) => l.status === 'pending') ? 'red' : 'green'} />
              <StatCard label="Outstanding" value={`$${outstanding.toLocaleString()}`} hint="active + approved" />
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 min-w-[640px]">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase">
                    <tr><th className="p-4">Loan ID</th><th className="p-4">Agent</th><th className="p-4">Amount</th><th className="p-4">Tenor</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loans.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-mono text-violet-600 font-bold">{l.id}</td>
                        <td className="p-4 font-semibold text-slate-800">{l.agent}</td>
                        <td className="p-4">${l.amount.toLocaleString()}</td>
                        <td className="p-4">{l.tenor} days</td>
                        <td className="p-4 text-center"><Badge tone={l.status === 'active' ? 'green' : l.status === 'approved' ? 'violet' : l.status === 'pending' ? 'amber' : 'red'}>{l.status}</Badge></td>
                        <td className="p-4 text-center">
                          {l.status === 'pending' ? (
                            <div className="flex items-center justify-center gap-3">
                              <button onClick={() => reviewLoan(l.id, 'approved')} className="text-green-600 font-bold text-xs hover:underline">Approve</button>
                              <button onClick={() => reviewLoan(l.id, 'rejected')} className="text-red-500 font-bold text-xs hover:underline">Reject</button>
                            </div>
                          ) : <span className="text-xs text-slate-400">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === 'Wallet Accounts' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Total Bean Balance" value={walletAccounts.filter((a) => a.type === 'Bean Wallet').reduce((s, a) => s + parseInt(a.balance), 0).toLocaleString()} hint="across accounts" hintTone="green" />
              <StatCard label="Total Cash Balance" value={`$${walletAccounts.filter((a) => a.type === 'Cash Wallet').reduce((s, a) => s + parseFloat(a.balance.replace('$', '')), 0).toFixed(2)}`} hint="across accounts" hintTone="green" />
              <StatCard label="Frozen Accounts" value={frozenCount} hint="restricted" />
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 min-w-[640px]">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase">
                    <tr><th className="p-4">Account</th><th className="p-4">Owner</th><th className="p-4">Type</th><th className="p-4">Balance</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {walletAccounts.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-mono text-violet-600 font-bold">{a.id}</td>
                        <td className="p-4 font-semibold text-slate-800">{a.owner}</td>
                        <td className="p-4">{a.type}</td>
                        <td className="p-4">{a.balance}</td>
                        <td className="p-4 text-center"><Badge tone={a.status === 'active' ? 'green' : 'red'}>{a.status}</Badge></td>
                        <td className="p-4 text-center"><button onClick={() => toggleFreeze(a.id)} className={`font-bold text-xs hover:underline ${a.status === 'active' ? 'text-red-500' : 'text-green-600'}`}>{a.status === 'active' ? 'Freeze' : 'Unfreeze'}</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === 'Host Connections' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Connected" value={hostConnections.filter((h) => h.status === 'connected').length} hint="active hosts" hintTone="green" />
              <StatCard label="Pending" value={hostConnections.filter((h) => h.status === 'pending').length} hint="awaiting approval" />
              <StatCard label="Disconnected" value={hostConnections.filter((h) => h.status === 'disconnected').length} hint="inactive" hintTone="red" />
            </div>
            <div className="flex justify-end">
              <button onClick={() => setHostModal(true)} className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold">Add Connection</button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 min-w-[720px]">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase">
                    <tr><th className="p-4">Host</th><th className="p-4">Agency</th><th className="p-4">Platform</th><th className="p-4">Connected Since</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {hostConnections.map((h) => (
                      <tr key={h.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-slate-800">{h.host}</td>
                        <td className="p-4">{h.agency}</td>
                        <td className="p-4">{h.platform}</td>
                        <td className="p-4">{h.since}</td>
                        <td className="p-4 text-center"><Badge tone={h.status === 'connected' ? 'green' : h.status === 'pending' ? 'amber' : 'red'}>{h.status}</Badge></td>
                        <td className="p-4 text-center"><button onClick={() => toggleHostConnection(h.id)} className={`font-bold text-xs hover:underline ${h.status === 'connected' ? 'text-red-500' : 'text-green-600'}`}>{h.status === 'connected' ? 'Disconnect' : 'Connect'}</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={users.length} hint="all roles" />
        <StatCard label="Active" value={users.filter((u) => u.status === 'active').length} hint="in good standing" hintTone="green" />
        <StatCard label="Suspended" value={users.filter((u) => u.status === 'suspended').length} hint="restricted access" hintTone={users.some((u) => u.status === 'suspended') ? 'red' : 'green'} />
        <StatCard label="Agency Managers" value={users.filter((u) => u.role === 'Agency Manager').length} hint="manage agencies" />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <input value={userSearch} onChange={(e) => setUserSearch(e.target.value)} placeholder="Search by name or email..." className={`${inputCls} sm:max-w-xs`} />
          <select value={userRoleFilter} onChange={(e) => setUserRoleFilter(e.target.value)} className={`${inputCls} sm:max-w-[180px]`}>
            <option>All Roles</option><option>Super Admin</option><option>Agency Manager</option><option>Host</option>
          </select>
          <select value={userStatusFilter} onChange={(e) => setUserStatusFilter(e.target.value)} className={`${inputCls} sm:max-w-[160px]`}>
            <option>All Status</option><option>Active</option><option>Suspended</option>
          </select>
        </div>
        <button onClick={() => setUserModal({ mode: 'add', data: { name: '', email: '', role: 'Host', agency: '' } })} className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shrink-0">Add User</button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 min-w-[760px]">
            <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase">
              <tr><th className="p-4">User</th><th className="p-4">Role</th><th className="p-4">Agency</th><th className="p-4">Diamonds</th><th className="p-4">Joined</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-slate-400">No users match your filters.</td></tr>}
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50">
                  <td className="p-4"><div className="font-semibold text-slate-800">{u.name}</div><div className="text-xs text-slate-450">{u.email}</div></td>
                  <td className="p-4"><Badge tone="violet">{u.role}</Badge></td>
                  <td className="p-4">{u.agency}</td>
                  <td className="p-4">{u.diamonds.toLocaleString()}</td>
                  <td className="p-4">{u.joined}</td>
                  <td className="p-4 text-center"><Badge tone={u.status === 'active' ? 'green' : 'red'}>{u.status}</Badge></td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                      <button onClick={() => setUserModal({ mode: 'edit', data: u })} className="text-violet-600 font-bold text-xs hover:underline">Edit</button>
                      <button onClick={() => toggleUserStatus(u.id)} className="text-amber-600 font-bold text-xs hover:underline">{u.status === 'active' ? 'Suspend' : 'Reactivate'}</button>
                      <button onClick={() => deleteUser(u.id)} className="text-red-500 font-bold text-xs hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderReports = () => {
    const revenueByCategory = [
      { label: 'Diamond Package Sales', value: totalRevenue },
      { label: 'Withdrawals Paid Out', value: withdrawals.filter((w) => w.status === 'approved').reduce((s, w) => s + w.amount, 0) },
      { label: 'Loans Outstanding', value: outstanding },
      { label: 'eRupai Coin Volume', value: epTotalCoins }
    ]
    const max = Math.max(...revenueByCategory.map((r) => r.value), 1)
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Platform Revenue" value={`$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} hintTone="green" hint="all time" />
          <StatCard label="Active Agencies" value={agencies.filter((a) => a.status === 'active').length + epActiveAgencies} />
          <StatCard label="Active Users" value={users.filter((u) => u.status === 'active').length} />
          <StatCard label="Open Loans" value={loans.filter((l) => l.status !== 'rejected').length} />
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h4 className="font-extrabold text-slate-800 text-lg mb-4">Money Flow Overview</h4>
          <div className="space-y-4">
            {revenueByCategory.map((r) => (
              <div key={r.label} className="flex items-center gap-3">
                <span className="w-40 sm:w-48 text-sm font-semibold text-slate-700 shrink-0 truncate">{r.label}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden"><div className="bg-violet-500 h-full rounded-full" style={{ width: `${(r.value / max) * 100}%` }} /></div>
                <span className="text-sm font-mono font-bold text-slate-700 w-24 text-right shrink-0">${r.value.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderHistory = () => {
    const categories = ['All', 'Package', 'Agency', 'Withdrawal', 'Wallet', 'Loan', 'User', 'Settings', 'eRupai']
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Total Events" value={history.length} hint="all time" />
          <StatCard label="Withdrawals" value={history.filter((h) => h.category === 'Withdrawal').length} hint="changes logged" />
          <StatCard label="eRupai Portal" value={history.filter((h) => h.category === 'eRupai').length} hint="changes logged" />
          <StatCard label="Users" value={history.filter((h) => h.category === 'User').length} hint="changes logged" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <input value={historySearch} onChange={(e) => setHistorySearch(e.target.value)} placeholder="Search activity..." className={`${inputCls} sm:max-w-xs`} />
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setHistoryFilter(c)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${historyFilter === c ? 'bg-violet-600 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <ul className="divide-y divide-slate-100">
            {filteredHistory.length === 0 && <li className="p-6 text-center text-slate-400">No matching activity.</li>}
            {filteredHistory.map((h) => (
              <li key={h.id} className="p-4 sm:p-5 flex justify-between items-start gap-3">
                <div><div className="font-semibold text-slate-700">{h.message}</div><div className="text-xs text-slate-400 mt-0.5">{h.who} · {h.time}</div></div>
                <Badge>{h.category}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  const renderSettings = () => (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h4 className="font-extrabold text-slate-800 text-lg">Admin Profile</h4>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center font-black">{profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div>
          <div><div className="font-extrabold text-slate-800">{profile.name}</div><div className="text-sm text-slate-450">Super Admin</div></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full name"><input value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} className={inputCls} /></Field>
          <Field label="Email"><input value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} className={inputCls} /></Field>
          <Field label="Phone"><input value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} className={inputCls} /></Field>
        </div>
        <button onClick={saveProfile} className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold">Save Profile</button>
      </div>
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h4 className="font-extrabold text-slate-800 text-lg">Platform Settings</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Default Currency">
            <select value={platformSettings.currency} onChange={(e) => setPlatformSettings((s) => ({ ...s, currency: e.target.value }))} className={inputCls}>
              <option>USD - US Dollar</option><option>NPR - Nepali Rupee</option><option>INR - Indian Rupee</option>
            </select>
          </Field>
          <Field label="Timezone">
            <select value={platformSettings.timezone} onChange={(e) => setPlatformSettings((s) => ({ ...s, timezone: e.target.value }))} className={inputCls}>
              <option>Asia/Kathmandu (GMT+5:45)</option><option>Asia/Kolkata (GMT+5:30)</option><option>UTC</option>
            </select>
          </Field>
        </div>
        <div className="flex items-center justify-between gap-4 pt-2">
          <div><div className="font-semibold text-slate-700">Maintenance Mode</div><div className="text-xs text-slate-450">Temporarily disable purchases, sends and withdrawals platform-wide (both portals)</div></div>
          <Toggle checked={platformSettings.maintenanceMode} onChange={toggleMaintenance} />
        </div>
      </div>
    </div>
  )

  const sectionRenderers = {
    Dashboard: renderDashboard,
    'Diamond Packages': renderPackages,
    'Diamond Agency': renderAgency,
    'Agent Wallet': renderWallet,
    'eRupai Diamond Agency': renderErupai,
    Users: renderUsers,
    Reports: renderReports,
    History: renderHistory,
    Settings: renderSettings
  }

  /* ---------------------------------------------------------
     Layout
  --------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <ToastStack toasts={toasts} />

      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setMobileNavOpen(true)} className="text-sm font-bold text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5">Menu</button>
        <div className="font-black text-slate-800">Diamond Admin</div>
        <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-black">
          {profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </div>
      </header>

      {mobileNavOpen && <div className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden" onClick={() => setMobileNavOpen(false)} />}

      <aside
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-72 bg-white border-r border-slate-100 z-50 transform transition-transform lg:transform-none ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 flex flex-col`}
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="font-black text-slate-800 text-lg">Diamond Admin</div>
            <div className="text-xs text-slate-450">Control Center</div>
          </div>
          <button onClick={() => setMobileNavOpen(false)} className="lg:hidden text-slate-400 font-bold text-sm">Close</button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navGroups.map((g) => (
            <div key={g.key}>
              <button
                onClick={() => {
                  if (g.children) {
                    setExpanded((e) => ({ ...e, [g.key]: !e[g.key] }))
                    goTo(g.key, subtabs[g.key])
                  } else {
                    goTo(g.key)
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  section === g.key ? 'bg-violet-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{g.key}</span>
                {g.badge > 0 && <Badge tone={section === g.key ? 'slate' : 'red'}>{g.badge}</Badge>}
              </button>
              {g.children && expanded[g.key] && (
                <div className="ml-3 mt-1 mb-2 space-y-0.5 border-l border-slate-100 pl-3">
                  {g.children.map((c) => (
                    <button
                      key={c}
                      onClick={() => goTo(g.key, c)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        section === g.key && subtabs[g.key] === c ? 'text-violet-700 bg-violet-50' : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50">Sign out</button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="hidden lg:flex sticky top-0 z-30 bg-white border-b border-slate-100 px-6 xl:px-8 py-4 items-center justify-between gap-6">
          <div>
            <h1 className="text-xl font-black text-slate-800">{subtabs[section] ? `${section} · ${subtabs[section]}` : section}</h1>
          </div>
          <div className="relative flex-1 max-w-sm">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search agencies, packages, users..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
            {globalResults.length > 0 && (
              <div className="absolute mt-2 w-full bg-white border border-slate-100 rounded-xl shadow-lg z-40 overflow-hidden">
                {globalResults.map((r, i) => (
                  <button key={i} onClick={() => { r.go(); setSearch('') }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 flex justify-between">
                    <span className="font-semibold text-slate-700">{r.label}</span>
                    <span className="text-xs text-slate-400">{r.sub}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Badge tone={pendingWithdrawals.length ? 'red' : 'slate'}>{pendingWithdrawals.length} alerts</Badge>
            <div className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-black">
              {profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div className="text-sm">
              <div className="font-bold text-slate-800 leading-tight">{profile.name}</div>
              <div className="text-xs text-slate-450 leading-tight">Super Admin</div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 xl:p-8 min-w-0">
          {maintenanceMode && section !== 'Settings' && (
            <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold px-4 py-3 rounded-xl">
              Maintenance mode is active — purchases, sends and withdrawals are temporarily disabled platform-wide.
            </div>
          )}
          {sectionRenderers[section] ? sectionRenderers[section]() : null}
        </main>
      </div>

      {pkgModal && (
        <Modal title={pkgModal.mode === 'add' ? 'Add Diamond Package' : 'Edit Diamond Package'} onClose={() => setPkgModal(null)}>
          <PackageForm data={pkgModal.data} onCancel={() => setPkgModal(null)} onSave={savePackage} />
        </Modal>
      )}
      {agencyModal && (
        <Modal title={agencyModal.mode === 'add' ? 'Add New Agency' : 'Edit Agency'} onClose={() => setAgencyModal(null)}>
          <AgencyForm data={agencyModal.data} onCancel={() => setAgencyModal(null)} onSave={saveAgency} />
        </Modal>
      )}
      {userModal && (
        <Modal title={userModal.mode === 'add' ? 'Add User' : 'Edit User'} onClose={() => setUserModal(null)}>
          <UserForm data={userModal.data} onCancel={() => setUserModal(null)} onSave={saveUser} />
        </Modal>
      )}
      {hostModal && (
        <Modal title="New Host Connection" onClose={() => setHostModal(false)}>
          <HostForm onCancel={() => setHostModal(false)} onSave={addHostConnection} />
        </Modal>
      )}
    </div>
  )
}

/* ---------------------------------------------------------
   Forms
--------------------------------------------------------- */
function PackageForm({ data, onCancel, onSave }) {
  const [form, setForm] = useState({ ...data })
  return (
    <div className="space-y-4">
      <Field label="Package Name"><input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} /></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Diamonds"><input type="number" value={form.diamonds} onChange={(e) => setForm((f) => ({ ...f, diamonds: Number(e.target.value) }))} className={inputCls} /></Field>
        <Field label="Price (USD)"><input type="number" step="0.01" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} className={inputCls} /></Field>
      </div>
      <Field label="Bonus %"><input type="number" value={form.bonusPct} onChange={(e) => setForm((f) => ({ ...f, bonusPct: Number(e.target.value) }))} className={inputCls} /></Field>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onCancel} className="px-5 py-2.5 rounded-xl text-sm font-bold border border-slate-200 text-slate-600">Cancel</button>
        <button onClick={() => onSave(form)} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-violet-600 text-white">Save Package</button>
      </div>
    </div>
  )
}
function AgencyForm({ data, onCancel, onSave }) {
  const [form, setForm] = useState({ ...data })
  return (
    <div className="space-y-4">
      <Field label="Agency Name"><input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} /></Field>
      <Field label="Manager Name"><input value={form.manager} onChange={(e) => setForm((f) => ({ ...f, manager: e.target.value }))} className={inputCls} /></Field>
      <Field label="Commission %"><input type="number" value={form.commission} onChange={(e) => setForm((f) => ({ ...f, commission: e.target.value }))} className={inputCls} /></Field>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onCancel} className="px-5 py-2.5 rounded-xl text-sm font-bold border border-slate-200 text-slate-600">Cancel</button>
        <button onClick={() => onSave(form)} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-violet-600 text-white">Save Agency</button>
      </div>
    </div>
  )
}
function UserForm({ data, onCancel, onSave }) {
  const [form, setForm] = useState({ ...data })
  return (
    <div className="space-y-4">
      <Field label="Full Name"><input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} /></Field>
      <Field label="Email"><input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputCls} /></Field>
      <Field label="Role">
        <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className={inputCls}>
          <option>Super Admin</option><option>Agency Manager</option><option>Host</option>
        </select>
      </Field>
      <Field label="Agency (optional)"><input value={form.agency} onChange={(e) => setForm((f) => ({ ...f, agency: e.target.value }))} className={inputCls} /></Field>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onCancel} className="px-5 py-2.5 rounded-xl text-sm font-bold border border-slate-200 text-slate-600">Cancel</button>
        <button onClick={() => onSave(form)} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-violet-600 text-white">Save User</button>
      </div>
    </div>
  )
}
function HostForm({ onCancel, onSave }) {
  const [form, setForm] = useState({ host: '', agency: '', platform: 'Live Stream' })
  return (
    <div className="space-y-4">
      <Field label="Host name"><input value={form.host} onChange={(e) => setForm((f) => ({ ...f, host: e.target.value }))} className={inputCls} /></Field>
      <Field label="Agency"><input value={form.agency} onChange={(e) => setForm((f) => ({ ...f, agency: e.target.value }))} className={inputCls} /></Field>
      <Field label="Platform">
        <select value={form.platform} onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value }))} className={inputCls}>
          <option>Live Stream</option><option>Voice Room</option>
        </select>
      </Field>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onCancel} className="px-5 py-2.5 rounded-xl text-sm font-bold border border-slate-200 text-slate-600">Cancel</button>
        <button onClick={() => onSave(form)} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-violet-600 text-white">Add Connection</button>
      </div>
    </div>
  )
}