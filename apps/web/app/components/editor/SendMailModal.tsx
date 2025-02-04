import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Form } from "@repo/ui/components/form";
import { FormComponent, FormElement } from "@repo/ui/molecules/form-component";
import { useMutation, useQuery } from "@tanstack/react-query";
import { credentialQueryOptions } from "@web-queries/credential.query";
import { MailService } from "@web-services/main.service";
import type { Editor } from "grapesjs";
import React, { FC, RefObject } from "react";
import { useForm } from "react-hook-form";
import { LuMail } from "react-icons/lu";
import { SiResend } from "react-icons/si";
import { z } from "zod";

type ISendMailModalProps = {
  open: boolean;
  onClose: () => void;
  editorRef: RefObject<Editor | null>;
};

const schema = z.object({
  credentialId: z.string(),
  from: z.string().email(),
  subject: z.string().nonempty(),
  to: z.string().email(),
});

const SendMailModal: FC<ISendMailModalProps> = ({
  onClose,
  open,
  editorRef,
}) => {
  const credentialQuery = useQuery(credentialQueryOptions);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      from: "",
      subject: "",
      to: "",
    },
  });

  const sendMutation = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      const res = await MailService.send({
        ...values,
        projectData: JSON.stringify(editorRef.current?.getProjectData() || ""),
      });
      return res;
    },
  });

  const formElements = [
    {
      name: "from",
      label: "From",
      placeholder: "admin@example.com",
      type: "email",
    },
    {
      name: "to",
      label: "To",
      placeholder: "user@example.com",
      type: "email",
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Application for ...",
      type: "text",
    },
    {
      name: "credentialId",
      label: "Credential",
      type: "select",
      placeholder: "Select a credential",
      options:
        credentialQuery.data?.credentials.map((credential) => ({
          label: (
            <span className="space-x-2">
              {credential.type === "RESEND_API" && (
                <SiResend className="inline" />
              )}
              {credential.type === "SMTP" && <LuMail className="inline" />}
              <span>{credential.name}</span>
            </span>
          ),
          value: credential._id,
        })) || [],
    },
  ] satisfies FormElement<typeof schema>[];

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(sendMutation.mutate as never)}
              className="grid grid-cols-2 gap-3"
            >
              {formElements.map((item) => {
                return <FormComponent element={item} key={item.name} />;
              })}
              <Button
                className="col-span-2"
                type="submit"
                loading={sendMutation.isPending}
              >
                Send
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendMailModal;
