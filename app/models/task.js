const mongoose = require('mongoose')

const { Schema, model } = mongoose

const taskSchema = new Schema({
  _v:{ select:false },
  user_id:{
    type: Schema.Types.ObjectId,
    ref:'Users'
  },
  name: { type: String, required: true},
  content: { type: String, required: true},
  endTime: { type: Date, required:true},
  status: { type: Boolean , default: false},
}, {timestamps: true})

module.exports = model('Task', taskSchema,'Tasks')