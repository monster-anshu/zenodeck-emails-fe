import { client } from "./client";

export class LeadListService {
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

export type LeadList = {
  _id: string;
  appId: string;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
