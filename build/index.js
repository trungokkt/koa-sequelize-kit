"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("dotenv/config");
var _koa = _interopRequireDefault(require("koa"));
var _koaBody = _interopRequireDefault(require("koa-body"));
var _koaLogger = _interopRequireDefault(require("koa-logger"));
var _todoHistoryRouter = _interopRequireDefault(require("./routing/todoHistoryRouter"));
var _todoRouter = _interopRequireDefault(require("./routing/todoRouter"));
var _userRouter = _interopRequireDefault(require("./routing/userRouter"));
var _models = require("./models");
//import library

//import router

//

//start app
const app = new _koa.default();
// logger
app.use((0, _koaLogger.default)());

// body parser
app.use((0, _koaBody.default)());

//middelware error handle
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      statusCode: err.statusCode || err.status || 500,
      message: err.message
    };
  }
});
app.use(_userRouter.default.routes()).use(_userRouter.default.allowedMethods()).use(_todoRouter.default.routes()).use(_todoRouter.default.allowedMethods()).use(_todoHistoryRouter.default.routes()).use(_todoHistoryRouter.default.allowedMethods());

//handle
const eraseDatabaseOnSync = true;
_models.sequelize.sync({
  focus: eraseDatabaseOnSync
}).then(async () => {
  app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`));
});