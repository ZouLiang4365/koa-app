const assert = require("assert")

const throwError = (code, msg)=>{
  const err = new Error(msg)
  err.code = code
  throw err
}

module.exports = {
  assert,
  throwError
}