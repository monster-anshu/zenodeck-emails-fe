import { client } from "./client";

export class CredentialService {
  static async list() {
    const { data } = await client.get<ListResponse>("/credential", {
      params: {
        decrypt: true,
      },
    });
    return { credentials: data.credentials };
  }

  static async addEdit(body: AddRequest) {
    const { data } = await client<AddResponse>({
      url: "/credential",
      data: body,
      method: body.id ? "PATCH" : "POST",
    });

    return { credential: data.credential };
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
  isSuccess: boolean;
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
  privateKeys?: Record<string, string>;
};
