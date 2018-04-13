'use strict';

const { Controller } = require('egg');
// const moment = require('moment');
const { success, failure } = require('../../utils/apiResponse');
const { PARAMETER_ERROR } = require('../../exception/exceptionCode');
const { generalFailure } = require('../../utils/tools');

class BaseController extends Controller {
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
