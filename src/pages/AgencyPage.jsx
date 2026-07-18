import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import AgencyNotifications from '../components/AgencyNotifications'
import AgencyReports from '../components/AgencyReports'
import AgencyAnalytics from '../components/AgencyAnalytics'
import AgencyEarnings from '../components/AgencyEarnings'
import AgencyTargetManagement from '../components/AgencyTargetManagement'
import AgencyCharismaContribution from '../components/AgencyCharismaContribution'
import AgencyAgentManagement from '../components/AgencyAgentManagement'
import AgencyHostManagement from '../components/AgencyHostManagement'
import AgencyProgressChart from '../components/AgencyProgressChart'
import AgencyHourlyLiveHistory from '../components/AgencyHourlyLiveHistory'
import AgencyPerformance from '../components/AgencyPerformance'
import {
  Users, UserCheck, Activity, Settings, Target, ShieldAlert,
  ArrowLeft, Gem, PlusCircle, Search, Trash2, Edit, CheckSquare,
  TrendingUp, HelpCircle, BarChart3, Coins, PieChart,
  UserPlus, Play, RefreshCw, Send, DollarSign, Wallet, CheckCircle2,
  Lock, FileText, Bell, Sliders, ChevronDown, ChevronRight, XCircle, Menu,
  LayoutDashboard, Monitor, Star, Package, FileText as FileTextIcon, ArrowRightLeft, Sun, Moon, Laptop, Clock, Gauge
} from 'lucide-react'
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts'

