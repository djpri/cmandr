import axios, { AxiosInstance } from "axios";

export const CmandrApi: AxiosInstance = axios.create({
  baseURL: "https://localhost:44310/api/",
  timeout: 3000,
});

CmandrApi.interceptors.response.use((res) => {
  console.log(res.data.json);
  // Important: response interceptors **must** return the response.
  return res;
});
