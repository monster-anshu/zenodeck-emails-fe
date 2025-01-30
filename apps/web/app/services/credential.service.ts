import { client } from "./client";

export class CredentialService {
  static async list() {
    const res = await client.get<ListResponse>("/credential");
    return { credentials: res.data.credentials };
  }
}

export type ListResponse = {
  isSuccess: boolean;
  credentials: Credential[];
};

export type Credential = {
  _id: string;
  appId: string;
  createdBy: string;
  name: string;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};
