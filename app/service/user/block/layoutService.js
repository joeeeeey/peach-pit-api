'use strict';

const { Service } = require('egg');

class LayoutService extends Service {
  /**
   * 新增日志
   * @param {}
   * @returns {Number}
   */
  async getLayouts(conditions) {
    const { app } = this;
    try {
      const results = await this.app.mysql.select('layouts', conditions);
      return { records: results }      
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
