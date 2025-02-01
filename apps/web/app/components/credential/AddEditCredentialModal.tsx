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
import {
  FormComponent,
  FormElement,
  Option,
} from "@repo/ui/molecules/form-component";
import { Credential } from "@web-services/credential.service";
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
    value: "RESEND",
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
  "private.apiKey": z.string().optional(),
  "private.host": z.string().optional(),
  "private.password": z.string().optional(),
  "private.port": z.coerce.number().optional(),
  type: z.enum(["RESEND", "SMTP"]),
});

const AddEditCredentialModal: FC<IAddEditCredentialModalProps> = ({
  onClose,
}) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      apiKey: "",
      host: "",
      name: "",
      password: "",
      type: "RESEND",
    } as never,
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
      name: "private.apiKey",
      label: "Api key",
      placeholder: "super_secret_1234",
      type: "text",
      hide: values.type !== "RESEND",
    },
    {
      name: "private.host",
      label: "Host",
      placeholder: "smtp.gmail.com",
      type: "text",
      className: "col-span-1",
      hide: values.type !== "SMTP",
    },
    {
      name: "private.host",
      label: "Port",
      placeholder: "334",
      type: "text",
      className: "col-span-1",
      hide: values.type !== "SMTP",
    },
    {
      name: "private.password",
      label: "Password",
      placeholder: "super_secret_1234",
      type: "text",
      hide: values.type !== "SMTP",
    },
  ] satisfies FormElement<typeof schema>[];

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
              return <FormComponent element={item} key={item.name} />;
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

export default AddEditCredentialModal;
