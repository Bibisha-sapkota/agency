import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  Users,
  UserCheck,
  Radio,
  Activity,
  UserX,
  Search,
  SlidersHorizontal,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  Download,
  Eye,
  Edit,
  Ban,
  Play,
  Trash2,
  Clock,
  MoreVertical,
  X,
  Save,
} from "lucide-react";

export default function HostManagement({ subTab = 'all-hosts' }) {
  /* ---------------- Seed data ---------------- */
  const initialHosts = [
    { id: "HST100234", name: "Pooja Singh", level: 3, status: "Active", joinDate: "10 Jan 2025", liveStatus: "Live", lastLive: "10:45 AM", progress: 78.45, charisma: "\u20B91,25,80,300", contribution: "\u20B998,75,500", revenue: "\u20B925,60,800", liveHours: "125h 30m", settlement: "Settled" },
    { id: "HST100235", name: "Anjali Sharma", level: 2, status: "Active", joinDate: "12 Jan 2025", liveStatus: "Online", lastLive: "09:30 AM", progress: 100, charisma: "\u20B995,40,200", contribution: "\u20B975,20,500", revenue: "\u20B918,40,300", liveHours: "110h 20m", settlement: "Settled" },
    { id: "HST100236", name: "Neha Patel", level: 3, status: "Active", joinDate: "15 Jan 2025", liveStatus: "Offline", lastLive: "Yesterday", progress: 52.30, charisma: "\u20B982,30,100", contribution: "\u20B958,50,600", revenue: "\u20B914,20,400", liveHours: "95h 15m", settlement: "Pending" },
    { id: "HST100237", name: "Riya Mehta", level: 2, status: "Active", joinDate: "18 Jan 2025", liveStatus: "Online", lastLive: "10:10 AM", progress: 70.20, charisma: "\u20B968,20,400", contribution: "\u20B948,60,300", revenue: "\u20B911,80,200", liveHours: "85h 40m", settlement: "Settled" },
    { id: "HST100238", name: "Kavya Reddy", level: 1, status: "Active", joinDate: "20 Jan 2025", liveStatus: "Live", lastLive: "10:50 AM", progress: 100, charisma: "\u20B960,40,200", contribution: "\u20B942,30,100", revenue: "\u20B99,60,100", liveHours: "75h 10m", settlement: "Settled" },
    { id: "HST100239", name: "Simran Kaur", level: 1, status: "Inactive", joinDate: "22 Jan 2025", liveStatus: "Offline", lastLive: "3 days ago", progress: 25.10, charisma: "\u20B925,60,100", contribution: "\u20B918,20,500", revenue: "\u20B94,20,600", liveHours: "32h 40m", settlement: "Pending" },
    { id: "HST100240", name: "Ayesha Khan", level: 2, status: "Active", joinDate: "25 Jan 2025", liveStatus: "Offline", lastLive: "Today 07:45 AM", progress: 60.50, charisma: "\u20B955,30,400", contribution: "\u20B938,40,200", revenue: "\u20B98,70,300", liveHours: "68h 25m", settlement: "Settled" },
    { id: "HST100241", name: "Tanya Verma", level: 1, status: "Active", joinDate: "28 Jan 2025", liveStatus: "Online", lastLive: "10:15 AM", progress: 90.20, charisma: "\u20B948,60,300", contribution: "\u20B934,20,100", revenue: "\u20B97,40,200", liveHours: "64h 10m", settlement: "Settled" },
    { id: "HST100242", name: "Nisha Gupta", level: 1, status: "Inactive", joinDate: "30 Jan 2025", liveStatus: "Offline", lastLive: "5 days ago", progress: 15.30, charisma: "\u20B918,40,200", contribution: "\u20B912,60,300", revenue: "\u20B92,90,100", liveHours: "18h 30m", settlement: "Pending" },
    { id: "HST100243", name: "Meera Joshi", level: 2, status: "Active", joinDate: "01 Feb 2025", liveStatus: "Live", lastLive: "10:55 AM", progress: 80.60, charisma: "\u20B966,20,300", contribution: "\u20B946,10,500", revenue: "\u20B910,20,800", liveHours: "88h 45m", settlement: "Settled" },
  ];

  const [hosts, setHosts] = useState(initialHosts);
  const [selectedTab, setSelectedTab] = useState(subTab || 'all-hosts');

  useEffect(() => {
    setSelectedTab(subTab || 'all-hosts');
  }, [subTab]);

  /* ---------------- KPI summary ---------------- */
  const kpis = [
    { label: "Total Hosts", value: "1,250", icon: Users },
    { label: "Active Hosts", value: "980", icon: UserCheck },
    { label: "Online Hosts", value: "320", icon: Radio },
    { label: "Live Now", value: "120", icon: Activity },
    { label: "Inactive Hosts", value: "150", icon: UserX },
  ];

  /* ---------------- Filters ---------------- */
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [liveFilter, setLiveFilter] = useState("all");

  const filteredHosts = useMemo(() => {
    return hosts.filter((h) => {
      const matchesSearch =
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = levelFilter === "all" || h.level === Number(levelFilter);
      const matchesStatus = statusFilter === "all" || h.status === statusFilter;
      const matchesLive = liveFilter === "all" || h.liveStatus === liveFilter;
      return matchesSearch && matchesLevel && matchesStatus && matchesLive;
    });
  }, [hosts, searchQuery, levelFilter, statusFilter, liveFilter]);

  /* ---------------- Pagination ---------------- */
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredHosts.length / rowsPerPage));

  useEffect(() => {
    setPage(1);
  }, [searchQuery, levelFilter, statusFilter, liveFilter, rowsPerPage]);

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
  const [historyHost, setHistoryHost] = useState(null);
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
    if (action === "history") {
      setHistoryHost(host);
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
      "Host ID","Host Name","Level","Status","Join Date","Live Status","Last Live",
      "Progress %","Charisma","Contribution","Revenue","Live Hours","Settlement",
    ];
    const rows = filteredHosts.map((h) => [
      h.id, h.name, `Level ${h.level}`, h.status, h.joinDate, h.liveStatus, h.lastLive,
      h.progress, h.charisma, h.contribution, h.revenue, h.liveHours, h.settlement,
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "host-management-export.csv";
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
    if (kpi.label === "Active Hosts") rows = hosts.filter((h) => h.status === "Active").map((h) => ({ label: h.name, value: `Level ${h.level}` }));
    if (kpi.label === "Inactive Hosts") rows = hosts.filter((h) => h.status === "Inactive").map((h) => ({ label: h.name, value: `Level ${h.level}` }));
    if (kpi.label === "Online Hosts") rows = hosts.filter((h) => h.liveStatus === "Online").map((h) => ({ label: h.name, value: h.lastLive }));
    if (kpi.label === "Live Now") rows = hosts.filter((h) => h.liveStatus === "Live").map((h) => ({ label: h.name, value: h.lastLive }));
    if (kpi.label === "Total Hosts") rows = hosts.map((h) => ({ label: h.name, value: h.status }));
    setKpiModal({ title: kpi.label, headline: kpi.value, rows });
  };

  /* ---------------- Badge helpers ---------------- */
  const levelBadge = (level) => (
    <span className="text-[11px] font-bold text-black">
      Level {level}
    </span>
  );

  const statusBadge = (status) =>
    status === "Active" ? (
      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700">Active</span>
    ) : (
      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700">Inactive</span>
    );

  const liveBadge = (liveStatus) => {
    const dot = { Live: "bg-red-500", Online: "bg-green-500", Offline: "bg-gray-400" };
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-black">
        <span className={`w-1.5 h-1.5 rounded-full ${dot[liveStatus]} ${liveStatus !== "Offline" ? "animate-pulse" : ""}`} />
        {liveStatus}
      </span>
    );
  };

  const settlementBadge = (val) =>
    val === "Settled" ? (
      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700">Settled</span>
    ) : (
      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700">Pending</span>
    );

  return (
    <div className="min-h-screen bg-white p-6 space-y-5 text-black">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[60] bg-black text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-black">Host Management</h1>
          <p className="flex items-center gap-1.5 text-xs text-black mt-1">
            <Home size={12} />
            Dashboard
            <ChevronRight size={12} />
            <span className="text-black font-medium">Host Management</span>
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
              <p className="text-xl font-bold text-black leading-tight mt-0.5">{k.value}</p>
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
            className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
          />
        </div>

        <div className="relative">
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="appearance-none rounded-lg border border-gray-300 pl-3 pr-8 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-violet-200"
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
            className="appearance-none rounded-lg border border-gray-300 pl-3 pr-8 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-violet-200"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-black" />
        </div>

        <div className="relative">
          <select
            value={liveFilter}
            onChange={(e) => setLiveFilter(e.target.value)}
            className="appearance-none rounded-lg border border-gray-300 pl-3 pr-8 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-violet-200"
          >
            <option value="all">Live Status</option>
            <option value="Live">Live</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-black" />
        </div>

        <button
          onClick={() => {
            setSearchQuery("");
            setLevelFilter("all");
            setStatusFilter("all");
            setLiveFilter("all");
          }}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-3.5 py-2 text-sm font-medium text-black hover:bg-gray-50"
        >
          <SlidersHorizontal size={14} className="text-black" />
          More Filters
        </button>

        <button className="rounded-lg border border-gray-300 p-2.5 text-black hover:bg-gray-50">
          <Filter size={15} />
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
                <th className="px-4 py-3">Agency Join Date</th>
                <th className="px-4 py-3">Current Live Status</th>
                <th className="px-4 py-3">Last Live Time</th>
                <th className="px-4 py-3">Monthly Target Progress</th>
                <th className="px-4 py-3">Monthly Charisma</th>
                <th className="px-4 py-3">Monthly Contribution</th>
                <th className="px-4 py-3">Monthly Revenue</th>
                <th className="px-4 py-3">Monthly Live Hours</th>
                <th className="px-4 py-3">Settlement Status</th>
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
                  <td className="px-4 py-3 text-black text-xs whitespace-nowrap">{host.joinDate}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{liveBadge(host.liveStatus)}</td>
                  <td className="px-4 py-3 text-black text-xs whitespace-nowrap">{host.lastLive}</td>
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
                  <td className="px-4 py-3">{settlementBadge(host.settlement)}</td>
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
                        <button onClick={() => handleAction(host, "history")} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-black hover:bg-gray-50">
                          <Clock size={13} /> History
                        </button>
                        <button onClick={() => handleAction(host, "remove")} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50">
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {pagedHosts.length === 0 && (
                <tr>
                  <td colSpan={14} className="px-4 py-10 text-center text-sm text-black">
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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
                ["Join Date", viewHost.joinDate],
                ["Live Status", viewHost.liveStatus],
                ["Last Live", viewHost.lastLive],
                ["Progress", `${viewHost.progress}%`],
                ["Charisma", viewHost.charisma],
                ["Contribution", viewHost.contribution],
                ["Revenue", viewHost.revenue],
                ["Live Hours", viewHost.liveHours],
                ["Settlement", viewHost.settlement],
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
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-violet-200"
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
                <label className="text-[11px] font-bold text-black uppercase block mb-1">Live Status</label>
                <select
                  value={editDraft.liveStatus}
                  onChange={(e) => setEditDraft({ ...editDraft, liveStatus: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none"
                >
                  <option value="Live">Live</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
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

      {/* History modal */}
      {historyHost && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setHistoryHost(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-black text-lg">Live History — {historyHost.name}</h3>
              <button onClick={() => setHistoryHost(null)} className="text-black hover:opacity-60">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {[
                { date: historyHost.joinDate, note: "Joined agency" },
                { date: historyHost.lastLive, note: `Last live session — ${historyHost.liveHours} total this month` },
                { date: "This month", note: `Settlement status: ${historyHost.settlement}` },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                  <span className="text-black">{row.note}</span>
                  <span className="font-semibold text-black whitespace-nowrap ml-3">{row.date}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setHistoryHost(null)}
              className="w-full mt-4 px-4 py-3 bg-black text-white rounded-xl text-sm font-bold hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirm action popup (suspend / activate / remove) */}
      {popupOpen && selectedHost && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div
                className={`p-3 rounded-full ${
                  actionType === "activate" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {actionType === "activate" && <Play className="w-6 h-6 text-green-600" />}
                {actionType === "suspend" && <Ban className="w-6 h-6 text-red-600" />}
                {actionType === "remove" && <Trash2 className="w-6 h-6 text-red-600" />}
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
                className={`flex-1 px-4 py-3 text-white rounded-xl text-sm font-bold hover:opacity-90 ${
                  actionType === "activate" ? "bg-green-600" : "bg-red-600"
                }`}
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