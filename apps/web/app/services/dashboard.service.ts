import { client } from "./client";

export class DashboardService {
  static async get() {
    const res = await client.get("/dashboard");
    return res;
  }
}
