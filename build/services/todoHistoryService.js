"use strict";

let service = {};
let models = require("../models");
let TodoHistory = models.todoHistory;
service.getAll = async () => {
  const todoHistory = await TodoHistory.findAll();
  return todoHistory;
};
service.getById = async id => {
  const todoHistory = await TodoHistory.findAll({
    where: {
      id: id
    }
  });
  return todoHistory;
};
service.createTodoHistory = async data => {
  const todoHistory = await TodoHistory.create({
    user_id: data.user_id,
    todo_id: data.todo_id
  });
  return todoHistory;
};
service.updateTodoHistory = async data => {
  let todoHistory = await TodoHistory.findByPk(data.id);
  if (!todoHistory) {
    return 0;
  }
  todoHistory = await todoHistory.update({
    process: data.process,
    status: data.status || true
  });
  return todoHistory;
};
service.deleteTodoHistory = async id => {
  let todoHistory = await TodoHistory.findByPk(id);
  if (!todoHistory) {
    return 0;
  }
  await todoHistory.destroy();
  return todoHistory;
};
module.exports = service;