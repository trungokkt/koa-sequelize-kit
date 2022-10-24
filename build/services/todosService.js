"use strict";

let service = {};
let models = require("../models");
let Todo = models.todo;
let TodoHistory = models.todoHistory;
service.getAll = async () => {
  const todos = await Todo.findAll();
  return todos;
};
service.getById = async id => {
  const todo = await Todo.findAll({
    where: {
      id: id
    },
    include: TodoHistory
  });
  return todo;
};
service.createTodo = async (name, description) => {
  const todo = await Todo.create({
    name: name,
    description: description
  });
  return todo;
};
service.updateTodo = async data => {
  let todo = await Todo.findByPk(data.id);
  if (!todo) {
    return 0;
  }
  todo = await todo.update({
    name: data.name,
    description: data.description
  });
  // const todo = await Todo.update(
  //     { name: data.name },
  //     {
  //         where: {
  //             id: data.id,
  //         },
  //     }
  // );
  return todo;
};
service.deleteTodo = async id => {
  let todo = await Todo.findByPk(id);
  if (!todo) {
    return 0;
  }
  await todo.destroy();
  return todo;
};
module.exports = service;