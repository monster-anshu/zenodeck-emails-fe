import { queryOptions } from "@tanstack/react-query";
import { CampaignService } from "@web-services/campaign.service";

export const campaignListQueryOptions = queryOptions({
  queryKey: ["campaigns"],
  queryFn: CampaignService.list,
});

export const campaignQueryOptions = (campaignId: string) =>
  queryOptions({
    queryKey: ["campaign", campaignId],
    queryFn: () => CampaignService.get(campaignId),
  });
