import GjsEditor, { WithEditor, useEditor } from "@grapesjs/react";
import type { Editor, EditorConfig, ProjectData } from "grapesjs";
import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { grapesjs, grapesjsCss } from "./config";

interface IPreviewProps {
  projectData: object | ProjectData;
  className?: string;
  style?: React.CSSProperties;
}

function Preview({ projectData, className, style }: IPreviewProps) {
  const editorRef = useRef(null as null | Editor);

  const onEditor = (editor: Editor) => {
    editorRef.current = editor;
  };

  const editorConfig: EditorConfig = {
    height: "100%",
    storageManager: false,
    forceClass: true,
    fromElement: true,
    projectData: projectData,
    headless: true,
  };

  return (
    <GjsEditor
      grapesjs={grapesjs}
      grapesjsCss={grapesjsCss}
      onEditor={onEditor}
      options={editorConfig}
    >
      <WithEditor>
        <Frame className={className} style={style} />
      </WithEditor>
    </GjsEditor>
  );
}

const Frame = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => {
  const editor = useEditor();

  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        ${editor.getCss()}
      </style>
    </head>
    <body>
      ${editor.getHtml()}
    </body>
  </html>
`;
  return (
    <iframe
      srcDoc={html}
      style={style}
      className={twMerge("h-full w-full", className)}
      allowFullScreen
    ></iframe>
  );
};

export default Preview;
