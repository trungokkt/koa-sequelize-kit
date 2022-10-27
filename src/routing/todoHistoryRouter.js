import Router from 'koa-router';
const router = Router({ prefix: '/history' })
import * as todoHistoryService from "../controllers/todoHistoryController"
import auth from '../middleware/auth';
import { validatorRouter } from "../middleware/validatorRouter"
router
    .get("/",
        auth,
        validatorRouter({
            limit: { type: "int", convertType: "int", required: false },
            offset: { type: "int", convertType: "int", required: false },
            sort: { type: "string", convertType: "string", required: false },
            directions: { type: "enum", values: ['asc', 'desc'], required: false },
        }, 'query'),
        todoHistoryService.getAllTodoHistory
    )
    .get("/:id", todoHistoryService.getDetailTodoHistory)
    .post("/",
        auth,
        validatorRouter({
            todo_id: { type: "int", convertType: "int" }
        }, 'body'),
        todoHistoryService.createTodoHistory
    )
    .put("/",
        auth,
        validatorRouter({
            id: { type: "int", convertType: "int", required: true },
            process: { type: "int", convertType: "int", required: false },
            status: { type: 'bool', required: false },
            comment: { type: 'string', required: false },
        },"body"),
        todoHistoryService.updateTodoHistory
    )
    .delete("/:id", todoHistoryService.deleteTodoHistory);

export default router