const response = () => {
  return async (ctx, next) => {
    console.log(">>>>>response in")
    ctx.res.fail = ({ code, data, msg }) => {
      ctx.body = {
        code,
        data,
        msg
      }
    }

    ctx.res.success = msg => {
      ctx.body = {
        code: 0,
        data: ctx.body,
        msg: msg || 'success'
      }
    }

    await next()
    console.log("<<<<<response out")
  } 
}

module.exports = response
