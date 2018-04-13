'use strict';
const Controller = require('./blockController');

class TemplateController extends Controller {
  async getAllTemplates() {
    const { ctx } = this;
    const result = await ctx.service.user.block.templateService.getAllTemplates();
    this.success(result);
  }

  // async addTemplate() {
  //   const { ctx } = this;
  //   const result = await ctx.service.block.templateService.getAllTemplatesparam();
  //   this.success(result);
  //   // const paramRule = {
  //   //   name: { type: 'string' },
  //   //   remark: { type: 'string', required: false, allowEmpty: true },
  //   //   permissions: { type: 'array' }
  //   // };
  //   // if (!this.validate(paramRule)) return;
  //   // const param = ctx.request.body;
  // }  
}

module.exports = TemplateController;