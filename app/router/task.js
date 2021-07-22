const { task } = require("../controller")

const { getTaskByUser, createTask } = task

module.exports = [{
  method: 'get',
  path: '/tasks/:id',
  controller: getTaskByUser
},{
  method: 'post',
  path: '/tasks',
  controller: createTask
}]