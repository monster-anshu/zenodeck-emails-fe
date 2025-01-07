import GjsEditor, { Canvas, TraitsProvider } from "@grapesjs/react";
import Spinner from "@repo/ui/components/spinner";
import { getImageDimensions } from "@repo/ui/lib/file";
import type { Editor, EditorConfig } from "grapesjs";
import { RefObject, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Blocks from "./components/Blocks";
import Topbar from "./components/Topbar";
import TraitManager from "./components/TraitManager";
import { grapesjs, grapesjsCss } from "./config";
import emailEditorPlugin from "./email-editor-plugin";
import {
  activatePreview,
  openBlocks,
  openLayers,
  openStyleManager,
  openTraits,
} from "./email-editor-plugin/consts";
import { IVariable } from "./email-editor-plugin/types";
import "./style.scss";
import template from "./templates/template.json";

interface IEmailEditorComponentProps {
  onUpload?: (file: File) => Promise<string>;
  intialProjectData?: object;
  className?: string;
  editorRef?: RefObject<Editor | null>;
  variables?: IVariable[];
}

const gjsOptions: EditorConfig = {
  height: "100vh",
  storageManager: false,
  undoManager: { trackSelection: false },
  selectorManager: { componentFirst: true },
  projectData: {
    assets: [
      "https://via.placeholder.com/350x250/78c5d6/fff",
      "https://via.placeholder.com/350x250/459ba8/fff",
      "https://via.placeholder.com/350x250/79c267/fff",
      "https://via.placeholder.com/350x250/c5d647/fff",
      "https://via.placeholder.com/350x250/f28c33/fff",
    ],
    pages: [
      {
        name: "Home page",
        component: `<h1>GrapesJS React Custom UI</h1>`,
      },
    ],
  },
};

export default function EmailEditorComponent({
  onUpload,
  className,
  editorRef: extRef,
  intialProjectData,
  variables = [],
}: IEmailEditorComponentProps) {
  const editorRef = useRef(null as null | Editor);
  const [isLoading, setIsLoading] = useState(false);

  const [activeView, setActiveView] = useState<
    "BLOCKS" | "STYLES" | "LAYERS" | "TRAITS" | null
  >(null);
  const [isPreview, setIsPreview] = useState(false);

  const onEditor = (editor: Editor) => {
    const record = {
      [openStyleManager]: "STYLES",
      [openBlocks]: "BLOCKS",
      [openLayers]: "LAYERS",
      [openTraits]: "TRAITS",
    } as Record<string, typeof activeView>;

    editorRef.current = editor;
    if (extRef) {
      extRef.current = editor;
    }

    editor.on("run", (event) => {
      console.log(event);
      const active = record[event];
      setIsPreview((curr) => (!curr ? event === activatePreview : curr));
      if (!active) return;
      setActiveView(active);
    });

    editor.on("stop", (event) => {
      const active = record[event];
      setIsPreview((curr) => (event === activatePreview ? false : curr));
      if (!active) return;
      setActiveView((curr) => (curr === active ? null : curr));
    });
  };

  const editorConfig: EditorConfig = {
    height: "100%",
    storageManager: false,
    forceClass: true,
    fromElement: true,
    plugins: [emailEditorPlugin],
    projectData: intialProjectData || template,
    styleManager: {
      appendTo: "#custom-style-manager",
    },
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
        <Topbar isVisible={!isPreview} />
        <div>
          <Canvas className="overflow-auto bg-white" />
        </div>
        {/* {(!activeView || isPreview) && <div></div>} */}
        <div
          className="relative w-72 overflow-auto bg-white"
          style={
            {
              // display: !activeView || isPreview ? "none" : "block",
            }
          }
        >
          <div>
            <Blocks isVisible={activeView === "BLOCKS"} />
            <div
              id="custom-selector-manager"
              style={{
                display: activeView === "STYLES" ? "block" : "none",
              }}
            ></div>
            <div
              id="custom-style-manager"
              style={{
                display: activeView === "STYLES" ? "block" : "none",
              }}
            ></div>
            <div
              id="custom-layer-manager"
              style={{
                display: activeView === "LAYERS" ? "block" : "none",
              }}
            ></div>
            {/* <div
              id="custom-trait-manager"
              style={{
                display: activeView === "TRAITS" ? "block" : "none",
              }}
            ></div> */}

            {activeView === "TRAITS" && (
              <TraitsProvider>
                {(props) => {
                  return <TraitManager {...props} />;
                }}
              </TraitsProvider>
            )}
            <p>okokkok</p>
            <div id="custom-page-manager"></div>
          </div>
        </div>
      </GjsEditor>
    </>
  );
}
