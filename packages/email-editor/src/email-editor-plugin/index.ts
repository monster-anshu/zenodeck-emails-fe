import type { Plugin } from "grapesjs";
import loadBlocks from "./blocks";
import loadCommands from "./commands";
import { variableBlock } from "./consts";
import loadPanels from "./panels";
import loadStyles from "./styles";
import { PluginOptions } from "./types";
import loadVariableFeature from "./variable";

const emailEditorPlugin: Plugin<PluginOptions> = (
  editor,
  opts: Partial<PluginOptions> = {}
) => {
  console.log("options", opts);
  const config = editor.getConfig();

  const options: Required<PluginOptions> = {
    blocks: [
      "sect100",
      "sect50",
      "sect30",
      "sect37",
      "sect73",
      "button",
      "divider",
      "text",
      "text-sect",
      "image",
      "quote",
      "link",
      "link-block",
      "grid-items",
      "list-items",
      variableBlock,
    ],
    block: () => ({}),
    juiceOpts: {},
    cmdOpenImport: "gjs-open-import-template",
    cmdTglImages: "gjs-toggle-images",
    cmdInlineHtml: "gjs-get-inlined-html",
    modalTitleImport: "Import template",
    modalTitleExport: "Export template",
    modalLabelImport: "",
    modalLabelExport: "",
    modalBtnImport: "Import",
    codeViewerTheme: "hopscotch",
    importPlaceholder: "",
    inlineCss: true,
    cellStyle: {
      padding: "0",
      margin: "0",
      "vertical-align": "top",
    },
    tableStyle: {
      height: "150px",
      margin: "0 auto 10px auto",
      padding: "5px 5px 5px 5px",
      width: "100%",
    },
    updateStyleManager: true,
    showStylesOnChange: true,
    showBlocksOnLoad: true,
    useCustomTheme: true,
    textCleanCanvas: "Are you sure you want to clear the canvas?",
    variables: [],
    ...opts,
  };

  // Change some config
  config.devicePreviewMode = true;

  // if (options.useCustomTheme && typeof window !== "undefined") {
  //   const primaryColor = "#373d49";
  //   const secondaryColor = "#dae5e6";
  //   const tertiaryColor = "#4c9790";
  //   const quaternaryColor = "#35d7bb";
  //   const prefix = "gjs-";
  //   let cssString = "";

  //   [
  //     ["one", primaryColor],
  //     ["two", secondaryColor],
  //     ["three", tertiaryColor],
  //     ["four", quaternaryColor],
  //   ].forEach(([cnum, ccol]) => {
  //     cssString += `
  //         .${prefix}${cnum}-bg {
  //           background-color: ${ccol};
  //         }
  //         .${prefix}${cnum}-color {
  //           color: ${ccol};
  //         }
  //         .${prefix}${cnum}-color-h:hover {
  //           color: ${ccol};
  //         }
  //       `;
  //   });

  //   const style = document.createElement("style");
  //   style.innerText = cssString;
  //   document.head.appendChild(style);
  // }

  loadCommands(editor, options);
  loadBlocks(editor, options);
  loadPanels(editor, options);
  loadStyles(editor, options);
  loadVariableFeature(editor, options);
};

export default emailEditorPlugin;
