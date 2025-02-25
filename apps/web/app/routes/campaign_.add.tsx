import EmailEditor from "@repo/email-editor/Editor";
import FileService from "@web-services/file.service";
import type { Editor } from "grapesjs";
import React, { FC, useRef } from "react";
import type { Route } from "./+types/campaign_.add";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Add Campaign" }];
}

type IAddCampaignPageProps = {};

const AddCampaignPage: FC<IAddCampaignPageProps> = () => {
  const ref = useRef<Editor>(null);

  return (
    <main className="flex-1">
      <EmailEditor
        variables={[]}
        extraActions={[]}
        onUpload={async (file) => {
          const { url } = await FileService.upload(file);
          return url;
        }}
        editorRef={ref}
        className="h-full w-full"
      />
    </main>
  );
};

export default AddCampaignPage;
