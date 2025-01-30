import { client } from "./client";

export class AgentService {
  static async info() {
    const res = await client.get<InfoResponse>("/agent/info");
    return res.data;
  }
}

export type InfoResponse = {
  isSuccess: boolean;
  appInfo?: AppInfo;
  agentInfo?: AgentInfo;
};

export type AgentInfo = {
  _id: string;
  appId: string;
  countryCode: string;
  firstName: string;
  language: string;
  lastName: string;
  roleId: string;
  status: string;
  userId: string;
  emailId: string;
  mobileNo: string;
  name: string;
  role: Role;
};

export type Role = {
  _id: string;
  name: string;
  appId: string;
  permissions: Permissions;
  isSuperAdminRole: boolean;
  status: string;
  isAutoCreated: boolean;
  createdBy: string;
  modifiedBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Permissions = {
  USER: [];
  ROLE: [];
  BILLING: [];
};

export type AppInfo = {
  _id: string;
  branding: Branding;
  companyId: string;
};

export type Branding = {
  name: string;
};
