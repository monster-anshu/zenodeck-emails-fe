import { queryOptions } from "@tanstack/react-query";
import { LeadListService } from "@web-services/lead-list.service";

export const leadListQueryOptions = queryOptions({
  queryKey: ["lead-list"],
  queryFn: LeadListService.list,
});
