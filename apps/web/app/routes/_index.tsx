import { useQuery } from "@tanstack/react-query";
import DashboardCard from "@web-components/dashboard/DashboardCard";
import DashboardSkeleton from "@web-components/dashboard/DashboardSkeleton";
import { dashboardQueryOptions } from "@web-queries/dashboard.query";
import { Link } from "react-router";
import {
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
  const { data, isLoading } = useQuery(dashboardQuery);

  const historyChart = data?.history.stats || [];
  const ctrChart = data?.ctr.stats || [];
  const mailOpenedChart = data?.openedMail.stats || [];

  if (isLoading) {
    return <DashboardSkeleton />;
  }

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
          <span>{data?.credential.total}</span>
          <Link to={"/credential"} aria-label="Add credential">
            {" "}
            +
          </Link>
        </p>
      </DashboardCard>
      <DashboardCard>
        <p className="font-medium">Email sent</p>
        <p className="text-sm">{data?.history.total}</p>
      </DashboardCard>
      <DashboardCard>
        <p className="font-medium">CTR</p>
        <p className="text-sm">{data?.ctr.total}</p>
      </DashboardCard>
      <DashboardCard>
        <p className="font-medium">Mail seen</p>
        <p className="text-sm">{data?.openedMail.total}</p>
      </DashboardCard>
      <DashboardCard>
        <p className="font-medium">Storage uses</p>
        <p className="text-sm">243.4 MB</p>
      </DashboardCard>
      <DashboardCard className="col-span-full grid h-72 grid-rows-[auto_1fr]">
        <p className="mb-4 text-lg font-medium">Email sent</p>
        <ResponsiveContainer height={"100%"} width={"100%"}>
          <LineChart data={historyChart}>
            <Line
              type="monotone"
              isAnimationActive={false}
              dataKey="count"
              stroke="#8884d8"
            />
            <XAxis dataKey="date" />
            {/* <YAxis dataKey="count" /> */}
            <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
            <Tooltip wrapperClassName="!bg-background rounded !border-border" />
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>
      <DashboardCard className="col-span-full grid h-72 grid-rows-[auto_1fr]">
        <p className="mb-4 text-lg font-medium">Email seen</p>
        <ResponsiveContainer height={"100%"} width={"100%"}>
          <LineChart data={mailOpenedChart}>
            <Line
              type="monotone"
              isAnimationActive={false}
              dataKey="count"
              stroke="#8884d8"
            />
            <XAxis dataKey="date" />
            {/* <YAxis dataKey="count" /> */}
            <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
            <Tooltip wrapperClassName="!bg-background rounded !border-border" />
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>
      <DashboardCard className="col-span-full grid h-72 grid-rows-[auto_1fr]">
        <p className="mb-4 text-lg font-medium">Click rate (CTR)</p>
        <ResponsiveContainer height={"100%"} width={"100%"}>
          <LineChart data={ctrChart}>
            <Line
              type="monotone"
              isAnimationActive={false}
              dataKey="count"
              stroke="#8884d8"
            />
            <XAxis dataKey="date" />
            {/* <YAxis dataKey="count" /> */}
            <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
            <Tooltip wrapperClassName="!bg-background rounded !border-border" />
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>
    </main>
  );
}
