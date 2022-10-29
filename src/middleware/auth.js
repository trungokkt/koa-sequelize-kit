import { verifyJwt } from "../services/jwtService";
const auth = async (ctx, next) => {
    if(!ctx.headers.authorization) throw new Error("authorization false. please check authorization")
    const token = ctx.headers.authorization.replace("Bearer ","")
    const user = verifyJwt(token)
    ctx.user = user
    await next()
}

export default auth