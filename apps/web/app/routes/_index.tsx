import { useQuery } from "@tanstack/react-query";
import { agentInfoQueryOptions } from "@web-queries/agent.query";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export default function IndexPage() {
  const { data } = useQuery(agentInfoQueryOptions);
  return <main className="">Name : {data?.agentInfo?.firstName}</main>;
}
