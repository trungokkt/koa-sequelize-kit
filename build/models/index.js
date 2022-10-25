"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = exports.default = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _user = _interopRequireDefault(require("./user"));
var _todo = _interopRequireDefault(require("./todo"));
var _todoHistory = _interopRequireDefault(require("./todoHistory"));
const sequelize = new _sequelize.default(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres'
});
exports.sequelize = sequelize;
sequelize.sync({
  focus: true
});
const models = {
  User: (0, _user.default)(sequelize, _sequelize.default),
  Todo: (0, _todo.default)(sequelize, _sequelize.default),
  TodoHistory: (0, _todoHistory.default)(sequelize, _sequelize.default)
};
//set relationship
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});
var _default = models;
exports.default = _default;