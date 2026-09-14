import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { getMonthlyRevenue } from "../../utils/aggregateRevenue";

// Custom Tooltip styled to fit your UI theme
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="top-courses-card border border-slate-700 p-3 rounded-lg shadow-xl text-slate-100 text-xs">
        <p className="font-semibold text-slate-400 mb-1">{label}</p>
        <p className="text-sm font-bold text-emerald-400">
          $
          {payload[0].value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>
    );
  }
  return null;
};

export default function RevenueChart({ orders }) {
  const data = getMonthlyRevenue(orders);

  return (
    <div className="revenue-chart-card ">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-100">
          Monthly Revenue
        </h3>
        <p className="text-xs text-slate-400">
          Total revenue from completed orders
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-primary, #10b981)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary, #10b981)"
                  stopOpacity={0.0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-on-surface)"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              stroke="var(--color-on-surface)"
              fontSize={12}
              tickLine={false}
            />

            <YAxis
              stroke="var(--color-on-surface)"
              fontSize={12}
              tickLine={false}
              tickFormatter={(val) => `$${val}`}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-primary, #10b981)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
