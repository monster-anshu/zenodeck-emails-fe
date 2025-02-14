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
      data: {
        name: body.name,
        id: body.id,
        payload: {
          type: body.type,
          privateKeys: body.privateKeys,
        },
      },
      method: body.id ? "PATCH" : "POST",
    });

    return { credential: data.credential };
  }

  static async delete(id: string) {
    const { data } = await client.delete<DeleteResponse>(`/credential/${id}`);
    return data;
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

export type DeleteResponse = {
  isSuccess: boolean;
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
