const koaRouter = require('koa-router')

const router = new koaRouter({
  prefix : "/api"
})

const userRoutes = require('./user')
const taskRoutes = require('./task')
const uploadRoutes = require('./upload')
const paramValidator = require('../middlewares/paramValidator')

const routes = [...userRoutes,...taskRoutes,...uploadRoutes]

routes.forEach(route => {
  const { method, path, controller, valid } = route
  router[method](path, paramValidator(valid), controller)
});

module.exports = router