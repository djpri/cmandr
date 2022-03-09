import axios, { AxiosInstance } from "axios";

export const CmandrApi: AxiosInstance = axios.create({
  baseURL: "https://localhost:44310/api/",
  timeout: 6000,
});

CmandrApi.interceptors.response.use((res) => {
  console.log(res.data);
  // Important: response interceptors **must** return the response.
  return res;
});

const { get, post, put, delete: remove } = CmandrApi;

export { get, post, put, remove };
