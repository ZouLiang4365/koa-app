const mongoose = require("../db")

const { Schema, model } = mongoose

const userSchema = new Schema({
  _v:{ select:false },
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  meta:{
    createAt:{
      type:Date,
      default: Date.now()
    },
    updateAt:{
      type:Date,
      default: Date.now()      
    }
  }
})

module.exports = model("Users", userSchema, "Users")