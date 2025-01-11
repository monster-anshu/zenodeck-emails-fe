import EmailEditor from "@repo/email-editor/Editor";
import type { Editor } from "grapesjs";
import { useRef } from "react";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Zenodeck Campaign" },
    // { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function IndexPage() {
  const ref = useRef<Editor>(null);
  return (
    <main className="h-screen w-screen">
      <EmailEditor variables={[]} editorRef={ref} className="h-full w-full" />
    </main>
  );
}
