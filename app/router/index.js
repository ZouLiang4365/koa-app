const koaRouter = require('koa-router')

const router = new koaRouter()

const routes = require('./routes')

const paramValidator = require('../middlewares/paramValidator')
routes.forEach(route => {
  const { method, path, controller, valid } = route
  router[method](path, paramValidator(valid), controller)
});

module.exports = router