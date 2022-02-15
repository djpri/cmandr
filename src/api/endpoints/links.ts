import { CommandCreateDto } from "../models/command";
import { CommandUpdateDto } from "../models/command";
import { get, post, put, remove } from ".";

export const ApiLinks = {
  getAll: () => get("links"),
  getById: (id: number) => get(`links/${id}`),
  getAllByCategoryId: (id: number) => get(`links/categories/${id}`),
  create: (body: CommandCreateDto) => post("links", body),
  update: (id: number, body: CommandUpdateDto) => put(`links/${id}`, body),
  remove: (id: number) => remove(`links/${id}`),
};
