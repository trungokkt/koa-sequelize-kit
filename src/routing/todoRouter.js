import Router from 'koa-router';
const router = Router({ prefix: '/todos' })
import { validatorRouter } from '../middleware/validatorRouter';
import * as todoController from '../controllers/todoController'
router
    .get("/",
        validatorRouter({
            limit: { type: "int", convertType: "int", required: false },
            offset: { type: "int", convertType: "int", required: false },
            sort: { type: "string", convertType: "string", required: false },
            directions: { type: "enum", values: ['asc', 'desc'], required: false },
        }, 'query'),
        todoController.getAllTodo
    )
    .get("/:id", todoController.getDetailTodo)
    .post("/",
        validatorRouter({
            name: { type: "string" },
            description: { type: "string", required: false },
        }, "body"),
        todoController.createTodo
    )
    .put("/",
        validatorRouter({
            id: { type: "int", convertType: "int" },
            name: { type: "string" },
            description: { type: "string", required: false },
        }, "body"),
        todoController.updateTodo
    )
    .delete("/:id", todoController.deleteTodo)

export default router