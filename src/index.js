//import library
import 'dotenv/config';
import Koa from "koa"
import bodyParser from 'koa-body'

import logger from "koa-logger"
import serve from "koa-static"

//import router
import userRouter from "./routing/userRouter"
import todoRouter from "./routing/todoRouter"
import taskRouter from "./routing/taskRouter"
import joinRouter from "./routing/joinRouter"
import reportRouter from "./routing/reportRouter"

import { sequelize } from "./models"


//start app
const app = new Koa();

app.use(serve('public'));

// logger
app.use(logger())

// body parser
app.use(bodyParser());

//middelware error handle
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        // will only respond with JSON
        console.log(err)
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            statusCode: err.statusCode || err.status || 500,
            message: err.message
        };
    }
})

//

app
    .use(userRouter.routes())
    .use(userRouter.allowedMethods())
    .use(todoRouter.routes())
    .use(todoRouter.allowedMethods())
    .use(taskRouter.routes())
    .use(taskRouter.allowedMethods())
    .use(joinRouter.routes())
    .use(joinRouter.allowedMethods())
    .use(reportRouter.routes())
    .use(reportRouter.allowedMethods());

//handle
const eraseDatabaseOnSync = false;
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    app.listen(process.env.PORT, () =>
        console.log(`App listening on port ${process.env.PORT}!`),
    );
})
