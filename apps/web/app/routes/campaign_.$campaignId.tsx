import EmailEditor from "@repo/email-editor/Editor";
import Spinner from "@repo/ui/components/spinner";
import { useQuery } from "@tanstack/react-query";
import AddEditCampaignModal from "@web-components/campaign/AddEditCampaignModal";
import { campaignQueryOptions } from "@web-queries/campaign.query";
import FileService from "@web-services/file.service";
import type { Editor } from "grapesjs";
import { FC, useRef, useState } from "react";
import { LuSaveAll } from "react-icons/lu";
import { useParams } from "react-router";
import type { Route } from "./+types/campaign_.$campaignId";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Edit Campaign" }];
}

type ICampaignEditPageProps = {};

const CampaignEditPage: FC<ICampaignEditPageProps> = () => {
  const params = useParams();
  const campaignId = params.campaignId;

  if (!campaignId) {
    throw new Error("campaignId is required");
  }

  const { data, error, isLoading } = useQuery(campaignQueryOptions(campaignId));

  const ref = useRef<Editor>(null);
  const [open, setOpen] = useState(false);

  if (error) {
    return <code>{JSON.stringify(error)}</code>;
  }

  if (isLoading) {
    return <Spinner className="mt-4" />;
  }

  return (
    <main className="flex-1">
      <EmailEditor
        intialProjectData={
          data?.projectData ? JSON.parse(data.projectData) : {}
        }
        variables={[]}
        extraActions={[
          {
            icon: <LuSaveAll />,
            id: "send",
            onClick: () => {
              setOpen(true);
            },
          },
        ]}
        onUpload={async (file) => {
          const { url } = await FileService.upload(file);
          return url;
        }}
        editorRef={ref}
        className="h-full w-full"
      />
      {open && (
        <AddEditCampaignModal
          editorRef={ref}
          onClose={() => setOpen(false)}
          campaign={data}
        />
      )}
    </main>
  );
};

export default CampaignEditPage;
