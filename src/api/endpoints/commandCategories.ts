import { get, post, put, remove } from ".";
import { CategoryCreateDto, CategoryUpdateDto } from "../models/category";

export const CommandCategories = {
  getAll: () => get("commands/categories"),
  getById: (id: number) => get(`commands/categories${id}`),
  create: (body: CategoryCreateDto) => post("commands/categories", body),
  update: (id: number, body: CategoryUpdateDto) =>
    put(`commands/categories${id}`, body),
  remove: (id: number) => remove(`commands/categories/${id}`),
};
