import Router from 'koa-router';
import auth from '../middleware/auth';
const router = Router({ prefix: '/users' })
import { validatorRouter } from '../middleware/validatorRouter';
import * as userController from "../controllers/userController"

router
    .get("/",
        auth,
        validatorRouter({
            limit: { type: "int", convertType: "int", required: false },
            offset: { type: "int", convertType: "int", required: false },
            sort: { type: "string", convertType: "string", required: false },
            directions: { type: "enum", values: ['asc', 'desc'], required: false },
        }, 'query'),
        userController.getAllUser
    )
    .get("/detail",
        auth,
        userController.getDetailUser
    )
    .post("/",
        validatorRouter({
            name: { type: "string" },
            username: { type: "string" },
            password: { type: "string" },
        }, "body"),
        userController.createUser
    )
    .put("/",
        auth,
        validatorRouter({
            name: { type: "string", convertType: "string" },
        }, "body"),
        userController.updateUser
    )
    .delete("/",
        auth,
        userController.deleteUser
    )
    .post("/login",
        validatorRouter({
            username: { type: "string" },
            password: { type: "string" },
        }, "body"),
        userController.loginUser
    );
export default router