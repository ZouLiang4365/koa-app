const { user } = require("../controller")

const { loginValidator, registValidator } = require("../schema")

const { login, regist } = user

module.exports = [{
  method: 'post',
  path: '/login',
  valid: loginValidator,
  controller: login 
},{
  method: 'post',
  path: '/regist',
  valid: registValidator,
  controller: regist
}]