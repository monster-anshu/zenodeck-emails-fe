import { infiniteQueryOptions } from "@tanstack/react-query";
import { LeadService, ListLeadRequest } from "@web-services/lead.service";

export const leadsQueryOptions = ({
  leadListId,
  q,
}: Pick<ListLeadRequest, "leadListId" | "q">) =>
  infiniteQueryOptions({
    queryKey: ["leads", leadListId, q],
    queryFn: ({ pageParam }: { pageParam?: string }) => {
      return LeadService.list({
        after: pageParam,
        leadListId: leadListId,
        limit: 25,
        q: q,
      });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta.nextCursor;
    },
    refetchOnMount: false,
    initialPageParam: undefined,
  });
