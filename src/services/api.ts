import axios, { AxiosInstance } from "axios";

export const CmandrApi: AxiosInstance = axios.create({
  baseURL: "https://localhost:44310/api/",
  timeout: 3000,
});
