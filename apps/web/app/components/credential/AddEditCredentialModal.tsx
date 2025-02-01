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
