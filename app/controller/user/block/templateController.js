'use strict';
const Controller = require('./blockController');

class TemplateController extends Controller {
  // 用户获取模板，默认执行 active 为 true
  async getAllTemplates() {
    const { ctx } = this;
    const { params } = ctx.request.body;
    const result = await ctx.service.user.block.templateService.getAllTemplates(params);
    this.success(result);
  }

  async getTemplateById() {
    const { ctx } = this;
    let { id } = ctx.request.query

    const result = await ctx.service.user.block.templateService.getTemplateById(parseInt(id));
    this.success(result);
  }

  async getGroupedTemplate() {
    const { ctx } = this;
    const { params } = ctx.request.body;
    console.log(params)
    // {"groupKey": "categroy"}
    // let { groupKey } = params
    const result = await ctx.service.user.block.templateService.groupTemplate(params);
    this.success(result);
  }  
}

module.exports = TemplateController;