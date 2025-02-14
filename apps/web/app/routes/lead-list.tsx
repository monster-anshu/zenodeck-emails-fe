import { Skeleton } from "@repo/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import Header from "@web-components/Header";
import AddLeadEditListModal from "@web-components/lead-list/AddEditLeadList";
import AddLeadListButton from "@web-components/lead-list/AddLeadListButton";
import { leadListQueryOptions } from "@web-queries/lead-list.query";
import { LeadList } from "@web-services/lead-list.service";
import React, { FC, useState } from "react";
import { LuPenLine, LuTrash2 } from "react-icons/lu";

type ILeadListPageProps = {};

const LeadListPage: FC<ILeadListPageProps> = () => {
  const { data, isLoading } = useQuery(leadListQueryOptions);
  const [selectedForEdit, setSelectedForEdit] = useState(
    null as null | LeadList
  );
  const [selectedForDelete, setSelectedForDelete] = useState(
    null as null | LeadList
  );

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
              <button
                aria-label="Edit credential"
                onClick={() => setSelectedForEdit(leadList)}
              >
                <LuPenLine />
              </button>
              <button
                aria-label="Delete credential"
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
    </main>
  );
};

export default LeadListPage;
