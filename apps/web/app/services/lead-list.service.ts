import { client } from "./client";

export class LeadListService {
  static async add(body: AddRequest) {
    const { data } = await client.post("/lead-list", body);
    return data;
  }
}

type AddRequest = {
  name: string;
  leads: Record<string, string>[];
};
