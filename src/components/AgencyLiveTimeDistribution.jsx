import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// ---- Mock data (mirrors the source screenshot) ----
const ownRoomDaily = [
  { day: "01", thisMonth: 3.0, lastMonth: 2.2 },
  { day: "02", thisMonth: 2.8, lastMonth: 2.1 },
  { day: "03", thisMonth: 3.2, lastMonth: 2.6 },
  { day: "04", thisMonth: 3.5, lastMonth: 2.4 },
  { day: "05", thisMonth: 2.6, lastMonth: 2.0 },
  { day: "06", thisMonth: 3.1, lastMonth: 2.8 },
  { day: "07", thisMonth: 3.4, lastMonth: 2.5 },
  { day: "08", thisMonth: 2.9, lastMonth: 2.3 },
  { day: "09", thisMonth: 3.0, lastMonth: 2.2 },
  { day: "10", thisMonth: 4.5, lastMonth: 3.0 },
  { day: "11", thisMonth: 2.7, lastMonth: 2.1 },
  { day: "12", thisMonth: 3.3, lastMonth: 2.6 },
  { day: "13", thisMonth: 3.6, lastMonth: 2.9 },
  { day: "14", thisMonth: 2.5, lastMonth: 2.0 },
  { day: "15", thisMonth: 3.2, lastMonth: 2.4 },
  { day: "16", thisMonth: 3.4, lastMonth: 2.7 },
  { day: "17", thisMonth: 2.8, lastMonth: 2.2 },
  { day: "18", thisMonth: 3.1, lastMonth: 2.5 },
  { day: "19", thisMonth: 4.8, lastMonth: 3.2 },
  { day: "20", thisMonth: 3.5, lastMonth: 2.6 },
  { day: "21", thisMonth: 2.9, lastMonth: 2.3 },
  { day: "22", thisMonth: 4.6, lastMonth: 3.1 },
  { day: "23", thisMonth: 3.2, lastMonth: 2.4 },
  { day: "24", thisMonth: 2.7, lastMonth: 2.1 },
  { day: "25", thisMonth: 3.0, lastMonth: 2.3 },
  { day: "26", thisMonth: 3.3, lastMonth: 2.5 },
  { day: "27", thisMonth: 2.6, lastMonth: 2.0 },
  { day: "28", thisMonth: 3.1, lastMonth: 2.4 },
  { day: "29", thisMonth: 2.8, lastMonth: 2.2 },
  { day: "30", thisMonth: 3.0, lastMonth: 2.3 },
  { day: "31", thisMonth: 2.5, lastMonth: 0 },
];

const otherRoomsDaily = [
  { day: "01", thisMonth: 0.8, lastMonth: 1.3 },
  { day: "02", thisMonth: 0.6, lastMonth: 1.0 },
  { day: "03", thisMonth: 0.9, lastMonth: 1.2 },
  { day: "04", thisMonth: 1.1, lastMonth: 1.4 },
  { day: "05", thisMonth: 0.7, lastMonth: 1.0 },
  { day: "06", thisMonth: 0.9, lastMonth: 1.1 },
  { day: "07", thisMonth: 0.8, lastMonth: 1.3 },
  { day: "08", thisMonth: 1.0, lastMonth: 0.9 },
  { day: "09", thisMonth: 0.7, lastMonth: 1.0 },
  { day: "10", thisMonth: 1.4, lastMonth: 1.1 },
  { day: "11", thisMonth: 0.9, lastMonth: 0.8 },
  { day: "12", thisMonth: 1.1, lastMonth: 1.0 },
  { day: "13", thisMonth: 1.3, lastMonth: 1.2 },
  { day: "14", thisMonth: 0.8, lastMonth: 0.9 },
  { day: "15", thisMonth: 1.0, lastMonth: 1.1 },
  { day: "16", thisMonth: 1.2, lastMonth: 1.0 },
  { day: "17", thisMonth: 0.9, lastMonth: 0.8 },
  { day: "18", thisMonth: 1.1, lastMonth: 1.0 },
  { day: "19", thisMonth: 1.5, lastMonth: 1.2 },
  { day: "20", thisMonth: 1.2, lastMonth: 1.1 },
  { day: "21", thisMonth: 0.9, lastMonth: 0.9 },
  { day: "22", thisMonth: 1.6, lastMonth: 1.3 },
  { day: "23", thisMonth: 1.1, lastMonth: 1.0 },
  { day: "24", thisMonth: 0.8, lastMonth: 0.9 },
  { day: "25", thisMonth: 1.0, lastMonth: 1.1 },
  { day: "26", thisMonth: 1.2, lastMonth: 1.0 },
  { day: "27", thisMonth: 0.9, lastMonth: 0.8 },
  { day: "28", thisMonth: 1.3, lastMonth: 1.0 },
  { day: "29", thisMonth: 1.0, lastMonth: 0.9 },
  { day: "30", thisMonth: 1.1, lastMonth: 1.0 },
  { day: "31", thisMonth: 0.9, lastMonth: 0 },
];

