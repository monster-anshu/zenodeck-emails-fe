import { Button } from "@repo/ui/components/button";
import { InfiniteScroll } from "@repo/ui/components/infinite-scroll";
import { Label } from "@repo/ui/components/label";
import { Skeleton } from "@repo/ui/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Header from "@web-components/Header";
import ImportLeadsDialog from "@web-components/lead-list/ImportLeadsDialog";
import { leadListQuery } from "@web-queries/lead-list.query";
import { leadsQueryOptions } from "@web-queries/lead.query";
import { FC, useState } from "react";
import { useParams } from "react-router";

type ILeadsPagesProps = {};

const LIMIT = 25;

const formatDate = (d: string | Date) => {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString();
};

const LeadsPages: FC<ILeadsPagesProps> = () => {
  const { leadListId } = useParams();

  if (!leadListId) {
    throw new Error("leadListId required");
  }

  const [importLead, setImportLead] = useState(false);
  const query = leadsQueryOptions({
    leadListId: leadListId,
  });

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(query);

  const leadListQueryResult = useQuery(leadListQuery(leadListId));

  const leads = data?.pages.map((page) => page.leads).flat();

  return (
    <main className="container flex-1 overflow-auto p-4">
      <Header
        location={[
          {
            label: leadListQueryResult.isPending ? (
              <Skeleton className="w-40" />
            ) : (
              <>{leadListQueryResult.data?.leadList.name}</>
            ),
            link: `/leads/${leadListId}`,
          },
        ]}
        rightSection={
          <Button onClick={() => setImportLead(true)}>Import lead</Button>
        }
      />

      <Label className="mt-4 block">Leads</Label>
      <div className="mt-2 space-y-2 rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">S. No</TableHead>
              <TableHead className="w-40">First name</TableHead>
              <TableHead className="w-40">Last name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-40">Created at</TableHead>
              <TableHead className="w-40">Updated at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <InfiniteScroll
              hasMore={hasNextPage}
              isLoading={isFetchingNextPage}
              next={() => fetchNextPage()}
            >
              {leads?.map((lead, index) => {
                return (
                  <TableRow key={lead._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{lead.firstName}</TableCell>
                    <TableCell>{lead.lastName}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{formatDate(lead.createdAt)}</TableCell>
                    <TableCell>{formatDate(lead.updatedAt)}</TableCell>
                  </TableRow>
                );
              })}
            </InfiniteScroll>

            {isLoading || isFetchingNextPage
              ? Array(LIMIT)
                  .fill(null)
                  .map((_, i) => {
                    return (
                      <TableRow key={i}>
                        {Array(6)
                          .fill(null)
                          .map((_, i) => {
                            return (
                              <TableCell key={i}>
                                <Skeleton className="h-5" />
                              </TableCell>
                            );
                          })}
                      </TableRow>
                    );
                  })
              : null}
          </TableBody>
        </Table>
      </div>
      {importLead && (
        <ImportLeadsDialog
          leadListId={leadListId}
          onClose={() => setImportLead(false)}
        />
      )}
    </main>
  );
};

export default LeadsPages;
