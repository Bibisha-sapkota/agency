import React, { useMemo, useState } from "react";

// ---- Mock data ----
const summaryStats = [
  { label: "Total Live Hours (This Month)", value: "125h 30m", change: "12.8% vs Apr 2025", up: true },
  { label: "Total Break Time", value: "18h 45m", change: "5.4% vs Apr 2025", up: true },
  { label: "Missed Schedule", value: "2 Days", change: "1 vs Apr 2025", up: false },
  { label: "Attendance Days", value: "29 Days", change: "93.5% of Month", up: null },
  { label: "Avg. Live Hours / Day", value: "4h 19m", change: "8.6% vs Apr 2025", up: true },
  { label: "Punctuality Rate", value: "96.7%", change: "2.3% vs Apr 2025", up: true },
];

const attendanceLog = [
  { date: "31 May 2025", login: "12:45 PM", logout: "11:50 PM", liveStart: "01:00 PM", liveEnd: "11:30 PM", total: "10h 30m", brk: "01h 20m", missed: "-", status: "Present" },
  { date: "30 May 2025", login: "01:10 PM", logout: "11:15 PM", liveStart: "01:30 PM", liveEnd: "10:45 PM", total: "09h 15m", brk: "01h 30m", missed: "-", status: "Present" },
  { date: "29 May 2025", login: "12:30 PM", logout: "10:20 PM", liveStart: "01:00 PM", liveEnd: "09:50 PM", total: "08h 50m", brk: "01h 00m", missed: "-", status: "Present" },
  { date: "28 May 2025", login: "01:05 PM", logout: "11:30 PM", liveStart: "01:20 PM", liveEnd: "11:00 PM", total: "09h 40m", brk: "00h 30m", missed: "-", status: "Present" },
  { date: "27 May 2025", login: "-", logout: "-", liveStart: "-", liveEnd: "-", total: "00h 00m", brk: "-", missed: "Yes", status: "Absent" },
  { date: "26 May 2025", login: "12:40 PM", logout: "10:40 PM", liveStart: "01:00 PM", liveEnd: "10:20 PM", total: "09h 20m", brk: "00h 40m", missed: "-", status: "Present" },
  { date: "25 May 2025", login: "01:00 PM", logout: "11:55 PM", liveStart: "01:15 PM", liveEnd: "11:30 PM", total: "10h 15m", brk: "00h 25m", missed: "-", status: "Present" },
  { date: "24 May 2025", login: "12:20 PM", logout: "09:40 PM", liveStart: "12:45 PM", liveEnd: "09:20 PM", total: "08h 35m", brk: "00h 40m", missed: "-", status: "Present" },
  { date: "23 May 2025", login: "12:50 PM", logout: "11:10 PM", liveStart: "01:10 PM", liveEnd: "10:50 PM", total: "09h 40m", brk: "00h 20m", missed: "-", status: "Present" },
  { date: "22 May 2025", login: "-", logout: "-", liveStart: "-", liveEnd: "-", total: "00h 00m", brk: "-", missed: "Yes", status: "Absent" },
  { date: "21 May 2025", login: "01:15 PM", logout: "11:45 PM", liveStart: "01:30 PM", liveEnd: "11:15 PM", total: "09h 45m", brk: "00h 30m", missed: "-", status: "Present" },
];

const tabs = ["Attendance Overview", "Daily Summary", "Missed Schedule"];

// day-of-month -> status, for May 2025 (the only month with real data here)
const MAY_2025_STATUS = {
  1: "present", 2: "present", 3: "present", 4: "present", 5: "present",
  6: "present", 7: "present", 8: "present", 9: "present", 10: "present",
  11: "present", 12: "present", 13: "present", 14: "present", 15: "present",
  16: "present", 17: "present", 18: "present", 19: "present", 20: "present",
  21: "present", 22: "absent", 23: "present", 24: "present", 25: "present",
  26: "present", 27: "absent", 28: "present", 29: "present", 30: "present",
  31: "present",
};

