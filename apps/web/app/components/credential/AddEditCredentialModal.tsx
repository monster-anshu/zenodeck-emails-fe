import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Form } from "@repo/ui/components/form";
import { FormComponent, FormElement } from "@repo/ui/molecules/form-component";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@web-providers/react-query";
import { credentialQueryOptions } from "@web-queries/credential.query";
import {
  Credential,
  CredentialService,
} from "@web-services/credential.service";
import { FC } from "react";
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
    value: "RESEND_API",
    label: "Resend",
    icon: <SiResend />,
  },
  {
    value: "SMTP",
    label: "SMTP",
    icon: <MdOutlineEmail />,
  },
];

const schema = z.object({
  name: z.string().nonempty(),
  private_apiKey: z.string().optional(),
  private_host: z.string().optional(),
  private_password: z.string().optional(),
  private_port: z.coerce.number().optional(),
  private_username: z.string().optional(),
  type: z.enum(["RESEND_API", "SMTP"]),
});

const AddEditCredentialModal: FC<IAddEditCredentialModalProps> = ({
  onClose,
}) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      type: "RESEND_API",
    },
  });

  const addEditMutation = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      const privateKeys = Object.entries(values).reduce(
        (acc, [key, value]) => {
          if (key.startsWith("private_")) {
            acc[key.replace("private_", "")] = value;
          }
          return acc;
        },
        {} as Record<string, unknown>
      );
      const credential = await CredentialService.add({
        name: values.name,
        privateKeys: privateKeys,
        type: values.type,
      });
      return credential;
    },
    onSuccess(data) {
      queryClient.setQueryData(credentialQueryOptions.queryKey, (curr) => {
        if (!curr) return;
        return {
          ...curr,
          credentials: curr.credentials.concat(data.credential),
        };
      });
      onClose();
    },
  });

  const values = form.watch();

  const formElements = [
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
      options: credentialTypeOptions,
    },
    {
      name: "private_apiKey",
      label: "Api key",
      placeholder: "super_secret_1234",
      type: "text",
      hide: values.type !== "RESEND_API",
    },
    {
      name: "private_host",
      label: "Host",
      placeholder: "smtp.gmail.com",
      type: "text",
      className: "col-span-1",
      hide: values.type !== "SMTP",
    },
    {
      name: "private_port",
      label: "Port",
      placeholder: "334",
      type: "text",
      className: "col-span-1",
      hide: values.type !== "SMTP",
    },
    {
      name: "private_username",
      label: "Username",
      placeholder: "username",
      type: "text",
      hide: values.type !== "SMTP",
    },
    {
      name: "private_password",
      label: "Password",
      placeholder: "super_secret_1234",
      type: "text",
      hide: values.type !== "SMTP",
    },
  ] satisfies FormElement<typeof schema>[];

  function onSubmit(values: z.infer<typeof schema>) {
    addEditMutation.mutate(values);
  }

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
              return <FormComponent element={item} key={item.name} />;
            })}
            <Button
              className="col-span-2"
              type="submit"
              loading={addEditMutation.isPending}
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};

export default AddEditCredentialModal;
