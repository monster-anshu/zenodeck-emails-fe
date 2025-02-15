import { infiniteQueryOptions } from "@tanstack/react-query";
import { LeadService, ListLeadRequest } from "@web-services/lead.service";

export const leadsQueryOptions = ({
  leadListId,
}: Pick<ListLeadRequest, "leadListId">) =>
  infiniteQueryOptions({
    queryKey: ["leads", leadListId],
    queryFn: ({ pageParam }: { pageParam?: string }) => {
      return LeadService.list({
        after: pageParam,
        leadListId: leadListId,
        limit: 25,
      });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta.nextCursor;
    },
    refetchOnMount: false,
    initialPageParam: undefined,
  });
