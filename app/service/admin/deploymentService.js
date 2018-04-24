'use strict';

const { Service } = require('egg');

class DeploymentService extends Service {
  async getDeployments(params) {
    const { app } = this;
    try {
      const results = await this.app.mysql.select('deployments', { 
        where: {domain_scope: params.domainScope},
        orders: [['created_at', 'desc'], ['id', 'desc']], // 排序方式
        limit: 100000, // 返回数据量
        offset: 0, // 数据偏移量
      });

      return {records: results}      
    } catch (e) {
      throw e;
    }
  }
}

module.exports = DeploymentService;
