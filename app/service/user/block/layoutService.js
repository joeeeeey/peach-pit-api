'use strict';

const { Service } = require('egg');

class LayoutService extends Service {
  /**
   * 新增日志
   * @param {}
   * @returns {Number}
   */
  async getAllLayouts(params = {}) {
    const { app } = this;
    try {
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

module.exports = LayoutService;
