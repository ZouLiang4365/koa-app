const Joi = require("@hapi/joi")

module.exports = {
  body: Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required()
  })
}

