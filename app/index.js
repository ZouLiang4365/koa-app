const koa = require("koa")
// 中间件工具函数，通过该函数可以按app.use的顺序同步执行，形成洋葱圈式调用,要求中间件元素类型必须是一个function
const compose = require("koa-compose")
// 中间件
const middlewares = require("./middlewares")
// 一些配置
const config = require("./config")
// 工具函数
const utils = require("./common/utils")
// 错误处理
const exception = require("./common/exception")

const app = new koa()

const context = app.context
// 绑定到上下文，方便调用
context.config = config
context.utils = utils
context.err = exception
//注册中间件
const composeMiddlewares = compose(middlewares)
app.use(composeMiddlewares)

// 处理一些逃逸error
app.on("error",(error, ctx)=>{
  if(ctx){
    ctx.body = {
      code : 9999,
      msg: `${error.message}`
    }
  }
})

const { HOST,PORT } = config
// app.listen 是一个语法糖，实际上调用的是node的http模块
app.listen(PORT,HOST,()=>{
  console.log(`koa server listening on ${HOST}:${PORT}`)
})
