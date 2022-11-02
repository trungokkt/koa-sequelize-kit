import Router from 'koa-router';
const router = Router({ prefix: '/join' })
import * as joinController from "@babel-controllers/joinController"
import auth from '@babel-middleware/auth';
import { validatorRouter } from "@babel-middleware/validatorRouter"
router
    .post("/",
        auth,
        validatorRouter({
            task_id: { type: "int", convertType: "int" }
        }, 'body'),
        joinController.createJoinTask
    )
    .put("/",
        auth,
        validatorRouter({
            task_id: { type: "int", convertType: "int" },
            status: { type: 'bool' },
        }, "body"),
        joinController.updateJoinTask
    )
    .delete("/:id",
        validatorRouter({
            task_id: { type: "int", convertType: "int" },
            status: { type: 'bool' },
        }, "params"),
        joinController.deleteJoinTask
    );

export default router