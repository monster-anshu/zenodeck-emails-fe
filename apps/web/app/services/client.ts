import axios from "axios";
import {
  commonErrorAuthInterceptor,
  commonResponseInterceptor,
} from "./interspectors";

export const client = axios.create({
  adapter: "fetch",
  baseURL: "/api/v1/campaign",
});

client.interceptors.response.use(
  commonResponseInterceptor,
  commonErrorAuthInterceptor
);

export type ApiResponse<Data = unknown, Meta = unknown> = {
  isSuccess: boolean;
  status: number;
  error?: any;
  data: Data;
  meta: Meta;
};
