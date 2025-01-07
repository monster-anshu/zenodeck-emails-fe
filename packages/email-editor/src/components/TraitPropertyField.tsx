import { useEditor } from "@grapesjs/react";
import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Input } from "@repo/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import type { Trait } from "grapesjs";
import * as React from "react";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  trait: Trait;
}

export default function TraitPropertyField({
  trait,
  ...rest
}: StylePropertyFieldProps) {
  const editor = useEditor();
  const handleChange = (value: string) => {
    trait.setValue(value);
  };

  const onChange = (ev: any) => {
    handleChange(ev.target.value);
  };

  const handleButtonClick = () => {
    const command = trait.get("command");
    if (command) {
      if (typeof command === "string") {
        editor.runCommand(command);
      } else {
        command(editor, trait);
      }
    }
  };

  const type = trait.getType();
  const defValue = trait.getDefault() || trait.attributes.placeholder;
  const value = trait.getValue();
  const valueWithDef = typeof value !== "undefined" ? value : defValue;

  let inputToRender = (
    <Input
      placeholder={defValue}
      value={value}
      onChange={onChange}
      className="text-sm"
    />
  );

  switch (type) {
    case "select":
      {
        inputToRender = (
          <Select>
            <SelectTrigger value={value} onChange={onChange}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {trait.getOptions().map((option) => (
                <SelectItem
                  className="text-sm"
                  key={trait.getOptionId(option)}
                  value={trait.getOptionId(option)}
                >
                  {trait.getOptionLabel(option)}
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
          <input
            type="color"
            className="h-[15px] w-[15px] cursor-pointer opacity-0"
            value={valueWithDef}
            onChange={(ev) => handleChange(ev.target.value)}
          />
        );
      }
      break;
    case "checkbox":
      {
        inputToRender = (
          <Checkbox
            checked={value}
            onCheckedChange={(checked) => trait.setValue(checked)}
          />
        );
      }
      break;
    case "button":
      {
        inputToRender = (
          <Button onClick={handleButtonClick}>{trait.getLabel()}</Button>
        );
      }
      break;
  }

  return (
    <div {...rest} className={"mb-2 w-full px-1"}>
      <div className={"mb-1 flex items-center"}>
        <div className="flex-grow text-xs capitalize">{trait.getLabel()}</div>
      </div>
      {inputToRender}
    </div>
  );
}
