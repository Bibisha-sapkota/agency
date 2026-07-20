import React, { useMemo, useState } from "react";
import {
  Target,
  TrendingUp,
  Trophy,
  Hourglass,
  Star,
  Info,
  Calendar,
  Gift,
  ChevronRight,
  ChevronDown,
  Home,
  RefreshCw,
  History,
  X,
  Save,
  Bell,
  CircleGauge,
  ListChecks,
  ArrowUpRight,
  CalendarClock,
} from "lucide-react";

export default function TargetsAndLevels() {
  /* ---------------- Seed data ---------------- */
  const initialLevels = [
    { id: 1, level: "1", name: "Entry Level", required: 10000, achieved: 6850, hosts: 245, current: true },
    { id: 2, level: "2", name: "Rising Star", required: 25000, achieved: 18400, hosts: 312, current: false },
    { id: 3, level: "3", name: "Pro Host", required: 50000, achieved: 32750, hosts: 248, current: false },
    { id: 4, level: "4", name: "Super Host", required: 100000, achieved: 68200, hosts: 186, current: false },
    { id: 5, level: "5", name: "Star Host", required: 200000, achieved: 148500, hosts: 98, current: false },
    { id: 6, level: "VIP", name: "VIP Host", required: 500000, achieved: 375200, hosts: 42, current: false },
  ];

  const [levels, setLevels] = useState(initialLevels);

  const withComputed = (row) => {
    const remaining = Math.max(row.required - row.achieved, 0);
    const pct = Math.min((row.achieved / row.required) * 100, 100);
    return { ...row, remaining, pct };
  };

  const computedLevels = useMemo(() => levels.map(withComputed), [levels]);
  const currentRow = computedLevels.find((l) => l.current) || computedLevels[0];

  const getProgressColor = (pct) => {
    if (pct >= 100) return "#10B981"; // emerald
    if (pct >= 75) return "#3B82F6"; // blue
    if (pct >= 50) return "#F59E0B"; // amber
    return "#EF4444"; // red
  };

  /* ---------------- KPI summary ---------------- */
  const totalHosts = 1348;
  const hostsOnTargets = computedLevels.reduce((sum, l) => sum + l.hosts, 0);
  const reachedThisMonth = 168;
  const avgAchievement =
    (computedLevels.reduce((sum, l) => sum + l.pct, 0) / computedLevels.length).toFixed(2);

  const kpis = [
    { label: "Total Levels", value: computedLevels.length, sub: "Active Target Levels", icon: Target },
    { label: "Total Hosts on Targets", value: hostsOnTargets.toLocaleString(), sub: `${((hostsOnTargets / totalHosts) * 100).toFixed(2)}% of Total Hosts`, icon: TrendingUp },
    { label: "Reached This Month", value: reachedThisMonth, sub: "Hosts Achieved Target", icon: Trophy },
    { label: "Avg. Achievement", value: `${avgAchievement}%`, sub: "Overall Achievement", icon: Hourglass },
    { label: "Top Achiever", value: "Pooja Singh", sub: "Level 5", icon: Star },
  ];

  /* ---------------- Modals & state ---------------- */
  const [detailsLevel, setDetailsLevel] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [draftLevels, setDraftLevels] = useState(null);
  const [toast, setToast] = useState(null);
  const [month, setMonth] = useState("May 2025");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const openUpdateTargets = () => {
    setDraftLevels(levels.map((l) => ({ ...l })));
    setUpdateOpen(true);
  };

  const saveUpdatedTargets = () => {
    setLevels(draftLevels);
    setUpdateOpen(false);
    showToast("Targets updated");
  };

  const historyLog = [
    { date: "01 May 2025", note: "Monthly targets reset for all levels" },
    { date: "15 May 2025", note: "45 hosts crossed Level 3 threshold" },
    { date: "20 May 2025", note: "Elite target increased by 10%" },
    { date: "28 May 2025", note: "168 hosts reached their monthly target" },
  ];

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
            <h1 className="text-xl font-bold text-black">Targets &amp; Levels</h1>
            <p className="flex items-center gap-1.5 text-xs text-black mt-1">
              <Home size={12} />
              Dashboard
              <ChevronRight size={12} />
              <span className="text-black font-medium">Targets &amp; Levels</span>
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={openUpdateTargets}
              className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              <RefreshCw size={15} className="text-white" />
              Update Targets
            </button>
            <button
              onClick={() => setHistoryOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-black hover:bg-gray-50"
            >
              <History size={15} className="text-black" />
              Target History
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-gray-100">
                  <Icon size={18} className="text-black" />
                </div>
                <p className="text-xs text-black">{k.label}</p>
                <p className="text-lg font-bold text-black leading-tight mt-0.5 truncate">{k.value}</p>
                <p className="text-[11px] text-black mt-1">{k.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Monthly Target Levels table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="flex items-center gap-1.5 font-bold text-black text-sm">
                Monthly Target Levels
                <Info size={13} className="text-black" />
              </h3>
              <p className="text-xs text-black mt-0.5">Platform supports multiple monthly target levels</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-black font-semibold uppercase text-[10px] tracking-wide border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3">Level</th>
                    <th className="px-4 py-3">Level Name</th>
                    <th className="px-4 py-3">Required Charisma</th>
                    <th className="px-4 py-3">Achieved Charisma</th>
                    <th className="px-4 py-3">Remaining Charisma</th>
                    <th className="px-4 py-3">Achievement %</th>
                    <th className="px-4 py-3">Hosts on Level</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {computedLevels.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg border border-gray-300 text-xs font-bold text-black">
                          {row.level}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-black text-xs">Level {row.level}</span>
                          {row.current && (
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-black">{row.name}</p>
                      </td>
                      <td className="px-4 py-3 text-black font-semibold text-xs whitespace-nowrap">
                        {row.required.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-black font-semibold text-xs whitespace-nowrap">
                        {row.achieved.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-black font-semibold text-xs whitespace-nowrap">
                        {row.remaining.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 w-32">
                        <p className="text-xs font-semibold text-black mb-1">{row.pct.toFixed(2)}%</p>
                        <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className="h-1.5 rounded-full"
                            style={{ width: `${row.pct}%`, backgroundColor: getProgressColor(row.pct) }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-black text-xs whitespace-nowrap">{row.hosts}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setDetailsLevel(row)}
                          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-black hover:bg-gray-50"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-gray-200">
              <p className="text-xs text-black">Showing 1 to {computedLevels.length} of {computedLevels.length} levels</p>
            </div>
          </div>

          {/* Current Target Overview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h3 className="font-bold text-black text-sm mb-4">Current Target Overview</h3>

            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs text-black">You are on</p>
                <p className="text-lg font-bold text-black">Level {currentRow.level}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                  Active
                </span>
                <p className="text-[11px] text-black mt-1">{currentRow.name}</p>
              </div>
              <CircularGauge percent={currentRow.pct} color={getProgressColor(currentRow.pct)} />
            </div>

            <div className="space-y-3 text-sm">
              {[
                ["Required Charisma", currentRow.required.toLocaleString(), CircleGauge],
                ["Achieved Charisma", currentRow.achieved.toLocaleString(), ListChecks],
                ["Remaining Charisma", currentRow.remaining.toLocaleString(), ArrowUpRight],
                ["Achievement", `${currentRow.pct.toFixed(2)}%`, TrendingUp],
                ["Current Target", `Level ${currentRow.level}`, Target],
                ["Next Target", `Level ${computedLevels[Math.min(computedLevels.indexOf(currentRow) + 1, computedLevels.length - 1)].level}`, ChevronRight],
                ["Days Remaining", "12 Days", CalendarClock],
              ].map(([label, value, Icon]) => (
                <div key={label} className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="flex items-center gap-2 text-black text-xs">
                    <Icon size={14} className="text-black" />
                    {label}
                  </span>
                  <span className="font-bold text-black text-xs">{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => showToast("Loading your progress...")}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl text-sm font-bold hover:opacity-90 shadow-md shadow-violet-200"
            >
              <TrendingUp size={15} />
              View My Progress
            </button>
          </div>
        </div>

        {/* Bottom info bar */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-2 max-w-md">
            <Info size={16} className="text-black mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-black">About Target System</p>
              <p className="text-[11px] text-black">Achieve charisma targets to level up and unlock higher rewards. Targets reset on the 1st of every month.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-black">
            <Calendar size={14} className="text-black" />
            <span>Target Reset Date</span>
            <span className="font-bold">01 Jun 2025</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-black">
            <TrendingUp size={14} className="text-black" />
            <span>This Month Progress</span>
            <span className="font-bold">{avgAchievement}%</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-black">
            <Gift size={14} className="text-black" />
            <span>Total Rewards Earned</span>
            <span className="font-bold">₹25,60,800</span>
          </div>
        </div>
      </div>

      {/* View Details modal */}
      {detailsLevel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setDetailsLevel(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-black text-lg">Level {detailsLevel.level} — {detailsLevel.name}</h3>
              <button onClick={() => setDetailsLevel(null)} className="text-black hover:opacity-60">
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm bg-gray-50 rounded-xl p-4">
              {[
                ["Required Charisma", withComputed(detailsLevel).required.toLocaleString()],
                ["Achieved Charisma", withComputed(detailsLevel).achieved.toLocaleString()],
                ["Remaining Charisma", withComputed(detailsLevel).remaining.toLocaleString()],
                ["Achievement", `${withComputed(detailsLevel).pct.toFixed(2)}%`],
                ["Hosts on Level", detailsLevel.hosts],
                ["Status", detailsLevel.current ? "Current" : "Not Current"],
              ].map(([label, value]) => (
                <div key={label}>
                  <span className="text-[11px] font-bold text-black uppercase block">{label}</span>
                  <span className="text-black">{value}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setDetailsLevel(null)}
              className="w-full mt-4 px-4 py-3 bg-black text-white rounded-xl text-sm font-bold hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Update Targets modal */}
      {updateOpen && draftLevels && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setUpdateOpen(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-black text-lg">Update Targets</h3>
              <button onClick={() => setUpdateOpen(false)} className="text-black hover:opacity-60">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              {draftLevels.map((row, idx) => (
                <div key={row.id} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                  <span className="w-14 shrink-0 text-xs font-bold text-black">Level {row.level}</span>
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-black uppercase block mb-1">Required Charisma</label>
                    <input
                      type="number"
                      value={row.required}
                      onChange={(e) => {
                        const next = [...draftLevels];
                        next[idx] = { ...row, required: Number(e.target.value) };
                        setDraftLevels(next);
                      }}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setUpdateOpen(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-black rounded-xl text-sm font-bold hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={saveUpdatedTargets}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl text-sm font-bold hover:opacity-90"
              >
                <Save size={15} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Target History modal */}
      {historyOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setHistoryOpen(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-black text-lg">Target History</h3>
              <button onClick={() => setHistoryOpen(false)} className="text-black hover:opacity-60">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {historyLog.map((row, i) => (
                <div key={i} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                  <span className="text-black">{row.note}</span>
                  <span className="font-semibold text-black whitespace-nowrap ml-3">{row.date}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setHistoryOpen(false)}
              className="w-full mt-4 px-4 py-3 bg-black text-white rounded-xl text-sm font-bold hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Circular gauge (black/gray only) ---------------- */
function CircularGauge({ percent, color = "#8B5CF6" }) {
  const size = 64;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(percent, 100) / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E5E7EB" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold" style={{ color }}>
        {percent.toFixed(0)}%
      </div>
    </div>
  );
}