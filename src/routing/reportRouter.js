import Router from "koa-router";
const router = new Router({ prefix: "/download" });
import generateReport from "../services/xlsxService"


router.get("/", async (ctx) => {
    const data = await generateReport()
    ctx.set(
        "Content-disposition",
        'attachment; filename="out.xlsx"'
    );
    ctx.body = data

})

export default router