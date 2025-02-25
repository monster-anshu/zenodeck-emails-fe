import { client } from "./client";

export class CampaignService {
  static async list() {
    const { data } = await client.get<CampaignListResponse>("/campaign");
    return data;
  }
}

export type Campaign = {
  _id: string;
  appId: string;
  credentialId: string;
  description: string;
  from: string;
  leadListId: string;
  name: string;
  projectData: string;
  senderName: string;
  status: string;
  subject: string;
  time: string;
  createdAt: string;
  updatedAt: string;
};

type CampaignListResponse = {
  campaigns: Campaign[];
};
