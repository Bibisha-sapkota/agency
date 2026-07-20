import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  Wifi,
  Wallet,
  Star,
  Gift,
  Download,
  ChevronDown,
  ChevronRight,
  Home,
  Bell,
  Clock,
  Swords,
  Gift as GiftIcon,
  UserPlus,
  UserMinus,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Calendar,
  Award,
  TrendingUp,
  Radio,
  UserX,
  LayoutDashboard,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AgencyOverview({ subTab = "overview" }) {
  /* ---------------- KPI summary ---------------- */
  const kpis = [
    { label: "Total Hosts", value: "1,250", change: "+12.5% vs Apr 2025", icon: Users, bg: "bg-violet-50", iconColor: "text-violet-600" },
    { label: "Active Hosts", value: "980", change: "+10.3% vs Apr 2025", icon: UserCheck, bg: "bg-amber-50", iconColor: "text-amber-600" },
    { label: "Online Now", value: "320", change: "+8.7% vs Apr 2025", icon: Wifi, bg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { label: "Total Revenue", value: "₹25,60,800", change: "+15.8% vs Apr 2025", icon: Wallet, bg: "bg-blue-50", iconColor: "text-blue-600" },
    { label: "Total Charisma", value: "₹1,25,80,300", change: "+18.2% vs Apr 2025", icon: Star, bg: "bg-rose-50", iconColor: "text-rose-600" },
    { label: "Total Contribution", value: "₹98,75,500", change: "+14.8% vs Apr 2025", icon: Gift, bg: "bg-orange-50", iconColor: "text-orange-600" },
  ];

  /* ---------------- Chart data ---------------- */
  const revenueData = [
    { date: "01 May", value: 8 },
    { date: "08 May", value: 15 },
    { date: "15 May", value: 12 },
    { date: "22 May", value: 26 },
    { date: "31 May", value: 40 },
  ];

  const charismaData = [
    { date: "01 May", value: 30 },
    { date: "08 May", value: 55 },
    { date: "15 May", value: 48 },
    { date: "22 May", value: 78 },
    { date: "31 May", value: 100 },
  ];

  const hostActivityData = [
    { name: "Active Hosts", value: 980, pct: "78.4%", color: "#10B981" },
    { name: "Inactive Hosts", value: 150, pct: "12.0%", color: "#F59E0B" },
    { name: "New Hosts", value: 95, pct: "7.6%", color: "#3B82F6" },
    { name: "Banned Hosts", value: 25, pct: "2.0%", color: "#9CA3AF" },
  ];

  const revenueSourceData = [
    { name: "Live Gifts", value: 1625600, pct: "63.4%", color: "#8B5CF6" },
    { name: "PK Battles", value: 480200, pct: "18.8%", color: "#EC4899" },
    { name: "Private Calls", value: 295300, pct: "11.5%", color: "#3B82F6" },
    { name: "Other Sources", value: 159700, pct: "6.2%", color: "#F59E0B" },
  ];

  const topHosts = [
    { rank: 1, name: "Pooja Singh", level: 3, revenue: "₹2,45,300", charisma: "₹12,50,300" },
    { rank: 2, name: "Anjali Sharma", level: 2, revenue: "₹2,15,600", charisma: "₹10,20,400" },
    { rank: 3, name: "Riya Mehta", level: 2, revenue: "₹1,85,400", charisma: "₹8,60,200" },
    { rank: 4, name: "Kavya Reddy", level: 1, revenue: "₹1,65,200", charisma: "₹7,80,100" },
    { rank: 5, name: "Neha Patel", level: 3, revenue: "₹1,50,300", charisma: "₹6,90,400" },
  ];

  const summary = [
    { label: "Total Live Hours", value: "12,450h", change: "+11.4%", up: true, icon: Clock },
    { label: "Total PK Battles", value: "245", change: "+9.6%", up: true, icon: Swords },
    { label: "Total Gifts Sent", value: "98,450", change: "+13.2%", up: true, icon: GiftIcon },
    { label: "Total Visitors Joined", value: "2,45,680", change: "+10.7%", up: true, icon: UserPlus },
    { label: "Total Visitors Left", value: "1,25,430", change: "-5.3%", up: false, icon: UserMinus },
    { label: "Average Viewer Retention", value: "68.45%", change: "+8.4%", up: true, icon: Eye },
  ];

  const alerts = [
    { title: "Target achieved by Pooja Singh", note: "Level 3 target completed", time: "2 min ago", icon: CheckCircle2, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { title: "Low Live Hours Alert", note: "5 hosts live hours are below target", time: "15 min ago", icon: AlertTriangle, iconBg: "bg-amber-50", iconColor: "text-amber-600" },
    { title: "High Revenue Alert", note: "Anjali Sharma earned ₹50,000+ today", time: "30 min ago", icon: GiftIcon, iconBg: "bg-violet-50", iconColor: "text-violet-600" },
    { title: "PK Battle Completed", note: "PK between Pooja Singh & Neha Patel", time: "45 min ago", icon: Info, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
  ];

  const levelBadgeClass = (level) => {
    if (level === 3) return "bg-violet-50 text-violet-700";
    if (level === 2) return "bg-blue-50 text-blue-700";
    return "bg-amber-50 text-amber-700";
  };

  /* ---------------- Agent Dashboard tab data ---------------- */
  const agents = [
    { id: "AG-001", name: "Rahul Thapa", status: "active", joinDate: "2024-01-15", registeredHosts: 25, activeHosts: 20, liveHosts: 5, monthlyRecruitment: 3, performance: 92, assignedHosts: 18, completedSessions: 42, liveSessions: 12, attendance: "96%", lastActive: "1 hour ago" },
    { id: "AG-002", name: "Priya Gurung", status: "active", joinDate: "2024-02-20", registeredHosts: 18, activeHosts: 15, liveHosts: 3, monthlyRecruitment: 2, performance: 88, assignedHosts: 14, completedSessions: 35, liveSessions: 7, attendance: "93%", lastActive: "2 hours ago" },
    { id: "AG-003", name: "Amit KC", status: "active", joinDate: "2024-03-10", registeredHosts: 32, activeHosts: 28, liveHosts: 8, monthlyRecruitment: 4, performance: 95, assignedHosts: 28, completedSessions: 54, liveSessions: 18, attendance: "98%", lastActive: "30 min ago" },
    { id: "AG-004", name: "Nisha Rai", status: "suspended", joinDate: "2024-04-05", registeredHosts: 15, activeHosts: 10, liveHosts: 2, monthlyRecruitment: 1, performance: 78, assignedHosts: 10, completedSessions: 22, liveSessions: 4, attendance: "89%", lastActive: "1 day ago" },
    { id: "AG-005", name: "Suman Shrestha", status: "active", joinDate: "2024-05-12", registeredHosts: 28, activeHosts: 23, liveHosts: 6, monthlyRecruitment: 3, performance: 85, assignedHosts: 20, completedSessions: 39, liveSessions: 10, attendance: "94%", lastActive: "3 hours ago" },
  ];

  const totalRegisteredHosts = 5;
  const totalApprovedHosts = 4;
  const totalPendingHosts = 1;
  const totalActiveHosts = agents.reduce((sum, a) => sum + a.activeHosts, 0);
  const totalLiveHosts = agents.reduce((sum, a) => sum + a.liveHosts, 0);
  const totalInactiveHosts = Math.max(0, totalRegisteredHosts - totalActiveHosts);
  const totalMonthlyRecruitment = agents.reduce((sum, a) => sum + a.monthlyRecruitment, 0);
  const averagePerformanceScore = Math.round(agents.reduce((sum, a) => sum + a.performance, 0) / agents.length);
  const topPerformer = agents.reduce((best, a) => (a.performance > best.performance ? a : best), agents[0]);
  const monthlyRecruitmentTarget = 30;
  const targetCompletionPercent = Math.min(100, Math.round((totalMonthlyRecruitment / monthlyRecruitmentTarget) * 100));

  const agentStatusBadge = (status) =>
    status === "active" ? (
      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700">Active</span>
    ) : (
      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700">Suspended</span>
    );

  const agentKpis = [
    { label: "Total Agents", value: agents.length, sub: "registered agents", icon: Users, bg: "bg-violet-50", iconColor: "text-violet-600" },
    { label: "Monthly Recruitment", value: totalMonthlyRecruitment, sub: "hosts recruited this month", icon: TrendingUp, bg: "bg-blue-50", iconColor: "text-black" },
    { label: "Avg Performance", value: `${averagePerformanceScore}%`, sub: "monthly performance score", icon: Award, bg: "bg-amber-50", iconColor: "text-amber-600" },
    { label: "Registered Hosts", value: totalRegisteredHosts, sub: "platform-wide registrations", icon: UserPlus, bg: "bg-rose-50", iconColor: "text-rose-600" },
    { label: "Approved Hosts", value: totalApprovedHosts, sub: "approved by agency", icon: CheckCircle2, bg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { label: "Pending Hosts", value: totalPendingHosts, sub: "waiting agency review", icon: Clock, bg: "bg-orange-50", iconColor: "text-orange-600" },
    { label: "Live Hosts", value: totalLiveHosts, sub: "currently live", icon: Radio, bg: "bg-violet-50", iconColor: "text-violet-600" },
    { label: "Active Hosts", value: totalActiveHosts, sub: "currently active", icon: UserCheck, bg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { label: "Inactive Hosts", value: totalInactiveHosts, sub: "inactive hosts", icon: UserX, bg: "bg-gray-100", iconColor: "text-black" },
  ];

  const [mainTab, setMainTab] = useState(subTab);

  useEffect(() => {
    setMainTab(subTab)
  }, [subTab])

  const [revenuePeriod, setRevenuePeriod] = useState("This Month");
  const [charismaPeriod, setCharismaPeriod] = useState("This Month");
  const [activityPeriod, setActivityPeriod] = useState("This Month");
  const [hostsPeriod, setHostsPeriod] = useState("This Month");
  const [sourcePeriod, setSourcePeriod] = useState("This Month");
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleExportReport = () => {
    const headers = [
      'Agent ID',
      'Agent Name',
      'Status',
      'Join Date',
      'Registered Hosts',
      'Active Hosts',
      'Live Hosts',
      'Monthly Recruitment',
      'Performance (%)',
    ];

    const rows = agents.map((agent) => [
      agent.id,
      agent.name,
      agent.status,
      agent.joinDate,
      agent.registeredHosts,
      agent.activeHosts,
      agent.liveHosts,
      agent.monthlyRecruitment,
      agent.performance,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `agent-report-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Report exported');
  };

  const PeriodSelect = ({ value, onChange }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-gray-300 pl-3 pr-7 py-1.5 text-xs font-medium text-black focus:outline-none"
      >
        <option>This Month</option>
        <option>Last Month</option>
        <option>This Quarter</option>
        <option>This Year</option>
      </select>
      <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-black" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[60] bg-black text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-lg">
          {toast}
        </div>
      )}


      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-black">Agency Overview</h1>
            <p className="flex items-center gap-1.5 text-xs text-black mt-1">
              <Home size={12} />
              Dashboard
              <ChevronRight size={12} />
              <span className="text-black font-medium">Agency Overview</span>
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMainTab("overview")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
                mainTab === "overview" ? "bg-black text-white" : "border border-gray-300 text-black hover:bg-gray-100"
              }`}
            >
              <Home size={15} />
              Overview
            </button>
            <button
              onClick={() => setMainTab("recruitment-history")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
                mainTab === "recruitment-history" ? "bg-black text-white" : "border border-gray-300 text-black hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard size={15} />
              Recruitment History
            </button>
            <button
              onClick={() => setMainTab("agent-performance")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
                mainTab === "agent-performance" ? "bg-black text-white" : "border border-gray-300 text-black hover:bg-gray-100"
              }`}
            >
              <Award size={15} />
              Agent Performance
            </button>
            <button
              onClick={() => setMainTab("agent-work")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
                mainTab === "agent-work" ? "bg-black text-white" : "border border-gray-300 text-black hover:bg-gray-100"
              }`}
            >
              <Clock size={15} />
              Agent Work
            </button>
            <button
              onClick={handleExportReport}
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              <Download size={15} className="text-white" />
              Export Report
            </button>
          </div>
        </div>

        {mainTab === "overview" && (
        <>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-3 ${k.bg}`}>
                  <Icon size={16} className={k.iconColor} />
                </div>
                <p className="text-xs text-black">{k.label}</p>
                <p className="text-lg font-bold text-black leading-tight mt-0.5 truncate">{k.value}</p>
                <p className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                  <ArrowUpRight size={11} />
                  {k.change}
                </p>
              </div>
            );
          })}
        </div>

        {/* Row 1: Revenue / Charisma / Host Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Revenue Overview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-black text-sm">Revenue Overview</h3>
              <PeriodSelect value={revenuePeriod} onChange={setRevenuePeriod} />
            </div>
            <p className="text-xs text-black">Total Revenue</p>
            <p className="text-xl font-bold text-black">₹25,60,800</p>
            <p className="text-[11px] font-semibold text-emerald-600 mb-2 flex items-center gap-1">
              <ArrowUpRight size={11} />
              +15.9% vs Apr 2025
            </p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#000" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#000" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}L`} />
                  <Tooltip formatter={(v) => [`₹${v}L`, "Revenue"]} />
                  <Area type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={2} fill="url(#revenueFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charisma Overview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-black text-sm">Charisma Overview</h3>
              <PeriodSelect value={charismaPeriod} onChange={setCharismaPeriod} />
            </div>
            <p className="text-xs text-black">Total Charisma</p>
            <p className="text-xl font-bold text-black">₹1,25,80,300</p>
            <p className="text-[11px] font-semibold text-emerald-600 mb-2 flex items-center gap-1">
              <ArrowUpRight size={11} />
              +18.2% vs Apr 2025
            </p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={charismaData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="charismaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EC4899" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#EC4899" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#000" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#000" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}L`} />
                  <Tooltip formatter={(v) => [`₹${v}L`, "Charisma"]} />
                  <Area type="monotone" dataKey="value" stroke="#EC4899" strokeWidth={2} fill="url(#charismaFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Host Activity Overview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-black text-sm">Host Activity Overview</h3>
              <PeriodSelect value={activityPeriod} onChange={setActivityPeriod} />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-32 h-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={hostActivityData} dataKey="value" innerRadius={40} outerRadius={60} paddingAngle={2}>
                      {hostActivityData.map((d) => (
                        <Cell key={d.name} fill={d.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-base font-bold text-black">1,250</span>
                  <span className="text-[10px] text-black">Total Hosts</span>
                </div>
              </div>
              <div className="space-y-2 flex-1">
                {hostActivityData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-black">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                      {d.name}
                    </span>
                    <span className="font-semibold text-black">{d.value.toLocaleString()} ({d.pct})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Top Hosts / Revenue by Source / Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Top Performing Hosts */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-black text-sm">Top Performing Hosts</h3>
              <PeriodSelect value={hostsPeriod} onChange={setHostsPeriod} />
            </div>
            <table className="w-full text-left text-xs">
              <thead className="text-black font-semibold uppercase text-[10px] border-b border-gray-100">
                <tr>
                  <th className="py-2 pr-2">#</th>
                  <th className="py-2 pr-2">Host Name</th>
                  <th className="py-2 pr-2">Level</th>
                  <th className="py-2 pr-2">Revenue</th>
                  <th className="py-2">Charisma</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topHosts.map((h) => (
                  <tr key={h.rank}>
                    <td className="py-2 pr-2 text-black font-semibold">{h.rank}</td>
                    <td className="py-2 pr-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[9px] font-bold text-black">
                          {h.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="font-semibold text-black whitespace-nowrap">{h.name}</span>
                      </div>
                    </td>
                    <td className="py-2 pr-2">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${levelBadgeClass(h.level)}`}>
                        Level {h.level}
                      </span>
                    </td>
                    <td className="py-2 pr-2 text-black font-semibold whitespace-nowrap">{h.revenue}</td>
                    <td className="py-2 text-black font-semibold whitespace-nowrap">{h.charisma}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => showToast("Opening all hosts...")}
              className="flex items-center gap-1 text-xs font-semibold text-violet-600 hover:underline mt-3"
            >
              View All Hosts
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Revenue by Source */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-black text-sm">Revenue by Source</h3>
              <PeriodSelect value={sourcePeriod} onChange={setSourcePeriod} />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-32 h-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={revenueSourceData} dataKey="value" innerRadius={40} outerRadius={60} paddingAngle={2}>
                      {revenueSourceData.map((d) => (
                        <Cell key={d.name} fill={d.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-bold text-black">₹25,60,800</span>
                  <span className="text-[10px] text-black">Total Revenue</span>
                </div>
              </div>
              <div className="space-y-2 flex-1">
                {revenueSourceData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-black">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                      {d.name}
                    </span>
                    <span className="font-semibold text-black whitespace-nowrap">₹{d.value.toLocaleString()} ({d.pct})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h3 className="font-bold text-black text-sm mb-3">Summary</h3>
            <div className="space-y-2.5">
              {summary.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex items-center justify-between text-xs border-b border-gray-50 pb-2">
                    <span className="flex items-center gap-2 text-black">
                      <Icon size={14} className="text-black" />
                      {s.label}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-bold text-black">{s.value}</span>
                      <span className={`flex items-center gap-0.5 font-semibold ${s.up ? "text-emerald-600" : "text-rose-600"}`}>
                        {s.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                        {s.change}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-black text-sm">Recent Alerts</h3>
            <button
              onClick={() => showToast("Opening all alerts...")}
              className="text-xs font-semibold text-violet-600 hover:underline"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {alerts.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.title} className="flex items-start gap-3 rounded-xl border border-gray-100 p-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${a.iconBg}`}>
                    <Icon size={16} className={a.iconColor} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-black">{a.title}</p>
                    <p className="text-[11px] text-black">{a.note}</p>
                    <p className="text-[10px] text-black mt-1">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </>
        )}

        {/* Recruitment History tab */}
        {mainTab === "recruitment-history" && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-black">Recruitment History</h3>
                  <p className="text-sm text-black/70">Historical recruitment performance for your agents.</p>
                </div>
                <span className="text-[11px] text-black">Updated today</span>
              </div>
              <div className="grid grid-cols-1 gap-4 mt-5 lg:grid-cols-2">
                <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                  <p className="text-[11px] uppercase tracking-wide text-black">Monthly Recruitment</p>
                  <p className="mt-3 text-3xl font-bold text-black">{totalMonthlyRecruitment}</p>
                  <p className="text-[12px] text-black/70 mt-1">hosts recruited this month</p>
                </div>
                <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                  <p className="text-[11px] uppercase tracking-wide text-black">Recent Hiring Trends</p>
                  <p className="mt-3 text-3xl font-bold text-black">{Math.round((totalMonthlyRecruitment / Math.max(agents.length, 1)) * 10) / 10}</p>
                  <p className="text-[12px] text-black/70 mt-1">average recruitments per agent</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-black text-sm">Recruitment History Table</h3>
                <p className="text-xs text-black/70 mt-1">Review monthly recruitment activity by agent.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-black font-semibold uppercase text-[10px] tracking-wide border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3">Agent ID</th>
                      <th className="px-4 py-3">Agent Name</th>
                      <th className="px-4 py-3">Monthly Recruitment</th>
                      <th className="px-4 py-3">Active Hosts</th>
                      <th className="px-4 py-3">Live Hosts</th>
                      <th className="px-4 py-3">Performance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {agents.map((agent) => (
                      <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-black text-xs whitespace-nowrap">{agent.id}</td>
                        <td className="px-4 py-3 font-semibold text-black text-xs whitespace-nowrap">{agent.name}</td>
                        <td className="px-4 py-3 text-black font-semibold text-xs">{agent.monthlyRecruitment}</td>
                        <td className="px-4 py-3 text-black font-semibold text-xs">{agent.activeHosts}</td>
                        <td className="px-4 py-3 text-black font-semibold text-xs">{agent.liveHosts}</td>
                        <td className="px-4 py-3 text-black font-semibold text-xs">{agent.performance}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Agent Performance tab */}
        {mainTab === "agent-work" && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-black text-sm">Agent Work Overview</h3>
                  <p className="text-xs text-black/70 mt-1">Complete agent work summary across assigned hosts, sessions, and attendance.</p>
                </div>
                <span className="text-[11px] text-black">Updated now</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-black font-semibold uppercase text-[10px] tracking-wide border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3">Agent ID</th>
                      <th className="px-4 py-3">Agent Name</th>
                      <th className="px-4 py-3">Assigned Hosts</th>
                      <th className="px-4 py-3">Completed Sessions</th>
                      <th className="px-4 py-3">Live Sessions</th>
                      <th className="px-4 py-3">Attendance</th>
                      <th className="px-4 py-3">Last Active</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {agents.map((agent) => (
                      <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-black text-xs whitespace-nowrap">{agent.id}</td>
                        <td className="px-4 py-3 font-semibold text-black text-xs whitespace-nowrap">{agent.name}</td>
                        <td className="px-4 py-3 text-black text-xs">{agent.assignedHosts}</td>
                        <td className="px-4 py-3 text-black text-xs">{agent.completedSessions}</td>
                        <td className="px-4 py-3 text-black text-xs">{agent.liveSessions}</td>
                        <td className="px-4 py-3 text-black text-xs">{agent.attendance}</td>
                        <td className="px-4 py-3 text-black text-xs whitespace-nowrap">{agent.lastActive}</td>
                        <td className="px-4 py-3">{agentStatusBadge(agent.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {mainTab === "agent-performance" && (
          <div className="grid grid-cols-1 xl:grid-cols-[1.8fr_1fr] gap-5">
            <div className="space-y-5">
              {/* Agent KPI cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {agentKpis.map((k) => {
                  const Icon = k.icon;
                  return (
                    <div key={k.label} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-3 ${k.bg}`}>
                        <Icon size={16} className={k.iconColor} />
                      </div>
                      <p className="text-xs text-black">{k.label}</p>
                      <p className="text-xl font-bold text-black leading-tight mt-0.5">{k.value}</p>
                      <p className="text-[11px] text-black mt-1">{k.sub}</p>
                    </div>
                  );
                })}
              </div>

              {/* Agent Registry Metrics table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-black text-sm">Agent Registry Metrics</h3>
                  <p className="text-xs text-black mt-0.5">Agent-level host performance &amp; status overview.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-black font-semibold uppercase text-[10px] tracking-wide border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3">Agent ID</th>
                        <th className="px-4 py-3">Agent Name</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Join Date</th>
                        <th className="px-4 py-3">Registered</th>
                        <th className="px-4 py-3">Active</th>
                        <th className="px-4 py-3">Live</th>
                        <th className="px-4 py-3">Monthly Recruit</th>
                        <th className="px-4 py-3">Performance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {agents.map((agent) => (
                        <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-mono text-black text-xs whitespace-nowrap">{agent.id}</td>
                          <td className="px-4 py-3 font-semibold text-black text-xs whitespace-nowrap">{agent.name}</td>
                          <td className="px-4 py-3">{agentStatusBadge(agent.status)}</td>
                          <td className="px-4 py-3 text-black text-xs whitespace-nowrap">{agent.joinDate}</td>
                          <td className="px-4 py-3 text-black font-semibold text-xs">{agent.registeredHosts}</td>
                          <td className="px-4 py-3 text-black font-semibold text-xs">{agent.activeHosts}</td>
                          <td className="px-4 py-3 text-black font-semibold text-xs">{agent.liveHosts}</td>
                          <td className="px-4 py-3 text-black font-semibold text-xs">{agent.monthlyRecruitment}</td>
                          <td className="px-4 py-3 text-black font-semibold text-xs">{agent.performance}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {/* Agency Total Summary */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-black">Agent Analytics</p>
                    <h3 className="text-lg font-bold text-black mt-1">Agency Total Summary</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-black">Target</p>
                    <p className="text-2xl font-bold text-violet-600">{monthlyRecruitmentTarget}</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3">
                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                    <div className="text-[11px] uppercase tracking-wide text-black">Recruitment Completion</div>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-2xl font-bold text-black">{targetCompletionPercent}%</div>
                        <div className="text-[11px] text-black mt-1">of monthly target</div>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-white border border-gray-200 grid place-items-center text-sm font-bold text-violet-600">
                        {targetCompletionPercent}%
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                    <div className="text-[11px] uppercase tracking-wide text-black">Live Host Share</div>
                    <div className="mt-2 text-2xl font-bold text-black">
                      {Math.round((totalLiveHosts / Math.max(totalRegisteredHosts, 1)) * 100)}%
                    </div>
                    <div className="text-[11px] text-black mt-1">of registered hosts are live</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                    <div className="text-[11px] uppercase tracking-wide text-black">Approval Ratio</div>
                    <div className="mt-2 text-2xl font-bold text-black">
                      {Math.round((totalApprovedHosts / Math.max(totalRegisteredHosts, 1)) * 100)}%
                    </div>
                    <div className="text-[11px] text-black mt-1">approved by agency</div>
                  </div>
                </div>
              </div>

              {/* Agent Performance */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-black text-sm">Agent Performance</h3>
                    <p className="text-[11px] text-black">Recruitment and score details</p>
                  </div>
                  <span className="text-[11px] text-black">Updated today</span>
                </div>
                <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                  <div className="text-[11px] uppercase text-black font-bold">Top Performer</div>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-bold text-black text-sm">{topPerformer.name}</div>
                      <div className="text-[11px] text-black">{topPerformer.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-violet-600">{topPerformer.performance}%</div>
                      <div className="text-[11px] text-black">{topPerformer.registeredHosts} hosts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}