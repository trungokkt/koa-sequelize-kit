import Router from "koa-router";
import auth from "@babel-middleware/auth";
const router = new Router({ prefix: "/download" });
import { generateTask, generateTodoOfUser ,generateReport} from "@babel-services/xlsxService"


router.post("/tasks", auth, async (ctx) => {
    const data = await generateTask(ctx.user.id)
    ctx.set(
        "Content-disposition",
        'attachment; filename="task.xlsx"'
    );
    ctx.body = data
})
router.post("/todos", auth, async (ctx) => {
    const data = await generateTodoOfUser()
    ctx.set(
        "Content-disposition",
        'attachment; filename="todos.xlsx"'
    );
    ctx.body = data
})
router.post("/report", auth, async (ctx) => {
    const data = await generateReport()
    ctx.set(
        "Content-disposition",
        'attachment; filename="report.xlsx"'
    );
    ctx.body = data
})

export default router