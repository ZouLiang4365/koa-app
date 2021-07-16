module.exports = schema =>{
  return async (ctx,next)=>{
    let body = ctx.request.body
    if(typeof body === 'string' && body.length){
      body = JSON.stringify(body)
    }
    
    const paramMap = {
      router: ctx.params.params,
      query: ctx.params.query,
      body
    }
    if(!schema) return next()

    const schemaKeys = Object.getOwnPropertyNames(schema)
    if(!schemaKeys.length) return next()
    
    console.log("schemaKeys",schemaKeys)
    schemaKeys.some(key =>{
      const valid = paramMap[key]

      const ret = schema[key].validate(valid,{
        allowUnknows: true
      })
      console.log("ret",ret)
      if(ret.error){
        ctx.utils.assert(false,ctx.utils.throwError(9998, ret.error.message))
      }
    })

    await next()

  }
}