const ownRoomWeekly = [
  { week: "Week 1 (01 - 07 May)", daily: "3h 15m", total: "22h 45m", vs: "+10.8%", up: true },
  { week: "Week 2 (08 - 14 May)", daily: "3h 02m", total: "21h 10m", vs: "+8.2%", up: true },
  { week: "Week 3 (15 - 21 May)", daily: "3h 18m", total: "23h 20m", vs: "+15.3%", up: true },
  { week: "Week 4 (22 - 28 May)", daily: "3h 00m", total: "21h 00m", vs: "-2.4%", up: false },
  { week: "Week 5 (29 - 31 May)", daily: "2h 35m", total: "7h 05m", vs: "+5.1%", up: true },
];

const otherRoomsWeekly = [
  { week: "Week 1 (01 - 07 May)", daily: "0h 48m", total: "5h 36m", vs: "-5.2%", up: false },
  { week: "Week 2 (08 - 14 May)", daily: "0h 52m", total: "6h 05m", vs: "+4.8%", up: true },
  { week: "Week 3 (15 - 21 May)", daily: "1h 05m", total: "7h 35m", vs: "+9.6%", up: true },
  { week: "Week 4 (22 - 28 May)", daily: "1h 08m", total: "7h 56m", vs: "+12.1%", up: true },
  { week: "Week 5 (29 - 31 May)", daily: "1h 12m", total: "3h 38m", vs: "+3.3%", up: true },
];

const summaryStats = [
  { label: "Total Live Hours (This Month)", value: "125h 30m", change: "+ 12.8% vs Apr 2025", up: true },
  { label: "Own Room (This Month)", value: "95h 20m", change: "76.0% of Total", up: null },
  { label: "Other Rooms (This Month)", value: "30h 10m", change: "24.0% of Total", up: null, warn: true },
  { label: "Daily Avg. (This Month)", value: "4h 03m", change: "+ 8.4% vs Apr 2025", up: true },
  { label: "Longest Live (Single Day)", value: "8h 45m", change: "18 May 2025", up: null },
  { label: "Live Days (This Month)", value: "31 Days", change: "100% Active", up: true },
];

const donutData = [
  { name: "Own Room", value: 95.33, color: "#7C3AED" },
  { name: "Other Rooms", value: 30.17, color: "#F59E0B" },
];

function Donut({ centerValue }) {
  return (
    <div style={{ position: "relative", width: 140, height: 140 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={donutData}
            dataKey="value"
            innerRadius={45}
            outerRadius={65}
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            {donutData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{centerValue}</span>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 8,
          padding: "8px 12px",
          fontSize: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 4 }}>May {label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color }}>
            {p.name}: {p.value.toFixed(1)}h
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function StatCard({ label, value, change, up, warn }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #F1F1F4",
        borderRadius: 14,
        padding: "18px 18px",
        flex: 1,
        minWidth: 150,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ fontSize: 12.5, color: "#8A8A9A", fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 21, fontWeight: 700, color: "#16161D" }}>{value}</div>
      {up !== null && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: up ? "#16A34A" : warn ? "#D97706" : "#DC2626",
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          {up ? <ArrowUp size={12} /> : null}
          {change}
        </div>
      )}
      {up === null && (
        <div style={{ fontSize: 12, fontWeight: 600, color: warn ? "#D97706" : "#16A34A" }}>{change}</div>
      )}
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 12, color: "#8A8A9A", fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#16161D" }}>{value}</div>
    </div>
  );
}

