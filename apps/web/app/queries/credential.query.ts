import { queryOptions } from "@tanstack/react-query";
import { CredentialService } from "@web-services/credential.service";

export const credentialQueryOptions = queryOptions({
  queryKey: ["credentials"],
  queryFn: CredentialService.list,
});
