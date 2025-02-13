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
import AddCredentialButton from "@web-components/credential/AddCredentialButton";
import AddEditCredentialModal from "@web-components/credential/AddEditCredentialModal";
import Header from "@web-components/Header";
import { queryClient } from "@web-providers/react-query";
import { credentialQueryOptions } from "@web-queries/credential.query";
import {
  Credential,
  CredentialService,
} from "@web-services/credential.service";
import { FC, useState } from "react";
import { LuMail, LuPenLine, LuTrash2 } from "react-icons/lu";
import { SiResend } from "react-icons/si";

type ICredentialPageProps = {};
const CredentialPage: FC<ICredentialPageProps> = () => {
  const [selectedForEditCredential, setSelectedForEdit] = useState(
    null as null | Credential
  );
  const [selectedForDelete, setSelectedForDelete] = useState(
    null as null | Credential
  );
  const { data, isLoading } = useQuery(credentialQueryOptions);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await CredentialService.delete(id);
    },
    onSuccess(_, id) {
      setSelectedForDelete(null);
      queryClient.setQueryData(credentialQueryOptions.queryKey, (curr) => {
        return {
          ...curr,
          credentials:
            curr?.credentials.filter((item) => item._id !== id) || [],
        };
      });
    },
  });

  return (
    <main className="container flex-1 overflow-auto p-4">
      <Header
        location={[{ label: "Credential", link: "/credential" }]}
        rightSection={<AddCredentialButton />}
      />
      {selectedForEditCredential && (
        <AddEditCredentialModal
          credential={selectedForEditCredential}
          onClose={() => setSelectedForEdit(null)}
        />
      )}

      <div className="mt-4 space-y-2">
        {isLoading &&
          Array(10)
            .fill(null)
            .map((_, i) => {
              return <Skeleton key={i} className="h-12" />;
            })}
        {data?.credentials.map((credential) => {
          return (
            <div
              key={credential._id}
              className="flex items-center gap-2 rounded-lg border p-4"
            >
              <div>
                {credential.type === "RESEND_API" && <SiResend />}
                {credential.type === "SMTP" && <LuMail />}
              </div>
              <div className="flex-1">
                <button onClick={() => setSelectedForEdit(credential)}>
                  {credential.name}
                </button>
              </div>
              <button
                aria-label="Edit credential"
                onClick={() => setSelectedForEdit(credential)}
              >
                <LuPenLine />
              </button>
              <button
                aria-label="Delete credential"
                onClick={() => setSelectedForDelete(credential)}
              >
                <LuTrash2 />
              </button>
            </div>
          );
        })}
      </div>

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

export default CredentialPage;
