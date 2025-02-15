import { client } from "./client";

export class LeadListService {
  static async get(leadListId: string) {
    const { data } = await client.get<GetResponse>(`/lead-list/${leadListId}`);
    return data;
  }

  static async addEdit(body: AddEditRequest) {
    const { data } = await client<AddEditReposne>({
      method: !body.id ? "POST" : "PATCH",
      data: body,
      url: "/lead-list",
    });

    return data;
  }

  static async list() {
    const { data } = await client.get<ListResponse>("/lead-list");
    return data;
  }

  static async delete(id: string) {
    const { data } = await client.delete<unknown>(`/lead-list/${id}`);
    return data;
  }

  static async import(body: ImportLeadsRequest) {
    const { data } = await client.post<unknown>(`/lead-list/import-lead`, body);
    return data;
  }
}

type AddEditRequest = {
  id?: string;
  name: string;
  leads: Record<string, string>[];
};

type AddEditReposne = {
  leadList: LeadList;
};

type ListResponse = {
  isSuccess: boolean;
  leadLists: LeadList[];
};

type GetResponse = {
  isSuccess: boolean;
  leadList: LeadList;
};

export type ImportLeadsRequest = {
  leadListId: string;
  leads: Record<string, string>[];
};

export type LeadList = {
  _id: string;
  appId: string;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
