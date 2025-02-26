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
import { useQuery } from "@tanstack/react-query";
import { credentialQueryOptions } from "@web-queries/credential.query";
import { leadListQueryOptions } from "@web-queries/lead-list.query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type IAddEditCampaignModalProps = {
  onClose: () => void;
};

const schema = z.object({
  credentialId: z.string(),
  description: z.string().trim().optional(),
  from: z.string().email(),
  leadListId: z.string(),
  name: z.string().trim().nonempty(),
  senderName: z.string(),
  time: z.string(),
});

const AddEditCampaignModal: FC<IAddEditCampaignModalProps> = ({ onClose }) => {
  const credentialQuery = useQuery(credentialQueryOptions);
  const leadListQuery = useQuery(leadListQueryOptions);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      from: "",
      name: "",
      senderName: "",
    },
  });

  const formElements = [
    {
      name: "name",
      label: "Name",
      placeholder: "Marketing campaign",
      type: "text",
    },
    {
      name: "from",
      label: "Email to send from",
      placeholder: "campany@example.com",
      type: "email",
    },
    {
      name: "description",
      label: "Description",
      placeholder: "this is about...",
      type: "text",
      hide: true,
    },
    {
      name: "credentialId",
      label: "Credential",
      placeholder: "Select credential",
      type: "select",
      options:
        credentialQuery.data?.credentials.map((credential) => ({
          label: credential.name,
          value: credential._id,
        })) || [],
    },
    {
      name: "leadListId",
      label: "Lead list",
      placeholder: "Select lead list",
      type: "select",
      options:
        leadListQuery.data?.leadLists.map((leadList) => ({
          label: leadList.name,
          value: leadList._id,
        })) || [],
    },
  ] satisfies FormElement<typeof schema>[];

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add campaign</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(onSubmit as never)}
            className="grid grid-cols-2 gap-3"
          >
            {formElements.map((item) => {
              return <FormComponent element={item} key={item.name} />;
            })}
            <DialogFooter className="col-span-2">
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditCampaignModal;
