import { cn } from "@repo/ui/lib/utils";
import { LucideFile } from "lucide-react";
import React, { FC, useRef } from "react";

type IDropzoneProps = React.ComponentProps<"input"> & {
  onFileSelect?: (file: File) => void;
};

const Dropzone: FC<IDropzoneProps> = ({
  className,
  onFileSelect,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (!file) {
      return;
    }
    onFileSelect?.(file);
  };

  return (
    <div className={cn("relative h-36", className)}>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="bg-muted h-full w-full rounded-lg border-2 border-dashed border-gray-300 text-center focus:ring-2 focus:ring-offset-2"
      >
        <LucideFile size={40} className="text-muted-foreground mx-auto" />
        <p className="text-muted-foreground mt-2 block text-sm font-semibold">
          Drag Files to Upload or Click Here
        </p>
      </button>
      <input
        {...props}
        type="file"
        className="sr-only"
        ref={ref}
        onChange={handleChange}
      />
    </div>
  );
};

export { Dropzone };
