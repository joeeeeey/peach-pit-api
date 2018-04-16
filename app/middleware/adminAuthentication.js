'use strict';

const { NO_AUTHORITY } = require('../exception/exceptionCode');
const { jwtDecode } = require('../utils/jwt');
const Exception = require('../exception/exception');

module.exports = options => {
  return async (ctx, next) => {
    console.log("admin 认证中间件")
    const jwt = ctx.cookies.get('jwt')

    if (jwt === null || jwt === "") {
      throw new Exception(NO_AUTHORITY);
    }
    const decodeResult = jwtDecode(jwt, ctx.app.config.jwt_secret)

    if (decodeResult.code !== 0) {
      throw new Exception(NO_AUTHORITY);
    } else {
      const secret_key = decodeResult.decoded.data.secret_key

      const administrator = await ctx.service.admin.adminService.findAdminBySecretKey(secret_key)

      if (administrator === null) {
        throw new Exception(NO_AUTHORITY);
      }
    }

    await next();
  };
};




