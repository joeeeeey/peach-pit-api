'use strict';

const { generalFailure } = require('../utils/tools');

module.exports = options => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      ctx.logger.error(e);
      ctx.body = generalFailure(e);
      ctx.status = e.status || 200;
    }
  };
};




