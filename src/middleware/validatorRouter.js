
import Parameter from "parameter";
var parameter = new Parameter();

const validatorRouter = (rule, type) => {
    return async (ctx, next) => {
        let values = []
        switch (type) {
            case "body":
                values = ctx.request.body
                break;
            case "query":
                values = ctx.request.query
                break;
            case "params":
                values = ctx.params
                break;
        }
        var errors = parameter.validate(rule, values);
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