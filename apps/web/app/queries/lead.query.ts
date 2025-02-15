import { infiniteQueryOptions } from "@tanstack/react-query";
import { LeadService } from "@web-services/lead.service";

export const leadsQueryOptions = (leadListId: string) =>
  infiniteQueryOptions({
    queryKey: ["leads", leadListId],
    queryFn: ({ pageParam }: { pageParam: string | null }) => {
      return LeadService.list({ after: pageParam || undefined, leadListId });
    },
    getNextPageParam: (last) => {
      return last.meta.nextCursor;
    },
    initialPageParam: null,
  });
