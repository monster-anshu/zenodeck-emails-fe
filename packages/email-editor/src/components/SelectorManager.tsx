import { SelectorsResultProps } from "@grapesjs/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { cn } from "@repo/ui/lib/utils";
import { LuPanelTopClose, LuPlus, LuX } from "react-icons/lu";

export default function SelectorManager({
  selectors,
  selectedState,
  states,
  targets,
  setState,
  addSelector,
  removeSelector,
}: Omit<SelectorsResultProps, "Container">) {
  const addNewSelector = () => {
    const next = selectors.length + 1;
    addSelector({ name: `new-${next}`, label: `New ${next}` });
  };

  const targetStr = targets.join(", ");

  return (
    <div className="flex flex-col gap-2 p-2 text-left">
      <div className="flex items-center gap-2">
        <div className="flex-grow text-sm">Selectors</div>
        <Select
          value={selectedState}
          onValueChange={(value) => setState(value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="">- State -</SelectItem> */}
            {states.map((state) => (
              <SelectItem value={state.id.toString()} key={state.id}>
                {state.getName()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div
        className={cn(
          "bg-secondary/60 flex min-h-[45px] flex-wrap items-center gap-2 rounded border p-2"
        )}
      >
        {targetStr ? (
          <button
            onClick={addNewSelector}
            className={"rounded border px-2 py-1"}
          >
            <LuPlus />
          </button>
        ) : (
          <div className="text-sm">Select a component</div>
        )}
        {selectors.map((selector) => (
          <div
            key={selector.toString()}
            className="bg-card flex items-center gap-1 whitespace-nowrap rounded border px-2 py-1"
          >
            <p className="text-xs">{selector.getLabel()}</p>
            <button onClick={() => removeSelector(selector)}>
              <LuX size={14} />
            </button>
          </div>
        ))}
      </div>
      <div>
        Selected: <span className="opacity-70">{targetStr || "None"}</span>
      </div>
    </div>
  );
}
