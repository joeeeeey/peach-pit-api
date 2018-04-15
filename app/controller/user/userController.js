// 用户控制器 
// 处理注册 登录 获取信息等逻辑
'use strict';
const Controller = require('./baseController');
const { emailReg, cnPhoneReg } = require('../../utils/regPattern');
const { jwtEncode, jwtDecode } = require('../../utils/jwt');
const { sha256 } = require('../../utils/sha256')

const { PARAMETER_ERROR, NOT_EXIST_USER, USER_INCORRECT_PASSWORD } = require('../../exception/exceptionCode');
class UserController extends Controller {
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

    const user = await ctx.service.user.userService.findUserByLogin(params.login)

    // 用户是否存在
    if (user === null) {
      this.failure(NOT_EXIST_USER);
      return
    }
    // 密码是否正确
    if (!this.validatePassword(params.password, user.password)) {
      this.failure(USER_INCORRECT_PASSWORD);
      return
    }

    const result = (({ login, id }) => ({ login, id }))(user)

    const jwt = jwtEncode(result)
    this.setUserCookie(ctx, jwt, result, 10)
    this.success(result);
  }


  async register() {
    const { ctx } = this;
    const { params } = ctx.request.body;
    console.log(params)
    const paramRule = {
      login: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false },
      confirm: { type: 'string', required: true, allowEmpty: false },
      nickname: { type: 'string', required: false, allowEmpty: true }
    };

    if (!this.validate(paramRule, params)) return;
    
    const { login, password, confirm, nickname } = params

    if (emailReg().test(login) === true) {
      params.email = login
    } else if (cnPhoneReg().test(login) === true) {
      params.phone = login
    } else {
      this.failure({ PARAMETER_ERROR });
      return 
    }

    if (password !== confirm) {
      this.failure({ PARAMETER_ERROR });
      return
    }

    params.password = this.encrtyPassword(params.password)
    const result = await ctx.service.user.userService.addUser(params)
    const jwt = jwtEncode(result)

    this.setUserCookie(ctx, jwt, result)

    this.success(result);
  }
}

module.exports = UserController;