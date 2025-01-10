import type { Editor } from "grapesjs";
import { cmdClear } from "./consts";
import openExportCommand from "./openExportCommand";
import openImportCommand from "./openImportCommand";
import tglImagesCommand from "./toggleImagesCommand";
import { PluginOptions } from "./types";

export default (editor: Editor, opts: Required<PluginOptions>) => {
  const { Commands } = editor;
  const txtConfirm = opts.textCleanCanvas;

  openImportCommand(editor, opts);
  openExportCommand(editor, opts);
  tglImagesCommand(editor, opts);

  Commands.add(cmdClear, {
    run: (ed) => {
      const cmd = "core:canvas-clear";
      if (txtConfirm) {
        confirm(txtConfirm) && ed.runCommand(cmd);
      } else {
        ed.runCommand(cmd);
      }
    },
  });
};
