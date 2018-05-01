'use strict';

const { Service } = require('egg');

class DeploymentService extends Service {
  async getDeployments(params) {
    const { app } = this;
    try {
      const {limit = 5000, offset = 0} = params
      const results = await this.app.mysql.select('deployments', { 
        where: {domain_scope: params.domainScope},
        orders: [['id', 'asc']], // 排序方式
        limit: limit, // 返回数据量
        offset: offset, // 数据偏移量
      });

      return {records: results}      
    } catch (e) {
      throw e;
    }
  }
}

module.exports = DeploymentService;
