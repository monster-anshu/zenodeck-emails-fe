import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { BasicOption, Select } from "@repo/ui/components/react-select";
import { cn } from "@repo/ui/lib/utils";
import { useFormContext } from "react-hook-form";
import { z, ZodSchema } from "zod";

const FormComponent = <Element extends FormElement<z.ZodAny>>({
  element: item,
}: {
  element: Element;
}) => {
  const form = useFormContext();

  if (item.hide) {
    return null;
  }

  if (
    item.type === "email" ||
    item.type === "password" ||
    item.type === "text" ||
    item.type === "datetime-local"
  ) {
    return (
      <FormField
        control={form.control}
        name={item.name.toString()}
        render={({ field }) => (
          <FormItem className={cn("col-span-2", item.className)}>
            <FormLabel>{item.label}</FormLabel>
            <FormControl>
              <Input
                {...item}
                placeholder={item.placeholder}
                type={item.type}
                {...field}
                value={field.value || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = item.regex as RegExp;
                  if (regex && !regex.test(value)) {
                    return;
                  }
                  field.onChange(e);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (item.type === "select") {
    return (
      <FormField
        control={form.control}
        name={item.name.toString()}
        render={({ field }) => (
          <FormItem className={cn("col-span-2", item.className)}>
            <FormLabel>{item.label}</FormLabel>
            <Select
              options={item.options}
              value={field.value as string}
              onChange={(option) => field.onChange(option?.value)}
              placeholder={item.placeholder}
              onBlur={field.onBlur}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return <div>Not Implemented</div>;
};

export { FormComponent };

// types
import type { ReactNode } from "react";

export type FormElement<T extends ZodSchema> = Record<string, unknown> & {
  name: keyof z.infer<T>;
  label: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  hide?: boolean;
} & (
    | { type: "text" | "email" | "password"; regex?: RegExp }
    | { type: "select"; options: BasicOption[] }
    | { type: "file"; module?: string }
    | { type: "datetime-local"; min?: string; max?: string }
  );
