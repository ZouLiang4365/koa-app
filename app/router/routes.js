const { page, user : { login, regist } , upload, home } = require("../controller")
const { loginValidator, registValidator } = require("../schema")
const routes = [{
  method: 'get',
  path: '/index',
  controller: page
},{
  method: 'get',
  path: '/home',
  controller: home
},{
  method: 'post',
  path: '/login',
  valid: loginValidator,
  controller: login 
},{
  method: 'post',
  path: '/regist',
  valid: registValidator,
  controller: regist
},{
  method: 'post',
  path: '/upload',
  controller: upload 
}]

module.exports = routes