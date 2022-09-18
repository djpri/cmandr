import { LinkReadDto } from "./../models/link";
import axios, { AxiosInstance } from "axios";
import { CategoryCreateDto, CategoryUpdateDto } from "models/category";
import {
  CommandCreateDto,
  CommandReadDto,
  CommandUpdateDto,
} from "models/command";
import { LinkCreateDto, LinkUpdateDto } from "models/link";
import { UserSettings } from "models/user";

/**
 * Custom axios instance for accessing api
 * @see https://axios-http.com/docs/req_config
 */
export const CmandrApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 6000,
});

const { get, post, put, delete: remove } = CmandrApi;

/**
 * Api endpoints for commands
 */
export const Commands = {
  getAll: () => get<CommandReadDto[]>("commands"),
  /**
   * Get information about a single command
   */
  getById: (id: number) => get<CommandReadDto>(`commands/${id}`),
  /**
   * Get all commands from a single category
   */
  getAllByCategoryId: (id: number) =>
    get<CommandReadDto[]>(`commands/list/${id}`),

  create: (body: CommandCreateDto) => post<void>("commands", body),

  update: (request: { id: number; body: CommandUpdateDto }) =>
    put(`commands/${request.id}`, request.body),

  remove: (id: number) => remove<void>(`commands/${id}`),
  bulkRemove: (ids: number[]) =>
    remove<void>(`commands/multiple`, { data: ids }),
};

/**
 * Api endpoints for command categories
 */
export const CommandCategories = {
  getAll: () => get<CommandReadDto[]>("commands/categories"),
  getById: (id: number) => get(`commands/categories/${id}`),
  create: (body: CategoryCreateDto) => post("commands/categories", body),
  update: (request: { id: number; body: CategoryUpdateDto }) =>
    put(`commands/categories/${request.id}`, request.body),
  remove: (id: number) => remove(`commands/categories/${id}`),
};

/**
 * Api endpoints for links
 */
export const Links = {
  getAll: () => get<LinkReadDto[]>("links"),
  /**
   * Get information about a single link
   */
  getById: (id: number) => get<LinkReadDto>(`links/${id}`),
  /**
   * Get all links from a single category
   */
  getAllByCategoryId: (id: number) => get<LinkReadDto[]>(`links/list/${id}`),
  /**
   * Creates link with a manually added title
   */
  create: (body: LinkCreateDto) => post("links", body),
  /**
   * Creates link and automatically adds title and favicon url on the server
   */
  quickAdd: (body: { url: string; categoryId: number }) =>
    post(`links/quickAdd`, body),
  update: (request: { id: number; body: LinkUpdateDto }) =>
    put(`links/${request.id}`, request.body),
  remove: (id: number) => remove(`links/${id}`),
  bulkRemove: (ids: number[]) => remove(`links/multiple`, { data: ids }),
};

/**
 * Api endpoints for link categories
 */
export const LinkCategories = {
  getAll: () => get("links/categories"),
  getById: (id: number) => get(`links/categories/${id}`),
  create: (body: CategoryCreateDto) => post("links/categories", body),
  update: (request: { id: number; body: CategoryUpdateDto }) =>
    put(`links/categories/${request.id}`, request.body),
  remove: (id: number) => remove(`links/categories/${id}`),
};

export const Settings = {
  get: () => get("user/settings"),
  update: (body: UserSettings) => put("user/settings", body),
};
