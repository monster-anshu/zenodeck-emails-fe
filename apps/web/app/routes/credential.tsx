import Spinner from "@repo/ui/components/spinner";
import { useQuery } from "@tanstack/react-query";
import AddCredentialButton from "@web-components/credential/AddCredentialButton";
import AddEditCredentialModal from "@web-components/credential/AddEditCredentialModal";
import { credentialQueryOptions } from "@web-queries/credential.query";
import { Credential } from "@web-services/credential.service";
import { FC, useState } from "react";
import Header from "../components/Header";

type ICredentialPageProps = {};
const CredentialPage: FC<ICredentialPageProps> = () => {
  const [selectedCredential, setCredential] = useState(
    null as null | Credential
  );
  const { data, isLoading } = useQuery(credentialQueryOptions);

  return (
    <main className="flex-1 px-6 py-4">
      <Header
        location={[{ label: "Credential", link: "/credential" }]}
        rightSection={<AddCredentialButton />}
      />
      {selectedCredential && (
        <AddEditCredentialModal
          credential={selectedCredential}
          onClose={() => setCredential(null)}
        />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {data?.credentials.map((credential) => {
            return (
              <div
                key={credential._id}
                onClick={() => setCredential(credential)}
              >
                <p>{credential.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default CredentialPage;
