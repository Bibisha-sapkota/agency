import React, { useMemo, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ---- Mock data ----
// Only the top 3 hosts have a real photo (drop your files in /avatars and
// point the `avatar` field at them). Everyone else falls back to an
// initials avatar automatically — see <Avatar /> below — so the table
// never shows a broken image icon.
const BASE_HOSTS = [
  { id: 1, name: "Pooja Singh", level: "VIP", charisma: 1245300, contribution: 985200, revenue: 245680.3, pk: 169050, viewers: 82000, change: 2, avatar: "/avatars/pooja-singh.png" },
  { id: 2, name: "Anjali Sharma", level: "VIP", charisma: 1025600, contribution: 875200, revenue: 185420.5, pk: 148900, viewers: 71000, change: 1, avatar: "/avatars/anjali-sharma.png" },
  { id: 3, name: "Riya Mehta", level: "Elite", charisma: 865600, contribution: 760300, revenue: 156780.2, pk: 125600, viewers: 64000, change: -1 },
  { id: 4, name: "Kavya Reddy", level: "VIP", charisma: 780100, contribution: 650800, revenue: 125450.8, pk: 110400, viewers: 58000, change: 3, avatar: "/avatars/kavya-reddy.png" },
  { id: 5, name: "Neha Patel", level: "Elite", charisma: 690400, contribution: 575100, revenue: 105230.4, pk: 95600, viewers: 51000, change: -1 },
  { id: 6, name: "Simran Kaur", level: "Gold", charisma: 560300, contribution: 485600, revenue: 85420.1, pk: 82300, viewers: 44000, change: 4 },
  { id: 7, name: "Muskan Verma", level: "Gold", charisma: 485200, contribution: 410500, revenue: 72360, pk: 65200, viewers: 38000, change: -1 },
  { id: 8, name: "Aisha Khan", level: "Silver", charisma: 420600, contribution: 360200, revenue: 63250, pk: 58900, viewers: 33000, change: 2 },
  { id: 9, name: "Priya Singh", level: "Silver", charisma: 385100, contribution: 325400, revenue: 56480.2, pk: 49800, viewers: 29000, change: 0 },
  { id: 10, name: "Tanvi Shah", level: "Silver", charisma: 340200, contribution: 295100, revenue: 50120, pk: 42600, viewers: 25000, change: 1 },
  { id: 11, name: "Divya Nair", level: "Silver", charisma: 298000, contribution: 254000, revenue: 44200, pk: 37800, viewers: 21000, change: -2 },
  { id: 12, name: "Isha Malhotra", level: "Silver", charisma: 265000, contribution: 221000, revenue: 39800, pk: 33200, viewers: 18500, change: 1 },
];

const TABS = [
  { key: "total", label: "Overall Ranking" },
  { key: "charisma", label: "Charisma Ranking" },
  { key: "contribution", label: "Contribution Ranking" },
  { key: "revenue", label: "Revenue Ranking" },
  { key: "pk", label: "PK Ranking" },
  { key: "viewers", label: "Viewer Ranking" },
  { key: "level", label: "Level Ranking" },
];

const LEVEL_ORDER = { VIP: 0, Elite: 1, Gold: 2, Silver: 3 };
const LEVEL_STYLE = {
  VIP: "bg-violet-100 text-violet-700",
  Elite: "bg-rose-100 text-rose-700",
  Gold: "bg-amber-100 text-amber-700",
  Silver: "bg-gray-200 text-gray-700",
};

const PERIOD_MULTIPLIER = { "This Month": 1, "Last Month": 0.92, "This Week": 0.24 };

const TREND_COLORS = ["#7C3AED", "#3B82F6", "#F59E0B", "#10B981", "#EC4899"];
const TREND_DATES = ["01 May", "06 May", "11 May", "16 May", "21 May", "26 May", "31 May"];

// Deterministic pastel color per name, used for the initials fallback so
// the same host always gets the same badge color.
const AVATAR_PALETTE = [
  "bg-violet-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500",
  "bg-rose-500", "bg-cyan-500", "bg-fuchsia-500", "bg-orange-500",
];
function colorForName(name) {
  const hash = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}
function initialsForName(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

/**
 * Avatar — renders the host's real photo when one is set; otherwise shows
 * an initials badge. Also falls back to initials if the image fails to
 * load, so a missing/broken file never shows the browser's broken-image icon.
 */
function Avatar({ name, src, size = "w-7 h-7", ring = "" }) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  if (showImage) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setFailed(true)}
        className={`${size} ${ring} rounded-full object-cover flex-shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${size} ${ring} rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold ${colorForName(
        name
      )}`}
      style={{ fontSize: "0.65em" }}
      title={name}
    >
      {initialsForName(name)}
    </div>
  );
}

