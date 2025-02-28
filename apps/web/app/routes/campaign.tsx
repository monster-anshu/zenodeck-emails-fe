import { Button } from "@repo/ui/components/button";
import { Skeleton } from "@repo/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import AddEditCampaignModal from "@web-components/campaign/AddEditCampaignModal";
import Header from "@web-components/Header";
import { campaignListQueryOptions } from "@web-queries/campaign.query";
import { Campaign } from "@web-services/campaign.service";
import { FC, useState } from "react";
import { LuEye, LuPenLine, LuTrash2 } from "react-icons/lu";
import { Link } from "react-router";

type ICampaignPageProps = {};

const CampaignPage: FC<ICampaignPageProps> = () => {
  const { data, isLoading } = useQuery(campaignListQueryOptions);
  const [selectedForEdit, setSelectedForEdit] = useState<null | Campaign>(null);
  return (
    <main className="container flex-1 overflow-auto p-4">
      {selectedForEdit && (
        <AddEditCampaignModal
          onClose={() => setSelectedForEdit(null)}
          campaign={selectedForEdit}
        />
      )}

      <Header
        location={[{ label: "Campaign", link: "/campaign" }]}
        rightSection={
          <Link to={"/campaign/add"}>
            <Button>+ Add Campaign</Button>
          </Link>
        }
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
                <Link to={`/campaign/${campaign._id}`}>{campaign.name}</Link>
              </div>
              <Link to={`/campaign/${campaign._id}`}>
                <button aria-label="View campaign">
                  <LuEye />
                </button>
              </Link>
              <button
                aria-label="Edit campaign"
                onClick={() => setSelectedForEdit(campaign)}
              >
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
