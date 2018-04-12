'use strict';
const Controller = require('./baseController');
// const { Controller } = require('egg');
class BlockController extends Controller {
  async getAllTemplates() {
    const { ctx } = this;
    const param = ctx.request.body
    const result = await ctx.service.blockService.getAllTemplates(param);
    this.success(result);
    // const paramRule = {
    //   name: { type: 'string' },
    //   remark: { type: 'string', required: false, allowEmpty: true },
    //   permissions: { type: 'array' }
    // };
    // if (!this.validate(paramRule)) return;
    // const param = ctx.request.body;
    // try {
    //   const result = await ctx.service.platform.roleService.addRole(param);
    //   this.success(result);
    // } catch (e) {
    //   ctx.logger.error(e);
    //   this.generalFailure(e);
    // }
  }
}

module.exports = BlockController;