import { client } from "./client";

export class LeadService {
  static async list({ leadListId, ...params }: ListLeadRequest) {
    const { data } = await client.get<ListLeadResponse>(`/lead/${leadListId}`, {
      params: params,
    });

    return data;
  }
}

export type ListLeadRequest = {
  leadListId: string;
  limit?: number;
  after?: string;
  before?: string;
};

export type ListLeadResponse = {
  isSuccess: boolean;
  meta: {
    limit: number;
    nextCursor?: string;
  };
  leads: Lead[];
};

export type Lead = {
  _id: string;
  appId: string;
  email: string;
  status: string;
  leadListId: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  updatedAt: Date;
};
