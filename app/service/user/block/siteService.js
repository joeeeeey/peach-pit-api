'use strict';

const { Service } = require('egg');

class SiteService extends Service {
  /**
   * 新增日志
   * @param {}
   * @returns {Number}
   */
  async getAllSites(user_id) {
    const { app } = this;
    try {
      const sites = await this.app.mysql.get('sites', { user_id: user_id });
      return site
    } catch (e) {
      throw e;
    }
  }

  async getSiteById(id) {
    const { app } = this;
    try {
      const site = await this.app.mysql.get('sites', { id: id });
      return site
    } catch (e) {
      throw e;
    }
  }
}

module.exports = SiteService;
