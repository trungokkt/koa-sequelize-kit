import Router from 'koa-router';
const router = Router({ prefix: '/tasks' })
import { validatorRouter } from '@babel-middleware/validatorRouter';
import * as taskController from '@babel-controllers/taskController'
import { uploadAllFile } from '@babel-middleware/upload-multer'
import auth from "@babel-middleware/auth"
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
        auth,
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