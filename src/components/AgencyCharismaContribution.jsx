import React from "react";
import {
  LayoutDashboard,
  ChevronRight,
  ChevronDown,
  Download,
  Star,
  Gift,
  User,
  Send,
  CheckCircle2,
  Target,
  Calendar,
  Clock,
  Hourglass,
  Circle,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const days = Array.from({ length: 31 }, (_, i) =>
  String(i + 1).padStart(2, "0") + " May"
);

const charismaTrend = [
  2.1, 2.8, 3.2, 2.6, 3.5, 4.1, 3.8, 4.5, 4.0, 4.8, 5.2, 4.6, 5.5, 5.0, 5.8,
  6.2, 5.6, 6.5, 7.0, 6.3, 7.5, 8.2, 7.0, 6.8, 7.2, 7.8, 8.0, 7.4, 8.5, 7.9,
  8.6,
].map((v, i) => ({ day: days[i], value: v }));

const contributionTrend = [
  1.5, 1.8, 2.0, 1.9, 2.3, 2.5, 2.2, 2.8, 2.6, 3.0, 3.2, 2.9, 3.4, 3.1, 3.6,
  3.8, 3.5, 4.0, 4.3, 3.9, 4.5, 5.0, 4.2, 4.4, 4.6, 5.2, 5.5, 5.0, 6.0, 5.8,
  6.4,
].map((v, i) => ({ day: days[i], value: v }));

const hostsCharisma = [
  { name: "Pooja Singh", monthly: 1250300, target: 1800000, pct: 69.46 },
  { name: "Anjali Sharma", monthly: 1020400, target: 1500000, pct: 68.03 },
  { name: "Riya Mehta", monthly: 860200, target: 1200000, pct: 71.68 },
  { name: "Kavya Reddy", monthly: 780100, target: 1100000, pct: 70.91 },
  { name: "Neha Patel", monthly: 690400, target: 1000000, pct: 69.04 },
];

const hostsContribution = [
  { name: "Pooja Singh", monthly: 985500, target: 1500000, pct: 65.7 },
  { name: "Anjali Sharma", monthly: 875200, target: 1300000, pct: 67.32 },
  { name: "Riya Mehta", monthly: 760300, target: 1150000, pct: 66.11 },
  { name: "Kavya Reddy", monthly: 650300, target: 1000000, pct: 65.08 },
  { name: "Neha Patel", monthly: 575100, target: 890000, pct: 64.61 },
];

const fmt = (n) => "₹" + n.toLocaleString("en-IN");

function toCsv() {
  const lines = [];
  lines.push("Charisma & Contribution Report");
  lines.push("");
  lines.push("Summary");
  lines.push("Metric,Value");
  lines.push("Total Charisma (Received),₹1,25,80,300");
  lines.push("Total Contribution (Sent),₹98,75,500");
  lines.push("Avg. Charisma / Host,₹1,02,450");
  lines.push("Avg. Contribution / Host,₹78,600");
  lines.push("Target Completion (Charisma),68.45%");
  lines.push("Target Completion (Contribution),62.30%");
  lines.push("");
  lines.push("Top 5 Hosts by Charisma (This Month)");
  lines.push("Rank,Host Name,Monthly Charisma,Target,Achievement %");
  hostsCharisma.forEach((h, i) => {
    lines.push(`${i + 1},${h.name},${h.monthly},${h.target},${h.pct}%`);
  });
  lines.push("");
  lines.push("Top 5 Hosts by Contribution (This Month)");
  lines.push("Rank,Host Name,Monthly Contribution,Target,Achievement %");
  hostsContribution.forEach((h, i) => {
    lines.push(`${i + 1},${h.name},${h.monthly},${h.target},${h.pct}%`);
  });
  return lines.join("\n");
}

function handleExport() {
  const csv = toCsv();
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "charisma-contribution-report.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3.5">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-8 h-8 rounded-md bg-gray-100 text-black flex items-center justify-center shrink-0">
          <Icon size={16} strokeWidth={1.8} />
        </div>
        <span className="text-[11px] text-gray-500">{label}</span>
      </div>
      <p className="text-[17px] font-bold text-gray-900 mb-0.5">{value}</p>
      <a href="#" className="text-[11.5px] font-medium text-black hover:underline">
        View Details
      </a>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-[26px] h-[26px] rounded-md bg-gray-100 text-black flex items-center justify-center shrink-0">
        <Icon size={14} strokeWidth={1.8} />
      </div>
      <div>
        <div className="text-[10.5px] text-gray-500">{label}</div>
        <div className="text-[13px] font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
}

function HostTable({ hosts, barColor }) {
  return (
    <table className="w-full text-[12.5px] mt-1.5">
      <thead>
        <tr className="text-[11px] text-gray-500">
          <th className="text-left font-semibold py-2 border-b border-gray-200">#</th>
          <th className="text-left font-semibold py-2 border-b border-gray-200">Host Name</th>
          <th className="text-left font-semibold py-2 border-b border-gray-200">Monthly</th>
          <th className="text-left font-semibold py-2 border-b border-gray-200">Target</th>
          <th className="text-left font-semibold py-2 border-b border-gray-200">Achievement %</th>
          <th className="text-left font-semibold py-2 border-b border-gray-200">Progress</th>
        </tr>
      </thead>
      <tbody>
        {hosts.map((h, i) => (
          <tr key={h.name} className={i !== hosts.length - 1 ? "border-b border-gray-100" : ""}>
            <td className="py-2.5">{i + 1}</td>
            <td className="py-2.5 text-gray-900">{h.name}</td>
            <td className="py-2.5">{fmt(h.monthly)}</td>
            <td className="py-2.5">{fmt(h.target)}</td>
            <td className="py-2.5">{h.pct}%</td>
            <td className="py-2.5">
              <div className="w-20 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${h.pct}%`, backgroundColor: barColor }}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TrendChart({ data, color }) {
  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 6, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="#eceef1" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 9, fill: "#9ca3af" }}
            interval={5}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 9, fill: "#9ca3af" }}
            tickFormatter={(v) => `${v}L`}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip
            formatter={(v) => [`₹${v}L`, "Value"]}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #eceef1" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ r: 2.3, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function Panel({ title, accentColor, mini, monthlyLabel, monthlyValue, targetValue, achievedValue, pct, chartData, hosts }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3.5">
        <div className="text-[14px] font-semibold text-gray-900">{title}</div>
        <div className="text-[12px] border border-gray-200 rounded-md px-2.5 py-1.5 flex items-center gap-1 text-gray-900">
          This Month <ChevronDown size={13} strokeWidth={1.8} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {mini.map((m) => (
          <MiniStat key={m.label} icon={m.icon} label={m.label} value={m.value} />
        ))}
      </div>

      <div className="flex items-center justify-between text-[12.5px] font-semibold mb-1.5">
        <span>
          {monthlyLabel}
          <span className="ml-2 text-[11px] font-normal text-gray-500">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full mr-1"
              style={{ backgroundColor: accentColor }}
            />
            Achieved{"  "}
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-1 ml-2 bg-gray-200" />
            Remaining
          </span>
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-200 overflow-hidden mb-2">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: accentColor }}
        />
      </div>
      <div className="flex items-center justify-between text-[11.5px] text-gray-500 mb-4.5">
        <span>Target: {targetValue}</span>
        <span style={{ color: accentColor }} className="font-medium">
          Achieved: {achievedValue}
        </span>
      </div>

      <div className="text-[12.5px] font-semibold mb-2.5">Daily {title.split(" ")[0]} Trend (This Month)</div>
      <TrendChart data={chartData} color={accentColor} />

      <div className="mt-4">
        <div className="text-[14px] font-semibold text-gray-900 mb-1">
          Top 5 Hosts by {title.split(" ")[0]} (This Month)
        </div>
        <HostTable hosts={hosts} barColor={accentColor} />
        <div className="flex justify-center mt-2.5">
          <a
            href="#"
            className="text-[12.5px] font-medium text-black hover:underline flex items-center gap-1"
          >
            View All Hosts <ArrowRight size={13} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CharismaContributionDashboard() {
  return (
    <div className="w-full bg-[#f6f7f9] min-h-screen p-5">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[21px] font-semibold text-gray-900 mb-1">
              Charisma & Contribution
            </p>
            <div className="text-[13px] text-gray-500 flex items-center gap-1.5">
              <LayoutDashboard size={14} strokeWidth={1.8} /> Dashboard
              <ChevronRight size={12} strokeWidth={1.8} /> Charisma & Contribution
            </div>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 text-[13px] font-medium px-4 py-2 rounded-lg border border-black text-black bg-white hover:bg-gray-50 active:scale-[0.98] transition"
          >
            <Download size={15} strokeWidth={1.8} /> Export Report
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
          <StatCard icon={Star} label="Total Charisma (Received)" value="₹1,25,80,300" />
          <StatCard icon={Gift} label="Total Contribution (Sent)" value="₹98,75,500" />
          <StatCard icon={User} label="Avg. Charisma / Host" value="₹1,02,450" />
          <StatCard icon={Send} label="Avg. Contribution / Host" value="₹78,600" />
          <StatCard icon={CheckCircle2} label="Target Completion (Charisma)" value="68.45%" />
          <StatCard icon={Target} label="Target Completion (Contribution)" value="62.30%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Panel
            title="Charisma (Host Received)"
            accentColor="#7c5cff"
            monthlyLabel="Charisma Progress"
            monthlyValue="₹1,25,80,300"
            targetValue="₹1,84,00,000"
            achievedValue="₹1,25,80,300"
            pct={68.45}
            chartData={charismaTrend}
            hosts={hostsCharisma}
            mini={[
              { icon: Calendar, label: "Monthly Charisma", value: "₹1,25,80,300" },
              { icon: Clock, label: "Daily Charisma (Avg.)", value: "₹4,05,170" },
              { icon: Target, label: "Target Charisma", value: "₹1,84,00,000" },
              { icon: Hourglass, label: "Remaining Charisma", value: "₹58,19,700" },
              { icon: Circle, label: "Target Completion", value: "68.45%" },
            ]}
          />
          <Panel
            title="Contribution (Host Sent)"
            accentColor="#f5872e"
            monthlyLabel="Contribution Progress"
            monthlyValue="₹98,75,500"
            targetValue="₹1,58,40,000"
            achievedValue="₹98,75,500"
            pct={62.3}
            chartData={contributionTrend}
            hosts={hostsContribution}
            mini={[
              { icon: Calendar, label: "Monthly Contribution", value: "₹98,75,500" },
              { icon: Clock, label: "Daily Contribution (Avg.)", value: "₹3,18,403" },
              { icon: Target, label: "Target Contribution", value: "₹1,58,40,000" },
              { icon: Hourglass, label: "Remaining Contribution", value: "₹59,64,500" },
              { icon: Circle, label: "Target Completion", value: "62.30%" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}