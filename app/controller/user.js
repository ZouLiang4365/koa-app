const User = require("../models/user")
const jwt = require("jsonwebtoken")
class UserCtroller{
  constructor(){

  }
  // 获取所有用户
  getAllUsers(ctx){
    const users = User.findOne({})
    ctx.body = users
  }
  // 用户检索
  async getUserByName(ctx){
    const { name } = ctx.request.body
    const user = await User.findOne({name})
    if(user){
      ctx.body = user
    } else{
      throw new ctx.err.NotFoundExption({
        msg: `${name} is not exist!`
      })
    }
  }
  // 登录
  async login(ctx){
    const { name, password } = ctx.request.body
    const user = await User.findOne({ name, password })
    console.log("user",user)
    if(!user){
      throw new ctx.err.NotFoundExption({
        msg: `${name} is not exist!`
      })
    }
    // jwt
    const { payload, secret, expiresIn } = ctx.config.jwt
    const token = jwt.sign({...payload, name, password }, secret, { expiresIn })
    ctx.body = token
  }
  // 注册
  async regist(ctx){
    const { name, password } = ctx.request.body
    const repeatUser = await User.findOne({ name, password })
    if(repeatUser){
      throw new ctx.err.NotFoundExption({
        msg: `${name} is already exist!`
      })
    }
    try {
      const user = await new User({ name, password }).save()
      ctx.body = user
    } catch (error) {
      ctx.throw(401,`注册失败!${error}`)
    }   
  }
}

module.exports = new UserCtroller()