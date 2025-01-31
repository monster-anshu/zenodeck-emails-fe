import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import {
  Form,
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
import { Credential } from "@web-services/credential.service";
import { FormElement } from "@web-types";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";
import { SiResend } from "react-icons/si";
import { z } from "zod";

type IAddEditCredentialModalProps = {
  onClose: () => void;
  credential?: Credential;
};

const credentialTypeOptions = [
  {
    value: "RESEND",
    label: "Resend",
    icon: <SiResend />,
  },
  {
    value: "SMTP",
    label: "SMTP",
    icon: <MdOutlineEmail />,
  },
] as const;

const schema = z.object({
  name: z.string().nonempty(),
  type: z.enum(["RESEND", "SMTP"]),
  apiKey: z.string().nonempty(),
});

const AddEditCredentialModal: FC<IAddEditCredentialModalProps> = ({
  onClose,
}) => {
  const form = useForm();

  function onSubmit(values: z.infer<typeof schema>) {}

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add credential</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit as never)}
            className="grid grid-cols-2 gap-3"
          >
            {formElements.map((item) => {
              if (
                item.type === "email" ||
                item.type === "password" ||
                item.type === "text"
              ) {
                return (
                  <FormField
                    key={item.name}
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem className={cn("col-span-2", item.className)}>
                        <FormLabel>{item.label}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={item.placeholder}
                            type={item.type}
                            {...field}
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
                    name={item.name}
                    key={item.name}
                    render={({ field }) => (
                      <FormItem className={cn("col-span-2", item.className)}>
                        <FormLabel>{item.label}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={item.placeholder} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {item.options.map((option) => {
                              return (
                                <SelectItem
                                  value={option.value}
                                  key={option.value}
                                >
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
              return null;
            })}
            <Button className="col-span-2" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};

const formElements: FormElement<typeof schema>[] = [
  {
    name: "name",
    label: "Name",
    placeholder: "Super secret",
    type: "text",
  },
  {
    name: "type",
    label: "Product Id",
    type: "select",
    options: credentialTypeOptions.map((credential) => ({
      label: credential.label,
      value: credential.value,
    })),
  },
  {
    name: "apiKey",
    label: "Api key",
    placeholder: "********",
    type: "password",
  },
];

export default AddEditCredentialModal;
