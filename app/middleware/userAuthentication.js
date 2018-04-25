'use strict';

const { NO_AUTHORITY } = require('../exception/exceptionCode');
const { jwtDecode } = require('../utils/jwt');
const Exception = require('../exception/exception');

module.exports = options => {
  return async (ctx, next) => {
    console.log("user 认证中间件")
    const jwt = ctx.cookies.get('jwt')

    if (jwt === null || jwt === "") {
      throw new Exception(NO_AUTHORITY);
    }
    const decodeResult = jwtDecode(jwt, ctx.app.config.jwt_secret)

    if (decodeResult.code !== 0) {
      throw new Exception(NO_AUTHORITY);
    } 

    await next();
  };
};




