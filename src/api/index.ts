import { CategoryCreateDto, CategoryUpdateDto } from "models/category";
import axios, { AxiosInstance } from "axios";
import { CommandCreateDto, CommandUpdateDto } from "models/command";
import { LinkCreateDto, LinkUpdateDto } from "models/link";

export const CmandrApi: AxiosInstance = axios.create({
  baseURL: "https://localhost:44310/api/",
  timeout: 6000,
});

const { get, post, put, delete: remove } = CmandrApi;

/**
 * Api endpoints for commands
 */
export const Commands = {
  getAll: () => get("commands"),
  /**
   * Get information about a single command
   */
  getById: (id: number) => get(`commands/${id}`),
  /**
   * Get all commands from a single category
   */
  getAllByCategoryId: (id: number) => get(`commands/list/${id}`),
  create: (body: CommandCreateDto) => post("commands", body),
  update: (request: { id: number; body: CommandUpdateDto }) =>
    put(`commands/${request.id}`, request.body),
  remove: (id: number) => remove(`commands/${id}`),
};

/** Api endpoints for command categories */
export const CommandCategories = {
  getAll: () => get("commands/categories"),
  getById: (id: number) => get(`commands/categories/${id}`),
  create: (body: CategoryCreateDto) => post("commands/categories", body),
  update: (request: { id: number; body: CategoryUpdateDto }) =>
    put(`commands/categories/${request.id}`, request.body),
  remove: (id: number) => remove(`commands/categories/${id}`),
};

export const Links = {
  getAll: () => get("links"),
  /**
   * Get information about a single link
   */
  getById: (id: number) => get(`links/${id}`),
  /**
   * Get all links from a single category
   */
  getAllByCategoryId: (id: number) => get(`links/list/${id}`),
  create: (body: LinkCreateDto) => post("links", body),
  update: (request: { id: number; body: LinkUpdateDto }) =>
    put(`links/${request.id}`, request.body),
  remove: (id: number) => remove(`links/${id}`),
};

export const LinkCategories = {
  getAll: () => get("links/categories"),
  getById: (id: number) => get(`links/categories/${id}`),
  create: (body: CategoryCreateDto) => post("links/categories", body),
  update: (request: { id: number; body: CategoryUpdateDto }) =>
    put(`links/categories/${request.id}`, request.body),
  remove: (id: number) => remove(`links/categories/${id}`),
};
