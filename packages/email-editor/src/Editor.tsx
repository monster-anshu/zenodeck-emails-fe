import GjsEditor, { Canvas, WithEditor } from "@grapesjs/react";
import Spinner from "@repo/ui/components/spinner";
import { getImageDimensions } from "@repo/ui/lib/file";
import type { Editor, EditorConfig } from "grapesjs";
import { RefObject, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import RightBar from "./components/RightBar";
import Topbar from "./components/Topbar";
import { grapesjs, grapesjsCss } from "./config";
import emailEditorPlugin from "./email-editor-plugin";
import { activatePreview } from "./email-editor-plugin/consts";
import { IVariable } from "./email-editor-plugin/types";
import "./style.css";
import template from "./templates/template.json";

interface IEmailEditorComponentProps {
  onUpload?: (file: File) => Promise<string>;
  intialProjectData?: object;
  className?: string;
  editorRef?: RefObject<Editor | null>;
  variables?: IVariable[];
}

export default function EmailEditorComponent({
  onUpload,
  className,
  editorRef: extRef,
  intialProjectData,
  variables = [],
}: IEmailEditorComponentProps) {
  const editorRef = useRef(null as null | Editor);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const onEditor = (editor: Editor) => {
    editorRef.current = editor;
    if (extRef) {
      extRef.current = editor;
    }

    // const record = {
    //   [openStyleManager]: "STYLES",
    //   [openBlocks]: "BLOCKS",
    //   [openLayers]: "LAYERS",
    //   [openTraits]: "TRAITS",
    // } as Record<string, typeof activeView>;

    editor.on("run", (event) => {
      setIsPreview((curr) => (!curr ? event === activatePreview : curr));
    });

    editor.on("stop", (event) => {
      setIsPreview((curr) => (event === activatePreview ? false : curr));
    });
  };

  const editorConfig: EditorConfig = {
    height: "100%",
    storageManager: false,
    forceClass: true,
    fromElement: true,
    plugins: [emailEditorPlugin],
    projectData: intialProjectData || template,
    pluginsOpts: {
      [emailEditorPlugin as never]: {
        variables,
      },
    },
    richTextEditor: {
      actions: ["bold", "italic", "underline", "strikethrough", "link", "wrap"],
    },
    selectorManager: {
      appendTo: "#custom-selector-manager",
      componentFirst: true,
    },
    styleManager: {
      appendTo: "#custom-style-manager",
    },
    layerManager: {
      appendTo: "#custom-layer-manager",
    },
    pageManager: {
      appendTo: "#custom-page-manager",
    },
    traitManager: {
      custom: true,
    },
    assetManager: {
      async uploadFile(ev) {
        const files = ev.dataTransfer
          ? ev.dataTransfer.files
          : (ev.target as unknown as DataTransfer)?.files;

        const file = files?.[0];
        if (!file) return;

        setIsLoading(true);
        try {
          const src = await onUpload?.(file);
          if (!src) return;
          const { height, width } = await getImageDimensions(file);
          editorRef.current?.AssetManager.add([
            {
              src: src,
              type: "image",
              height: height,
              width: width,
            },
          ]);
        } finally {
          setIsLoading(false);
        }
      },
    },
  };

  return (
    <>
      {isLoading ? <Spinner /> : null}
      <GjsEditor
        onEditor={onEditor}
        className={twMerge("grid", className)}
        style={{
          gridTemplateColumns: "1fr auto",
          gridTemplateRows: "auto 1fr",
          gap: isPreview ? 0 : 4,
        }}
        grapesjs={grapesjs}
        grapesjsCss={grapesjsCss}
        options={editorConfig}
      >
        <WithEditor>
          <Topbar isPreview={isPreview} />
        </WithEditor>
        <RightBar isPreview={isPreview} />
        <div>
          <Canvas className="overflow-auto rounded bg-white" />
        </div>
      </GjsEditor>
    </>
  );
}
