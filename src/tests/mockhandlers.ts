import { CmandrApi } from "api";
import { rest } from "msw";

const baseUrl = CmandrApi.defaults.baseURL;

export const handlers = [
  rest.get(`${baseUrl}commands`, (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get(`${baseUrl}links`, (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get(`${baseUrl}commands/categories`, (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get(`${baseUrl}links/categories`, (req, res, ctx) => {
    return res(ctx.json([]));
  }),
];
