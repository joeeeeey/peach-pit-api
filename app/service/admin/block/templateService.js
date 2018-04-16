'use strict';

const { Service } = require('egg');

class TemplateService extends Service {
  /**
   * 新增日志
   * @param none
   * @returns {Number}
   */
  async addTemplate(data) {
    const { app } = this;
    try {
      const template = {
        name: data.name,
        data: data.data,
        created_at: app.mysql.literals.now
      };
      const result = await app.mysql.insert('templates', template);

      return { id: result.insertId } 
    } catch (e) {
      throw e;
    }
  }


}

module.exports = TemplateService;
