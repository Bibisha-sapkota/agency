import { useState } from "react";
import {
  Users,
  UserCheck,
  Radio,
  Clock,
  Gift,
  Sparkles,
  Wallet,
  Download,
  Clock3,
  Timer,
  ListChecks,
  TrendingUp,
  TrendingDown,
  Trophy,
  Gauge,
  Swords,
  Percent,
  UserPlus,
  Target,
  Bell,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Calendar,
  X,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AgencyDashboard({ onViewAllAlerts, onViewAllActivities }) {
  /* ---------------- Top KPI cards ---------------- */
  const kpis = [
    { label: "Total Hosts",       value: "1,250",         icon: Users,    trend: "+12.5%", trendUp: true,  period: "vs Apr 2025" },
    { label: "Active Hosts",      value: "980",           icon: UserCheck,trend: "+10.3%", trendUp: true,  period: "vs Apr 2025" },
    { label: "Online Now",        value: "320",           icon: Radio,    trend: "+8.7%",  trendUp: true,  period: "vs Apr 2025" },
    { label: "Total Revenue",     value: "₹25,60,800",    icon: Wallet,   trend: "+15.8%", trendUp: true,  period: "vs Apr 2025" },
    { label: "Total Charisma",    value: "₹1,25,80,300",  icon: Sparkles, trend: "+18.2%", trendUp: true,  period: "vs Apr 2025" },
    { label: "Total Contribution",value: "₹98,75,500",    icon: Gift,     trend: "+14.8%", trendUp: true,  period: "vs Apr 2025" },
    { label: "Total Live Hours",  value: "12,450h",       icon: Clock,    trend: "+6.2%",  trendUp: true,  period: "vs Apr 2025" },
  ];

  /* ---------------- Host Targets & Levels ---------------- */
  const host = {
    id: "HST100234",
    name: "Pooja Singh",
    agency: "Dream Star Agency",
    level: "Level 3",
    progress: 78.45,
  };

  const levelRows = [
    { label: "Live Hours", icon: Clock3 },
    { label: "Contribution", icon: Gift },
    { label: "Charisma", icon: Sparkles },
    { label: "Revenue", icon: Wallet },
    { label: "Followers", icon: Users },
    { label: "PK Wins", icon: Swords },
    { label: "Completion", icon: Percent },
    { label: "Status", icon: CheckCircle2 },
  ];

  const levels = [
    { name: "Level 1", state: "completed", values: ["20h", "10,000", "10,000", "\u20B95,000", "500", "5", "100%", "Completed"] },
    { name: "Level 2", state: "completed", values: ["40h", "25,000", "25,000", "\u20B915,000", "1,000", "10", "100%", "Completed"] },
    { name: "Level 3", state: "current", values: ["60h", "50,000", "50,000", "\u20B930,000", "2,000", "15", "78.45%", "In Progress"] },
    { name: "Level 4", state: "locked", values: ["80h", "1,00,000", "1,00,000", "\u20B960,000", "3,000", "20", "0%", "Locked"] },
    { name: "Level 5", state: "locked", values: ["100h", "2,00,000", "2,00,000", "\u20B91,20,000", "5,000", "30", "0%", "Locked"] },
  ];

  /* ---------------- Target Summary donut ---------------- */
  const targetSummary = [
    { name: "Completed", value: 2, color: "#16a34a" },
    { name: "In Progress", value: 1, color: "#d97706" },
    { name: "Pending", value: 0, color: "#94a3b8" },
    { name: "Locked", value: 7, color: "#cbd5e1" },
  ];
  const totalTargets = 10;
  const overallProgress = 78.45;

  /* ---------------- Live Performance ---------------- */
  const livePerformance = [
    { label: "Total Live Hours", value: "1,250h 35m 20s", icon: Clock3 },
    { label: "Average Live Duration", value: "2h 45m", icon: Timer },
    { label: "Total Live Sessions", value: "560", icon: ListChecks },
    { label: "Longest Live", value: "8h 30m", icon: TrendingUp },
    { label: "Shortest Live", value: "15m 10s", icon: TrendingDown },
    { label: "Peak Live Time", value: "08:00 PM - 11:00 PM", icon: Gauge },
    { label: "Live Attendance", value: "85.60%", icon: Percent },
  ];

  /* ---------------- Contribution ---------------- */
  const contribution = [
    { label: "Total Contribution", value: "\u20B998,75,500", icon: Gift },
    { label: "Today", value: "\u20B96,25,300", icon: Clock3 },
    { label: "This Week", value: "\u20B918,75,200", icon: Clock3 },
    { label: "This Month", value: "\u20B998,75,500", icon: Clock3 },
    { label: "Top Contributor", value: "Ramesh Kumar", icon: Trophy },
    { label: "Total Contributors", value: "5,250", icon: Users },
  ];

  /* ---------------- Charisma ---------------- */
  const charisma = [
    { label: "Total Charisma", value: "\u20B91,25,80,300", icon: Sparkles },
    { label: "Today", value: "\u20B98,50,400", icon: Clock3 },
    { label: "This Week", value: "\u20B928,40,600", icon: Clock3 },
    { label: "This Month", value: "\u20B91,25,80,300", icon: Clock3 },
    { label: "Top Receiver", value: "Pooja Singh", icon: Trophy },
    { label: "Total Gifts", value: "15,320", icon: Gift },
  ];

  /* ---------------- Revenue Overview ---------------- */
  const revenue = [
    { label: "Total Revenue", value: "\u20B925,60,800", icon: Wallet },
    { label: "Agency Commission", value: "\u20B97,68,240", icon: Percent },
    { label: "Platform Commission", value: "\u20B95,12,160", icon: Percent },
    { label: "Net Earnings", value: "\u20B912,80,400", icon: TrendingUp },
    { label: "Withdrawable Balance", value: "\u20B93,45,600", icon: Wallet },
    { label: "Pending Payout", value: "\u20B92,10,000", icon: Clock3 },
  ];

  /* ---------------- Top 5 Hosts ---------------- */
  const topHosts = [
    { rank: 1, name: "Pooja Singh", hours: "125h 30m", contribution: "\u20B912,50,000", charisma: "\u20B918,75,300", revenue: "\u20B94,60,200", level: "Level 3", progress: 78.45 },
    { rank: 2, name: "Anjali Sharma", hours: "110h 20m", contribution: "\u20B910,20,000", charisma: "\u20B915,20,500", revenue: "\u20B93,60,200", level: "Level 2", progress: 100 },
    { rank: 3, name: "Neha Patel", hours: "95h 15m", contribution: "\u20B98,50,000", charisma: "\u20B912,80,400", revenue: "\u20B92,80,100", level: "Level 3", progress: 52.30 },
    { rank: 4, name: "Riya Mehta", hours: "85h 40m", contribution: "\u20B97,20,000", charisma: "\u20B910,60,300", revenue: "\u20B92,20,000", level: "Level 2", progress: 70.20 },
    { rank: 5, name: "Kavya Reddy", hours: "75h 10m", contribution: "\u20B96,10,000", charisma: "\u20B99,40,200", revenue: "\u20B91,80,000", level: "Level 1", progress: 100 },
  ];

  /* ---------------- Recent Activities ---------------- */
  const activities = [
    { text: "New Host Joined", detail: "Ritik Verma joined the agency", time: "02 May 2025, 10:30 AM", icon: UserPlus, color: "#2563eb" },
    { text: "Target Achieved", detail: "Anjali Sharma completed Level 2", time: "02 May 2025, 09:15 AM", icon: Target, color: "#16a34a" },
    { text: "High Contribution", detail: "Ramesh Kumar sent \u20B950,000", time: "01 May 2025, 08:45 AM", icon: Gift, color: "#7c3aed" },
    { text: "Host Went Live", detail: "Pooja Singh is now live", time: "01 May 2025, 08:10 AM", icon: Radio, color: "#16a34a" },
  ];

  /* ---------------- Alerts & Notifications ---------------- */
  const alerts = [
    { text: "Pooja Singh target 78% completed", time: "02 May 2025, 10:30 AM", icon: Target },
    { text: "Neha Patel live hours below target", time: "02 May 2025, 09:40 AM", icon: AlertTriangle },
    { text: "Weekly target 65% completed", time: "02 May 2025, 09:15 AM", icon: ListChecks },
    { text: "New top rank achieved by Pooja Singh", time: "02 May 2025, 09:00 AM", icon: Trophy },
  ];

  const stateStyles = {
    completed: { border: "border-green-200", header: "bg-green-50 text-green-700" },
    current: { border: "border-violet-300 ring-1 ring-violet-200", header: "bg-violet-600 text-white" },
    locked: { border: "border-gray-200", header: "bg-gray-100 text-gray-600" },
  };

  /* ---------------- Modal / detail view state ---------------- */
  const [modal, setModal] = useState(null);

  const detailMap = {
    "Total Hosts": {
      subtitle: "Breakdown of hosts by status",
      rows: [
        { label: "Active Hosts", value: "980" },
        { label: "Online Now", value: "320" },
        { label: "Inactive Hosts", value: "270" },
      ],
    },
    "Active Hosts": {
      subtitle: "Top active hosts this month",
      rows: topHosts.map((h) => ({ label: h.name, value: h.level })),
    },
    "Online Now": {
      subtitle: "Currently live hosts",
      rows: [
        { label: "Pooja Singh", value: "🔴 Live" },
        { label: "Anjali Sharma", value: "🔴 Live" },
        { label: "Neha Patel", value: "🔴 Live" },
        { label: "Riya Mehta", value: "🔴 Live" },
      ],
    },
    "Total Revenue": {
      subtitle: "Revenue breakdown this month",
      rows: revenue.map((r) => ({ label: r.label, value: r.value })),
    },
    "Total Charisma": {
      subtitle: "Gifts received by hosts",
      rows: charisma.map((r) => ({ label: r.label, value: r.value })),
    },
    "Total Contribution": {
      subtitle: "Gifts sent to hosts",
      rows: contribution.map((r) => ({ label: r.label, value: r.value })),
    },
    "Total Live Hours": {
      subtitle: "Live performance this month",
      rows: livePerformance.map((r) => ({ label: r.label, value: r.value })),
    },
  };

  const openKpiDetails = (kpi) => {
    const detail = detailMap[kpi.label];
    setModal({
      title: kpi.label,
      headline: kpi.value,
      subtitle: detail ? detail.subtitle : "",
      rows: detail ? detail.rows : [],
    });
  };

  const openTargetDetails = () => {
    setModal({
      title: "Target Details",
      headline: `${overallProgress}%`,
      subtitle: "Overall progress across all levels",
      rows: [
        { label: "Total Targets", value: totalTargets },
        ...targetSummary.map((d) => ({ label: d.name, value: d.value })),
        ...levels.map((l) => ({ label: l.name, value: `${l.values[6]} \u2022 ${l.values[7]}` })),
      ],
    });
  };

  const handleExport = () => {
    const lines = [];
    lines.push("Agency Dashboard Export");
    lines.push(`Generated,${new Date().toLocaleString()}`);
    lines.push("");
    lines.push("KPI,Value");
    kpis.forEach((k) => lines.push(`${k.label},${k.value}`));
    lines.push("");
    lines.push("Level,Live Hours,Contribution,Charisma,Revenue,Followers,PK Wins,Completion,Status");
    levels.forEach((l) => lines.push(`${l.name},${l.values.join(",")}`));
    lines.push("");
    lines.push("Top Host,Live Hours,Contribution,Charisma,Revenue,Level,Progress");
    topHosts.forEach((h) =>
      lines.push(`${h.name},${h.hours},${h.contribution},${h.charisma},${h.revenue},${h.level},${h.progress}%`)
    );

    const csv = lines.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "agency-dashboard-export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const rowValueClass = (ri, lvl) => {
    if (lvl.state === "locked") return "text-gray-600";
    if (ri === 7) {
      if (lvl.state === "completed") return "text-green-600 font-semibold";
      if (lvl.state === "current") return "text-violet-700 font-semibold";
      return "text-gray-600 font-medium";
    }
    if (ri === 0 || ri === 6) return "text-gray-900 font-medium";
    return "text-blue-600 font-semibold";
  };

  return (
    <div className="min-h-screen bg-white flex text-gray-800">
      {/* ============ Main column ============ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto bg-white p-6 space-y-5">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Agency Overview</h1>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 rounded-lg bg-violet-600 text-white text-sm font-semibold px-4 py-2 hover:bg-violet-700"
            >
              <Download size={16} />
              Export
            </button>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-3">
            {kpis.map((k) => {
              const Icon = k.icon;
              return (
                <button
                  key={k.label}
                  onClick={() => openKpiDetails(k)}
                  className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-left hover:border-gray-400 hover:shadow-md transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 transition-colors">
                      <Icon size={18} className="text-gray-900" />
                    </div>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      k.trendUp
                        ? 'bg-green-50 text-green-600'
                        : 'bg-red-50 text-red-500'
                    }`}>
                      {k.trendUp ? '↑' : '↓'} {k.trend}
                    </span>
                  </div>
                  <p className="text-base font-bold text-gray-900 leading-tight truncate">{k.value}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{k.label}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{k.period}</p>
                </button>
              );
            })}
          </div>

          {/* Host Targets & Levels + Target Summary */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
            <div className="xl:col-span-3 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-4">Host Targets &amp; Levels</h2>

              <div className="flex flex-col md:flex-row gap-5">
                {/* Host profile */}
                <div className="md:w-56 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-lg">
                      {host.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <span className="inline-block text-[10px] font-semibold bg-green-100 text-green-700 rounded px-2 py-0.5 mb-1">
                        Live
                      </span>
                      <p className="font-bold text-gray-900 text-sm">{host.name}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1.5 text-xs">
                    <p className="text-gray-500">Host ID: <span className="text-gray-800 font-medium">{host.id}</span></p>
                    <p className="text-gray-500">Agency: <span className="text-gray-800 font-medium">{host.agency}</span></p>
                    <p className="text-gray-500">
                      Level: <span className="inline-block bg-violet-600 text-white rounded px-2 py-0.5 font-semibold ml-1">{host.level}</span>
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 mt-4 mb-1">Current Level Progress</p>
                  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: `${host.progress}%` }} />
                  </div>
                  <p className="text-xs font-semibold text-gray-700 mt-1">{host.progress}%</p>
                </div>

                {/* Levels table */}
                <div className="flex-1 overflow-x-auto">
                  <table className="w-full text-xs border-separate" style={{ borderSpacing: 0 }}>
                    <thead>
                      <tr>
                        <th className="text-left text-gray-400 font-medium pb-2 pr-3 w-32"> </th>
                        {levels.map((lvl) => (
                          <th
                            key={lvl.name}
                            className={`text-center font-semibold px-3 py-2 rounded-t-lg border ${stateStyles[lvl.state].border} ${stateStyles[lvl.state].header}`}
                          >
                            {lvl.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {levelRows.map((row, ri) => {
                        return (
                          <tr key={row.label}>
                            <td className="text-gray-500 py-2 pr-3 whitespace-nowrap">
                              {row.label}
                            </td>
                            {levels.map((lvl) => (
                              <td
                                key={lvl.name + row.label}
                                className={`text-center py-1.5 px-3 border-x ${stateStyles[lvl.state].border} ${rowValueClass(ri, lvl)}`}
                              >
                                {lvl.state === "current" ? (
                                  <span className="inline-block w-full rounded-md border border-violet-200 bg-violet-50/60 py-1">
                                    {lvl.values[ri]}
                                  </span>
                                ) : (
                                  lvl.values[ri]
                                )}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Target Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col">
              <h2 className="text-base font-bold text-gray-900 mb-2">Target Summary</h2>

              <div className="relative mx-auto" style={{ width: 160, height: 160 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={targetSummary}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={2}
                      stroke="#fff"
                      strokeWidth={2}
                    >
                      {targetSummary.map((d, i) => (
                        <Cell key={i} fill={d.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-gray-900">{overallProgress}%</span>
                  <span className="text-[10px] text-gray-500">Overall Progress</span>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" /> Total Targets
                  </span>
                  <span className="font-semibold text-gray-900">{totalTargets}</span>
                </div>
                {targetSummary.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-600">
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: d.color }} />
                      {d.name}
                    </span>
                    <span className="font-semibold text-gray-900">{d.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={openTargetDetails}
                className="mt-4 w-full rounded-lg bg-violet-600 text-white text-xs font-semibold py-2.5 hover:bg-violet-700"
              >
                View Full Target Details
              </button>
            </div>
          </div>

          {/* Live Performance / Contribution / Charisma / Revenue */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {[
              { title: "Live Performance (This Month)", rows: livePerformance, accent: "#0891b2" },
              { title: "Contribution (Gift Sent to Host)", rows: contribution, accent: "#d97706" },
              { title: "Charisma (Gift Received)", rows: charisma, accent: "#db2777" },
              { title: "Revenue Overview", rows: revenue, accent: "#7c3aed" },
            ].map((panel) => (
              <div key={panel.title} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900 mb-3">{panel.title}</h2>
                <div className="space-y-2.5">
                  {panel.rows.map((r) => {
                    const Icon = r.icon;
                    return (
                      <div key={r.label} className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-gray-500">
                          <Icon size={13} className="text-gray-700" />
                          {r.label}
                        </span>
                        <span className="font-semibold text-gray-900">{r.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Top Hosts / Recent Activities / Alerts */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {/* Top 5 hosts */}
            <div className="xl:col-span-1 bg-white rounded-xl border border-gray-200 p-5 shadow-sm overflow-x-auto">
              <h2 className="text-sm font-bold text-gray-900 mb-3">Top 5 Hosts (This Month)</h2>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-400 text-left">
                    <th className="font-medium pb-2">Rank</th>
                    <th className="font-medium pb-2">Host</th>
                    <th className="font-medium pb-2">Revenue</th>
                    <th className="font-medium pb-2">Level</th>
                    <th className="font-medium pb-2">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {topHosts.map((h) => (
                    <tr key={h.rank} className="border-t border-gray-100">
                      <td className="py-2 font-semibold text-gray-700">#{h.rank}</td>
                      <td className="py-2 text-gray-800 font-medium whitespace-nowrap">{h.name}</td>
                      <td className="py-2 text-gray-700 whitespace-nowrap">{h.revenue}</td>
                      <td className="py-2">
                        <span className="inline-block bg-violet-50 text-violet-700 rounded px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap">
                          {h.level}
                        </span>
                      </td>
                      <td className="py-2 w-24">
                        <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${h.progress === 100 ? "bg-green-500" : "bg-orange-400"}`}
                            style={{ width: `${h.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-500">{h.progress}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent activities */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900 mb-3">Recent Activities</h2>
              <div className="space-y-4">
                {activities.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gray-100">
                        <Icon size={14} className="text-gray-800" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{a.text}</p>
                        <p className="text-xs text-gray-500">{a.detail}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => onViewAllActivities && onViewAllActivities()}
                className="text-xs font-semibold text-violet-600 mt-3 hover:text-violet-800 hover:underline transition-colors"
              >
                View All Activities
              </button>
            </div>

            {/* Alerts & notifications */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Bell size={16} className="text-gray-400" />
                Alerts &amp; Notifications
              </h2>
              <div className="space-y-4">
                {alerts.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-gray-800" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-800">{a.text}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => onViewAllAlerts && onViewAllAlerts()}
                className="text-xs font-semibold text-violet-600 mt-3 hover:text-violet-800 hover:underline transition-colors"
              >
                View All Alerts
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ============ Details modal ============ */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">{modal.title}</h3>
                {modal.subtitle && (
                  <p className="text-xs text-gray-500 mt-0.5">{modal.subtitle}</p>
                )}
              </div>
              <button
                onClick={() => setModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            {modal.headline && (
              <p className="text-2xl font-bold text-gray-900 mb-4">{modal.headline}</p>
            )}

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {modal.rows.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm border-b border-gray-100 pb-2"
                >
                  <span className="text-gray-500">{r.label}</span>
                  <span className="font-semibold text-gray-900">{r.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setModal(null)}
              className="mt-5 w-full rounded-lg border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}