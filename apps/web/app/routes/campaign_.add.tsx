import EmailEditor from "@repo/email-editor/Editor";
import AddEditCampaignModal from "@web-components/campaign/AddEditCampaignModal";
import FileService from "@web-services/file.service";
import type { Editor } from "grapesjs";
import { FC, useRef, useState } from "react";
import { LuSaveAll } from "react-icons/lu";
import type { Route } from "./+types/campaign_.add";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Add Campaign" }];
}

type IAddCampaignPageProps = {};

const AddCampaignPage: FC<IAddCampaignPageProps> = () => {
  const ref = useRef<Editor>(null);
  const [open, setOpen] = useState(false);

  return (
    <main className="flex-1">
      <EmailEditor
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
        <AddEditCampaignModal editorRef={ref} onClose={() => setOpen(false)} />
      )}
    </main>
  );
};

export default AddCampaignPage;
