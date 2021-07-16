// 路由模块
const router = require('../router')
// 处理跨域
const cors = require("@koa/cors")
// 解析数据
const bodyParse = require('koa-body')
// 返回数据进行统一处理
const response = require('./response')
// 错误统一处理
const error = require('./error')
// 日志
const log = require('./log')
// 静态资源
const koaStatic = require('koa-static')
// HTML
const views = require('koa-views')
// jwt
const jwt = require('./jwt')

const { viewsPath, publicPath } = require('../config')

const renderMD = views(viewsPath,{
  extension: 'ejs'
})
const koaBody = bodyParse({
  multipart:true,
  formidable:{
    keepExtensions:true,
    maxFieldsSize:2*1024*1024
  }
})
const corsMD = cors({
  origin:"*",
  credentials:true,
  allowMethods:['GET','POST','HEAD','PUT','DELETE']
})
const staticMD = koaStatic(publicPath)
const resMD = response()
const errorMD = error()
const logMD = log()
const routerMD = router.routes()
const allowMD = router.allowedMethods()
const jwtMD = jwt()

module.exports = [corsMD,renderMD,staticMD,koaBody,logMD,resMD,errorMD,jwtMD,routerMD,allowMD]