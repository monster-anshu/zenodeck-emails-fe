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
import { useMutation, useQuery } from "@tanstack/react-query";
import { credentialQueryOptions } from "@web-queries/credential.query";
import { leadListQueryOptions } from "@web-queries/lead-list.query";
import { Campaign, CampaignService } from "@web-services/campaign.service";
import type { Editor } from "grapesjs";
import { FC, RefObject } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type IAddEditCampaignModalProps = {
  onClose: () => void;
  editorRef: RefObject<Editor | null>;
  campaign?: Campaign;
};

const schema = z.object({
  credentialId: z.string(),
  description: z.string().trim().optional(),
  from: z.string().email(),
  leadListId: z.string(),
  name: z.string().trim().nonempty(),
  senderName: z.string(),
  subject: z.string(),
  time: z.string().refine((value) => {
    const date = Math.round(new Date(value).getTime());
    const nextCron = Math.round(timeUntilNextCron().getTime());
    if (date < nextCron) {
      return false;
    }
    return true;
  }),
});

const formatForInput = (date: Date) => {
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const timeStr = date
    .toLocaleTimeString("en-US", {
      hour12: false,
    })
    .substring(0, 5);
  return dateStr + "T" + timeStr;
};

const minDateString = () => {
  return formatForInput(timeUntilNextCron());
};

const AddEditCampaignModal: FC<IAddEditCampaignModalProps> = ({
  onClose,
  editorRef,
  campaign,
}) => {
  const credentialQuery = useQuery(credentialQueryOptions);
  const leadListQuery = useQuery(leadListQueryOptions);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: campaign?.description || "",
      from: campaign?.from || "",
      name: campaign?.name || "",
      senderName: campaign?.senderName || "",
      subject: campaign?.subject || "",
      time: campaign?.time
        ? formatForInput(new Date(campaign.time))
        : minDateString(),
    },
  });

  const addEditMutation = useMutation({
    mutationFn: CampaignService.addEdit,
  });

  const formElements = [
    {
      name: "time",
      label: "Date and time",
      type: "datetime-local",
      min: minDateString(),
    },
    {
      name: "name",
      label: "Campaign name",
      placeholder: "Marketing campaign",
      type: "text",
    },
    {
      name: "senderName",
      label: "Sender's name",
      placeholder: "John doe",
      type: "text",
      className: "col-span-1",
    },
    {
      name: "from",
      label: "Sender's email",
      placeholder: "campany@example.com",
      type: "email",
      className: "col-span-1",
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Discount...",
      type: "text",
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

  function onSubmit(values: z.infer<typeof schema>) {
    addEditMutation.mutate({
      ...values,
      projectData: JSON.stringify(editorRef.current?.getProjectData()),
      time: new Date(values.time),
    });
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add campaign</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit as never)}
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

function timeUntilNextCron() {
  const now = new Date();
  const minutes = now.getMinutes();

  // Find next quarter-hour mark (15, 30, 45, 0)
  const nextMinutes = Math.ceil(minutes / 15) * 15;

  const nextRun = new Date(now);
  nextRun.setMinutes(nextMinutes);
  nextRun.setSeconds(0);
  nextRun.setMilliseconds(0);

  // If next run exceeds 60 minutes, adjust to next hour
  if (nextMinutes === 60) {
    nextRun.setHours(nextRun.getHours() + 1);
    nextRun.setMinutes(0);
  }

  return nextRun;
}
