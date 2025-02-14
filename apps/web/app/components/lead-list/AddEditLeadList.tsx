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
import { FormComponent } from "@repo/ui/molecules/form-component";
import { useMutation } from "@tanstack/react-query";
import ImportLeads, {
  IImportLeadsRef,
} from "@web-components/lead-list/ImportLeads";
import { LeadList, LeadListService } from "@web-services/lead-list.service";
import { FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type IAddEditLeadListModalProps = {
  onClose: () => void;
  leadList?: LeadList;
};

const schema = z.object({
  name: z.string().nonempty(),
});

const AddEditLeadListModal: FC<IAddEditLeadListModalProps> = ({
  onClose,
  leadList,
}) => {
  const ref = useRef<IImportLeadsRef | null>(null);

  const addEditMutation = useMutation({
    mutationFn: LeadListService.addEdit,
    onSuccess: () => {
      toast.success(leadList ? "Lead list updated" : "Lead list created");
      onClose();
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: leadList?.name || "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    const result = ref.current?.get();
    if (result === "ERROR_MAPPING") {
      return;
    }
    const leads = (result === "NO_FILE" ? [] : result?.leads) || [];
    addEditMutation.mutate({
      name: values.name,
      leads: leads || [],
      id: leadList?._id,
    });
  }

  return (
    <Dialog modal={false} open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {leadList ? "Edit lead list" : "Add lead list"}
          </DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit as never)}
              className="grid grid-cols-2 gap-3"
            >
              <FormComponent
                element={{
                  label: "Name",
                  type: "text",
                  name: "name",
                  placeholder: "User list",
                }}
              />
              {leadList ? null : (
                <ImportLeads ref={ref} className="col-span-2" />
              )}
              <DialogFooter className="col-span-2">
                <Button type="submit" loading={addEditMutation.isPending}>
                  {leadList ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditLeadListModal;
