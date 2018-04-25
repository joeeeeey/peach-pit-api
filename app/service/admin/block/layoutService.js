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

  async updateLayout(data) {
    const { app } = this;
    try {
      data.updated_at = app.mysql.literals.now
      const result = await app.mysql.update('layouts', data);
      const updateSuccess = result.affectedRows === 1;
      return { updateSuccess: updateSuccess } 
    } catch (e) {
      throw e;
    }
  }

  async getAllLayouts(param) {
    const { app } = this;
    try {
      const { limit, currentPage, column} = param
      const results = await this.app.mysql.select('layouts', { 
        where: {active: true},
        columns: column, // 要查询的表字段
        orders: [['created_at','desc'], ['id','desc']], // 排序方式
        limit: limit, // 返回数据量
        offset: limit*(currentPage -1), // 数据偏移量
      });     
      const sqlStr = "SELECT COUNT(*) FROM layouts"

      const countResult = await this.app.mysql.query(sqlStr);
      const total = countResult[0]['COUNT(*)']

      return {records: results, total:total}
    } catch (e) {
      throw e;
    }
  }
}

module.exports = LayoutService;
