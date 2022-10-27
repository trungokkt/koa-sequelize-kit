import { verifyJwt } from "../services/jwtService";
const auth = async (ctx, next) => {
    const token = ctx.headers.authorization.replace("Bearer ","")
    console.log(token)
    const user = verifyJwt(token)
    ctx.user = user
    await next()
}

export default auth