import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Skeleton } from "@repo/ui/components/skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import Header from "@web-components/Header";
import AddLeadEditListModal from "@web-components/lead-list/AddEditLeadList";
import AddLeadListButton from "@web-components/lead-list/AddLeadListButton";
import { queryClient } from "@web-providers/react-query";
import { leadListQueryOptions } from "@web-queries/lead-list.query";
import { LeadList, LeadListService } from "@web-services/lead-list.service";
import { FC, useState } from "react";
import { LuEye, LuPenLine, LuTrash2 } from "react-icons/lu";
import { Link } from "react-router";
import { toast } from "sonner";

type ILeadListPageProps = {};

const LeadListPage: FC<ILeadListPageProps> = () => {
  const { data, isLoading } = useQuery(leadListQueryOptions);
  const [selectedForEdit, setSelectedForEdit] = useState(
    null as null | LeadList
  );
  const [selectedForDelete, setSelectedForDelete] = useState(
    null as null | LeadList
  );

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await LeadListService.delete(id);
    },
    onSuccess(_, id) {
      queryClient.setQueryData(leadListQueryOptions.queryKey, (curr) => {
        return {
          isSuccess: true,
          leadLists: curr?.leadLists.filter((item) => item._id !== id) || [],
        };
      });
      setSelectedForDelete(null);
      toast.success("Lead list deleted");
    },
  });

  return (
    <main className="container flex-1 overflow-auto p-4">
      <Header
        location={[{ label: "Lead list", link: "/lead-list" }]}
        rightSection={<AddLeadListButton />}
      />
      <div className="mt-4 space-y-2">
        {isLoading &&
          Array(10)
            .fill(null)
            .map((_, i) => {
              return <Skeleton key={i} className="h-12" />;
            })}

        {data?.leadLists.map((leadList) => {
          return (
            <div
              key={leadList._id}
              className="flex items-center gap-2 rounded-lg border p-4"
            >
              <div className="flex-1">
                <button onClick={() => setSelectedForEdit(leadList)}>
                  {leadList.name}
                </button>
              </div>
              <Link to={`/leads/${leadList._id}`}>
                <button aria-label="View lead">
                  <LuEye />
                </button>
              </Link>
              <button
                aria-label="Edit lead list"
                onClick={() => setSelectedForEdit(leadList)}
              >
                <LuPenLine />
              </button>
              <button
                aria-label="Delete lead list"
                onClick={() => setSelectedForDelete(leadList)}
              >
                <LuTrash2 />
              </button>
            </div>
          );
        })}
      </div>
      {selectedForEdit ? (
        <AddLeadEditListModal
          onClose={() => setSelectedForEdit(null)}
          leadList={selectedForEdit}
        />
      ) : null}

      <Dialog
        open={!!selectedForDelete}
        onOpenChange={(open) => !open && setSelectedForDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete confirmation</DialogTitle>
          </DialogHeader>
          <p>Are you sure to delete credential ?</p>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setSelectedForDelete(null)}
            >
              No
            </Button>
            <Button
              variant="destructive"
              loading={deleteMutation.isPending}
              onClick={() =>
                selectedForDelete
                  ? deleteMutation.mutate(selectedForDelete._id)
                  : null
              }
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default LeadListPage;
