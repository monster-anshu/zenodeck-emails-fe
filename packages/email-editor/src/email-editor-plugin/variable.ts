import { normalize } from "@repo/ui/lib/normalize";
import type { Editor } from "grapesjs";
import { variableBlock, variableComponent } from "./consts";
import { VARIABLE_ICON } from "./icons";
import { PluginOptions } from "./types";

const bgColor = "rgba(111, 63, 190, 0.1)";
const textColor = "rgba(111, 63, 190, 1)";

export default function loadVariableFeature(
  editor: Editor,
  opts: Required<PluginOptions>
) {
  const variables = opts.variables;

  if (!variables?.length) return;
  const varialeRecord = normalize(variables, "value");

  // Define a component with `textable` property
  editor.DomComponents.addType(variableComponent, {
    model: {
      defaults: {
        textable: 1,
        variable: variables[0]?.value,
        traits: [
          {
            type: "select", // Type of the trait
            name: "data-gjs-variable", // (required) The name of the attribute/property to use on component
            label: "Variable", // The label you will see in Settings
            options: variables.map((item) => ({
              id: item.value,
              label: item.label,
            })),
            getValue({ component }) {
              const parsed = JSON.parse(JSON.stringify(component, null, 2));
              const selected =
                parsed.attributes?.["data-gjs-variable"] ||
                component.attributes["variable"];
              return selected;
            },
          },
          { type: "text", name: "default-value", label: "Default value" },
        ],
      },
      toHTML() {
        return `{{${this.get("variable")}}}`;
      },
    },

    // The view below it's just an example of creating a different UX
    view: {
      tagName: () => "span",
      onAttrUpdate() {
        const { el, model } = this;
        const selectedVariable = el.getAttribute("data-gjs-variable") || "";
        if (!selectedVariable) return;
        const option = varialeRecord[selectedVariable];

        model.set({ variable: selectedVariable });
        for (const span of el.children) {
          span.innerHTML = option?.label || selectedVariable;
        }
      },
      events: () => ({
        change: "updateSelectedVariable",
      }),
      // Update the model once the select is changed
      updateSelectedVariable(ev: any) {
        this.model.set({ variable: ev.target.value });
        this.updateProps();
      },
      // When we blur from a TextComponent, all its children components are
      // flattened via innerHTML and parsed by the editor. So to keep the state
      // of our props in sync with the model so we need to expose props in the HTML
      updateProps() {
        const { el, model } = this;
        el.setAttribute("data-gjs-variable", model.get("variable"));
      },

      onRender() {
        const { model, el } = this;
        const selectedVariable = model.get("variable");

        const option = varialeRecord[selectedVariable];

        const span = document.createElement("span");

        span.innerText = option?.label || selectedVariable;

        span.style.padding = "2px 8px";
        span.style.borderRadius = "4px";

        span.style.color = textColor;
        span.style.backgroundColor = bgColor;
        span.style.border = "none";
        span.style.outline = "none";

        while (el.firstChild) el.removeChild(el.firstChild);
        el.appendChild(span);

        this.updateProps();
      },
    },
  });

  // Use the component in blocks
  editor.BlockManager.add(variableBlock, {
    label: "Variables",
    content: { type: variableComponent },
    media: VARIABLE_ICON,
  });
}
