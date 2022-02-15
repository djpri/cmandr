import { CommandCreateDto } from "../../models/command";
import { get, post, put, remove } from ".";
import { CommandCategory } from "../../models/category";

export const CommandCategories = {
  getAll: () => get("commands/categories"),
  getById: (id: number) => get(`commands/categories${id}`),
  create: (body: CommandCreateDto) => post("commands/categories", body),
  update: (id: number, body: CommandCategory) =>
    put(`commands/categories${id}`, body),
  remove: (id: number) => remove(`commands/categories/${id}`),
};