const statusMeta = {
  present: { color: "bg-emerald-500", text: "text-emerald-600", label: "Present" },
  absent: { color: "bg-red-500", text: "text-red-600", label: "Absent" },
  partial: { color: "bg-amber-500", text: "text-amber-600", label: "Partial" },
  missed: { color: "bg-violet-500", text: "text-violet-600", label: "Missed Schedule" },
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getStatusForMonth(year, month) {
  // month is 0-indexed. Only May 2025 (month index 4) has real data in this mock.
  if (year === 2025 && month === 4) return MAY_2025_STATUS;
  return {};
}

function buildCalendarWeeks(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - (firstDay + daysInMonth) + 1, inMonth: false });
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function StatCard({ label, value, change, up }) {
  return (
    <div className="flex-1 min-w-[150px] rounded-2xl border border-gray-100 bg-white p-4 flex flex-col gap-2">
      <div className="text-xs font-medium text-black">{label}</div>
      <div className="text-xl font-bold text-black">{value}</div>
      {up !== null ? (
        <div className="text-xs font-semibold text-black">
          {up ? "↑" : "↓"} {change}
        </div>
      ) : (
        <div className="text-xs font-semibold text-black">{change}</div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const isPresent = status === "Present";
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
        isPresent ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
      }`}
    >
      {status}
    </span>
  );
}

function SummaryPill({ status, label, value, active, onClick }) {
  const meta = statusMeta[status];
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-xl border px-4 py-3 transition-colors ${
        active ? "border-black bg-gray-50" : "border-gray-200 bg-white hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-1.5 text-xs text-black">
        <span className={`w-3 h-3 rounded-full border-2 inline-block ${meta.text.replace("text-", "border-")}`} />
        {label}
      </div>
      <div className="text-base font-bold text-black mt-1">{value}</div>
    </button>
  );
}

function AttendanceCalendar() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(4); // May (0-indexed)
  const [selectedDay, setSelectedDay] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null); // "present" | "absent" | "partial" | "missed" | null

  const monthStatus = useMemo(() => getStatusForMonth(year, month), [year, month]);
  const weeks = useMemo(() => buildCalendarWeeks(year, month), [year, month]);

  const counts = useMemo(() => {
    const values = Object.values(monthStatus);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const present = values.filter((s) => s === "present").length;
    const absent = values.filter((s) => s === "absent").length;
    const partial = values.filter((s) => s === "partial").length;
    const missed = values.filter((s) => s === "missed").length;
    return {
      present,
      absent,
      partial,
      missed,
      presentPct: daysInMonth ? ((present / daysInMonth) * 100).toFixed(1) : "0.0",
      absentPct: daysInMonth ? ((absent / daysInMonth) * 100).toFixed(1) : "0.0",
      partialPct: daysInMonth ? ((partial / daysInMonth) * 100).toFixed(1) : "0.0",
    };
  }, [monthStatus, year, month]);

  const goPrevMonth = () => {
    setSelectedDay(null);
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    setSelectedDay(null);
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const toggleFilter = (status) => {
    setSelectedDay(null);
    setActiveFilter((prev) => (prev === status ? null : status));
  };

  const selectedStatus = selectedDay ? monthStatus[selectedDay] : null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <div className="font-bold text-lg text-black mb-4">Attendance Calendar</div>

      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-base text-black">
            {MONTH_NAMES[month]} {year}
          </span>
          <button
            onClick={goPrevMonth}
            aria-label="Previous month"
            title="Previous month"
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-black hover:bg-gray-50"
          >
            ‹
          </button>
          <button
            onClick={goNextMonth}
            aria-label="Next month"
            title="Next month"
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-black hover:bg-gray-50"
          >
            ›
          </button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {Object.keys(statusMeta).map((status) => (
            <button
              key={status}
              onClick={() => toggleFilter(status)}
              title={`Filter by ${statusMeta[status].label}`}
              className={`flex items-center gap-1.5 text-xs rounded-md px-1.5 py-1 transition-colors ${
                activeFilter === status ? "bg-gray-100 font-semibold text-black" : "text-black hover:bg-gray-50"
              }`}
            >
              <span className={`w-2 h-2 rounded-full inline-block ${statusMeta[status].color}`} />
              {statusMeta[status].label}
            </button>
          ))}
        </div>
      </div>

      <table className="w-full border-collapse text-sm text-center">
        <thead>
          <tr className="text-black">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <th key={d} className="font-semibold py-2">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((cell, j) => {
                const status = cell.inMonth ? monthStatus[cell.day] : null;
                const meta = status ? statusMeta[status] : null;
                const isSelected = cell.inMonth && selectedDay === cell.day;
                const isDimmed = activeFilter && status !== activeFilter;
                return (
                  <td key={j} className="py-2">
                    <button
                      disabled={!cell.inMonth}
                      onClick={() => cell.inMonth && setSelectedDay(cell.day === selectedDay ? null : cell.day)}
                      className={`w-11 h-11 mx-auto flex flex-col items-center justify-center gap-1 rounded-lg transition-colors ${
                        cell.inMonth ? "text-black" : "text-gray-300 cursor-default"
                      } ${isSelected ? "ring-2 ring-black" : ""} ${cell.inMonth ? "hover:bg-gray-50" : ""} ${
                        isDimmed ? "opacity-30" : "opacity-100"
                      }`}
                    >
                      <span className="leading-none">{cell.day}</span>
                      {meta && <span className={`w-1.5 h-1.5 rounded-full ${meta.color}`} />}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedDay && (
        <div className="mt-4 rounded-lg bg-gray-50 px-4 py-2.5 text-sm text-black flex items-center justify-between">
          <span>
            {MONTH_NAMES[month]} {selectedDay}, {year}
          </span>
          {selectedStatus ? (
            <span className={`font-semibold ${statusMeta[selectedStatus].text}`}>
              {statusMeta[selectedStatus].label}
            </span>
          ) : (
            <span className="font-semibold text-black">No record</span>
          )}
        </div>
      )}

      {activeFilter && (
        <div className="mt-3 flex items-center justify-between text-xs text-black">
          <span>
            Showing only <span className="font-semibold">{statusMeta[activeFilter].label}</span> days
          </span>
          <button onClick={() => setActiveFilter(null)} className="underline hover:no-underline">
            Clear filter
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-gray-100">
        <SummaryPill status="present" label="Present Days" value={`${counts.present} (${counts.presentPct}%)`} active={activeFilter === "present"} onClick={() => toggleFilter("present")} />
        <SummaryPill status="absent" label="Absent Days" value={`${counts.absent} (${counts.absentPct}%)`} active={activeFilter === "absent"} onClick={() => toggleFilter("absent")} />
        <SummaryPill status="partial" label="Partial Days" value={`${counts.partial} (${counts.partialPct}%)`} active={activeFilter === "partial"} onClick={() => toggleFilter("partial")} />
        <SummaryPill status="missed" label="Missed Schedule" value={`${counts.missed}`} active={activeFilter === "missed"} onClick={() => toggleFilter("missed")} />
      </div>
    </div>
  );
}

export default function AttendanceDashboard() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [page, setPage] = useState(1);
  const totalPages = 4;

  const handleExport = () => {
    const rows = [];
    rows.push(["Attendance Report"]);
    rows.push(["Host", "Pooja Singh (HST100234)"]);
    rows.push(["Agency", "AGY1001 - Dream Star Agency"]);
    rows.push(["Period", "01 May 2025 - 31 May 2025"]);
    rows.push([]);

    rows.push(["Summary"]);
    rows.push(["Metric", "Value", "Note"]);
    summaryStats.forEach((s) => rows.push([s.label, s.value, s.change]));
    rows.push([]);

    rows.push(["Attendance Log"]);
    rows.push(["Date", "Login Time", "Logout Time", "Live Start", "Live End", "Total Live Hours", "Break Time", "Missed Schedule", "Status"]);
    attendanceLog.forEach((r) =>
      rows.push([r.date, r.login, r.logout, r.liveStart, r.liveEnd, r.total, r.brk, r.missed, r.status])
    );

    const csv = rows
      .map((row) =>
        row
          .map((cell) => {
            const val = String(cell ?? "");
            return /[",\n]/.test(val) ? `"${val.replace(/"/g, '""')}"` : val;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance-report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-black">
            Agency: <b>AGY1001 - Dream Star Agency</b>
          </div>
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-black">
            Host:
            <img src="https://i.pravatar.cc/24?img=5" alt="" className="w-5.5 h-5.5 rounded-full" />
            <b>Pooja Singh (HST100234)</b>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-black">
          01 May 2025 - 31 May 2025
        </div>
      </div>

      <div className="px-7 py-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-bold text-black m-0">Attendance</h1>
          <button
            onClick={handleExport}
            className="border border-black text-black bg-white rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
          >
            Export Report
          </button>
        </div>

        {/* Stat cards */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {summaryStats.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between border-b border-gray-100 mb-5 flex-wrap gap-3">
          <div className="flex gap-7">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`bg-transparent py-2.5 text-sm font-semibold border-b-2 ${
                  activeTab === t ? "border-black text-black" : "border-transparent text-black/60"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-2.5 pb-2.5">
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-black bg-white">
              <option>All Status</option>
              <option>Present</option>
              <option>Absent</option>
            </select>
            <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-black">
              01 May 2025 - 31 May 2025
            </div>
            <button className="border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-black bg-white hover:bg-gray-50">
              Filter
            </button>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5">
          {/* Attendance log */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="font-bold text-[15px] text-black mb-3.5">Attendance Log</div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="text-black text-left">
                    <th className="font-medium pb-2.5 pr-1.5">Date</th>
                    <th className="font-medium pb-2.5 pr-1.5">Login Time</th>
                    <th className="font-medium pb-2.5 pr-1.5">Logout Time</th>
                    <th className="font-medium pb-2.5 pr-1.5">Live Start</th>
                    <th className="font-medium pb-2.5 pr-1.5">Live End</th>
                    <th className="font-medium pb-2.5 pr-1.5">Total Live Hours</th>
                    <th className="font-medium pb-2.5 pr-1.5">Break Time</th>
                    <th className="font-medium pb-2.5 pr-1.5">Missed Schedule</th>
                    <th className="font-medium pb-2.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceLog.map((r, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="py-2.5 pr-1.5 text-black">{r.date}</td>
                      <td className="py-2.5 pr-1.5 text-black">{r.login}</td>
                      <td className="py-2.5 pr-1.5 text-black">{r.logout}</td>
                      <td className="py-2.5 pr-1.5 text-black">{r.liveStart}</td>
                      <td className="py-2.5 pr-1.5 text-black">{r.liveEnd}</td>
                      <td className="py-2.5 pr-1.5 text-black font-semibold">{r.total}</td>
                      <td className="py-2.5 pr-1.5 text-black">{r.brk}</td>
                      <td className="py-2.5 pr-1.5 text-black">{r.missed}</td>
                      <td className="py-2.5">
                        <StatusBadge status={r.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-4 text-xs text-black">
              <div>Showing 1 to 10 of 31 entries</div>
              <div className="flex gap-1.5 items-center">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="w-7 h-7 rounded-md border border-gray-200 bg-white text-black text-xs hover:bg-gray-50"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 rounded-md border text-xs ${
                      page === p ? "bg-black text-white border-black" : "bg-white text-black border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="w-7 h-7 rounded-md border border-gray-200 bg-white text-black text-xs hover:bg-gray-50"
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          {/* Attendance calendar */}
          <AttendanceCalendar />
        </div>
      </div>
    </div>
  );
}