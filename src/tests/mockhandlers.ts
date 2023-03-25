import { CmandrApi } from "api";
import { rest } from "msw";
import { testData } from "./testData";

const baseUrl = CmandrApi.defaults.baseURL;

const { get, post, put, delete: del } = rest;

const postHandlers = [
  post(`${baseUrl}commands`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  post(`${baseUrl}links`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  post(`${baseUrl}links/quickAdd`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  post(`${baseUrl}commands/categories`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  post(`${baseUrl}links/categories`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
];

const getHandlers = [
  get(`${baseUrl}commands`, (req, res, ctx) => {
    return res(ctx.json(testData.commands));
  }),
  get(`${baseUrl}links`, (req, res, ctx) => {
    return res(ctx.json(testData.links));
  }),
  get(`${baseUrl}commands/categories`, (req, res, ctx) => {
    return res(ctx.json(testData.commandCategories));
  }),
  get(`${baseUrl}links/categories`, (req, res, ctx) => {
    return res(ctx.json(testData.linkCategories));
  }),
  get(
    "https://login.microsoftonline.com/common/discovery/instance",
    (req, res, ctx) => {
      return res(ctx.json({}));
    }
  ),
  get(
    "https://undefined/common/v2.0/.well-known/openid-configuration",
    (req, res, ctx) => {
      return res(ctx.json({}));
    }
  ),
];

const editHandlers = [
  put(`${baseUrl}commands/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  put(`${baseUrl}links/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  put(`${baseUrl}commands/categories/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  put(`${baseUrl}links/categories/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

const deleteHandlers = [
  del(`${baseUrl}commands/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  del(`${baseUrl}links/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  del(`${baseUrl}commands/categories/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  del(`${baseUrl}links/categories/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export const handlers = [
  ...postHandlers,
  ...getHandlers,
  ...editHandlers,
  ...deleteHandlers,
];
