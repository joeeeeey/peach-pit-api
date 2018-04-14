// 用户控制器 
// 处理注册 登录 获取信息等逻辑
'use strict';
const Controller = require('./baseController');
const {emailReg, cnPhoneReg} = require('../../utils/regPattern');
const {jwtEncode, jwtDecode} = require('../../utils/jwt');


const { PARAMETER_ERROR } = require('../../exception/exceptionCode');
class UserController extends Controller {
  async login() {
    const { ctx } = this;
    // const result = await ctx.service.admin.block.templateService.addTemplate();
    // this.success(result);
    // const paramRule = {
    //   name: { type: 'string' },
    //   remark: { type: 'string', required: false, allowEmpty: true },
    //   permissions: { type: 'array' }
    // };
    // if (!this.validate(paramRule)) return;
    // const param = ctx.request.body;
  }  


  async register(){
    const { ctx } = this;
    const {params} = ctx.request.body;
    console.log(params)

    const paramRule = {
      login: { type: 'string', required: true },
      password: { type: 'string', required: true, allowEmpty: false },
      confirm: { type: 'string', required: true, allowEmpty: false },
      nickname: { type: 'string', required: false, allowEmpty: true }
    };

    if (!this.validate(paramRule, params)) return;

    const {login, password, confirm, nickname} = params
    if(emailReg().test(login)===true){
      params.email = login
    }else if(cnPhoneReg().test(login)===true){
      params.phone = login
    }else{
      return this.failure({PARAMETER_ERROR});
    }

    if(password!==confirm){
       this.failure({PARAMETER_ERROR});
       return
    }

    const result = await ctx.service.user.userService.addUser(params)
    const jwt = jwtEncode(result)
    console.log(jwt)
    console.log(jwtDecode(jwtEncode(result)))

    ctx.cookies.set(
      'jwt', 
      jwt,
      {
        domain: 'localhost',  // 写cookie所在的域名
        maxAge: 24 * 60 * 60 * 1000, // milliseconds from Date.now() for expiry
        httpOnly: true,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      })
    
    this.success(result);

    // 参数验证成功后 
    // create user
    // 返回 jwt 加密的信息和用户相关信息



  }
}

module.exports = UserController;