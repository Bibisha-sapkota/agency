import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  Users,
  Clock,
  Eye as EyeIcon,
  Gift,
  Star,
  Trophy,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  Download,
  Filter,
  Bell,
  Calendar,
  MoreVertical,
  Eye,
  Edit,
  Ban,
  Play,
  Trash2,
  X,
  Save,
  CircleDot,
} from "lucide-react";

export default function HostPerformance() {
  /* ---------------- Seed data ---------------- */
  const initialHosts = [
    { id: "HST100234", name: "Pooja Singh", level: 3, status: "Active", progress: 78.45, charisma: "₹1,25,80,300", contribution: "₹98,75,500", revenue: "₹25,60,800", liveHours: "125h 30m", incentive: "Eligible", settlement: "Settled", score: 92.45 },
    { id: "HST100235", name: "Anjali Sharma", level: 2, status: "Active", progress: 100, charisma: "₹95,40,200", contribution: "₹75,20,500", revenue: "₹18,40,300", liveHours: "110h 20m", incentive: "Eligible", settlement: "Settled", score: 88.75 },
    { id: "HST100236", name: "Neha Patel", level: 3, status: "Active", progress: 52.30, charisma: "₹82,30,100", contribution: "₹58,50,600", revenue: "₹14,20,400", liveHours: "95h 15m", incentive: "Not Eligible", settlement: "Pending", score: 66.20 },
    { id: "HST100237", name: "Riya Mehta", level: 2, status: "Active", progress: 70.20, charisma: "₹68,20,400", contribution: "₹48,60,300", revenue: "₹11,80,200", liveHours: "85h 40m", incentive: "Eligible", settlement: "Settled", score: 75.60 },
    { id: "HST100238", name: "Kavya Reddy", level: 1, status: "Active", progress: 100, charisma: "₹60,40,200", contribution: "₹42,30,100", revenue: "₹9,60,100", liveHours: "75h 10m", incentive: "Eligible", settlement: "Settled", score: 82.30 },
    { id: "HST100239", name: "Simran Kaur", level: 1, status: "Inactive", progress: 25.10, charisma: "₹25,60,100", contribution: "₹18,20,500", revenue: "₹4,20,600", liveHours: "32h 40m", incentive: "Not Eligible", settlement: "Pending", score: 38.40 },
    { id: "HST100240", name: "Ayesha Khan", level: 2, status: "Active", progress: 60.50, charisma: "₹55,30,400", contribution: "₹38,40,200", revenue: "₹8,70,300", liveHours: "68h 25m", incentive: "Eligible", settlement: "Settled", score: 71.80 },
    { id: "HST100241", name: "Tanya Verma", level: 1, status: "Active", progress: 90.20, charisma: "₹48,60,300", contribution: "₹34,20,100", revenue: "₹7,40,200", liveHours: "64h 10m", incentive: "Eligible", settlement: "Settled", score: 79.40 },
    { id: "HST100242", name: "Nisha Gupta", level: 1, status: "Inactive", progress: 15.30, charisma: "₹18,40,200", contribution: "₹12,60,300", revenue: "₹2,90,100", liveHours: "18h 30m", incentive: "Not Eligible", settlement: "Pending", score: 25.30 },
    { id: "HST100243", name: "Meera Joshi", level: 2, status: "Active", progress: 80.60, charisma: "₹66,20,300", contribution: "₹46,10,500", revenue: "₹10,20,800", liveHours: "88h 45m", incentive: "Eligible", settlement: "Settled", score: 84.10 },
  ];

  const [hosts, setHosts] = useState(initialHosts);

  /* ---------------- KPI summary ---------------- */
  const kpis = [
    { label: "Total Hosts", value: "1,250", icon: Users },
    { label: "Avg. Live Hours / Host", value: "65h 30m", icon: Clock },
    { label: "Avg. Viewers / Host", value: "1,240", icon: EyeIcon },
    { label: "Avg. Contribution / Host", value: "₹78,600", icon: Gift },
    { label: "Avg. Charisma / Host", value: "₹1,02,450", icon: Star },
    { label: "Top Performer", value: "Pooja Singh", icon: Trophy },
  ];

  /* ---------------- Filters ---------------- */
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("This Month");

  const filteredHosts = useMemo(() => {
    return hosts.filter((h) => {
      const matchesSearch =
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = levelFilter === "all" || h.level === Number(levelFilter);
      const matchesStatus = statusFilter === "all" || h.status === statusFilter;
      return matchesSearch && matchesLevel && matchesStatus;
    });
  }, [hosts, searchQuery, levelFilter, statusFilter]);

  /* ---------------- Pagination ---------------- */
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredHosts.length / rowsPerPage));

  useEffect(() => {
    setPage(1);
  }, [searchQuery, levelFilter, statusFilter, rowsPerPage]);

  const pagedHosts = filteredHosts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  /* ---------------- Row action menu ---------------- */
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- View / Edit / Confirm popups ---------------- */
  const [viewHost, setViewHost] = useState(null);
  const [editHost, setEditHost] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedHost, setSelectedHost] = useState(null);
  const [actionType, setActionType] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleAction = (host, action) => {
    setOpenMenuId(null);
    if (action === "view") {
      setViewHost(host);
      return;
    }
    if (action === "edit") {
      setEditHost(host);
      setEditDraft({ ...host });
      return;
    }
    setSelectedHost(host);
    setActionType(action);
    setPopupOpen(true);
  };

  const confirmAction = () => {
    if (actionType === "suspend") {
      setHosts((prev) => prev.map((h) => (h.id === selectedHost.id ? { ...h, status: "Inactive" } : h)));
      showToast(`${selectedHost.name} suspended`);
    } else if (actionType === "activate") {
      setHosts((prev) => prev.map((h) => (h.id === selectedHost.id ? { ...h, status: "Active" } : h)));
      showToast(`${selectedHost.name} activated`);
    } else if (actionType === "remove") {
      setHosts((prev) => prev.filter((h) => h.id !== selectedHost.id));
      showToast(`${selectedHost.name} removed`);
    }
    setPopupOpen(false);
    setSelectedHost(null);
    setActionType("");
  };

  const saveEdit = () => {
    setHosts((prev) => prev.map((h) => (h.id === editHost.id ? { ...editDraft, level: Number(editDraft.level) } : h)));
    showToast(`${editDraft.name} updated`);
    setEditHost(null);
    setEditDraft(null);
  };

  /* ---------------- Export ---------------- */
  const handleExport = () => {
    const header = [
      "Host ID", "Host Name", "Level", "Status", "Progress %", "Charisma",
      "Contribution", "Revenue", "Live Hours", "Incentive Status", "Settlement Status", "Performance Score",
    ];
    const rows = filteredHosts.map((h) => [
      h.id, h.name, `Level ${h.level}`, h.status, h.progress, h.charisma,
      h.contribution, h.revenue, h.liveHours, h.incentive, h.settlement, h.score,
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "host-performance-export.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Export downloaded");
  };

  /* ---------------- Detail modal for KPI cards ---------------- */
  const [kpiModal, setKpiModal] = useState(null);
  const openKpiDetails = (kpi) => {
    let rows = [];
    if (kpi.label === "Total Hosts") rows = hosts.map((h) => ({ label: h.name, value: h.status }));
    if (kpi.label === "Avg. Live Hours / Host") rows = hosts.map((h) => ({ label: h.name, value: h.liveHours }));
    if (kpi.label === "Avg. Viewers / Host") rows = hosts.map((h) => ({ label: h.name, value: `Level ${h.level}` }));
    if (kpi.label === "Avg. Contribution / Host") rows = hosts.map((h) => ({ label: h.name, value: h.contribution }));
    if (kpi.label === "Avg. Charisma / Host") rows = hosts.map((h) => ({ label: h.name, value: h.charisma }));
    if (kpi.label === "Top Performer") rows = [...hosts].sort((a, b) => b.score - a.score).map((h) => ({ label: h.name, value: h.score }));
    setKpiModal({ title: kpi.label, headline: kpi.value, rows });
  };

  /* ---------------- Badge helpers (all neutral/black, only Host Status is colored) ---------------- */
  const levelBadge = (level) => (
    <span className="text-[11px] font-bold text-black">Level {level}</span>
  );

  const statusBadge = (status) =>
    status === "Active" ? (
      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700">Active</span>
    ) : (
      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700">Inactive</span>
    );

  const incentiveBadge = (val) => (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-black">
      <CircleDot size={10} className="text-black" />
      {val}
    </span>
  );

  const settlementBadge = (val) => (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-black">
      <CircleDot size={10} className="text-black" />
      {val}
    </span>
  );

  return (
    <div className="min-h-screen bg-white text-black">
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
            <h1 className="text-xl font-bold text-black">Host Performance</h1>
            <p className="flex items-center gap-1.5 text-xs text-black mt-1">
              <Home size={12} />
              Dashboard
              <ChevronRight size={12} />
              <span className="text-black font-medium">Host Performance</span>
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-black hover:bg-gray-50"
            >
              <Download size={15} className="text-black" />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
              <Filter size={15} className="text-white" />
              Filters
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-gray-100">
                  <Icon size={18} className="text-black" />
                </div>
                <p className="text-xs text-black">{k.label}</p>
                <p className="text-lg font-bold text-black leading-tight mt-0.5 truncate">{k.value}</p>
                <button
                  onClick={() => openKpiDetails(k)}
                  className="text-xs font-medium text-black hover:underline mt-1"
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Host ID or Name..."
              className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div className="relative">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="appearance-none rounded-lg border border-gray-300 pl-3 pr-8 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="all">All Levels</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-black" />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none rounded-lg border border-gray-300 pl-3 pr-8 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-black" />
          </div>

          <div className="relative">
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="appearance-none rounded-lg border border-gray-300 pl-3 pr-8 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-black" />
          </div>

          <button
            onClick={() => {
              setSearchQuery("");
              setLevelFilter("all");
              setStatusFilter("all");
              setPeriodFilter("This Month");
            }}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-3.5 py-2 text-sm font-medium text-black hover:bg-gray-50"
          >
            <Filter size={14} className="text-black" />
            More Filters
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-black font-semibold uppercase text-[10px] tracking-wide border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3">Host ID</th>
                  <th className="px-4 py-3">Host Name</th>
                  <th className="px-4 py-3">Host Level</th>
                  <th className="px-4 py-3">Host Status</th>
                  <th className="px-4 py-3">Monthly Target Progress</th>
                  <th className="px-4 py-3">Monthly Charisma</th>
                  <th className="px-4 py-3">Monthly Contribution</th>
                  <th className="px-4 py-3">Monthly Revenue</th>
                  <th className="px-4 py-3">Monthly Live Hours</th>
                  <th className="px-4 py-3">Incentive Status</th>
                  <th className="px-4 py-3">Settlement Status</th>
                  <th className="px-4 py-3">Performance Score</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pagedHosts.map((host) => (
                  <tr key={host.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-black text-xs whitespace-nowrap">{host.id}</td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-black text-xs whitespace-nowrap">{host.name}</span>
                    </td>
                    <td className="px-4 py-3">{levelBadge(host.level)}</td>
                    <td className="px-4 py-3">{statusBadge(host.status)}</td>
                    <td className="px-4 py-3 w-32">
                      <p className="text-xs font-semibold text-black mb-1">{host.progress}%</p>
                      <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-1.5 rounded-full bg-black"
                          style={{ width: `${Math.min(host.progress, 100)}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-black font-semibold text-xs whitespace-nowrap">{host.charisma}</td>
                    <td className="px-4 py-3 text-black font-semibold text-xs whitespace-nowrap">{host.contribution}</td>
                    <td className="px-4 py-3 text-black font-semibold text-xs whitespace-nowrap">{host.revenue}</td>
                    <td className="px-4 py-3 text-black text-xs whitespace-nowrap">{host.liveHours}</td>
                    <td className="px-4 py-3">{incentiveBadge(host.incentive)}</td>
                    <td className="px-4 py-3">{settlementBadge(host.settlement)}</td>
                    <td className="px-4 py-3 text-black font-bold text-xs whitespace-nowrap">{host.score}</td>
                    <td className="px-4 py-3 text-right relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === host.id ? null : host.id)}
                        className="p-1.5 rounded hover:bg-gray-100 text-black"
                      >
                        <MoreVertical size={16} />
                      </button>
                      {openMenuId === host.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-4 top-10 z-20 w-40 rounded-xl border border-gray-200 bg-white shadow-lg py-1.5 text-left"
                        >
                          <button onClick={() => handleAction(host, "view")} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-black hover:bg-gray-50">
                            <Eye size={13} /> View
                          </button>
                          <button onClick={() => handleAction(host, "edit")} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-black hover:bg-gray-50">
                            <Edit size={13} /> Edit
                          </button>
                          {host.status === "Active" ? (
                            <button onClick={() => handleAction(host, "suspend")} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-black hover:bg-gray-50">
                              <Ban size={13} /> Suspend
                            </button>
                          ) : (
                            <button onClick={() => handleAction(host, "activate")} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-black hover:bg-gray-50">
                              <Play size={13} /> Activate
                            </button>
                          )}
                          <button onClick={() => handleAction(host, "remove")} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-black hover:bg-gray-50">
                            <Trash2 size={13} /> Remove
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {pagedHosts.length === 0 && (
                  <tr>
                    <td colSpan={13} className="px-4 py-10 text-center text-sm text-black">
                      No hosts match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-4 py-3">
            <p className="text-xs text-black">
              Showing {filteredHosts.length === 0 ? 0 : (page - 1) * rowsPerPage + 1} to{" "}
              {Math.min(page * rowsPerPage, filteredHosts.length)} of {filteredHosts.length} hosts
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-gray-300 text-black disabled:opacity-40 hover:bg-gray-50"
              >
                <ChevronLeft size={15} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold ${
                    page === p ? "bg-black text-white" : "text-black hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  {p}
                </button>
              ))}
              {totalPages > 5 && <span className="text-black text-xs px-1">...</span>}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-gray-300 text-black disabled:opacity-40 hover:bg-gray-50"
              >
                <ChevronRight size={15} />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-black">
              Rows per page
              <div className="relative">
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  className="appearance-none rounded-lg border border-gray-300 pl-2.5 pr-7 py-1.5 text-xs text-black focus:outline-none"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
                <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-black" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View modal */}
      {viewHost && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setViewHost(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-black text-lg">Host Details</h3>
              <button onClick={() => setViewHost(null)} className="text-black hover:opacity-60">
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm bg-gray-50 rounded-xl p-4">
              {[
                ["Host ID", viewHost.id],
                ["Name", viewHost.name],
                ["Level", `Level ${viewHost.level}`],
                ["Status", viewHost.status],
                ["Progress", `${viewHost.progress}%`],
                ["Charisma", viewHost.charisma],
                ["Contribution", viewHost.contribution],
                ["Revenue", viewHost.revenue],
                ["Live Hours", viewHost.liveHours],
                ["Incentive", viewHost.incentive],
                ["Settlement", viewHost.settlement],
                ["Score", viewHost.score],
              ].map(([label, value]) => (
                <div key={label}>
                  <span className="text-[11px] font-bold text-black uppercase block">{label}</span>
                  <span className="text-black">{value}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setViewHost(null)}
              className="w-full mt-4 px-4 py-3 bg-black text-white rounded-xl text-sm font-bold hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editHost && editDraft && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setEditHost(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-black text-lg">Edit Host</h3>
              <button onClick={() => setEditHost(null)} className="text-black hover:opacity-60">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-black uppercase block mb-1">Name</label>
                <input
                  type="text"
                  value={editDraft.name}
                  onChange={(e) => setEditDraft({ ...editDraft, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-black uppercase block mb-1">Level</label>
                  <select
                    value={editDraft.level}
                    onChange={(e) => setEditDraft({ ...editDraft, level: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none"
                  >
                    <option value={1}>Level 1</option>
                    <option value={2}>Level 2</option>
                    <option value={3}>Level 3</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-black uppercase block mb-1">Status</label>
                  <select
                    value={editDraft.status}
                    onChange={(e) => setEditDraft({ ...editDraft, status: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-black uppercase block mb-1">Incentive Status</label>
                <select
                  value={editDraft.incentive}
                  onChange={(e) => setEditDraft({ ...editDraft, incentive: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none"
                >
                  <option value="Eligible">Eligible</option>
                  <option value="Not Eligible">Not Eligible</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-black uppercase block mb-1">Settlement</label>
                <select
                  value={editDraft.settlement}
                  onChange={(e) => setEditDraft({ ...editDraft, settlement: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none"
                >
                  <option value="Settled">Settled</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setEditHost(null)}
                className="flex-1 px-4 py-3 bg-gray-100 text-black rounded-xl text-sm font-bold hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl text-sm font-bold hover:opacity-90"
              >
                <Save size={15} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm action popup (suspend / activate / remove) */}
      {popupOpen && selectedHost && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-full bg-gray-100">
                {actionType === "activate" && <Play className="w-6 h-6 text-black" />}
                {actionType === "suspend" && <Ban className="w-6 h-6 text-black" />}
                {actionType === "remove" && <Trash2 className="w-6 h-6 text-black" />}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-black text-lg mb-1 capitalize">{actionType} Host</h3>
                <p className="text-sm text-black">
                  {actionType === "activate" && `Are you sure you want to activate ${selectedHost.name}?`}
                  {actionType === "suspend" && `Are you sure you want to suspend ${selectedHost.name}?`}
                  {actionType === "remove" && `Are you sure you want to remove ${selectedHost.name}? This cannot be undone.`}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-[11px] font-bold text-black uppercase">Host ID</span>
                  <div className="font-mono text-black">{selectedHost.id}</div>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-black uppercase">Name</span>
                  <div className="font-bold text-black">{selectedHost.name}</div>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-black uppercase">Status</span>
                  <div>{statusBadge(selectedHost.status)}</div>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-black uppercase">Level</span>
                  <div>{levelBadge(selectedHost.level)}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setPopupOpen(false);
                  setSelectedHost(null);
                  setActionType("");
                }}
                className="flex-1 px-4 py-3 bg-gray-100 text-black rounded-xl text-sm font-bold hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className="flex-1 px-4 py-3 text-white rounded-xl text-sm font-bold hover:opacity-90 bg-black"
              >
                {actionType === "activate" ? "Activate" : actionType === "suspend" ? "Suspend" : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KPI details modal */}
      {kpiModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setKpiModal(null)}
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-base font-bold text-black">{kpiModal.title}</h3>
              <button onClick={() => setKpiModal(null)} className="text-black hover:opacity-60">
                <X size={18} />
              </button>
            </div>
            <p className="text-2xl font-bold text-black mb-4">{kpiModal.headline}</p>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {kpiModal.rows.length === 0 && <p className="text-xs text-black">No matching sample records.</p>}
              {kpiModal.rows.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                  <span className="text-black">{r.label}</span>
                  <span className="font-semibold text-black">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}