const jwt = require("koa-jwt")
const { jwt: { secret } } = require("../config")

const koaJwt = () =>{
  return jwt({secret}).unless({path: [/^\/login/]})
}

module.exports = koaJwt