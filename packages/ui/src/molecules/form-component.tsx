import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
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
    item.type === "text"
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
                placeholder={item.placeholder}
                type={item.type}
                {...field}
                value={field.value || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (item.regex && !item.regex.test(value)) {
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
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger
                  value={field.value || ""}
                  onReset={() => field.onChange(undefined)}
                >
                  <SelectValue placeholder={item.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {item.options.map((option) => {
                  return (
                    <SelectItem value={option.value} key={option.value}>
                      {option.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
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

export type Option = {
  label: ReactNode;
  value: string;
};

export type FormElement<T extends ZodSchema> = Record<string, unknown> & {
  name: keyof z.infer<T>;
  label: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  hide?: boolean;
} & (
    | { type: "text" | "email" | "password"; regex?: RegExp }
    | { type: "select"; options: Option[] }
    | { type: "file"; module?: string }
  );
