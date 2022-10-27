import Router from "koa-router";
import auth from "../middleware/auth";
const router = new Router({ prefix: "/download" });
import generateReport from "../services/xlsxService"


router.get("/",auth, async (ctx) => {
    const data = await generateReport(ctx.user.id)
    ctx.set(
        "Content-disposition",
        'attachment; filename="out.xlsx"'
    );
    ctx.body = data
})

export default router