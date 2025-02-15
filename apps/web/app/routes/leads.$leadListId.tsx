import { Button } from "@repo/ui/components/button";
import { Skeleton } from "@repo/ui/components/skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import Header from "@web-components/Header";
import { leadsQueryOptions } from "@web-queries/lead.query";
import { FC } from "react";
import { useParams } from "react-router";

type ILeadsPagesProps = {};

const LeadsPages: FC<ILeadsPagesProps> = () => {
  const { leadListId } = useParams();
  const query = leadsQueryOptions(leadListId!);
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery(query);
  console.log(data);
  const leads = data?.pages.flatMap((page) => page.leads);

  return (
    <main className="container flex-1 overflow-auto p-4">
      <Header
        location={[{ label: "Leads", link: `/leads/${leadListId}` }]}
        rightSection={<Button>Add lead</Button>}
      />
      <div className="mt-4 space-y-2">
        {isLoading &&
          Array(10)
            .fill(null)
            .map((_, i) => {
              return <Skeleton key={i} className="h-12" />;
            })}
        {leads?.map((lead) => {
          return (
            <div
              key={lead._id}
              className="flex items-center gap-2 rounded-lg border p-4"
            >
              {lead.firstName}
            </div>
          );
        })}
      </div>
      {hasNextPage && (
        <Button className="mt-4" onClick={() => fetchNextPage()}>
          Next
        </Button>
      )}
    </main>
  );
};

export default LeadsPages;
