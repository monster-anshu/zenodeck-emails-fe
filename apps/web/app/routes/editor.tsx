import { zodResolver } from "@hookform/resolvers/zod";
import EmailEditor from "@repo/email-editor/Editor";
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
import FileService from "@web-services/file.service";
import { MailService } from "@web-services/main.service";
import type { Editor } from "grapesjs";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LuMail, LuSend } from "react-icons/lu";
import { SiResend } from "react-icons/si";
import { z } from "zod";
import type { Route } from "./+types/editor";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Editor" },
    { name: "description", content: "Edit Content and send mail" },
  ];
}

const schema = z.object({
  credentialId: z.string(),
  from: z.string().email(),
  subject: z.string().nonempty(),
  to: z.string().email(),
});

export default function EditorPage() {
  const credentialQuery = useQuery(credentialQueryOptions);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      from: "",
      subject: "",
      to: "",
    },
  });

  const ref = useRef<Editor>(null);
  const [readyForSend, setReadyForSend] = useState(false);

  const sendMutation = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      const res = await MailService.send({
        ...values,
        projectData: JSON.stringify(ref.current?.getProjectData() || ""),
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
    <main className="flex-1">
      <EmailEditor
        variables={[]}
        extraActions={[
          {
            icon: <LuSend />,
            id: "send",
            onClick: () => {
              setReadyForSend(true);
            },
          },
        ]}
        onUpload={async (file) => {
          const { url } = await FileService.upload(file);
          return url;
        }}
        editorRef={ref}
        className="h-full w-full"
      />
      <Dialog
        open={readyForSend}
        onOpenChange={(open) => !open && setReadyForSend(false)}
      >
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
    </main>
  );
}
