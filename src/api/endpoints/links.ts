import { LinkUpdateDto } from "./../models/link";
import { get, post, put, remove } from ".";
import { LinkCreateDto } from "api/models/link";

export const Links = {
  getAll: () => get("links"),
  getById: (id: number) => get(`links/${id}`),
  getAllByCategoryId: (id: number) => get(`links/list/${id}`),
  create: (body: LinkCreateDto) => post("links", body),
  update: (id: number, body: LinkUpdateDto) => put(`links/${id}`, body),
  remove: (id: number) => remove(`links/${id}`),
};
