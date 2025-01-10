import type { Editor } from "grapesjs";
import juice from "juice";
import { openExport } from "./consts";
import { PluginOptions } from "./types";

export default (editor: Editor, opts: Required<PluginOptions>) => {
  const cmdm = editor.Commands;
  const pfx = editor.getConfig().stylePrefix;

  cmdm.add(opts.cmdInlineHtml, {
    run(editor, _, opts = {}) {
      const tmpl = editor.getHtml() + `<style>${editor.getCss()}</style>`;
      return juice(tmpl, { ...opts.juiceOpts, ...opts });
    },
  });

  cmdm.add(openExport, {
    containerEl: null as HTMLDivElement | null,
    codeEditorHtml: null as HTMLDivElement | null,

    createCodeViewer() {
      return editor.CodeManager.createViewer({
        codeName: "htmlmixed",
        theme: opts.codeViewerTheme,
      });
    },

    createCodeEditor() {
      const el = document.createElement("div");
      const codeEditor = this.createCodeViewer();

      el.style.flex = "1 0 auto";
      el.style.boxSizing = "border-box";
      el.className = `${pfx}export-code`;
      el.appendChild(codeEditor.getElement());

      return { codeEditor, el };
    },

    getCodeContainer(): HTMLDivElement {
      let containerEl = this.containerEl;

      if (!containerEl) {
        containerEl = document.createElement("div");
        containerEl.className = `${pfx}export-container`;
        containerEl.style.display = "flex";
        containerEl.style.gap = "5px";
        containerEl.style.flexDirection = "column";
        containerEl.style.justifyContent = "space-between";
        this.containerEl = containerEl;
      }

      return containerEl;
    },

    run(editor) {
      let { codeEditorHtml } = this as any;
      const container = this.getCodeContainer();

      // Init code viewer if not yet instantiated
      if (!codeEditorHtml) {
        const codeViewer = this.createCodeEditor();
        codeEditorHtml = codeViewer.codeEditor;
        this.codeEditorHtml = codeEditorHtml;

        if (opts.modalLabelExport) {
          const labelEl = document.createElement("div");
          labelEl.className = `${pfx}export-label`;
          labelEl.innerHTML = opts.modalLabelExport;
          container.appendChild(labelEl);
        }

        container.appendChild(codeViewer.el);
      }

      editor.Modal.open({
        title: opts.modalTitleExport,
        content: container,
      });

      if (codeEditorHtml) {
        const tmpl = `${editor.getHtml()}<style>${editor.getCss()}</style>`;
        const finalTemplate = opts.inlineCss
          ? juice(tmpl, opts.juiceOpts)
          : tmpl;

        // need this call back to render correctly in the shandcn modal
        setTimeout(() => {
          codeEditorHtml.setContent(finalTemplate);
          codeEditorHtml.editor.refresh();
        });
      }
    },
  });
};
