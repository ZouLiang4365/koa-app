const Task = require('../models/task')

class TaskCtroller{
  constructor(){

  }
  // 获取当前用户的待办事项
  async getTaskByUser(ctx){
    try {
      const { page, size } = ctx.request.query
      const start = (page - 1) * size
      const taskList = await Task.find({}).populate('user_id').sort('meta.updateAt').skip(start).limit(size).exec()
      const ret = {
        rows:taskList,
        total:taskList.length
      }
      ctx.body = ret
    } catch (error) {
      throw new ctx.err.NotFoundExption({msg: error.message})
    }
  }
  // 创建事项
  async createTask(ctx){
    try {
      const { name, content, endTime, id} = ctx.request.body
      const taskList = await new Task({ name, content, endTime, user_id: id}).save()
      ctx.body = taskList
    } catch (error) {
      throw new ctx.err.HttpException({msg: "create task failed!"})
    }
  }  
  // 星标事项
  async starTask(ctx){
    const { star, id } = ctx.request.body
    await Task.findByIdAndUpdate(id, { star }, (err, doc)=>{
      if(err){
        throw new ctx.err.HttpException({msg: err.message})
      }else{
        ctx.body = doc
      }
    })
  }
  // 删除事项
  async deleteTask(ctx){
    const { id } = ctx.request.params
    const { ok } = await Task.deleteOne({_id: id})
    if(ok === 1){
      ctx.body = 'delete success!'
    }
  }
}

module.exports = new TaskCtroller()