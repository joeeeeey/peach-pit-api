'use strict';
const Controller = require('../baseController');

class TemplateController extends Controller {
  async addTemplate() {
    const { ctx } = this;
    const { params } = ctx.request.body;
 
    const paramRule = {
      name: { type: 'string', required: true, allowEmpty: false },
      data: { type: 'string', required: true, allowEmpty: false },
    };
    
    if (!this.validate(paramRule, params)) return;    
    const result = await ctx.service.admin.block.templateService.addTemplate(params);
    this.success(result);
  }  

  async updateTemplate() {
    const { ctx } = this;
    const { params } = ctx.request.body;
    const result = await ctx.service.admin.block.templateService.updateTemplate(params);
    this.success(result);
  }  

  async getAllTemplates() {
    const { ctx } = this;
    const { limit = 10, currentPage = 1} = ctx.request.query
    const queryParams = {limit: parseInt(limit), currentPage: parseInt(currentPage)}
    const result = await ctx.service.admin.block.templateService.getAllTemplates(queryParams);
    this.success(result);
  }  
 
}

module.exports = TemplateController;