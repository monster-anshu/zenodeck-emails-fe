import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { useMutation } from "@tanstack/react-query";
import { LeadListService } from "@web-services/lead-list.service";
import { FC, useRef } from "react";
import { toast } from "sonner";
import ImportLeads, { IImportLeadsRef } from "./ImportLeads";

type IImportLeadsDialogProps = {
  onClose: () => void;
  leadListId: string;
};

const ImportLeadsDialog: FC<IImportLeadsDialogProps> = ({
  onClose,
  leadListId,
}) => {
  const ref = useRef<IImportLeadsRef>(null);

  const importMutation = useMutation({
    mutationFn: LeadListService.import,
    onSuccess() {
      toast.success("Leads imported");
      onClose();
    },
  });

  const handleClick = () => {
    const result = ref.current?.get();
    if (result === "ERROR_MAPPING") {
      toast.error("Invalid mapping");
      return;
    }
    if (result === "NO_FILE") {
      toast.error("Select a file");
      return;
    }
    if (!result?.leads.length) {
      toast.error("Empty leads");
      return;
    }
    importMutation.mutate({
      leadListId: leadListId,
      leads: result.leads,
    });
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import leads</DialogTitle>
        </DialogHeader>
        <ImportLeads ref={ref} />
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => onClose()}
            disabled={importMutation.isPending}
          >
            Cancle
          </Button>
          <Button onClick={handleClick} loading={importMutation.isPending}>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportLeadsDialog;
