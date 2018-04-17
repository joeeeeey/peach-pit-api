'use strict';

const { Service } = require('egg');

class TemplateService extends Service {
  /**
   * 新增日志
   * @param {}
   * @returns {Number}
   */
  async addTemplate(data) {
    const { app } = this;
    try {
      const template = {
        name: data.name,
        data: data.data,
        thumbnail_url: data.thumbnail_url,
        created_at: app.mysql.literals.now
      };
      const result = await app.mysql.insert('templates', template);

      return { id: result.insertId } 
    } catch (e) {
      throw e;
    }
  }

  async getAllTemplates(param) {
    const { app } = this;
    try {
      const { limit, currentPage} = param
      const results = await this.app.mysql.select('templates', { // 搜索 post 表
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

module.exports = TemplateService;
