'use strict';
const Controller = require('./blockController');

class TemplateController extends Controller {
  async getAllTemplates() {
    const { ctx } = this;
    const result = await ctx.service.user.block.templateService.getAllTemplates();
    this.success(result);
  }

  async getTemplateById() {
    const { ctx } = this;
    let { id } = ctx.request.query

    const result = await ctx.service.user.block.templateService.getTemplateById(parseInt(id));
    this.success(result);
  }
}

module.exports = TemplateController;