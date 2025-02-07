import { client } from "./client";

export class DashboardService {
  static async get() {
    const { data } = await client.get<GetResponse>("/dashboard");
    return data;
  }
}

type GetResponse = {
  history: History;
  isSuccess: boolean;
};

type History = {
  stats: Stat[];
  count: number;
};

type Stat = {
  date: Date;
  count: number;
};
