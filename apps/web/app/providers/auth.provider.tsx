import Spinner from "@repo/ui/components/spinner";
import { useQuery } from "@tanstack/react-query";
import { agentInfoQueryOptions } from "@web-queries/agent.query";
import { FC, ReactNode } from "react";

type IAuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const { data, isLoading } = useQuery(agentInfoQueryOptions);

  if (isLoading) {
    return <Spinner className="my-4" />;
  }

  if (!data?.agentInfo) {
    return <code>Can not authenticate</code>;
  }

  return children;
};

export default AuthProvider;
