'use strict';

const { Controller } = require('egg');
const { jwtEncode, jwtDecode } = require('../../utils/jwt');
const { success, failure } = require('../../utils/apiResponse');
const { PARAMETER_ERROR } = require('../../exception/exceptionCode');
const { generalFailure } = require('../../utils/tools');

class BaseController extends Controller {
  setAdminCookie(ctx, jwt, adminProfile, maxAge=86400){
    ctx.cookies.set(
      'jwt',
      jwt,
      {
        domain: this.app.config.domain,  // 写cookie所在的域名
        maxAge: maxAge * 1000, // milliseconds from Date.now() for expiry
        httpOnly: true,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      })

    ctx.cookies.set(
      'taohe_admin',
      new Buffer(JSON.stringify(adminProfile)).toString('base64'),// cookie 不支持中文
      {
        domain: this.app.config.domain,  // 写cookie所在的域名
        maxAge: maxAge * 1000, // milliseconds from Date.now() for expiry
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      })    
  }

  jwtEncode(data){
    return jwtEncode(data, this.getJwtSecret())
  }

  jwtDecode(token){
    return jwtDecode(token, this.getJwtSecret())
  }
  
  getJwtSecret(){
    return this.app.config.jwt_secret
  }

  success(data) {
    this.ctx.body = success(data);
  }

  failure(data) {
    this.ctx.body = failure(data);
  }

  generalFailure(e) {
    this.ctx.body = generalFailure(e);
  }

  validate(rule, param) {
    const { ctx } = this;
    try {
      ctx.validate(rule, param);
    } catch (e) {
      ctx.logger.warn(e);
      this.failure(PARAMETER_ERROR);
      return false;
    }
    return true;
  }

  async isLive() {
    const { app, ctx } = this;
    ctx.body = 'ok ' + app.env;
  }

  // async getKey() {
  //   const data = {
  //     key: this.config.app_secret,
  //     time: moment()
  //       .valueOf()
  //       .toString()
  //   };
  //   this.success(data);
  // }
}

module.exports = BaseController;
