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

  async getAllLayouts(param) {
    const { app } = this;
    try {
      const { limit, currentPage} = param
      const results = await this.app.mysql.select('layouts', { // 搜索 post 表
        columns: ['id', 'name', 'thumbnail_url', 'created_at'], // 要查询的表字段
        orders: [['created_at','desc'], ['id','desc']], // 排序方式
        limit: limit, // 返回数据量
        offset: limit*(currentPage -1), // 数据偏移量
      });     
      return results
    } catch (e) {
      throw e;
    }
  }
}

module.exports = LayoutService;
