import jwt from "jsonwebtoken"
const generateJwt = ({ id, username, name }) => {
    var token = jwt.sign({ id, username, name }, process.env.PRIVATE_KEY);
    return token
}
const verifyJwt = (token) => {
    try {
        var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        return decoded
    } catch (err) {
        console.log(err)
    }
}
export {
    generateJwt,
    verifyJwt
}