import { rest } from "msw";

const baseUrl = "https://localhost:49155/api";

export const handlers = [
  rest.get(`${baseUrl}/commands`, (req, res, ctx) => {
    return res(ctx.json({ data: [] }));
  }),
  rest.get(`${baseUrl}/links`, (req, res, ctx) => {
    return res(ctx.json({ data: [] }));
  }),
  rest.get(`${baseUrl}/commands/categories`, (req, res, ctx) => {
    return res(ctx.json({ data: [] }));
  }),
  rest.get(`${baseUrl}/links/categories`, (req, res, ctx) => {
    return res(ctx.json({ data: [] }));
  }),
];
