import { queryOptions } from "@tanstack/react-query";
import { CampaignService } from "@web-services/campaign.service";

export const campaignListQueryOptions = queryOptions({
  queryKey: ["campaigns"],
  queryFn: CampaignService.list,
});
