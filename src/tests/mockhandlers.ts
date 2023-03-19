import { CmandrApi } from "api";
import { rest } from "msw";
import { testData } from "./testData";

const baseUrl = CmandrApi.defaults.baseURL;

export const handlers = [
  // post handlers
  rest.post(`${baseUrl}commands`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.post(`${baseUrl}links`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.post(`${baseUrl}commands/categories`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.post(`${baseUrl}links/categories`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  // get handlers
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
  // update handlers
  rest.put(`${baseUrl}commands/:id`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.put(`${baseUrl}links/:id`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.put(`${baseUrl}commands/categories/:id`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.put(`${baseUrl}links/categories/:id`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  // delete handlers
  rest.delete(`${baseUrl}commands/:id`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.delete(`${baseUrl}links/:id`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.delete(`${baseUrl}commands/categories/:id`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.delete(`${baseUrl}links/categories/:id`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
];
