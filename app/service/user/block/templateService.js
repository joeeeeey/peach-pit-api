'use strict';

const { Service } = require('egg');

class TemplateService extends Service {
  /**
   * 新增日志
   * @param {}
   * @returns {Number}
   */
  async getAllTemplates(params = {}) {
    const { app } = this;
    try {
    } catch (e) {
      throw e;
    }
  }

  async getTemplateById(id) {
    const { app } = this;
    try {
      const template = await this.app.mysql.get('templates', { id: id });
      return template
    } catch (e) {
      throw e;
    }
  }
}

module.exports = TemplateService;
