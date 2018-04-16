'use strict';
const Controller = require('../baseController');

class LayoutController extends Controller {
  async addLayout() {
    const { ctx } = this;
    const result = await ctx.service.admin.block.templateService.addTemplate();
    this.success(result);
    // const paramRule = {
    //   name: { type: 'string' },
    //   remark: { type: 'string', required: false, allowEmpty: true },
    //   permissions: { type: 'array' }
    // };
    // if (!this.validate(paramRule)) return;
    // const param = ctx.request.body;
  }  
}

module.exports = LayoutController;