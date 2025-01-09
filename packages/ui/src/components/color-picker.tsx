import { cn } from "@repo/ui/lib/utils";
import { Paintbrush } from "lucide-react";
import React, { FC } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type IColorPickerProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
};

const solids = [
  "#FFFFFF", // White
  "#000000", // Black
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FFA500", // Orange
  "#800080", // Purple
  "#808080", // Gray
  "#00FFFF", // Cyan
  "#FFC0CB", // Pink
  "#A52A2A", // Brown
  "#800000", // Maroon
  "#808000", // Olive
  "#008080", // Teal
  "#ADD8E6", // Light Blue
  "#F08080", // Light Coral
  "#90EE90", // Light Green
  "#D3D3D3", // Light Gray
  "#F5F5DC", // Beige
  "#00008B", // Dark Blue
  "#008000", // Dark Green
  "#FFD700", // Gold
  "#FF6347", // Tomato
  "#D2691E", // Chocolate
  "#4B0082", // Indigo
  "#9400D3", // Dark Violet
  "#DC143C", // Crimson
  "#B22222", // Firebrick
  "#FF4500", // Orange Red
  "#1E90FF", // Dodger Blue
  "#32CD32", // Lime Green
  "#87CEEB", // Sky Blue
  "#4682B4", // Steel Blue
  "#FF69B4", // Hot Pink
  "#00CED1", // Dark Turquoise
  "#556B2F", // Dark Olive Green
  "#6A5ACD", // Slate Blue
  "#708090", // Slate Gray
  "#2E8B57", // Sea Green
  "#C71585", // Medium Violet Red
];

export const ColorPicker: FC<IColorPickerProps> = ({
  onValueChange,
  value,
  className,
  placeholder = "Pick a color",
}) => {
  const setValue = (value: string) => onValueChange?.(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
          aria-label="Pick a color"
        >
          <div className="flex w-full items-center gap-2">
            {value ? (
              <div
                className="h-4 w-4 rounded !bg-cover !bg-center transition-all"
                style={{ background: value }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="flex-1 truncate">{value ? value : placeholder}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-wrap gap-1">
          {solids.map((s) => (
            <div
              key={s}
              style={{ background: s }}
              className="h-6 w-6 cursor-pointer rounded-md border active:scale-105"
              onClick={() => setValue(s)}
            />
          ))}
        </div>
        <Input
          id="custom"
          value={value}
          className="col-span-2 mt-4 h-8"
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
};
