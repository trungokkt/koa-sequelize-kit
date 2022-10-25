//import library
import 'dotenv/config';
import Koa from "koa"
import bodyParser from 'koa-body'
import logger from "koa-logger"

//import router
import todoHistoryRouter from "./routing/todoHistoryRouter"
import todoRouter from "./routing/todoRouter"
import userRouter from "./routing/userRouter"

//
import { sequelize } from "./models"
//start app
const app = new Koa();
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
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            statusCode: err.statusCode || err.status || 500,
            message: err.message
        };
    }
})

app
    .use(userRouter.routes())
    .use(userRouter.allowedMethods())
    .use(todoRouter.routes())
    .use(todoRouter.allowedMethods())
    .use(todoHistoryRouter.routes())
    .use(todoHistoryRouter.allowedMethods());

//handle
const eraseDatabaseOnSync = true;
sequelize.sync({ focus: eraseDatabaseOnSync }).then(async () => {
    app.listen(process.env.PORT, () =>
        console.log(`App listening on port ${process.env.PORT}!`),
    );
})