function withTotals(hosts, multiplier) {
  return hosts.map((h) => {
    const charisma = Math.round(h.charisma * multiplier);
    const contribution = Math.round(h.contribution * multiplier);
    const revenue = +(h.revenue * multiplier).toFixed(2);
    const pk = Math.round(h.pk * multiplier);
    const viewers = Math.round(h.viewers * multiplier);
    const total = charisma / 10 + contribution / 10 + revenue + pk;
    return { ...h, charisma, contribution, revenue, pk, viewers, total: Math.round(total) };
  });
}

function buildTrendData(hosts) {
  const top5 = [...hosts].sort((a, b) => b.total - a.total).slice(0, 5);
  return TREND_DATES.map((date, i) => {
    const row = { date };
    top5.forEach((h) => {
      const progress = (i + 1) / TREND_DATES.length;
      row[h.name] = Math.round(h.total * (0.55 + 0.45 * progress) * (0.94 + 0.02 * i));
    });
    return row;
  });
}

function fmt(n) {
  return Number(n).toLocaleString("en-IN");
}

function ChangeBadge({ change }) {
  if (change === 0) return <span className="text-black text-sm">-</span>;
  const up = change > 0;
  return (
    <span className={`text-sm font-semibold ${up ? "text-emerald-600" : "text-red-600"}`}>
      {up ? "↑" : "↓"} {Math.abs(change)}
    </span>
  );
}

