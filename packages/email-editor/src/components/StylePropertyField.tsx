import { useEditor } from "@grapesjs/react";
import { ColorPicker } from "@repo/ui/components/color-picker";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Slider } from "@repo/ui/components/slider";
import { cn } from "@repo/ui/lib/utils";
import type {
  Property,
  PropertyComposite,
  PropertyRadio,
  PropertySelect,
  PropertySlider,
  PropertyStack,
} from "grapesjs";
import * as React from "react";
import { LuArrowDown, LuArrowUp, LuPlus, LuTrash, LuX } from "react-icons/lu";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  prop: Property;
}

export default function StylePropertyField({
  prop,
  ...rest
}: StylePropertyFieldProps) {
  const editor = useEditor();
  const handleChange = (value: string) => {
    prop.upValue(value);
  };

  const onChange = (ev: any) => {
    handleChange(ev.target.value);
  };

  const openAssets = () => {
    const { Assets } = editor;
    Assets.open({
      select: (asset, complete) => {
        prop.upValue(asset.getSrc(), { partial: !complete });
        complete && Assets.close();
      },
      types: ["image"],
      accept: "image/*",
    });
  };

  const type = prop.getType();
  const defValue = prop.getDefaultValue();
  const canClear = prop.canClear();
  const hasValue = prop.hasValue();
  const value = prop.getValue();
  const valueString = hasValue ? value : "";
  const valueWithDef = hasValue ? value : defValue;

  let inputToRender = (
    <Input placeholder={defValue} value={valueString} onChange={onChange} />
  );

  switch (type) {
    case "radio":
      {
        const radioProp = prop as PropertyRadio;
        inputToRender = (
          <RadioGroup
            value={value}
            onValueChange={handleChange}
            className="flex flex-wrap"
          >
            {radioProp.getOptions().map((option) => (
              <div
                key={radioProp.getOptionId(option)}
                className="flex items-center space-x-2"
              >
                <RadioGroupItem
                  value={radioProp.getOptionId(option)}
                  id={radioProp.getOptionId(option)}
                />
                <Label htmlFor={radioProp.getOptionId(option)}>
                  {radioProp.getOptionLabel(option)}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      }
      break;
    case "select":
      {
        const selectProp = prop as PropertySelect;
        inputToRender = (
          <Select onValueChange={handleChange} value={valueWithDef}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {selectProp.getOptions().map((option) => (
                <SelectItem
                  key={selectProp.getOptionId(option)}
                  value={selectProp.getOptionId(option)}
                >
                  {selectProp.getOptionLabel(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }
      break;
    case "color":
      {
        inputToRender = (
          <ColorPicker value={valueString} onValueChange={handleChange} />
        );
      }
      break;
    case "slider":
      {
        const sliderProp = prop as PropertySlider;
        inputToRender = (
          <Slider
            value={[parseFloat(value)]}
            min={sliderProp.getMin()}
            max={sliderProp.getMax()}
            step={sliderProp.getStep()}
            onChange={onChange}
          />
        );
      }
      break;
    case "file":
      {
        inputToRender = (
          <div className="flex flex-col items-center gap-3">
            {value && value !== defValue && (
              <div
                className="inline-block h-[50px] w-[50px] cursor-pointer rounded bg-cover bg-center"
                style={{ backgroundImage: `url("${value}")` }}
                onClick={() => handleChange("")}
              />
            )}
            <button type="button" onClick={openAssets}>
              Select Image
            </button>
          </div>
        );
      }
      break;
    case "composite":
      {
        const compositeProp = prop as PropertyComposite;
        inputToRender = (
          <div
            className={cn(
              "bg-secondary/60 flex flex-wrap gap-y-2 rounded-lg border py-2"
            )}
          >
            {compositeProp.getProperties().map((prop) => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </div>
        );
      }
      break;
    case "stack":
      {
        const stackProp = prop as PropertyStack;
        const layers = stackProp.getLayers();
        const isTextShadow = stackProp.getName() === "text-shadow";
        inputToRender = (
          <div
            className={cn(
              "bg-secondary/60 flex min-h-[54px] flex-col gap-2 rounded-lg border p-2"
            )}
          >
            {layers.map((layer) => (
              <div key={layer.getId()}>
                <div className="flex items-center gap-1 px-2 py-1">
                  <button onClick={() => layer.move(layer.getIndex() - 1)}>
                    <LuArrowUp />
                  </button>
                  <button onClick={() => layer.move(layer.getIndex() + 1)}>
                    <LuArrowDown />
                  </button>
                  <button className="flex-grow" onClick={() => layer.select()}>
                    {layer.getLabel()}
                  </button>
                  <div
                    className={cn(
                      "flex min-h-[17px] min-w-[17px] justify-center text-sm"
                    )}
                    style={layer.getStylePreview({
                      number: { min: -3, max: 3 },
                      camelCase: true,
                    })}
                  >
                    {isTextShadow && "T"}
                  </div>
                  <button onClick={() => layer.remove()}>
                    <LuTrash />
                  </button>
                </div>
                {layer.isSelected() && (
                  <div className="flex flex-wrap gap-y-2 py-2">
                    {stackProp.getProperties().map((prop) => (
                      <StylePropertyField key={prop.getId()} prop={prop} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }
      break;
  }

  return (
    <div {...rest} className={cn("px-2", prop.isFull() ? "w-full" : "w-1/2")}>
      <div className={cn("mb-1 flex items-center", canClear && "font-medium")}>
        <div className="flex-grow capitalize">{prop.getLabel()}</div>
        {canClear && (
          <button onClick={() => prop.clear()} aria-label="Clear">
            <LuX size={14} />
          </button>
        )}
        {type === "stack" && (
          <button
            className="!ml-2"
            onClick={() => (prop as PropertyStack).addLayer({}, { at: 0 })}
          >
            <LuPlus />
          </button>
        )}
      </div>
      {inputToRender}
    </div>
  );
}
