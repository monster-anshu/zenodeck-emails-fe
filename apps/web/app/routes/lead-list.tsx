import Header from "@web-components/Header";
import AddLeadListButton from "@web-components/lead-list/AddLeadListButton";
import React, { FC } from "react";

type ILeadListPageProps = {};

const LeadListPage: FC<ILeadListPageProps> = () => {
  return (
    <main className="container flex-1 overflow-auto p-4">
      <Header
        location={[{ label: "Lead list", link: "/lead-list" }]}
        rightSection={<AddLeadListButton />}
      />
    </main>
  );
};

export default LeadListPage;