function WeeklyTable({ rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ color: "#8A8A9A", textAlign: "left" }}>
            <th style={{ fontWeight: 500, paddingBottom: 10 }}>Week</th>
            <th style={{ fontWeight: 500, paddingBottom: 10 }}>Daily Avg.</th>
            <th style={{ fontWeight: 500, paddingBottom: 10 }}>Total Hours</th>
            <th style={{ fontWeight: 500, paddingBottom: 10 }}>vs Last Month</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderTop: "1px solid #F1F1F4" }}>
              <td style={{ padding: "10px 0", color: "#16161D" }}>{r.week}</td>
              <td style={{ padding: "10px 0", color: "#16161D" }}>{r.daily}</td>
              <td style={{ padding: "10px 0", color: "#16161D", fontWeight: 600 }}>{r.total}</td>
              <td
                style={{
                  padding: "10px 0",
                  color: r.up ? "#16A34A" : "#DC2626",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                {r.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                {r.vs}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LegendDot({ color, label, pct }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#4B4B57" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block" }} />
      {label} ({pct})
    </div>
  );
}

export default function LiveTimeDistribution() {
  const handleExport = () => {
    const rows = [];

    rows.push(["Live Time Distribution Report"]);
    rows.push(["Host", "Pooja Singh (HST100234)"]);
    rows.push(["Agency", "AGY1001 - Dream Star Agency"]);
    rows.push([]);

    rows.push(["Summary"]);
    rows.push(["Metric", "Value", "Note"]);
    summaryStats.forEach((s) => rows.push([s.label, s.value, s.change]));
    rows.push([]);

    rows.push(["Own Room - Weekly Summary"]);
    rows.push(["Week", "Daily Avg.", "Total Hours", "vs Last Month"]);
    ownRoomWeekly.forEach((r) => rows.push([r.week, r.daily, r.total, r.vs]));
    rows.push([]);

    rows.push(["Other Rooms - Weekly Summary"]);
    rows.push(["Week", "Daily Avg.", "Total Hours", "vs Last Month"]);
    otherRoomsWeekly.forEach((r) => rows.push([r.week, r.daily, r.total, r.vs]));
    rows.push([]);

    rows.push(["Own Room - Daily Hours (May 2025)"]);
    rows.push(["Day", "This Month (h)", "Last Month (h)"]);
    ownRoomDaily.forEach((d) => rows.push([d.day, d.thisMonth, d.lastMonth]));
    rows.push([]);

    rows.push(["Other Rooms - Daily Hours (May 2025)"]);
    rows.push(["Day", "This Month (h)", "Last Month (h)"]);
    otherRoomsDaily.forEach((d) => rows.push([d.day, d.thisMonth, d.lastMonth]));

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
    link.download = "live-time-distribution-report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ background: "#F7F7FA", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ padding: "24px 28px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start", marginBottom: 6 }}>
          <button
            onClick={handleExport}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              border: "1px solid #7C3AED",
              color: "#7C3AED",
              borderRadius: 8,
              padding: "10px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Export Report
          </button>
        </div>

        {/* Stat cards */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          {summaryStats.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>

        {/* Own Room section */}
        <SectionHeader title="Own Room" subtitle="Time spent by the host on their own broadcast room." />
        <div style={{ display: "grid", gridTemplateColumns: "220px 1.4fr 1.3fr 1fr", gap: 16, marginBottom: 28 }}>
          <Panel>
            <MiniStat label="Daily Hours (Avg.)" value="3h 04m" />
            <MiniStat label="Weekly Hours (Avg.)" value="21h 28m" />
            <MiniStat label="Monthly Hours (Total)" value="95h 20m" />
          </Panel>

          <Panel>
            <PanelTitle title="Own Room Live Hours" legend={["This Month", "Last Month"]} colors={["#7C3AED", "#D9D9E3"]} />
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={ownRoomDaily} barGap={2}>
                <CartesianGrid vertical={false} stroke="#F1F1F4" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#8A8A9A" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#8A8A9A" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}h`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
                <Bar dataKey="thisMonth" name="This Month" fill="#7C3AED" radius={[3, 3, 0, 0]} maxBarSize={8} />
                <Bar dataKey="lastMonth" name="Last Month" fill="#E4E4EB" radius={[3, 3, 0, 0]} maxBarSize={8} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ textAlign: "center", fontSize: 11, color: "#8A8A9A", marginTop: 4 }}>May 2025</div>
          </Panel>

          <Panel>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#16161D", marginBottom: 14 }}>Own Room - Weekly Summary</div>
            <WeeklyTable rows={ownRoomWeekly} />
          </Panel>

          <Panel style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#16161D", marginBottom: 14, alignSelf: "flex-start" }}>
              Own Room vs Other Rooms (This Month)
            </div>
            <Donut centerValue="125h 30m" />
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8, alignSelf: "flex-start" }}>
              <LegendDot color="#7C3AED" label="Own Room" pct="95h 20m (76.0%)" />
              <LegendDot color="#F59E0B" label="Other Rooms" pct="30h 10m (24.0%)" />
            </div>
          </Panel>
        </div>

        {/* Other Broadcast Rooms section */}
        <SectionHeader title="Other Broadcast Rooms" subtitle="Time spent by the host in other broadcasters' rooms." />
        <div style={{ display: "grid", gridTemplateColumns: "220px 1.4fr 1.3fr 1fr", gap: 16, marginBottom: 28 }}>
          <Panel>
            <MiniStat label="Daily Hours (Avg.)" value="0h 59m" />
            <MiniStat label="Weekly Hours (Avg.)" value="6h 45m" />
            <MiniStat label="Monthly Hours (Total)" value="30h 10m" />
          </Panel>

          <Panel>
            <PanelTitle title="Other Rooms Live Hours" legend={["This Month", "Last Month"]} colors={["#F59E0B", "#D9D9E3"]} />
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={otherRoomsDaily} barGap={2}>
                <CartesianGrid vertical={false} stroke="#F1F1F4" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#8A8A9A" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#8A8A9A" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}h`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
                <Bar dataKey="thisMonth" name="This Month" fill="#F59E0B" radius={[3, 3, 0, 0]} maxBarSize={8} />
                <Bar dataKey="lastMonth" name="Last Month" fill="#E4E4EB" radius={[3, 3, 0, 0]} maxBarSize={8} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ textAlign: "center", fontSize: 11, color: "#8A8A9A", marginTop: 4 }}>May 2025</div>
          </Panel>

          <Panel>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#16161D", marginBottom: 14 }}>Other Rooms - Weekly Summary</div>
            <WeeklyTable rows={otherRoomsWeekly} />
          </Panel>

          <Panel style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#16161D", marginBottom: 14, alignSelf: "flex-start" }}>
              Time Distribution (This Month)
            </div>
            <Donut centerValue="125h 30m" />
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8, alignSelf: "flex-start" }}>
              <LegendDot color="#7C3AED" label="Own Room" pct="95h 20m (76.0%)" />
              <LegendDot color="#F59E0B" label="Other Rooms" pct="30h 10m (24.0%)" />
            </div>
          </Panel>
        </div>

        {/* Insight */}
        <div
          style={{
            background: "#F5F3FF",
            border: "1px solid #E9E4FD",
            borderRadius: 12,
            padding: "16px 20px",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 13.5, color: "#000000", marginBottom: 4 }}>Insight</div>
          <div style={{ fontSize: 13, color: "#000000", lineHeight: 1.5 }}>
            Pooja Singh spends 76.0% of total live time in own room and 24.0% in other rooms.
            <br />
            Focus on increasing own room live time to achieve higher performance and monetization.
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 17, fontWeight: 700, color: "#16161D" }}>{title}</div>
      <div style={{ fontSize: 12.5, color: "#8A8A9A", marginTop: 2 }}>{subtitle}</div>
    </div>
  );
}

function Panel({ children, style }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #F1F1F4",
        borderRadius: 14,
        padding: 18,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function PanelTitle({ title, legend, colors }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
      <div style={{ fontWeight: 600, fontSize: 14, color: "#16161D" }}>{title}</div>
      <div style={{ display: "flex", gap: 12 }}>
        {legend.map((l, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#8A8A9A" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: colors[i] }} />
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}