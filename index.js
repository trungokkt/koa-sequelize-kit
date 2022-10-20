const Koa = require("koa");
const bodyParser = require('koa-bodyparser');

require('dotenv').config();


const app = new Koa();
// body parser
app.use(bodyParser());


const userRouter = require("./src/routing/userRouter")
app.use(userRouter.routes())
app.use(userRouter.routes()).use(userRouter.allowedMethods());

const todoRouter = require("./src/routing/todoRouter")
app.use(todoRouter.routes())
app.use(todoRouter.routes()).use(todoRouter.allowedMethods());

const todoHistoryRouter = require("./src/routing/todoHistoryRouter")
app.use(todoHistoryRouter.routes())
app.use(todoHistoryRouter.routes()).use(todoHistoryRouter.allowedMethods());


app.listen(process.env.PORT || 3000);
