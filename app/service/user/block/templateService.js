'use strict';

const { Service } = require('egg');

class TemplateService extends Service {
  /**
   * 新增日志
   * @param {}
   * @returns {Number}
   */
  async getAllTemplates(params) {
    // const { app } = this;
    let {
      orders = [['created_at', 'desc'], ['id', 'desc']],
      limit = 10,
      currentPage = 1,
      whereClause,
      columns,
    } = params

    whereClause = whereClause ? Object.assign(whereClause, { active: true }) : { active: true }
    let conditions = { where: whereClause, orders: orders, limit: limit, offset: limit * (currentPage - 1) }
    if (columns) {
      Object.assign(conditions, { columns: columns })
    }

    try {
      const results = await this.app.mysql.select('templates', conditions);
      return { records: results }
    } catch (e) {
      throw e;
    }
  }

  async groupTemplate(params) {
    let { groupKey } = params
    // TODO 防止 SQL 注入? 去掉 ';'?
    let sqlStr = `select ${groupKey}, COUNT(*) as number FROM templates group by ${groupKey}`
    const result = await this.app.mysql.query(sqlStr);
    return result 
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
