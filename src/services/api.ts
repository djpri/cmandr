import axios, { AxiosInstance } from "axios";

export const CmandrApi: AxiosInstance = axios.create({
  baseURL: "https://localhost:7033/api/",
  timeout: 3000,
  headers: { "X-Custom-Header": "foobar" },
});
