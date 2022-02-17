import { get, post, put, remove } from ".";
import { CategoryCreateDto, LinkCategory } from "../models/category";

export const LinkCategories = {
  getAll: () => get("links/categories"),
  getById: (id: number) => get(`links/categories${id}`),
  create: (body: CategoryCreateDto) => post("links/categories", body),
  update: (id: number, body: LinkCategory) =>
    put(`links/categories${id}`, body),
  remove: (id: number) => remove(`links/categories/${id}`),
};
