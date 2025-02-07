import { useQuery } from "@tanstack/react-query";
import DashboardCard from "@web-components/dashboard/DashboardCard";
import { dashboardQueryOptions } from "@web-queries/dashboard.query";
import { Link } from "react-router";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
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
      <DashboardCard>
        <p className="font-medium">Credentials</p>
        <p className="flex items-center justify-between text-sm">
          <span>{4}</span>
          <Link to={"/credential"} aria-label="Add credential">
            {" "}
            +
          </Link>
        </p>
      </DashboardCard>
      <DashboardCard>
        <p className="font-medium">Email sent</p>
        <p className="text-sm">{35}</p>
      </DashboardCard>
      <DashboardCard>
        <p className="font-medium">CTR</p>
        <p className="text-sm">3746</p>
      </DashboardCard>
      <DashboardCard>
        <p className="font-medium">Mail seen</p>
        <p className="text-sm">31</p>
      </DashboardCard>
      <DashboardCard>
        <p className="font-medium">Storage uses</p>
        <p className="text-sm">243.4 MB</p>
      </DashboardCard>
      <DashboardCard className="col-span-full grid h-72 grid-rows-[auto_1fr]">
        <p className="mb-4 text-lg font-medium">Email sent</p>
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
        <p className="mb-4 text-lg font-medium">Email seen</p>
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
        <p className="mb-4 text-lg font-medium">Click rate (CTR)</p>
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
