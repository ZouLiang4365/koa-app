const error = () => {
  return async (ctx, next) => {
    try {
      console.log(">>>>>error in")
      await next();
      console.log("<<<<<error out")
      if (ctx.status === 200) {
        ctx.res.success();
      }
    } catch (err) {
      const { code, msg, message, status } = err
      if (code || status) {
        // 返回已知错误
        const errorMsg = msg || message
        ctx.res.fail({ code : code || status, msg : errorMsg });
      } else {
        // 程序运行时的错误
        ctx.app.emit('error', err, ctx);
      }
    }
  };
};

module.exports = error;
