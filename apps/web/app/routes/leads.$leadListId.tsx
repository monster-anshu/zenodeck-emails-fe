import { Button } from "@repo/ui/components/button";
import { Skeleton } from "@repo/ui/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { useQuery } from "@tanstack/react-query";
import Header from "@web-components/Header";
import { leadsQueryOptions } from "@web-queries/lead.query";
import { FC, useState } from "react";
import { useParams } from "react-router";

type ILeadsPagesProps = {};

const formatDate = (d: string | Date) => {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString();
};

const LeadsPages: FC<ILeadsPagesProps> = () => {
  const { leadListId } = useParams();
  const [page, setPage] = useState({} as { after?: string; before?: string });
  const query = leadsQueryOptions({ ...page, leadListId: leadListId! });

  const { data, isLoading } = useQuery(query);

  const leads = data?.leads;

  return (
    <main className="container flex-1 overflow-auto p-4">
      <Header
        location={[{ label: "Leads", link: `/leads/${leadListId}` }]}
        rightSection={<Button>Add lead</Button>}
      />
      <div className="mt-4 space-y-2 rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-40">First name</TableHead>
              <TableHead className="w-40">Last name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-40">Created at</TableHead>
              <TableHead className="w-40">Updated at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array(10)
                  .fill(null)
                  .map((_, i) => {
                    return (
                      <TableRow key={i}>
                        {Array(5)
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

            {leads?.map((lead) => {
              return (
                <TableRow key={lead._id}>
                  <TableCell>{lead.firstName}</TableCell>
                  <TableCell>{lead.lastName}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{formatDate(lead.createdAt)}</TableCell>
                  <TableCell>{formatDate(lead.updatedAt)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <p>Page {data?.pages.length}</p> */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage({ before: data?.meta.prevCursor })}
          disabled={!data?.meta.prevCursor}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage({ after: data?.meta.nextCursor })}
          disabled={!data?.meta.nextCursor}
        >
          Next
        </Button>
      </div>
    </main>
  );
};

export default LeadsPages;
