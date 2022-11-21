import Router from 'koa-router';
const router = Router({ prefix: '/list' })
import { validatorRouter } from '@babel-middleware/validatorRouter';
import * as taskController from '@babel-controllers/taskController'
import * as categoryController from '@babel-controllers/categoryController'

import auth from "@babel-middleware/auth"
router
    .get("/",
        validatorRouter({
            task_id: { type: "int", convertType: "int" },
        }, 'query'),
        categoryController.getAll
    )
    .post("/",
        auth,
        validatorRouter({
            task_id: { type: "int", convertType: "int" },
            name: { type: "string" },
        }, "body"),
        categoryController.createList
    )
    .put("/",
        validatorRouter({
            id: { type: "int", convertType: "int" },
            name: { type: "string",required: false },
            index: { type: "int", convertType: "int"  , required: false },
        }, "body"),
        categoryController.updateList
    )
    // .delete("/:id", taskController.deleteTask)
export default router