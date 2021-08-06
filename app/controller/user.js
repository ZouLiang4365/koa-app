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
    const user = await User.findOne({ name })
    if(!user){
      throw new ctx.err.NotFoundExption({
        msg: `${name} is not exist!`
      })
    } 
    if(password !== user.password){
      throw new ctx.err.ParameterExption({
        msg: 'Error password!'
      })     
    }
    // jwt
    const { payload, secret, expiresIn } = ctx.config.jwt
    const token = jwt.sign({...payload, name, password }, secret, { expiresIn })
    ctx.body = {
      userData:{
        name,
        id: user._id
      },
      token
    }
  }
  // 注册
  async regist(ctx){
    // 获取前端传过来的注册参数
    const { name, password } = ctx.request.body
    // 查询该用户是否已存在
    const repeatUser = await User.findOne({ name })
    if(repeatUser){
      throw new ctx.err.NotFoundExption({
        msg: `${name} is already exist!`
      })
    }
    // 创建用户
    try {
      const user = await new User({ name, password }).save()
      ctx.body = user
    } catch (error) {
      ctx.throw(401,`注册失败!${error}`)
    }   
  }
}

module.exports = new UserCtroller()