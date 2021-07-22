const jwt = require("koa-jwt")
const { jwt: { secret } } = require("../config")

const UNLESS_URL = [/^\/api\/login/,/^\/api\/regist/]
const koaJwt = () =>{
  return jwt({secret}).unless({path: UNLESS_URL})
}

module.exports = koaJwt