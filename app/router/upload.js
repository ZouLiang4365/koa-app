const { upload }  = require("../controller")

module.exports = [{
  method: 'post',
  path: '/upload',
  controller: upload 
}]