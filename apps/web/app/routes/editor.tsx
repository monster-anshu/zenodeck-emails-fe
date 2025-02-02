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
import { useQuery } from "@tanstack/react-query";
import { credentialQueryOptions } from "@web-queries/credential.query";
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
  to: z.string().email(),
});

export default function EditorPage() {
  const credentialQuery = useQuery(credentialQueryOptions);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      from: "",
      to: "",
    },
  });

  const ref = useRef<Editor>(null);

  const [readyForSend, setReadyForSend] = useState(false);

  function onSubmit(values: z.infer<typeof schema>) {}

  const formElements = [
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
                onSubmit={form.handleSubmit(onSubmit as never)}
                className="grid grid-cols-2 gap-3"
              >
                {formElements.map((item) => {
                  return <FormComponent element={item} key={item.name} />;
                })}
                <Button className="col-span-2" type="submit">
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
