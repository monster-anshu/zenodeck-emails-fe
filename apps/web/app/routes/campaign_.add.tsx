import EmailEditor from "@repo/email-editor/Editor";
import AddEditCampaignModal from "@web-components/campaign/AddEditCampaignModal";
import FileService from "@web-services/file.service";
import type { Editor } from "grapesjs";
import { FC, useRef, useState } from "react";
import { LuSend } from "react-icons/lu";
import type { Route } from "./+types/campaign_.add";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Add Campaign" }];
}

type IAddCampaignPageProps = {};

const AddCampaignPage: FC<IAddCampaignPageProps> = () => {
  const ref = useRef<Editor>(null);
  const [save, setSave] = useState(false);

  return (
    <main className="flex-1">
      <EmailEditor
        variables={[]}
        extraActions={[
          {
            icon: <LuSend />,
            id: "send",
            onClick: () => {
              setSave(true);
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
      <AddEditCampaignModal editorRef={ref} onClose={() => setSave(false)} />
    </main>
  );
};

export default AddCampaignPage;
