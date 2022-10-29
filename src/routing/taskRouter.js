import Router from 'koa-router';
const router = Router({ prefix: '/tasks' })
import { validatorRouter } from '../middleware/validatorRouter';
import * as taskRouter from '../controllers/taskController'
router
    .get("/",
        validatorRouter({
            limit: { type: "int", convertType: "int", required: false },
            offset: { type: "int", convertType: "int", required: false },
            sort: { type: "string", convertType: "string", required: false },
            directions: { type: "enum", values: ['asc', 'desc'], required: false },
        }, 'query'),
        taskRouter.getAllTask
    )
    .get("/:id", taskRouter.getDetailTask)
    .post("/",
        validatorRouter({
            name: { type: "string" },
            description: { type: "string", required: false },
        }, "body"),
        taskRouter.createTask
    )
    .put("/",
        validatorRouter({
            id: { type: "int", convertType: "int" },
            name: { type: "string" },
            description: { type: "string", required: false },
        }, "body"),
        taskRouter.updateTask
    )
    .delete("/:id", taskRouter.deleteTask)
export default router