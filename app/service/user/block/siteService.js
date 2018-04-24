'use strict';

const { Service } = require('egg');

class SiteService extends Service {
  /**
   * 新增日志
   * @param {}
   * @returns {Number}
   */
  async getAllLayouts(user_id) {
    const { app } = this;
    try {
      const layouts = await this.app.mysql.get('layouts', { user_id: user_id });
      return layout
    } catch (e) {
      throw e;
    }
  }

  async getLayoutById(id) {
    const { app } = this;
    try {
      const layout = await this.app.mysql.get('layouts', { id: id });
      return layout
    } catch (e) {
      throw e;
    }
  }
}

module.exports = SiteService;
