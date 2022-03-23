import { CmandrApi } from "api";
import { rest } from "msw";
import { testData } from "./testData";

const baseUrl = CmandrApi.defaults.baseURL;

export const handlers = [
  rest.get(`${baseUrl}commands`, (req, res, ctx) => {
    return res(ctx.json(testData.commands));
  }),
  rest.get(`${baseUrl}links`, (req, res, ctx) => {
    return res(ctx.json(testData.links));
  }),
  rest.get(`${baseUrl}commands/categories`, (req, res, ctx) => {
    return res(ctx.json(testData.commandCategories));
  }),
  rest.get(`${baseUrl}links/categories`, (req, res, ctx) => {
    return res(ctx.json(testData.linkCategories));
  }),
];
