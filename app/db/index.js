// mongoDB
const mongoose = require("mongoose")

const {db: { url , config }} = require("../config")
mongoose.connect(url, config)

mongoose.connection.on('connected',() =>{
  console.log("mongoDB connect success!")
})

mongoose.connection.on('error',(error) =>{
  console.log(`mongoDB connect error: ${error}`)
})  

mongoose.connection.on('disconnnected',(error) =>{
  console.log("mongoDB disconnnected!")
}) 

module.exports = mongoose