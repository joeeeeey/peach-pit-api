'use strict';
const Controller = require('./blockController');

class LayoutController extends Controller {
  async getAllLayouts() {
    const { ctx } = this;
    const result = await ctx.service.user.block.layoutService.getAllLayouts();
    this.success(result);
  }

  async getLayoutById() {
    const { ctx } = this;
    let { id } = ctx.request.query

    const result = await ctx.service.user.block.layoutService.getLayoutById(parseInt(id));
    this.success(result);
  }
}

module.exports = LayoutController;