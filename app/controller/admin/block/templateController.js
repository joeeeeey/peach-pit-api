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
}

module.exports = TemplateController;