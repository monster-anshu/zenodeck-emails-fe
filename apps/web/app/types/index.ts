import { ReactNode } from "react";
import { z, ZodSchema } from "zod";

type Option = {
  label: ReactNode;
  value: string;
};

export type FormElement<T extends ZodSchema> = Record<string, unknown> & {
  name: keyof z.infer<T>;
  label: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
} & (
    | { type: "text" | "email" | "password" }
    | { type: "select"; options: Option[] }
    | { type: "file"; module?: string }
  );
