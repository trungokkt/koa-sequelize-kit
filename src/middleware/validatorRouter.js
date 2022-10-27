
import Parameter from "parameter";
var parameter = new Parameter();

const validatorRouter = (rule, type) => {
    return async (ctx, next) => {
        var errors = parameter.validate(rule, ctx.request[type]);
        if (errors) {
            ctx.status = 422;
            ctx.body = errors;
        } else {
            await next()
        }

    }
}
export {
    validatorRouter
} 