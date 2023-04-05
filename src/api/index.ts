import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "helpers/environment";
import {
  CategoryCreateDto,
  CategoryDisplayIndexDto,
  CategoryUpdateDto,
} from "models/category";
import {
  CommandCreateDto,
  CommandReadDto,
  CommandUpdateDto,
} from "models/command";
import { LinkCreateDto, LinkUpdateDto } from "models/link";
import { UserSettings } from "models/user";
import { LinkReadDto } from "../models/link";

/**
 * Custom axios instance for accessing api
 * @see https://axios-http.com/docs/req_config
 */
export const CmandrApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

const { get, post, put, delete: remove } = CmandrApi;

export const Commands = {
  getAll: () => get<CommandReadDto[]>("commands"),
  getById: (id: number) => get<CommandReadDto>(`commands/${id}`),
  getAllByCategoryId: (id: number) =>
    get<CommandReadDto[]>(`commands/list/${id}`),
  create: (body: CommandCreateDto) => post<void>("commands", body),
  update: (request: { id: number; body: CommandUpdateDto }) =>
    put(`commands/${request.id}`, request.body),
  remove: (id: number) => remove<void>(`commands/${id}`),
  bulkUpdate: (request: { body: number[][] }) =>
    put<void>(`commands/multiple`, request.body),
  bulkRemove: (ids: number[]) =>
    remove<void>(`commands/multiple`, { data: ids }),
};

export const CommandCategories = {
  getAll: () => get<CommandReadDto[]>("commands/categories"),
  getById: (id: number) => get(`commands/categories/${id}`),
  create: (body: CategoryCreateDto) => post("commands/categories", body),
  update: (request: { id: number; body: CategoryUpdateDto }) =>
    put(`commands/categories/${request.id}`, request.body),
  remove: (id: number) => remove(`commands/categories/${id}`),
  manualSort: (body: CategoryDisplayIndexDto[]) =>
    put("commands/categories/manualsort", body),
};

export const Links = {
  getAll: () => get<LinkReadDto[]>("links"),
  getById: (id: number) => get<LinkReadDto>(`links/${id}`),
  getAllByCategoryId: (id: number) => get<LinkReadDto[]>(`links/list/${id}`),
  create: (body: LinkCreateDto) => post("links", body),
  quickAdd: (body: { url: string; categoryId: number }) =>
    post(`links/quickAdd`, body),
  update: (request: { id: number; body: LinkUpdateDto }) =>
    put(`links/${request.id}`, request.body),
  remove: (id: number) => remove(`links/${id}`),
  bulkUpdate: (request: { body: number[][] }) =>
    put(`links/multiple`, request.body),
  bulkRemove: (ids: number[]) => remove(`links/multiple`, { data: ids }),
};

export const LinkCategories = {
  getAll: () => get("links/categories"),
  getById: (id: number) => get(`links/categories/${id}`),
  create: (body: CategoryCreateDto) => post("links/categories", body),
  update: (request: { id: number; body: CategoryUpdateDto }) =>
    put(`links/categories/${request.id}`, request.body),
  remove: (id: number) => remove(`links/categories/${id}`),
  manualSort: (body: CategoryDisplayIndexDto[]) =>
    put("links/categories/manualsort", body),
};

export const Snippets = {
  getAll: () => get("snippets"),
  getById: (id: number) => get(`snippets/${id}`),
  getAllByCategoryId: (id: number) => get(`snippets/list/${id}`),
  create: (body: { title: string; content: string; categoryId: number }) =>
    post("snippets", body),
  update: (request: { id: number; body: { title: string; content: string } }) =>
    put(`snippets/${request.id}`, request.body),
  remove: (id: number) => remove(`snippets/${id}`),
  bulkUpdate: (request: { body: number[][] }) =>
    put(`snippets/multiple`, request.body),
  bulkRemove: (ids: number[]) => remove(`snippets/multiple`, { data: ids }),
};

export const SnippetCategories = {
  getAll: () => get("snippets/categories"),
  getById: (id: number) => get(`snippets/categories/${id}`),
  create: (body: CategoryCreateDto) => post("snippets/categories", body),
  update: (request: { id: number; body: CategoryUpdateDto }) =>
    put(`snippets/categories/${request.id}`, request.body),
  remove: (id: number) => remove(`snippets/categories/${id}`),
  manualSort: (body: CategoryDisplayIndexDto[]) =>
    put("snippets/categories/manualsort", body),
};

export const Settings = {
  get: () => get("user/settings"),
  update: (body: UserSettings) => post("user/settings", body),
};
