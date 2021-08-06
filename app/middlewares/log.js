const log4js = require("log4js")
const { logConfig: { outDir,level,flag } } = require("../config")

log4js.configure({
  appenders: { cheese: { type: 'file', filename: `${outDir}/receive.log` } },
  categories: { default: { appenders: [ 'cheese' ], level: 'info' } },
  pm2: true
})
const logger = log4js.getLogger()
logger.level = level

module.exports = ()=>{
  return async (ctx,next)=>{
    
    console.log(">>>>>logger in")
    const { method, path, origin, query, body, headers, ip } = ctx.request
    console.log("recieve........", query)
    const data = { method, path, origin, query, body, headers, ip }
    await next()
    console.log("<<<<<logger out")
    if(flag){
      const { status, params } = ctx;
      data.status = status;
      data.params = params;
      data.result = ctx.body || 'no content';
      if (ctx.body.code !== 0) {
        logger.error(JSON.stringify(data));
      } else {
        logger.info(JSON.stringify(data));
      }      
    }
  }}