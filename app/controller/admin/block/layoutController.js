'use strict';
const Controller = require('../baseController');

class LayoutController extends Controller {
  async addLayout() {
    const { ctx } = this;
    const { params } = ctx.request.body;

    const paramRule = {
      name: { type: 'string', required: true, allowEmpty: false },
      data: { type: 'string', required: true, allowEmpty: false },
    };

    if (!this.validate(paramRule, params)) return;

    const result = await ctx.service.admin.block.layoutService.addLayout(params);

    this.success(result);
  }

  async updateLayout() {
    const { ctx } = this;
    const { params } = ctx.request.body;

    // const paramRule = {
    //   name: { type: 'string', required: false, allowEmpty: true },
    //   data: { type: 'string', required: false, allowEmpty: true },
    // };

    // if (!this.validate(paramRule, params)) return;
    const result = await ctx.service.admin.block.layoutService.updateLayout(params);
    this.success(result);
  }

  async getAllLayouts() {
    const { ctx } = this;
    let defaultColumns = 'id,name,thumbnail_url,data,created_at,category'
    const { limit = 10, currentPage = 1, column = defaultColumns } = ctx.request.query

    const queryParams = {
      limit: parseInt(limit),
      currentPage: parseInt(currentPage),
      column: column.split(',')
    }
    const result = await ctx.service.admin.block.layoutService.getAllLayouts(queryParams);
    this.success(result);
  }
}

module.exports = LayoutController;