import { CommandCreateDto } from "../../models/command";
import { CommandUpdateDto } from "../../models/command";
import { get, post, put, remove } from ".";

export const Commands = {
  getAll: () => get("commands"),
  getById: (id: number) => get(`commands/${id}`),
  getAllByCategoryId: (id: number) => get(`commands/categories/${id}`),
  create: (body: CommandCreateDto) => post("commands", body),
  update: (id: number, body: CommandUpdateDto) => put(`commands/${id}`, body),
  remove: (id: number) => remove(`commands/${id}`),
};
