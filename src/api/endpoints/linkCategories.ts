import { get, post, put, remove } from ".";
import { LinkCategory } from "../models/category";
import { LinkCreateDto } from "../models/link";

export const ApiLinkCategories = {
  getAll: () => get("links/categories"),
  getById: (id: number) => get(`links/categories${id}`),
  create: (body: LinkCreateDto) => post("links/categories", body),
  update: (id: number, body: LinkCategory) =>
    put(`links/categories${id}`, body),
  remove: (id: number) => remove(`links/categories/${id}`),
};