function LevelBadge({ level }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${LEVEL_STYLE[level]}`}>{level}</span>
  );
}

function StatCard({ label, value, sub, subColor }) {
  return (
    <div className="flex-1 min-w-[150px] rounded-2xl border border-gray-100 bg-white p-4">
      <div className="text-xs font-medium text-black">{label}</div>
      <div className="text-xl font-bold text-black mt-1.5">{value}</div>
      {sub && <div className={`text-xs font-semibold mt-1.5 ${subColor || "text-black"}`}>{sub}</div>}
    </div>
  );
}

function SortHeader({ label, sortKey, sort, onSort, align = "left" }) {
  const active = sort.key === sortKey;
  return (
    <th
      onClick={() => onSort(sortKey)}
      className={`font-medium py-2.5 px-2 cursor-pointer select-none text-${align} ${
        active ? "text-black font-bold" : "text-black hover:text-black/70"
      }`}
    >
      {label} {active ? (sort.dir === "desc" ? "↓" : "↑") : ""}
    </th>
  );
}

export default function RankingDashboard() {
  const [activeTab, setActiveTab] = useState("total");
  const [hostFilter, setHostFilter] = useState("All Hosts");
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [period, setPeriod] = useState("This Month");
  const [sort, setSort] = useState({ key: "total", dir: "desc" });
  const [showAll, setShowAll] = useState(false);
  const [visibleLines, setVisibleLines] = useState(() =>
    Object.fromEntries(TREND_COLORS.map((_, i) => [i, true]))
  );
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [secondsAgo, setSecondsAgo] = useState(0);

  // keep sort key aligned with the active tab's primary metric
  useEffect(() => {
    if (activeTab === "level") {
      setSort({ key: "level", dir: "asc" });
    } else {
      setSort({ key: activeTab, dir: "desc" });
    }
  }, [activeTab]);

  // fake "updated every 10 minutes" ticker
  useEffect(() => {
    const id = setInterval(() => {
      setSecondsAgo(Math.floor((Date.now() - lastUpdated.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [lastUpdated]);

  const scaledHosts = useMemo(() => withTotals(BASE_HOSTS, PERIOD_MULTIPLIER[period]), [period]);

  const filteredHosts = useMemo(() => {
    let list = scaledHosts;
    if (hostFilter !== "All Hosts") list = list.filter((h) => h.name === hostFilter);
    if (levelFilter !== "All Levels") list = list.filter((h) => h.level === levelFilter);
    return list;
  }, [scaledHosts, hostFilter, levelFilter]);

  const sortedHosts = useMemo(() => {
    const list = [...filteredHosts];
    list.sort((a, b) => {
      let av, bv;
      if (sort.key === "level") {
        av = LEVEL_ORDER[a.level];
        bv = LEVEL_ORDER[b.level];
      } else if (sort.key === "name") {
        av = a.name;
        bv = b.name;
      } else {
        av = a[sort.key];
        bv = b[sort.key];
      }
      if (typeof av === "string") {
        return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sort.dir === "asc" ? av - bv : bv - av;
    });
    return list;
  }, [filteredHosts, sort]);

  const rankedHosts = sortedHosts.map((h, i) => ({ ...h, rank: i + 1 }));
  const visibleHosts = showAll ? rankedHosts : rankedHosts.slice(0, 10);
  const podium = rankedHosts.slice(0, 3);
  const trendData = useMemo(() => buildTrendData(scaledHosts), [scaledHosts]);
  const top5Names = useMemo(
    () => [...scaledHosts].sort((a, b) => b.total - a.total).slice(0, 5).map((h) => h.name),
    [scaledHosts]
  );

  const totalPoints = scaledHosts.reduce((sum, h) => sum + h.total, 0);
  const avgPoints = Math.round(totalPoints / scaledHosts.length);
  const topHost = [...scaledHosts].sort((a, b) => b.total - a.total)[0];

  const handleSort = (key) => {
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === "desc" ? "asc" : "desc" } : { key, dir: "desc" }));
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
    setSecondsAgo(0);
  };

  const toggleLine = (idx) => {
    setVisibleLines((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleExport = () => {
    const rows = [];
    rows.push(["Ranking Report"]);
    rows.push(["Tab", TABS.find((t) => t.key === activeTab)?.label || activeTab]);
    rows.push(["Period", period]);
    rows.push(["Host filter", hostFilter]);
    rows.push(["Level filter", levelFilter]);
    rows.push([]);
    rows.push(["#", "Host", "Level", "Charisma", "Contribution", "Revenue", "PK Points", "Viewers", "Total Points", "Change"]);
    rankedHosts.forEach((h) =>
      rows.push([h.rank, h.name, h.level, h.charisma, h.contribution, h.revenue, h.pk, h.viewers, h.total, h.change])
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
    link.download = "ranking-report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans px-7 py-6">
      {/* Header */}
      <div className="flex items-start justify-end mb-1 flex-wrap gap-3">
        <button
          onClick={handleExport}
          className="border border-black text-black bg-white rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
        >
          Export Report
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mt-5 mb-5 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`whitespace-nowrap py-2.5 text-sm font-semibold border-b-2 ${
              activeTab === t.key ? "border-black text-black" : "border-transparent text-black/50 hover:text-black"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className="flex gap-3 flex-wrap">
          <select
            value={hostFilter}
            onChange={(e) => setHostFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-black bg-white"
          >
            <option>All Hosts</option>
            {BASE_HOSTS.map((h) => (
              <option key={h.id}>{h.name}</option>
            ))}
          </select>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-black bg-white"
          >
            <option>All Levels</option>
            <option>VIP</option>
            <option>Elite</option>
            <option>Gold</option>
            <option>Silver</option>
          </select>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-black bg-white"
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Week</option>
          </select>
        </div>
        <button onClick={handleRefresh} className="text-xs text-black hover:underline">
          Ranking updated {secondsAgo < 5 ? "just now" : `${secondsAgo}s ago`} — refresh
        </button>
      </div>

      {/* Stat cards */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <StatCard label="Total Hosts Ranked" value={fmt(scaledHosts.length)} sub="↑ 8 vs Apr 2025" subColor="text-emerald-600" />
        <StatCard label="Top 1 Host (Overall)" value={topHost.name} sub={`${fmt(topHost.total)} Points`} subColor="text-violet-600" />
        <StatCard label="Your Agency Rank" value="2" sub="↑ 1 vs Apr 2025" subColor="text-emerald-600" />
        <StatCard label="Points This Month" value={fmt(totalPoints)} sub="↑ 15.8% vs Apr 2025" subColor="text-emerald-600" />
        <StatCard label="Avg. Points / Host" value={fmt(avgPoints)} sub="↑ 12.4% vs Apr 2025" subColor="text-emerald-600" />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5">
        {/* Ranking table */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="font-bold text-[15px] text-black mb-3.5">
            {TABS.find((t) => t.key === activeTab)?.label} ({period})
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="text-black text-left border-b border-gray-100">
                  <th className="font-medium py-2.5 px-2">#</th>
                  <SortHeader label="Host" sortKey="name" sort={sort} onSort={handleSort} />
                  <SortHeader label="Level" sortKey="level" sort={sort} onSort={handleSort} />
                  <SortHeader label="Charisma" sortKey="charisma" sort={sort} onSort={handleSort} />
                  <SortHeader label="Contribution" sortKey="contribution" sort={sort} onSort={handleSort} />
                  <SortHeader label="Revenue" sortKey="revenue" sort={sort} onSort={handleSort} />
                  <SortHeader label="PK Points" sortKey="pk" sort={sort} onSort={handleSort} />
                  <SortHeader label="Total Points" sortKey="total" sort={sort} onSort={handleSort} />
                  <th className="font-medium py-2.5 px-2">Change</th>
                </tr>
              </thead>
              <tbody>
                {visibleHosts.map((h) => (
                  <tr key={h.id} className="border-t border-gray-100">
                    <td className="py-2.5 px-2 text-black font-semibold">{h.rank}</td>
                    <td className="py-2.5 px-2 text-black">
                      <div className="flex items-center gap-2">
                        <Avatar name={h.name} src={h.avatar} size="w-7 h-7" />
                        {h.name}
                      </div>
                    </td>
                    <td className="py-2.5 px-2">
                      <LevelBadge level={h.level} />
                    </td>
                    <td className="py-2.5 px-2 text-black">{fmt(h.charisma)}</td>
                    <td className="py-2.5 px-2 text-black">{fmt(h.contribution)}</td>
                    <td className="py-2.5 px-2 text-black">₹{fmt(h.revenue)}</td>
                    <td className="py-2.5 px-2 text-black">{fmt(h.pk)}</td>
                    <td className="py-2.5 px-2 text-violet-600 font-bold">{fmt(h.total)}</td>
                    <td className="py-2.5 px-2">
                      <ChangeBadge change={h.change} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rankedHosts.length > 10 && (
            <div className="text-center mt-4">
              <button onClick={() => setShowAll((v) => !v)} className="text-violet-600 text-sm font-semibold hover:underline">
                {showAll ? "Show less" : "View All Hosts"} →
              </button>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Top 3 hosts */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="font-bold text-[15px] text-black mb-4">Top 3 Hosts ({period})</div>
            <div className="flex items-end justify-center gap-4">
              {[podium[1], podium[0], podium[2]].filter(Boolean).map((h) => {
                const isFirst = h.rank === 1;
                return (
                  <div key={h.id} className={`flex flex-col items-center ${isFirst ? "-mt-3" : ""}`}>
                    <div className="text-xs font-bold text-black mb-1">{h.rank}</div>
                    <Avatar
                      name={h.name}
                      src={h.avatar}
                      size={isFirst ? "w-16 h-16" : "w-12 h-12"}
                      ring={isFirst ? "ring-2 ring-violet-500" : ""}
                    />
                    <div className="text-xs font-semibold text-black mt-2 text-center">{h.name}</div>
                    <div className="mt-1">
                      <LevelBadge level={h.level} />
                    </div>
                    <div className="text-xs text-violet-600 font-bold mt-1">{fmt(h.total)} Points</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ranking trend */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="font-bold text-[15px] text-black mb-2">Ranking Trend (Top 5 Hosts)</div>
            <div className="flex gap-3 flex-wrap mb-2">
              {top5Names.map((name, i) => (
                <button
                  key={name}
                  onClick={() => toggleLine(i)}
                  className={`flex items-center gap-1.5 text-[11px] rounded px-1.5 py-0.5 ${
                    visibleLines[i] ? "text-black" : "text-black/30"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: TREND_COLORS[i] }} />
                  {name}
                </button>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid vertical={false} stroke="#F1F1F4" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#000000" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#000000" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v / 1e6)}M`} />
                <Tooltip formatter={(v) => fmt(v)} />
                {top5Names.map((name, i) =>
                  visibleLines[i] ? (
                    <Line key={name} type="monotone" dataKey={name} stroke={TREND_COLORS[i]} strokeWidth={2} dot={{ r: 3 }} />
                  ) : null
                )}
              </LineChart>
            </ResponsiveContainer>
            <div className="text-center mt-1">
              <button className="text-violet-600 text-sm font-semibold hover:underline">View Detailed Analytics →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}