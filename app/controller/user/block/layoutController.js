'use strict';
const Controller = require('./blockController');

class LayoutController extends Controller {
  async getAllLayouts() {
    const { ctx } = this;
    const { params } = ctx.request.body;

    let conditions = {
      limit: 100,
      where: {active: true, is_public: true},
      orders: [['created_at', 'desc'], ['id', 'desc']],
      offset: 0,
    }

    const result = await ctx.service.user.block.layoutService.getLayouts(conditions);
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