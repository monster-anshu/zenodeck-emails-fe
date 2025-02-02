import { client } from "./client";

export class MailService {
  static async send(body: SendRequest) {
    const { data } = await client.post("/mail/send", body);
    return data;
  }
}

type SendRequest = {
  credentialId: string;
  subject: string;
  projectData: string;
  from: string;
  to: string;
};
