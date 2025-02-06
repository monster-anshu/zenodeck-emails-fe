import { useQuery } from "@tanstack/react-query";
import DashboardCard from "@web-components/dashboard/DashboardCard";
import { dashboardQueryOptions } from "@web-queries/dashboard.query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export default function IndexPage() {
  const dashboardQuery = dashboardQueryOptions();
  const { data } = useQuery(dashboardQuery);

  const lineChartData = Array(30)
    .fill(null)
    .map((_) => {
      return {
        name: "Page A",
        uv: Math.random().toFixed(2),
        pv: Math.random().toFixed(2),
        amt: 2400,
      };
    });

  return (
    <main
      className="container grid flex-1 grid-cols-5 gap-2 overflow-auto p-4"
      style={{
        gridAutoRows: "min-content",
      }}
    >
      <DashboardCard>credential count</DashboardCard>
      <DashboardCard>24 hour count</DashboardCard>
      <DashboardCard>storage used</DashboardCard>
      <DashboardCard>ctr</DashboardCard>
      <DashboardCard>open mail</DashboardCard>
      <DashboardCard className="col-span-full grid h-72 grid-rows-[auto_1fr]">
        <p className="mb-4 text-lg font-medium">Weekly report</p>
        <ResponsiveContainer height={"100%"} width={"100%"}>
          <LineChart data={lineChartData}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
            <Tooltip wrapperClassName="!bg-background rounded !border-border" />
            <XAxis dataKey="pv" />
            {/* <YAxis dataKey="uv" /> */}
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>
      <DashboardCard className="col-span-full grid h-72 grid-rows-[auto_1fr]">
        <p className="mb-4 text-lg font-medium">Weekly report</p>
        <ResponsiveContainer height={"100%"} width={"100%"}>
          <LineChart data={lineChartData}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
            <Tooltip wrapperClassName="!bg-background rounded !border-border" />
            <XAxis dataKey="pv" />
            {/* <YAxis dataKey="uv" /> */}
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>
      <DashboardCard className="col-span-full grid h-72 grid-rows-[auto_1fr]">
        <p className="mb-4 text-lg font-medium">Weekly report</p>
        <ResponsiveContainer height={"100%"} width={"100%"}>
          <LineChart data={lineChartData}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
            <Tooltip wrapperClassName="!bg-background rounded !border-border" />
            <XAxis dataKey="pv" />
            {/* <YAxis dataKey="uv" /> */}
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>
    </main>
  );
}
