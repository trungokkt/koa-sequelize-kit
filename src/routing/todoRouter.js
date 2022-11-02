import Router from 'koa-router';
const router = Router({ prefix: '/todos' })
import { validatorRouter } from '@babel-middleware/validatorRouter';
import * as todoController from '@babel-controllers/todoController'
import auth from "@babel-middleware/auth"
router
    .get("/",
        auth,
        validatorRouter({
            limit: { type: "int", convertType: "int", required: false },
            offset: { type: "int", convertType: "int", required: false },
            sort: { type: "string", convertType: "string", required: false },
            directions: { type: "enum", values: ['asc', 'desc'], required: false },
            extend: {type:"boolean", convertType:"boolean",required: false}
        }, 'query'),
        todoController.getAllTodoUserJoined
    )
    .get("/:id", auth, todoController.getDetailTodo)
    .post("/",
        validatorRouter({
            name: { type: "string" },
            description: { type: "string", required: false },
        }, "body"),
        todoController.createTodo
    )
    .put("/",
        auth,   
        validatorRouter({
            id: { type: "int", convertType: "int" },
            name: { type: "string", required: false },
            description: { type: "string", required: false },
            completed: { type: "boolean", required: false }
        }, "body"),
        todoController.updateTodo
    )
    .delete("/:id",
        validatorRouter({
            id: { type: "int", convertType: "int" },
        }, "params"),
        todoController.deleteTodo
    )
    .post("/join",
        auth,
        validatorRouter({
            todo_id: { type: "int", convertType: "int" },
        }, "body"),
        todoController.JoinTodo
    )
export default router