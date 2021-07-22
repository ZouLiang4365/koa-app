const assert = require("assert")

const throwError = (code, msg)=>{
  const err = new Error(msg)
  err.code = code
  console.log(err)
  throw err
}

module.exports = {
  assert,
  throwError
}