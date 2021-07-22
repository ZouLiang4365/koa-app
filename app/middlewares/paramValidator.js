module.exports = schema =>{
  return async (ctx,next)=>{
    console.log(">>>>>validator in")
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
    
    schemaKeys.some(key =>{
      const valid = paramMap[key]

      const ret = schema[key].validate(valid,{
        allowUnknows: true
      })
      console.log("ret",ret)
      if(ret.error){
        throw new ctx.err.ParameterExption({msg: ret.error.message})
      }
    })

    await next()
    console.log("<<<<<validator out")

  }
}
