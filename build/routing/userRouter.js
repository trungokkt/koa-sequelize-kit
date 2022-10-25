"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _koaRouter = _interopRequireDefault(require("koa-router"));
var _userServices = _interopRequireDefault(require("../services/userServices"));
const router = (0, _koaRouter.default)({
  prefix: '/users'
});
router.get("/", async (ctx, next) => {
  try {
    const {
      offset,
      limit,
      sort,
      directions
    } = ctx.request.query;
    const users = await _userServices.default.getAll(offset, limit, sort, directions);
    ctx.body = users;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.get("/:id", async (ctx, next) => {
  try {
    const user = await _userServices.default.getByPK(ctx.params.id);
    ctx.body = user;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.post("/", async (ctx, next) => {
  try {
    const name = ctx.request.body.name;
    if (!name) {
      ctx.status = 400;
      throw new Error("name cannot be null");
    }
    const user = await _userServices.default.createUser(name);
    ctx.body = user;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.put("/", async (ctx, next) => {
  try {
    const user = ctx.request.body;
    if (!user || !user.name || !user.id) {
      const error = new Error("input is not true");
      error.code = 400;
      throw error;
    }
    const u = await _userServices.default.updateUser(user);
    ctx.body = u;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.delete("/:id", async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const user = await _userServices.default.deleteUser(id);
    ctx.body = user;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
var _default = router;
exports.default = _default;