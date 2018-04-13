// 用户控制器 
// 处理注册 登录 获取信息等逻辑
'use strict';
const Controller = require('./baseController');

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
    // TODO 
    // const param = ctx.request.body;
    // {login, password} = param
    // 判断 login 是否为合法的 email 还是 phone
  }
}

module.exports = UserController;