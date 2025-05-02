"use client";
import PageWrapper from "@/components/PageWrapper";
import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUp,
  ArrowDown,
  Users,
  Package,
  ShoppingBag,
  BarChart2,
} from "lucide-react";

// Types
type SalesData = {
  day: string;
  value: number;
};

type RevenueData = {
  day: string;
  sales: number;
  profit: number;
};

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeType: "up" | "down";
};

type ChartCardProps = {
  title: string;
  children: React.ReactNode;
};

// Sample data
const salesData: SalesData[] = [
  { day: "1", value: 20 },
  { day: "5", value: 40 },
  { day: "10", value: 30 },
  { day: "15", value: 45 },
  { day: "20", value: 35 },
  { day: "25", value: 55 },
  { day: "30", value: 40 },
  { day: "35", value: 30 },
  { day: "40", value: 45 },
  { day: "45", value: 40 },
  { day: "50", value: 35 },
  { day: "55", value: 45 },
  { day: "60", value: 40 },
];

const revenueData: RevenueData[] = [
  { day: "1", sales: 20, profit: 30 },
  { day: "5", sales: 25, profit: 40 },
  { day: "10", sales: 30, profit: 35 },
  { day: "15", sales: 40, profit: 30 },
  { day: "20", sales: 35, profit: 40 },
  { day: "25", sales: 50, profit: 35 },
  { day: "30", sales: 40, profit: 45 },
  { day: "35", sales: 55, profit: 35 },
  { day: "40", sales: 45, profit: 40 },
  { day: "45", sales: 40, profit: 50 },
  { day: "50", sales: 35, profit: 55 },
  { day: "55", sales: 50, profit: 45 },
  { day: "60", sales: 45, profit: 40 },
];

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div
          className={`p-2 rounded-lg ${
            title === "Active Users"
              ? "bg-indigo-100"
              : title === "Total Buyers"
              ? "bg-amber-100"
              : title === "Total Sellers"
              ? "bg-orange-100"
              : "bg-green-100"
          }`}
        >
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-1">
        {changeType === "up" ? (
          <ArrowUp size={14} className="text-green-500" />
        ) : (
          <ArrowDown size={14} className="text-red-500" />
        )}
        <span
          className={`text-xs ${
            changeType === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {change} {changeType === "up" ? "Up" : "Down"} from yesterday
        </span>
      </div>
    </div>
  );
};

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center text-sm text-gray-500 gap-1">
          <span>October</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
      <div className="h-64">{children}</div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <PageWrapper>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Active Users"
            value="40,689"
            icon={<Users size={20} className="text-indigo-500" />}
            change="8.5%"
            changeType="up"
          />
          <StatCard
            title="Total Buyers"
            value="10293"
            icon={<Package size={20} className="text-amber-500" />}
            change="1.3%"
            changeType="up"
          />
          <StatCard
            title="Total Sellers"
            value="2040"
            icon={<ShoppingBag size={20} className="text-orange-500" />}
            change="1.8%"
            changeType="up"
          />
          <StatCard
            title="Total Sales"
            value="$89,000"
            icon={<BarChart2 size={20} className="text-green-500" />}
            change="2.3%"
            changeType="down"
          />
        </div>

        <ChartCard title="Sales Details">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="#94a3b8"
                axisLine={false}
                tickLine={false}
              />
              <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="#94a3b8"
                axisLine={false}
                tickLine={false}
              />
              <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sales"
                stackId="1"
                stroke="#f97316"
                fill="#f97316"
                fillOpacity={0.5}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stackId="2"
                stroke="#a855f7"
                fill="#a855f7"
                fillOpacity={0.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </PageWrapper>
  );
};

export default Home;
