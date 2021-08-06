const { task } = require("../controller")

const { getTaskByUser, createTask, starTask, deleteTask } = task

module.exports = [{
  method: 'get',
  path: '/tasks/:id',
  controller: getTaskByUser
},{
  method: 'post',
  path: '/tasks',
  controller: createTask
},{
  method: 'put',
  path: '/tasks/star',
  controller: starTask
},{
  method:'delete',
  path: '/tasks/:id',
  controller: deleteTask
}]