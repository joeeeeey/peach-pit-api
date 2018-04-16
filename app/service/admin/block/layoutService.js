'use strict';

const { Service } = require('egg');

class LayoutService extends Service {
  /**
   * 新增日志
   * @param none
   * @returns {Number}
   */
  async addLayout(data) {
    const { app } = this;
    try {
      const layout = {
        name: data.name,
        data: data.data,
        created_at: app.mysql.literals.now
      };
      const result = await app.mysql.insert('layouts', layout);

      return { id: result.insertId } 
    } catch (e) {
      throw e;
    }
  }
}

module.exports = LayoutService;
