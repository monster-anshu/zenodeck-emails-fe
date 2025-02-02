import { client } from "./client";

export class CredentialService {
  static async list() {
    const res = await client.get<ListResponse>("/credential");
    return { credentials: res.data.credentials };
  }

  static async add(body: AddRequest) {
    const res = await client.post<AddResponse>("/credential", body);
    return res.data;
  }
}

export type ListResponse = {
  isSuccess: boolean;
  credentials: Credential[];
};

export type AddRequest = {
  id?: string;
  name: string;
  type: string;
  privateKeys: Record<string, unknown>;
};

export type AddResponse = {
  credential: Credential;
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
