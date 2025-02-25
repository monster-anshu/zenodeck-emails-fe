import { Skeleton } from "@repo/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import Header from "@web-components/Header";
import { campaignListQueryOptions } from "@web-queries/campaign.query";
import { FC } from "react";
import { LuPenLine, LuTrash2 } from "react-icons/lu";

type ICampaignPageProps = {};

const CampaignPage: FC<ICampaignPageProps> = () => {
  const { data, isLoading } = useQuery(campaignListQueryOptions);
  return (
    <main className="container flex-1 overflow-auto p-4">
      <Header
        location={[{ label: "Campaign", link: "/campaign" }]}
        // rightSection={<AddCredentialButton />}
      />

      <div className="mt-4 space-y-2">
        {isLoading &&
          Array(10)
            .fill(null)
            .map((_, i) => {
              return <Skeleton key={i} className="h-12" />;
            })}
        {data?.campaigns.map((campaign) => {
          return (
            <div
              key={campaign._id}
              className="flex items-center gap-2 rounded-lg border p-4"
            >
              <div className="flex-1">
                <button onClick={() => null}>{campaign.name}</button>
              </div>
              <button aria-label="Edit campaign" onClick={() => null}>
                <LuPenLine />
              </button>
              <button aria-label="Delete campaign" onClick={() => null}>
                <LuTrash2 />
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default CampaignPage;
