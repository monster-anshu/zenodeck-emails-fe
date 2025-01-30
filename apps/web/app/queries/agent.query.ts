import { queryOptions } from "@tanstack/react-query";
import { AgentService } from "@web-services/agent.service";

export const agentInfoQueryOptions = queryOptions({
  queryKey: ["agent-info"],
  queryFn: AgentService.info,
  refetchOnMount: false,
});