export default function AgencyPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') || 'host-management-all'
  const [activeTab, setActiveTab] = useState(tabParam)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // --- MENU CONFIG ---
  const [expandedMenus, setExpandedMenus] = useState({})
  const [hostManagementSubTab, setHostManagementSubTab] = useState('all-hosts')
  const [agentManagementSubTab, setAgentManagementSubTab] = useState('all-agents')
  
  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { 
      key: 'host-management', 
      label: 'Host Management', 
      icon: Users,
      children: [
        { key: 'host-management-all', label: 'All Hosts', subTab: 'all-hosts' },
        { key: 'host-management-active', label: 'Active Hosts', subTab: 'active-hosts' },
        { key: 'host-management-live', label: 'Live Hosts', subTab: 'live-hosts' },
        { key: 'host-management-offline', label: 'Offline Hosts', subTab: 'offline-hosts' },
        { key: 'host-management-inactive', label: 'Inactive Hosts', subTab: 'inactive-hosts' },
        { key: 'host-management-vip', label: 'VIP Hosts', subTab: 'vip-hosts' },
        { key: 'host-management-video', label: 'Video Hosts', subTab: 'video-hosts' },
        { key: 'host-management-audio', label: 'Audio Hosts', subTab: 'audio-hosts' },
        { key: 'host-management-new', label: 'New Hosts', subTab: 'new-hosts' },
        { key: 'host-management-suspended', label: 'Suspended Hosts', subTab: 'suspended-hosts' },
        { key: 'host-management-applications', label: 'Host Applications', subTab: 'host-applications' }
      ]
    },
    { 
      key: 'agent-management', 
      label: 'Agent Management', 
      icon: UserCheck,
      children: [
        { key: 'agent-management-dashboard', label: 'Agent Dashboard', subTab: 'agent-dashboard' },
        { key: 'agent-management-all', label: 'All Agents', subTab: 'all-agents' },
        { key: 'agent-management-history', label: 'Recruitment History', subTab: 'recruitment-history' },
        { key: 'agent-management-performance', label: 'Agent Performance', subTab: 'agent-performance' },
        { key: 'agent-management-host-targets', label: 'Host Targets', subTab: 'host-targets' }
      ]
    },
    { key: 'charisma-contribution', label: 'Charisma & Contribution', icon: Star },
    { key: 'hourly-live-history', label: 'Hourly Live History', icon: Clock },
    { key: 'performance', label: 'Performance', icon: Gauge },
    { key: 'target-management', label: 'Target Management', icon: Target },
    { key: 'progress-chart', label: 'Progress Chart', icon: TrendingUp },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
    { key: 'reports', label: 'Reports', icon: FileTextIcon },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'settings', label: 'Settings', icon: Settings },
    { key: 'recruitment', label: 'Recruitment & Commission', icon: UserPlus }
  ]

  // Sync state with URL search parameters
  useEffect(() => {
    if (!tabParam) return

    const resolvedTab = tabParam === 'agent-dash' ? 'agent-management-dashboard' : tabParam
    setActiveTab(resolvedTab)

    for (const menuItem of menuItems) {
      const child = menuItem.children?.find(c => c.key === resolvedTab)
      if (child?.subTab) {
        if (menuItem.key === 'host-management') {
          setHostManagementSubTab(child.subTab)
        } else if (menuItem.key === 'agent-management') {
          setAgentManagementSubTab(child.subTab)
        }
        break
      }
    }
  }, [tabParam])

  const toggleMenu = (key) => {
    setExpandedMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const selectTab = (tab) => {
    setActiveTab(tab)
    setSearchParams({ tab })
    setMobileSidebarOpen(false)
    
    // Handle nested menu selections
    const menuItem = menuItems.find(m => m.key === tab || m.children?.some(c => c.key === tab))
    if (menuItem?.children) {
      const child = menuItem.children.find(c => c.key === tab)
      if (child?.subTab) {
        if (menuItem.key === 'host-management') {
          setHostManagementSubTab(child.subTab)
        } else if (menuItem.key === 'agent-management') {
          setAgentManagementSubTab(child.subTab)
        }
      } else {
        // If clicking the parent menu item, expand it and set default sub-tab
        setExpandedMenus(prev => ({ ...prev, [menuItem.key]: true }))
        if (menuItem.key === 'host-management') {
          setHostManagementSubTab('all-hosts')
        } else if (menuItem.key === 'agent-management') {
          setAgentManagementSubTab('all-agents')
        }
      }
    }
  }

  // --- DASHBOARD STATES ---
  const [dashboardMetrics, setDashboardMetrics] = useState({
    agencyId: 'AG-001',
    agencyName: 'Diamond Agency',
    agencyLevel: 'A',
    packageName: 'Premium Package',
    agencyStatus: 'Active',
    totalHosts: 156,
    activeHosts: 142,
    liveHosts: 28,
    offlineHosts: 114,
    inactiveHosts: 14,
    vipHosts: 23,
    totalAgents: 45,
    pendingJoinRequests: 8,
    pendingLeaveRequests: 3,
    pendingWithdrawRequests: 5,
    todayRevenue: 125000,
    monthlyRevenue: 3750000,
    todayCharisma: 85,
    monthlyCharisma: 2450,
    todayContribution: 92,
    monthlyContribution: 2760,
    todayLiveHours: 156,
    monthlyLiveHours: 4680,
    incentiveEarned: 45000,
    bonusEarned: 28000,
    performanceScore: 87,
    targetCompletion: 78
  })

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'new_host', message: 'New host "Priya Sharma" joined the agency', time: '2 minutes ago', icon: UserPlus },
    { id: 2, type: 'live', message: 'Host "Aria Live" went live', time: '5 minutes ago', icon: Monitor },
    { id: 3, type: 'withdraw', message: 'Withdraw request of ₹5,000 from "Rahul Agent"', time: '12 minutes ago', icon: Send },
    { id: 4, type: 'join', message: 'Join request from "Nisha Live"', time: '25 minutes ago', icon: UserCheck },
    { id: 5, type: 'leave', message: 'Leave request from "Gamer Pro"', time: '1 hour ago', icon: XCircle }
  ])

  const [recentAgents, setRecentAgents] = useState([
    { id: 'A-001', name: 'Rahul Kumar', email: 'rahul@example.com', joinedDate: '2026-07-18', status: 'active' },
    { id: 'A-002', name: 'Priya Sharma', email: 'priya@example.com', joinedDate: '2026-07-17', status: 'active' },
    { id: 'A-003', name: 'Amit Patel', email: 'amit@example.com', joinedDate: '2026-07-16', status: 'pending' },
    { id: 'A-004', name: 'Nisha Singh', email: 'nisha@example.com', joinedDate: '2026-07-15', status: 'active' },
    { id: 'A-005', name: 'Vikram Das', email: 'vikram@example.com', joinedDate: '2026-07-14', status: 'active' }
  ])

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Target Achievement', message: 'You have achieved 78% of monthly target', time: '10 minutes ago', read: false, type: 'success' },
    { id: 2, title: 'New Host Alert', message: '3 new hosts joined your agency today', time: '30 minutes ago', read: false, type: 'info' },
    { id: 3, title: 'Withdraw Pending', message: '5 withdrawal requests pending approval', time: '1 hour ago', read: true, type: 'warning' },
    { id: 4, title: 'Performance Update', message: 'Your performance score increased to 87', time: '2 hours ago', read: true, type: 'success' }
  ])

  // Chart data
  const revenueChartData = [
    { name: 'Mon', revenue: 420000 },
    { name: 'Tue', revenue: 380000 },
    { name: 'Wed', revenue: 520000 },
    { name: 'Thu', revenue: 490000 },
    { name: 'Fri', revenue: 610000 },
    { name: 'Sat', revenue: 750000 },
    { name: 'Sun', revenue: 580000 }
  ]

  const liveHoursChartData = [
    { name: 'Mon', hours: 680 },
    { name: 'Tue', hours: 720 },
    { name: 'Wed', hours: 850 },
    { name: 'Thu', hours: 790 },
    { name: 'Fri', hours: 920 },
    { name: 'Sat', hours: 1100 },
    { name: 'Sun', hours: 980 }
  ]

  const hostGrowthData = [
    { month: 'Jan', hosts: 120 },
    { month: 'Feb', hosts: 128 },
    { month: 'Mar', hosts: 135 },
    { month: 'Apr', hosts: 142 },
    { month: 'May', hosts: 148 },
    { month: 'Jun', hosts: 156 }
  ]

  const charismaTrendData = [
    { name: 'Week 1', charisma: 2100 },
    { name: 'Week 2', charisma: 2250 },
    { name: 'Week 3', charisma: 2380 },
    { name: 'Week 4', charisma: 2450 }
  ]

  const contributionTrendData = [
    { name: 'Week 1', contribution: 2400 },
    { name: 'Week 2', contribution: 2550 },
    { name: 'Week 3', contribution: 2680 },
    { name: 'Week 4', contribution: 2760 }
  ]

  // --- RECRUITMENT & COMMISSION STATES ---
  const [joinRequests, setJoinRequests] = useState([
    { id: 'JR-001', hostName: 'Priya Sharma', hostId: 'H-1001', recruitmentSource: 'Agent', agentName: 'Rahul Agent', commissionSplit: '50-50', status: 'Pending', requestedAt: '2026-07-18 10:30' },
    { id: 'JR-002', hostName: 'Nisha Live', hostId: 'H-1002', recruitmentSource: 'Direct', agentName: '-', commissionSplit: '100-0', status: 'Pending', requestedAt: '2026-07-18 09:15' },
    { id: 'JR-003', hostName: 'Aria Singh', hostId: 'H-1003', recruitmentSource: 'Agent', agentName: 'Karan Manager', commissionSplit: '50-50', status: 'Pending', requestedAt: '2026-07-18 08:45' }
  ])

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 'LR-001', hostName: 'Gamer Pro', hostId: 'H-902', reason: 'Personal reasons', status: 'Pending', requestedAt: '2026-07-18 07:20' },
    { id: 'LR-002', hostName: 'Kathmandu Vibe', hostId: 'H-904', reason: 'Switching agency', status: 'Pending', requestedAt: '2026-07-18 06:10' }
  ])

  const [transferRequests, setTransferRequests] = useState([
    { id: 'TR-001', hostName: 'Maya Live', hostId: 'H-1004', currentAgency: 'Diamond Agency', targetAgency: 'Royal Gaming', status: 'Cooling Period', coolingEndsAt: '2026-07-18 16:44', requestedAt: '2026-07-18 10:44' }
  ])

  const [newJoinRequest, setNewJoinRequest] = useState({
    hostName: '',
    recruitmentSource: 'Direct',
    agentName: '',
    commissionSplit: '100-0'
  })

  const [newLeaveRequest, setNewLeaveRequest] = useState({
    hostName: '',
    reason: ''
  })

  const [newTransferRequest, setNewTransferRequest] = useState({
    hostName: '',
    targetAgency: ''
  })

  // --- SETTINGS STATES ---
  const [agencyProfile, setAgencyProfile] = useState({
    agencyName: 'Diamond Agency',
    agencyId: 'AG-001',
    email: 'admin@diamondagency.com',
    phone: '+977-9800000000',
    address: 'Kathmandu, Nepal',
    description: 'Premium streaming agency',
    establishedDate: '2024-01-15'
  })

  const [managers, setManagers] = useState([
    { id: 'M-001', name: 'Karan Sharma', email: 'karan@diamondagency.com', role: 'Super Admin', status: 'Active', joinedDate: '2024-01-15' },
    { id: 'M-002', name: 'Sita Adhikari', email: 'sita@diamondagency.com', role: 'Manager', status: 'Active', joinedDate: '2024-02-20' }
  ])

  const [recruiters, setRecruiters] = useState([
    { id: 'R-001', name: 'Rahul Thapa', email: 'rahul@diamondagency.com', targets: 25, achieved: 22, status: 'Active', joinedDate: '2024-03-10' },
    { id: 'R-002', name: 'Priya Gurung', email: 'priya@diamondagency.com', targets: 20, achieved: 18, status: 'Active', joinedDate: '2024-03-15' }
  ])

  const [trainers, setTrainers] = useState([
    { id: 'T-001', name: 'Amit KC', email: 'amit@diamondagency.com', specialty: 'Live Streaming', sessions: 45, rating: 4.8, status: 'Active' },
    { id: 'T-002', name: 'Nisha Rai', email: 'nisha@diamondagency.com', specialty: 'Content Creation', sessions: 38, rating: 4.9, status: 'Active' }
  ])

  const [roles, setRoles] = useState([
    { id: 'role-1', name: 'Super Admin', permissions: ['all'], users: 1 },
    { id: 'role-2', name: 'Manager', permissions: ['manage_hosts', 'view_reports', 'approve_withdrawals'], users: 3 },
    { id: 'role-3', name: 'Recruiter', permissions: ['add_hosts', 'view_own_hosts'], users: 5 },
    { id: 'role-4', name: 'Trainer', permissions: ['conduct_training', 'view_host_progress'], users: 2 }
  ])

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    password: '',
    newPassword: '',
    confirmPassword: '',
    loginHistory: [
      { id: 1, date: '2026-07-18 10:30', ip: '192.168.1.100', device: 'Chrome on Windows', status: 'Success' },
      { id: 2, date: '2026-07-17 15:45', ip: '192.168.1.100', device: 'Chrome on Windows', status: 'Success' },
      { id: 3, date: '2026-07-16 09:20', ip: '192.168.1.105', device: 'Firefox on Mac', status: 'Failed' }
    ]
  })

  const [activityLogs, setActivityLogs] = useState([
    { id: 1, action: 'Profile Updated', user: 'Karan Sharma', timestamp: '2026-07-18 10:25', ip: '192.168.1.100' },
    { id: 2, action: 'New Manager Added', user: 'Karan Sharma', timestamp: '2026-07-18 09:15', ip: '192.168.1.100' },
    { id: 3, action: 'Settings Changed', user: 'Sita Adhikari', timestamp: '2026-07-17 14:30', ip: '192.168.1.101' },
    { id: 4, action: 'Password Changed', user: 'Karan Sharma', timestamp: '2026-07-16 11:00', ip: '192.168.1.100' }
  ])

  const [notificationSettings, setNotificationSettings] = useState({
    joinRequest: true,
    leaveRequest: true,
    withdrawRequest: true,
    packageExpiry: true,
    monthlyTarget: true,
    incentive: true,
    announcement: true
  })

  const [languageSettings, setLanguageSettings] = useState('en')
  const [themeSettings, setThemeSettings] = useState('light')

  const [settingsTab, setSettingsTab] = useState('profile')

  // --- ANNOUNCEMENT DATA ---
  const [announcementData, setAnnouncementData] = useState([
    { id: 1, title: 'Server maintenance tonight', message: 'We will be doing some maintenance work tonight from 2-4 AM. Things might be slow during this time.', date: '2026-07-18', priority: 'High', notificationType: 'Announcement', read: false },
    { id: 2, title: 'New dashboard is live!', message: 'Check out the new analytics dashboard - it has better charts and reports now.', date: '2026-07-17', priority: 'Medium', notificationType: 'Announcement', read: true },
    { id: 3, title: 'Withdrawal rules updated', message: 'Just a heads up - withdrawal policy changes kick in from August 1st. Make sure you are aware.', date: '2026-07-16', priority: 'Low', notificationType: 'Announcement', read: true },
    { id: 4, title: 'Office closed for holiday', message: 'We are taking a break on August 15th for the national holiday. Back on the 16th!', date: '2026-07-15', priority: 'Medium', notificationType: 'Announcement', read: true },
    { id: 5, title: 'Priya wants to join', message: 'Priya Sharma sent a join request. She is interested in joining your agency.', date: '2026-07-18', priority: 'High', notificationType: 'Join Request', read: false },
    { id: 6, title: 'Gamer Pro wants to leave', message: 'Gamer Pro has requested to leave the agency. Reason: personal reasons.', date: '2026-07-18', priority: 'Medium', notificationType: 'Leave Request', read: false },
    { id: 7, title: 'Rahul wants to withdraw ₹50,000', message: 'Rahul Agent has submitted a withdrawal request for ₹50,000.', date: '2026-07-18', priority: 'High', notificationType: 'Withdraw Request', read: false },
    { id: 8, title: 'Package expiring soon', message: 'Your Basic Package runs out in 7 days. Time to renew?', date: '2026-07-18', priority: 'High', notificationType: 'Package Expiry', read: false },
    { id: 9, title: '75% of monthly target done', message: 'You have hit 75% of your monthly revenue target. Keep going!', date: '2026-07-18', priority: 'Medium', notificationType: 'Monthly Target', read: false }
  ])

  // --- GENERAL SIMULATION STATES ---
  
  // 1. Agency / Host Recruitment Tab States
  const [hosts, setHosts] = useState([
    { id: 'H-901', name: 'Aria Live', agent: 'Agent Rahul', status: 'Streaming', beans: 45200, target: 'Gold', tier: 'Completed' },
    { id: 'H-902', name: 'Gamer Pro', agent: 'Direct Agency', status: 'Offline', beans: 12800, target: 'Silver', tier: 'In Progress' },
    { id: 'H-903', name: 'Nisha Sing', agent: 'Agent Rahul', status: 'Streaming', beans: 78900, target: 'Diamond', tier: 'Completed' },
    { id: 'H-904', name: 'Kathmandu Vibe', agent: 'Direct Agency', status: 'Offline', beans: 5200, target: 'Bronze', tier: 'In Progress' }
  ])
  const [hostSearch, setHostSearch] = useState('')
  const [newHostName, setNewHostName] = useState('')
  const [newHostAgent, setNewHostAgent] = useState('Direct Agency')
  const [newHostTarget, setNewHostTarget] = useState('Silver')

  // 2. Agent Binding Tab States
  const [agents, setAgents] = useState([
    { id: 'AG-801', name: 'Agent Rahul', status: 'Active', hostsBound: 8, commissionRate: 10, totalEarned: 84300 },
    { id: 'AG-802', name: 'Karan Stream Manager', status: 'Active', hostsBound: 12, commissionRate: 12, totalEarned: 145000 },
    { id: 'AG-803', name: 'Sonia Live Agency', status: 'Pending Verification', hostsBound: 3, commissionRate: 8, totalEarned: 18200 }
  ])
  const [newAgentName, setNewAgentName] = useState('')
  const [newAgentCommission, setNewAgentCommission] = useState(10)
  const [calcBeans, setCalcBeans] = useState(100000)
  const [calcRate, setCalcRate] = useState(10)

  // 3. Host Simulator Tab States
  const [streamingHostId, setStreamingHostId] = useState('H-901')
  const [battleOpponent, setBattleOpponent] = useState('Alpha Gamer')
  const [battleStatus, setBattleStatus] = useState('idle') // idle, loading, won, lost
  const [battleBeansWon, setBattleBeansWon] = useState(0)

  // 4. Target Engine Tab States
  const [coinSalesProgress, setCoinSalesProgress] = useState(65)
  const [targetTiers, setTargetTiers] = useState([
    { level: 'Tier 1 (50%)', salesRequired: 500000, bonus: '5% Extra Bonus', achieved: true },
    { level: 'Tier 2 (80%)', salesRequired: 800000, bonus: '10% Extra Bonus', achieved: false },
    { level: 'Tier 3 (100%)', salesRequired: 1000000, bonus: '20% Super Bonus', achieved: false }
  ])
  const [customGoal, setCustomGoal] = useState(1000000)

  // 5. Revenue Sharing Tab States
  const [revPlatform, setRevPlatform] = useState(40)
  const [revDiamond, setRevDiamond] = useState(10)
  const [revAgency, setRevAgency] = useState(20)
  const [revAgent, setRevAgent] = useState(10)
  const [revHost, setRevHost] = useState(20)

  // 6. Agency Dashboard Tab States
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [kpiTimeline, setKpiTimeline] = useState([80000, 120000, 95000, 140000, 110000, 165000, 150000])

  // 7. Agent Dashboard Tab States
  const [withdrawalBeans, setWithdrawalBeans] = useState(50000)
  const [availableBeans, setAvailableBeans] = useState(245000)
  const [auditLedger, setAuditLedger] = useState([
    { text: 'Commission credited from Host H-901 live show', date: '2026-07-17 07:15', beans: '+4,500 Beans', type: 'credit' },
    { text: 'Agent tier reward payout: Gold Level achieved', date: '2026-07-16 18:30', beans: '+12,000 Beans', type: 'credit' },
    { text: 'Withdrawal to E-Rupee Coin wallet approved by Admin', date: '2026-07-15 12:00', beans: '-8,000 Beans', type: 'debit' }
  ])

  // --- ACTIONS ---

  const handleAddHost = (e) => {
    e.preventDefault()
    if (!newHostName) return
    const newHost = {
      id: `H-${Math.floor(100 + Math.random() * 900)}`,
      name: newHostName,
      agent: newHostAgent,
      status: 'Offline',
      beans: 0,
      target: newHostTarget,
      tier: 'In Progress'
    }
    setHosts([newHost, ...hosts])
    setNewHostName('')
    // Update bound hosts counter in matching Agent if any
    setAgents(agents.map(a => a.name === newHostAgent ? { ...a, hostsBound: a.hostsBound + 1 } : a))
  }

  const handleCreateAgent = (e) => {
    e.preventDefault()
    if (!newAgentName) return
    const newAg = {
      id: `AG-${Math.floor(800 + Math.random() * 200)}`,
      name: newAgentName,
      status: 'Active',
      hostsBound: 0,
      commissionRate: newAgentCommission,
      totalEarned: 0
    }
    setAgents([...agents, newAg])
    setNewAgentName('')
  }

  const simulatePKBattle = () => {
    if (battleStatus === 'loading') return
    setBattleStatus('loading')
    setTimeout(() => {
      const victory = Math.random() > 0.4
      const amount = Math.floor(2000 + Math.random() * 8000)
      if (victory) {
        setBattleStatus('won')
        setBattleBeansWon(amount)
        // Add beans to selected host
        setHosts(hosts.map(h => h.id === streamingHostId ? { ...h, beans: h.beans + amount } : h))
        // Append to ledger
        const targetHost = hosts.find(h => h.id === streamingHostId)
        setAuditLedger([
          { text: `PK Battle Victory! ${targetHost?.name} vs ${battleOpponent}`, date: new Date().toISOString().replace('T', ' ').substring(0,16), beans: `+${amount.toLocaleString()} Beans`, type: 'credit' },
          ...auditLedger
        ])
      } else {
        setBattleStatus('lost')
        setBattleBeansWon(0)
      }
    }, 1500)
  }

  const handleWithdrawalRequest = (e) => {
    e.preventDefault()
    if (withdrawalBeans <= 0 || withdrawalBeans > availableBeans) return
    setAvailableBeans(availableBeans - withdrawalBeans)
    setAuditLedger([
      { text: `Withdrawal request for E-Rupee Conversion`, date: new Date().toISOString().replace('T', ' ').substring(0,16), beans: `-${withdrawalBeans.toLocaleString()} Beans`, type: 'debit' },
      ...auditLedger
    ])
    setWithdrawalBeans(0)
    alert('Withdrawal request successfully logged and queued for audit!')
  }

  const applyRevSharePreset = (preset) => {
    switch (preset) {
      case 'host-focused':
        setRevPlatform(25); setRevDiamond(5); setRevAgency(10); setRevAgent(10); setRevHost(50)
        break
      case 'platform-focused':
        setRevPlatform(50); setRevDiamond(10); setRevAgency(15); setRevAgent(10); setRevHost(15)
        break
      case 'balanced':
        setRevPlatform(30); setRevDiamond(10); setRevAgency(20); setRevAgent(10); setRevHost(30)
        break
      default:
        break
    }
  }


  // Filtered Hosts list
  const filteredHosts = hosts.filter(h => 
    h.name.toLowerCase().includes(hostSearch.toLowerCase()) || 
    h.agent.toLowerCase().includes(hostSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8F8FA] flex flex-col font-sans selection:bg-red-500 selection:text-white overflow-x-hidden">
      
      {/* Top Header */}
      <header className="w-full bg-[#E51E25] text-white py-3 px-4 md:px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-[9999] shadow-md min-h-[56px] sm:min-h-[60px]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-bold hidden sm:inline">Back</span>
          </Link>
          <div className="w-px h-5 bg-white/30 hidden sm:block"></div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
            <span className="font-extrabold text-sm sm:text-lg tracking-tight select-none">eRupai Agency Portal</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold bg-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
          <Activity className="w-3.5 h-3.5 text-green-300 animate-pulse" />
          <span>Portal Connected</span>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[10000] lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside className={`fixed top-0 left-0 h-full w-72 max-w-[85vw] bg-white z-[10001] transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto shadow-2xl ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#E51E25]" />
            <span className="font-black text-slate-800">Agency Portal</span>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        <div className="py-3 px-3 flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const hasChildren = item.children && item.children.length > 0
            const isExpanded = expandedMenus[item.key]
            
            return (
              <div key={item.key}>
                <button
                  onClick={() => hasChildren ? toggleMenu(item.key) : selectTab(item.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold transition-all ${
                    activeTab === item.key
                      ? 'bg-[#E51E25] text-white shadow-lg shadow-red-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {hasChildren && (
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  )}
                </button>
                {hasChildren && isExpanded && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <button
                        key={child.key}
                        onClick={() => selectTab(child.key)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs font-bold transition-all ${
                          activeTab === child.key
                            ? 'bg-red-50 text-[#E51E25]'
                            : 'text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <span>{child.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </aside>


      {/* Main Core Flex Layout */}
      <div className="flex flex-1 w-full max-w-[1440px] mx-auto overflow-x-hidden pt-14 sm:pt-16">

        {/* Desktop Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-100 py-4 sm:py-6 px-3 sm:px-4 hidden lg:flex flex-col gap-1.5 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto shrink-0 pt-20">
          {menuItems.map((item) => {
            const Icon = item.icon
            const hasChildren = item.children && item.children.length > 0
            const isExpanded = expandedMenus[item.key]
            
            return (
              <div key={item.key}>
                <button
                  onClick={() => hasChildren ? toggleMenu(item.key) : selectTab(item.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl text-left text-sm font-bold transition-all active:scale-[0.98] ${
                    activeTab === item.key
                      ? 'bg-[#E51E25] text-white shadow-lg shadow-red-200/50'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px] shrink-0" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {hasChildren && (
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  )}
                </button>
                {hasChildren && isExpanded && (
                  <div className="ml-6 mb-2 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <button
                        key={child.key}
                        onClick={() => selectTab(child.key)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs font-bold transition-all ${
                          activeTab === child.key
                            ? 'bg-red-50 text-[#E51E25]'
                            : 'text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <span>{child.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </aside>

        {/* Dynamic Center Workstation */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 overflow-x-hidden">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              {menuItems.find(m => m.key === activeTab)?.label || 'Dashboard'}
            </h2>
          </div>

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Host Stats */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Hosts</span>
                  <div className="text-lg font-black text-slate-800 mt-1">{dashboardMetrics.totalHosts}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Hosts</span>
                  <div className="text-lg font-black text-green-600 mt-1">{dashboardMetrics.activeHosts}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Hosts</span>
                  <div className="text-lg font-black text-[#E51E25] mt-1">{dashboardMetrics.liveHosts}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Offline Hosts</span>
                  <div className="text-lg font-black text-slate-600 mt-1">{dashboardMetrics.offlineHosts}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inactive Hosts</span>
                  <div className="text-lg font-black text-amber-600 mt-1">{dashboardMetrics.inactiveHosts}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">VIP Hosts</span>
                  <div className="text-lg font-black text-purple-600 mt-1">{dashboardMetrics.vipHosts}</div>
                </div>

                {/* Agent Stats */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Agents</span>
                  <div className="text-lg font-black text-slate-800 mt-1">{dashboardMetrics.totalAgents}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Join Requests</span>
                  <div className="text-lg font-black text-amber-600 mt-1">{dashboardMetrics.pendingJoinRequests}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Leave Requests</span>
                  <div className="text-lg font-black text-amber-600 mt-1">{dashboardMetrics.pendingLeaveRequests}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Withdraw Requests</span>
                  <div className="text-lg font-black text-amber-600 mt-1">{dashboardMetrics.pendingWithdrawRequests}</div>
                </div>

              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Live Hours Chart */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 text-sm mb-4">Live Hours Chart</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={liveHoursChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                      <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Host Growth */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 text-sm mb-4">Host Growth</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={hostGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                      <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                      <Tooltip />
                      <Bar dataKey="hosts" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

              </div>

              {/* Recent Added Agents */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-extrabold text-slate-800 text-sm mb-4">Recent Added Agents</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                      <tr>
                        <th className="px-4 py-3">Agent ID</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Joined Date</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentAgents.map((agent) => (
                        <tr key={agent.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 font-bold text-slate-800">{agent.id}</td>
                          <td className="px-4 py-3 font-bold text-slate-700">{agent.name}</td>
                          <td className="px-4 py-3 text-slate-600">{agent.email}</td>
                          <td className="px-4 py-3 text-slate-600">{agent.joinedDate}</td>
                          <td className="px-4 py-3">
                            {agent.status === 'active' ? (
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Active</span>
                            ) : (
                              <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Pending</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activity & Notifications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 text-sm mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivities.map((activity) => {
                      const Icon = activity.icon
                      return (
                        <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-[#E51E25]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-800 truncate">{activity.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-extrabold text-slate-800 text-sm">Notifications</h3>
                    <button
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                      className="text-xs font-bold text-[#E51E25] hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-xl border transition-colors ${
                          notification.read ? 'bg-slate-50 border-slate-100' : 'bg-white border-red-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-amber-500' :
                            notification.type === 'info' ? 'bg-blue-500' : 'bg-slate-400'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-800">{notification.title}</p>
                            <p className="text-xs text-slate-500 mt-1">{notification.message}</p>
                            <p className="text-[10px] text-slate-400 mt-2">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <button
                              onClick={() => setNotifications(notifications.map(n => n.id === notification.id ? { ...n, read: true } : n))}
                              className="text-xs font-bold text-[#E51E25] hover:underline shrink-0"
                            >
                              Mark read
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recruitment & Commission Content */}
          {activeTab === 'recruitment' && (
            <div className="space-y-6">
              {/* Join Requests */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-[#E51E25]" /> Join Requests
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                      <tr>
                        <th className="p-3">Host Name</th>
                        <th className="p-3">Host ID</th>
                        <th className="p-3">Recruitment Source</th>
                        <th className="p-3">Agent Name</th>
                        <th className="p-3">Commission Split</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Requested At</th>
                        <th className="p-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {joinRequests.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="p-6 text-center text-slate-400 font-semibold">No pending join requests</td>
                        </tr>
                      ) : (
                        joinRequests.map((request) => (
                          <tr key={request.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3 font-bold text-slate-800">{request.hostName}</td>
                            <td className="p-3 font-mono text-[#E51E25]">{request.hostId}</td>
                            <td className="p-3">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                request.recruitmentSource === 'Direct' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                              }`}>
                                {request.recruitmentSource}
                              </span>
                            </td>
                            <td className="p-3 text-slate-600">{request.agentName}</td>
                            <td className="p-3 font-mono font-bold text-slate-700">{request.commissionSplit}</td>
                            <td className="p-3">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                request.status === 'Approved' ? 'bg-green-50 text-green-600' :
                                request.status === 'Rejected' ? 'bg-red-50 text-red-600' :
                                'bg-amber-50 text-amber-600'
                              }`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="p-3 text-slate-400 text-xs">{request.requestedAt}</td>
                            <td className="p-3 text-center">
                              {request.status === 'Pending' && (
                                <div className="flex gap-2 justify-center">
                                  <button
                                    onClick={() => setJoinRequests(joinRequests.map(r => r.id === request.id ? { ...r, status: 'Approved' } : r))}
                                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-lg transition-colors"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => setJoinRequests(joinRequests.filter(r => r.id !== request.id))}
                                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* New Join Request Form */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h4 className="font-extrabold text-slate-800 text-sm mb-4">Create New Join Request</h4>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    if (!newJoinRequest.hostName) return
                    const newRequest = {
                      id: `JR-${String(joinRequests.length + 1).padStart(3, '0')}`,
                      hostName: newJoinRequest.hostName,
                      hostId: `H-${String(1000 + joinRequests.length + 1)}`,
                      recruitmentSource: newJoinRequest.recruitmentSource,
                      agentName: newJoinRequest.recruitmentSource === 'Agent' ? newJoinRequest.agentName : '-',
                      commissionSplit: newJoinRequest.recruitmentSource === 'Direct' ? '100-0' : '50-50',
                      status: 'Pending',
                      requestedAt: new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
                    }
                    setJoinRequests([newRequest, ...joinRequests])
                    setNewJoinRequest({ hostName: '', recruitmentSource: 'Direct', agentName: '', commissionSplit: '100-0' })
                  }} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Host Name</label>
                      <input
                        type="text"
                        required
                        value={newJoinRequest.hostName}
                        onChange={(e) => setNewJoinRequest({ ...newJoinRequest, hostName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                        placeholder="Enter host name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Recruitment Source</label>
                      <select
                        value={newJoinRequest.recruitmentSource}
                        onChange={(e) => setNewJoinRequest({ ...newJoinRequest, recruitmentSource: e.target.value, commissionSplit: e.target.value === 'Direct' ? '100-0' : '50-50' })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      >
                        <option value="Direct">Direct Agency</option>
                        <option value="Agent">Agent</option>
                      </select>
                    </div>
                    {newJoinRequest.recruitmentSource === 'Agent' && (
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Agent Name</label>
                        <input
                          type="text"
                          required={newJoinRequest.recruitmentSource === 'Agent'}
                          value={newJoinRequest.agentName}
                          onChange={(e) => setNewJoinRequest({ ...newJoinRequest, agentName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                          placeholder="Enter agent name"
                        />
                      </div>
                    )}
                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="w-full bg-[#E51E25] hover:bg-[#c4161c] text-white py-2 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all"
                      >
                        Create Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Leave Requests */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-[#E51E25]" /> Leave Requests
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                      <tr>
                        <th className="p-3">Host Name</th>
                        <th className="p-3">Host ID</th>
                        <th className="p-3">Reason</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Requested At</th>
                        <th className="p-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leaveRequests.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="p-6 text-center text-slate-400 font-semibold">No pending leave requests</td>
                        </tr>
                      ) : (
                        leaveRequests.map((request) => (
                          <tr key={request.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3 font-bold text-slate-800">{request.hostName}</td>
                            <td className="p-3 font-mono text-[#E51E25]">{request.hostId}</td>
                            <td className="p-3 text-slate-600">{request.reason}</td>
                            <td className="p-3">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                request.status === 'Approved' ? 'bg-green-50 text-green-600' :
                                request.status === 'Rejected' ? 'bg-red-50 text-red-600' :
                                'bg-amber-50 text-amber-600'
                              }`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="p-3 text-slate-400 text-xs">{request.requestedAt}</td>
                            <td className="p-3 text-center">
                              {request.status === 'Pending' && (
                                <div className="flex gap-2 justify-center">
                                  <button
                                    onClick={() => setLeaveRequests(leaveRequests.map(r => r.id === request.id ? { ...r, status: 'Approved' } : r))}
                                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-lg transition-colors"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => setLeaveRequests(leaveRequests.filter(r => r.id !== request.id))}
                                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Transfer Requests */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-[#E51E25]" /> Transfer Requests
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                      <tr>
                        <th className="p-3">Host Name</th>
                        <th className="p-3">Host ID</th>
                        <th className="p-3">Current Agency</th>
                        <th className="p-3">Target Agency</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Cooling Period Ends</th>
                        <th className="p-3">Requested At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {transferRequests.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="p-6 text-center text-slate-400 font-semibold">No transfer requests</td>
                        </tr>
                      ) : (
                        transferRequests.map((request) => (
                          <tr key={request.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3 font-bold text-slate-800">{request.hostName}</td>
                            <td className="p-3 font-mono text-[#E51E25]">{request.hostId}</td>
                            <td className="p-3 text-slate-600">{request.currentAgency}</td>
                            <td className="p-3 text-slate-600">{request.targetAgency}</td>
                            <td className="p-3">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                request.status === 'Cooling Period' ? 'bg-amber-50 text-amber-600' :
                                request.status === 'Completed' ? 'bg-green-50 text-green-600' :
                                'bg-slate-50 text-slate-600'
                              }`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="p-3 text-slate-400 text-xs">{request.coolingEndsAt}</td>
                            <td className="p-3 text-slate-400 text-xs">{request.requestedAt}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* New Transfer Request Form */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h4 className="font-extrabold text-slate-800 text-sm mb-4">Create Transfer Request</h4>
                  <p className="text-xs text-slate-500 mb-4">Note: Transfer requests have a 6-hour cooling period before completion.</p>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    if (!newTransferRequest.hostName || !newTransferRequest.targetAgency) return
                    const now = new Date()
                    const coolingEnd = new Date(now.getTime() + 6 * 60 * 60 * 1000)
                    const newRequest = {
                      id: `TR-${String(transferRequests.length + 1).padStart(3, '0')}`,
                      hostName: newTransferRequest.hostName,
                      hostId: `H-${String(1000 + transferRequests.length + 10)}`,
                      currentAgency: 'Diamond Agency',
                      targetAgency: newTransferRequest.targetAgency,
                      status: 'Cooling Period',
                      coolingEndsAt: coolingEnd.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                      requestedAt: now.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
                    }
                    setTransferRequests([newRequest, ...transferRequests])
                    setNewTransferRequest({ hostName: '', targetAgency: '' })
                  }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Host Name</label>
                      <input
                        type="text"
                        required
                        value={newTransferRequest.hostName}
                        onChange={(e) => setNewTransferRequest({ ...newTransferRequest, hostName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                        placeholder="Enter host name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Agency</label>
                      <input
                        type="text"
                        required
                        value={newTransferRequest.targetAgency}
                        onChange={(e) => setNewTransferRequest({ ...newTransferRequest, targetAgency: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                        placeholder="Enter target agency"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="w-full bg-[#E51E25] hover:bg-[#c4161c] text-white py-2 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all"
                      >
                        Create Transfer Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Content */}
          {activeTab === 'notifications' && (
            <AgencyNotifications announcementData={announcementData} setAnnouncementData={setAnnouncementData} />
          )}

          {/* Reports Content */}
          {activeTab === 'reports' && (
            <AgencyReports />
          )}

          {/* Analytics Content */}
          {activeTab === 'analytics' && (
            <AgencyAnalytics />
          )}

          {/* Earnings Content */}
          {activeTab === 'earnings' && (
            <AgencyEarnings />
          )}

          {/* Target Management Content */}
          {activeTab === 'target-management' && (
            <AgencyTargetManagement />
          )}

          {/* Progress Chart Content */}
          {activeTab === 'progress-chart' && (
            <AgencyProgressChart />
          )}

          {/* Charisma & Contribution Content */}
          {activeTab === 'charisma-contribution' && (
            <AgencyCharismaContribution />
          )}

          {/* Hourly Live History Content */}
          {activeTab === 'hourly-live-history' && (
            <AgencyHourlyLiveHistory />
          )}

          {/* Performance Content */}
          {activeTab === 'performance' && (
            <AgencyPerformance />
          )}

          {/* Host Management Content */}
          {(activeTab === 'host-management' || activeTab.startsWith('host-management-')) && (
            <AgencyHostManagement subTab={hostManagementSubTab} />
          )}

          {/* Agent Management Content */}
          {(activeTab === 'agent-management' || activeTab.startsWith('agent-management-')) && (
            <AgencyAgentManagement subTab={agentManagementSubTab} />
          )}

          {/* Settings Content */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Settings Navigation Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
                {[
                  { key: 'profile', label: 'Agency Profile' },
                  { key: 'managers', label: 'Managers' },
                  { key: 'recruiters', label: 'Recruiters' },
                  { key: 'trainers', label: 'Trainers' },
                  { key: 'roles', label: 'Roles & Permissions' },
                  { key: 'security', label: 'Security' },
                  { key: 'activity', label: 'Activity Logs' },
                  { key: 'appearance', label: 'Language & Theme' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSettingsTab(tab.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      settingsTab === tab.key
                        ? 'bg-[#E51E25] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Agency Profile */}
              {settingsTab === 'profile' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
                    <Gem className="w-4 h-4 text-[#E51E25]" /> Agency Profile
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Agency Name</label>
                      <input
                        type="text"
                        value={agencyProfile.agencyName}
                        onChange={(e) => setAgencyProfile({ ...agencyProfile, agencyName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Agency ID</label>
                      <input
                        type="text"
                        value={agencyProfile.agencyId}
                        disabled
                        className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-400 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Email</label>
                      <input
                        type="email"
                        value={agencyProfile.email}
                        onChange={(e) => setAgencyProfile({ ...agencyProfile, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Phone</label>
                      <input
                        type="text"
                        value={agencyProfile.phone}
                        onChange={(e) => setAgencyProfile({ ...agencyProfile, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Address</label>
                      <input
                        type="text"
                        value={agencyProfile.address}
                        onChange={(e) => setAgencyProfile({ ...agencyProfile, address: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Description</label>
                      <textarea
                        value={agencyProfile.description}
                        onChange={(e) => setAgencyProfile({ ...agencyProfile, description: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Profile updated successfully!')}
                    className="mt-4 bg-[#E51E25] hover:bg-[#c4161c] text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              )}

              {/* Managers */}
              {settingsTab === 'managers' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#E51E25]" /> Managers
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                        <tr>
                          <th className="p-3">Name</th>
                          <th className="p-3">Email</th>
                          <th className="p-3">Role</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Joined Date</th>
                          <th className="p-3 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {managers.map((manager) => (
                          <tr key={manager.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3 font-bold text-slate-800">{manager.name}</td>
                            <td className="p-3 text-slate-600">{manager.email}</td>
                            <td className="p-3">
                              <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-bold">{manager.role}</span>
                            </td>
                            <td className="p-3">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                manager.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                              }`}>
                                {manager.status}
                              </span>
                            </td>
                            <td className="p-3 text-slate-400 text-xs">{manager.joinedDate}</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => setManagers(managers.filter(m => m.id !== manager.id))}
                                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Recruiters */}
              {settingsTab === 'recruiters' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-[#E51E25]" /> Recruiters
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                        <tr>
                          <th className="p-3">Name</th>
                          <th className="p-3">Email</th>
                          <th className="p-3">Targets</th>
                          <th className="p-3">Achieved</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Joined Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {recruiters.map((recruiter) => (
                          <tr key={recruiter.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3 font-bold text-slate-800">{recruiter.name}</td>
                            <td className="p-3 text-slate-600">{recruiter.email}</td>
                            <td className="p-3 text-slate-700">{recruiter.targets}</td>
                            <td className="p-3 text-green-600 font-bold">{recruiter.achieved}</td>
                            <td className="p-3">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                recruiter.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                              }`}>
                                {recruiter.status}
                              </span>
                            </td>
                            <td className="p-3 text-slate-400 text-xs">{recruiter.joinedDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Trainers */}
              {settingsTab === 'trainers' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 text-sm mb-4">Trainers</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                        <tr>
                          <th className="p-3">Name</th>
                          <th className="p-3">Email</th>
                          <th className="p-3">Specialty</th>
                          <th className="p-3">Sessions</th>
                          <th className="p-3">Rating</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {trainers.map((trainer) => (
                          <tr key={trainer.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3 font-bold text-slate-800">{trainer.name}</td>
                            <td className="p-3 text-slate-600">{trainer.email}</td>
                            <td className="p-3 text-slate-700">{trainer.specialty}</td>
                            <td className="p-3 text-slate-700">{trainer.sessions}</td>
                            <td className="p-3 text-yellow-600 font-bold">{trainer.rating}</td>
                            <td className="p-3">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                trainer.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                              }`}>
                                {trainer.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Roles & Permissions */}
              {settingsTab === 'roles' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#E51E25]" /> Roles & Permissions
                  </h3>
                  <div className="space-y-3">
                    {roles.map((role) => (
                      <div key={role.id} className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-slate-800">{role.name}</h4>
                            <p className="text-xs text-slate-500 mt-1">{role.users} users assigned</p>
                          </div>
                          <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">{role.permissions.length} permissions</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {role.permissions.map((perm, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                              {perm}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security */}
              {settingsTab === 'security' && (
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#E51E25]" /> Security Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">Two-Factor Authentication</h4>
                          <p className="text-xs text-slate-500 mt-1">Add an extra layer of security to your account</p>
                        </div>
                        <button
                          onClick={() => setSecuritySettings({ ...securitySettings, twoFactorEnabled: !securitySettings.twoFactorEnabled })}
                          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                            securitySettings.twoFactorEnabled
                              ? 'bg-green-500 text-white'
                              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          }`}
                        >
                          {securitySettings.twoFactorEnabled ? 'Enabled' : 'Enable'}
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Current Password</label>
                          <input
                            type="password"
                            value={securitySettings.password}
                            onChange={(e) => setSecuritySettings({ ...securitySettings, password: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                            placeholder="Enter current password"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">New Password</label>
                          <input
                            type="password"
                            value={securitySettings.newPassword}
                            onChange={(e) => setSecuritySettings({ ...securitySettings, newPassword: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                            placeholder="Enter new password"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Confirm Password</label>
                          <input
                            type="password"
                            value={securitySettings.confirmPassword}
                            onChange={(e) => setSecuritySettings({ ...securitySettings, confirmPassword: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (!securitySettings.password || !securitySettings.newPassword || !securitySettings.confirmPassword) {
                            alert('Please fill all password fields')
                            return
                          }
                          if (securitySettings.newPassword === securitySettings.password) {
                            alert('New password cannot be the same as current password')
                            return
                          }
                          if (securitySettings.newPassword !== securitySettings.confirmPassword) {
                            alert('New password and confirm password do not match')
                            return
                          }
                          alert('Password updated successfully!')
                          setSecuritySettings({ ...securitySettings, password: '', newPassword: '', confirmPassword: '' })
                        }}
                        className="bg-[#E51E25] hover:bg-[#c4161c] text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-extrabold text-slate-800 text-sm mb-4">Login History</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                          <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">IP Address</th>
                            <th className="p-3">Device</th>
                            <th className="p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {securitySettings.loginHistory.map((login) => (
                            <tr key={login.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-3 text-slate-400 text-xs">{login.date}</td>
                              <td className="p-3 text-slate-600 font-mono text-xs">{login.ip}</td>
                              <td className="p-3 text-slate-600">{login.device}</td>
                              <td className="p-3">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                  login.status === 'Success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                }`}>
                                  {login.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Logs */}
              {settingsTab === 'activity' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#E51E25]" /> Activity Logs
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-100">
                        <tr>
                          <th className="p-3">Action</th>
                          <th className="p-3">User</th>
                          <th className="p-3">Timestamp</th>
                          <th className="p-3">IP Address</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {activityLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3 font-bold text-slate-800">{log.action}</td>
                            <td className="p-3 text-slate-600">{log.user}</td>
                            <td className="p-3 text-slate-400 text-xs">{log.timestamp}</td>
                            <td className="p-3 text-slate-600 font-mono text-xs">{log.ip}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Language & Theme */}
              {settingsTab === 'appearance' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#E51E25]" /> Language & Theme
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Language</label>
                      <select
                        value={languageSettings}
                        onChange={(e) => setLanguageSettings(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      >
                        <option value="en">English</option>
                        <option value="ne">नेपाली (Nepali)</option>
                        <option value="hi">हिन्दी (Hindi)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Theme</label>
                      <div className="flex gap-3">
                        {[
                          { value: 'light', label: 'Light', icon: Sun },
                          { value: 'dark', label: 'Dark', icon: Moon },
                          { value: 'system', label: 'System', icon: Laptop }
                        ].map((theme) => {
                          const Icon = theme.icon
                          return (
                            <button
                              key={theme.value}
                              onClick={() => setThemeSettings(theme.value)}
                              className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                                themeSettings === theme.value
                                  ? 'border-[#E51E25] bg-red-50'
                                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                              }`}
                            >
                              <div className="flex justify-center mb-2">
                                <Icon className="w-6 h-6 text-slate-700" />
                              </div>
                              <div className="text-xs font-bold text-slate-800">{theme.label}</div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

    </div>
  )
}
