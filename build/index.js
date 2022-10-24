"use strict";

var logger = require('koa-logger');
const Koa = require("koa");
const bodyParser = require('koa-body');
require('dotenv').config();
const app = new Koa();
// logger
app.use(logger());

// body parser
app.use(bodyParser());
const userRouter = require("./routing/userRouter");
app.use(userRouter.routes()).use(userRouter.allowedMethods());
const todoRouter = require("./routing/todoRouter");
app.use(todoRouter.routes()).use(todoRouter.allowedMethods());
const todoHistoryRouter = require("./routing/todoHistoryRouter");
app.use(todoHistoryRouter.routes()).use(todoHistoryRouter.allowedMethods());
app.listen(process.env.PORT || 3000);