'use strict';

const { generalFailure } = require('../utils/tools');

module.exports = options => {
  return async (ctx, next) => {
    try {
      console.log("异常捕获中间件")
      await next();
    } catch (e) {
      ctx.logger.error(e);
      ctx.body = generalFailure(e);
      ctx.status = e.status || 200;
    }
  };
};




