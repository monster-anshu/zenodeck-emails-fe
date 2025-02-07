import { queryOptions } from "@tanstack/react-query";
import { DashboardService } from "@web-services/dashboard.service";

export const dashboardQueryOptions = () =>
  queryOptions({
    queryKey: ["dashboard"],
    queryFn: DashboardService.get,
  });
