'use strict';

const { Controller } = require('egg');
// const moment = require('moment');
const { success, failure } = require('../../utils/apiResponse');
const { PARAMETER_ERROR } = require('../../exception/exceptionCode');
const { generalFailure } = require('../../utils/tools');

class BaseController extends Controller {
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

  setUserCookie(ctx, jwt, userProfile, maxAge=86400){
    //  TODO read domian from config
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
      'taohe_user',
      new Buffer(JSON.stringify(userProfile)).toString('base64'),
      {
        domain: this.app.config.domain,  // 写cookie所在的域名
        maxAge: maxAge * 1000, // milliseconds from Date.now() for expiry
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      })    
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
