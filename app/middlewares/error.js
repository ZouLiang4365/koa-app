const error = () => {
  return async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 200) {
        ctx.res.success();
      }
    } catch (err) {
      const { code, msg } = err
      if (code) {
        // 返回已知错误
        ctx.res.fail({ code, msg });
      } else {
        // 程序运行时的错误
        ctx.app.emit('error', err, ctx);
      }
    }
  };
};

module.exports = error;
