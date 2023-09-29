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
import { EntityCreateDto, EntityReadDto, EntityUpdateDto } from "models/entity";
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

function commonEntityEndpoints<
  TReadDto extends EntityReadDto,
  TCreateDto extends EntityCreateDto,
  TUpdateDto extends EntityUpdateDto,
>(basePath: string) {
  return {
    getAll: () => get<TReadDto[]>(basePath),
    getById: (id: number) => get<TReadDto>(`${basePath}/${id}`),
    getAllByCategoryId: (id: number) =>
      get<TReadDto[]>(`${basePath}/list/${id}`),
    create: (body: TCreateDto) => post<void>(basePath, body),
    update: (request: { id: number; body: TUpdateDto }) =>
      put(`${basePath}/${request.id}`, request.body),
    remove: (id: number) => remove<void>(`${basePath}/${id}`),
    bulkUpdate: (request: { body: number[][] }) =>
      put(`${basePath}/multiple`, request.body),
    bulkRemove: (ids: number[]) =>
      remove(`${basePath}/multiple`, { data: ids }),
  };
}

const commandEndpoints = commonEntityEndpoints<
  CommandReadDto,
  CommandCreateDto,
  CommandUpdateDto
>("commands");

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

export const Settings = {
  get: () => get("user/settings"),
  update: (body: UserSettings) => post("user/settings", body),
};

const baseCategoryEndpoints = (basePath: string) => ({
  getAll: () => get(`${basePath}/categories`),
  getById: (id: number) => get(`${basePath}/categories/${id}`),
  create: (body: CategoryCreateDto) => post(`${basePath}/categories`, body),
  update: (request: { id: number; body: CategoryUpdateDto }) =>
    put(`${basePath}/categories/${request.id}`, request.body),
  remove: (id: number) => remove(`${basePath}/categories/${id}`),
  manualSort: (body: CategoryDisplayIndexDto[]) =>
    put(`${basePath}/categories/manualsort`, body),
});

export const CommandCategories = baseCategoryEndpoints("commands");
export const LinkCategories = baseCategoryEndpoints("links");
export const SnippetCategories = baseCategoryEndpoints("snippets");
