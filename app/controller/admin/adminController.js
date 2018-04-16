'use strict';
const Controller = require('./baseController');
// const { jwtEncode, jwtDecode } = require('../../utils/jwt');
const { sha256 } = require('../../utils/sha256')
const Exception = require('../../exception/exception');
const { PARAMETER_ERROR, NOT_EXIST_USER, USER_INCORRECT_PASSWORD } = require('../../exception/exceptionCode');


class AdminController extends Controller {
  validatePassword(pasInData, pasInDb) {
    return this.encrtyPassword(pasInData) === pasInDb
  }

  encrtyPassword(password) {
    return sha256(password + this.app.config.app_key)
  }  
  async login() {
    const { ctx } = this;
    const { params } = ctx.request.body;

    const paramRule = {
      login: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false },
    };

    if (!this.validate(paramRule, params)) return;

    const admin = await ctx.service.admin.adminService.findAdminByLogin(params.login)
    // console.log(admin)
    // 用户是否存在
    if (admin === null) {
      throw new Exception(NOT_EXIST_USER);
    }
    // 密码是否正确
    if (!this.validatePassword(params.password, admin.password)) {
      throw new Exception(USER_INCORRECT_PASSWORD);
    }

    const result = (({ login, id, nickname, secret_key }) => ({ login, id, nickname, secret_key }))(admin)
    // jwtEncode(data)
    const jwt = this.jwtEncode(result)
    this.setAdminCookie(ctx, jwt, result)
    this.success(result);
  }  
}

module.exports = AdminController;