
const appPath = `${process.cwd()}/app`
module.exports = {
  HOST:"localhost",
  PORT: 3001,
  viewsPath: `${appPath}/views`,
  publicPath:`${appPath}/public`,
  db:{
    url:"mongodb://localhost:27017/local",
    config:{
      useUnifiedTopology:true,
      useNewUrlParser:true
    }
  },
  tempFilePath:`${appPath}/public/temp`,
  logConfig: {
    flag: true,
    outDir: `${appPath}/public/log`,
    level: 'info'
  },
  jwt:{
    payload:{
      iss: 'koa-server',
      jti: 1
    },
    secret: 'koa-secret',
    expiresIn: '1h'
  }
}