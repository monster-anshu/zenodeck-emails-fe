import EmailEditor from "@repo/email-editor/Editor";
import type { Editor } from "grapesjs";
import { useRef } from "react";
import type { Route } from "./+types/editor";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Editor" },
    { name: "description", content: "Edit Content and send mail" },
  ];
}

export default function EditorPage() {
  const ref = useRef<Editor>(null);
  return (
    <main className="h-screen w-screen">
      <EmailEditor variables={[]} editorRef={ref} className="h-full w-full" />
    </main>
  );
}
