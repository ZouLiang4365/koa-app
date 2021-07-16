class HttpException extends Error{
  constructor({code = 10000, status = 400, msg}){
    super()
    this.code = code
    this.status = status
    this.msg = msg
  }
}

class ParameterExption extends HttpException{
  constructor({code = 10000, status = 400, msg = 'Parameter Error!'}){
    super({code, status, msg})
  }
}

class NotFoundExption extends HttpException{
  constructor({code = 10001, status = 404, msg = 'Not Found!'}){
    super({code, status, msg})
  }
}

class TokenExption extends HttpException{
  constructor({code = 10003, status = 401, msg = 'Auth Failed!'}){
    super({code, status, msg})
  }
}

class ForbiddenExption extends HttpException{
  constructor({code = 10002, status = 403, msg = 'Access Forbidden!'}) {
    super({code, status, msg})
  }
}

module.exports = {
  HttpException,
  ParameterExption,
  NotFoundExption,
  TokenExption,
  ForbiddenExption
}