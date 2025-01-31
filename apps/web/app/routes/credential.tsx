import { useQuery } from "@tanstack/react-query";
import AddCredentialButton from "@web-components/credential/AddCredentialButton";
import { credentialQueryOptions } from "@web-queries/credential.query";
import React, { FC } from "react";
import Header from "../components/Header";

type ICredentialPageProps = {};
const CredentialPage: FC<ICredentialPageProps> = () => {
  const { data, isLoading } = useQuery(credentialQueryOptions);

  return (
    <main className="flex-1 px-6 py-4">
      <Header
        location={[{ label: "Credential", link: "/credential" }]}
        rightSection={<AddCredentialButton />}
      />
      <div>
        {data?.credentials.map((credential) => {
          return (
            <div key={credential._id}>
              <p>{credential.name}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default CredentialPage;
