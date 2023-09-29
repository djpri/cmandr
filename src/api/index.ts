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
import { EntityBasePath, EntityCreateDto, EntityReadDto, EntityUpdateDto } from "models/entity";
import { LinkCreateDto, LinkUpdateDto } from "models/link";
import {
  SnippetCreateDto,
  SnippetReadDto,
  SnippetUpdateDto,
} from "models/snippets";
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

/**
 * Create the set of base endpoint methods shared by all entities
 * @param basePath 
 * @returns 
 */
function baseEntityEndpoints<
  TReadDto extends EntityReadDto,
  TCreateDto extends EntityCreateDto,
  TUpdateDto extends EntityUpdateDto,
>(basePath: EntityBasePath) {
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

/**
 * Creates the set of base endpoint methods shared by all category types
 * @param basePath
 * @returns 
 */
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

export const Commands = {
  ...baseEntityEndpoints<CommandReadDto, CommandCreateDto, CommandUpdateDto>(
    "commands"
  ),
};

export const Links = {
  ...baseEntityEndpoints<LinkReadDto, LinkCreateDto, LinkUpdateDto>("links"),
  quickAdd: (body: { url: string; categoryId: number }) =>
    post(`links/quickAdd`, body),
};

export const Snippets = {
  ...baseEntityEndpoints<SnippetReadDto, SnippetCreateDto, SnippetUpdateDto>(
    "snippets"
  ),
};

export const CommandCategories = baseCategoryEndpoints("commands");

export const LinkCategories = baseCategoryEndpoints("links");

export const SnippetCategories = baseCategoryEndpoints("snippets");

export const Settings = {
  get: () => get("user/settings"),
  update: (body: UserSettings) => post("user/settings", body),
};