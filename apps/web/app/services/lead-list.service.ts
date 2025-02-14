import { client } from "./client";

export class LeadListService {
  static async add(body: AddRequest) {
    const { data } = await client.post("/lead-list", body);
    return data;
  }
  static async list() {
    const { data } = await client.get<ListResponse>("/lead-list");
    return data;
  }
}

type AddRequest = {
  name: string;
  leads: Record<string, string>[];
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
