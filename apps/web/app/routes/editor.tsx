import EmailEditor from "@repo/email-editor/Editor";
import SendMailModal from "@web-components/editor/SendMailModal";
import FileService from "@web-services/file.service";
import type { Editor } from "grapesjs";
import { useRef, useState } from "react";
import { LuSend } from "react-icons/lu";
import type { Route } from "./+types/editor";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Editor" },
    { name: "description", content: "Edit Content and send mail" },
  ];
}

export default function EditorPage() {
  const ref = useRef<Editor>(null);
  const [readyForSend, setReadyForSend] = useState(false);

  return (
    <main className="flex-1">
      <EmailEditor
        variables={[]}
        extraActions={[
          {
            icon: <LuSend />,
            id: "send",
            onClick: () => {
              setReadyForSend(true);
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
      <SendMailModal
        editorRef={ref}
        onClose={() => setReadyForSend(false)}
        open={readyForSend}
      />
    </main>
  );
}
