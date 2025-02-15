import { queryOptions } from "@tanstack/react-query";
import { LeadService, ListLeadRequest } from "@web-services/lead.service";

export const leadsQueryOptions = (params: ListLeadRequest) =>
  queryOptions({
    queryKey: ["leads", params],
    queryFn: () => {
      return LeadService.list(params);
    },
  });
