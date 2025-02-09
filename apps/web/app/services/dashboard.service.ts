import { client } from "./client";

export class DashboardService {
  static async get() {
    const { data } = await client.get<GetResponse>("/dashboard");
    return data;
  }
}

type GetResponse = {
  history: StatParent;
  ctr: StatParent;
  openedMail: StatParent;
  isSuccess: boolean;
  appInfo: {
    storageUsed: number;
  };
  credential: {
    total: number;
  };
};

type StatParent = {
  stats: Stat[];
  total: number;
};

type Stat = {
  date: Date;
  count: number;
};
