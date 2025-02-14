import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Form } from "@repo/ui/components/form";
import { FormComponent } from "@repo/ui/molecules/form-component";
import { useMutation } from "@tanstack/react-query";
import ImportLeads, {
  IImportLeadsRef,
} from "@web-components/lead-list/ImportLeads";
import { LeadListService } from "@web-services/lead-list.service";
import { FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type IAddLeadListModalProps = {
  onClose: () => void;
};

const schema = z.object({
  name: z.string().nonempty(),
});

const AddLeadListModal: FC<IAddLeadListModalProps> = ({ onClose }) => {
  const ref = useRef<IImportLeadsRef | null>(null);

  const addMutation = useMutation({
    mutationFn: LeadListService.add,
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    const result = ref.current?.get();
    if (!result) {
      return;
    }
    addMutation.mutate({ name: values.name, leads: result.leads });
  }

  return (
    <Dialog modal={false} open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create lead list</DialogTitle>
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

              <ImportLeads ref={ref} className="col-span-2" />
              <Button
                className="col-span-2"
                type="submit"
                loading={addMutation.isPending}
              >
                Create
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadListModal;
