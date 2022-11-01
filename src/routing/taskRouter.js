import Router from 'koa-router';
const router = Router({ prefix: '/tasks' })
import { validatorRouter } from '../middleware/validatorRouter';
import * as taskController from '../controllers/taskController'
import { uploadAllFile } from '../middleware/upload-multer'
router
    .get("/",
        validatorRouter({
            limit: { type: "int", convertType: "int", required: false },
            offset: { type: "int", convertType: "int", required: false },
            sort: { type: "string", convertType: "string", required: false },
            directions: { type: "enum", values: ['asc', 'desc'], required: false },
        }, 'query'),
        taskController.getAllTask
    )
    .get("/:id", taskController.getDetailTask)
    .post("/",
        uploadAllFile.array("attached_files"),
        validatorRouter({
            name: { type: "string" },
            description: { type: "string", required: false },
        }, "body"),
        taskController.createTask
    )
    .put("/",
        uploadAllFile.array("new_attached_files"),
        validatorRouter({
            id: { type: "int", convertType: "int" },
            name: { type: "string",required: false },
            description: { type: "string", required: false },
        }, "body"),
        taskController.updateTask
    )
    .delete("/:id", taskController.deleteTask)
export default router