const Task = require('../models/task')

class TaskCtroller{
  constructor(){

  }

  async getTaskByUser(ctx){
    try {
      const taskList = await Task.find({}).populate('user_id').sort('meta.updateAt')
      console.log("tasklist",taskList)
      const ret = {
        rows:taskList,
        total:taskList.length
      }
      ctx.body = ret
    } catch (error) {
      throw new ctx.err.NotFoundExption({msg: error.message})
    }
  }

  async createTask(ctx){
    try {
      const { name, content, endTime, id} = ctx.request.body
      console.log({ name, content, endTime, id})
      const taskList = await new Task({ name, content, endTime, user_id: id}).save()
      ctx.body = taskList
    } catch (error) {
      throw new ctx.err.HttpException({msg: "create task failed!"})
    }
  }  
}

module.exports = new TaskCtroller()