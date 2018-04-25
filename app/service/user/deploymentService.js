'use strict';

const { Service } = require('egg');

class DeploymentService extends Service {
  async getDeploymentById(id) {
    const { app } = this;
    try {
      const deployment = await this.app.mysql.get('deployments', { id: id });
      return deployment
    } catch (e) {
      throw e;
    }
  }

  async getDeployments(conditions) {
    const { app } = this;
    try {
      const results = await this.app.mysql.select('deployments', conditions);
      return { records: results }      
    } catch (e) {
      throw e;
    }
  }

  async getDeployment(conditions) {
    const { app } = this;
    try {
      const results = await this.app.mysql.select('deployments', conditions);
      console.log(results)
      return results[0]
    } catch (e) {
      throw e;
    }
  }

  async updateDeployment(data) {
    const { app } = this;
    try {
      data.updated_at = app.mysql.literals.now
      const result = await app.mysql.update('deployments', data);
      const updateSuccess = result.affectedRows === 1;
      return { updateSuccess: updateSuccess } 
    } catch (e) {
      throw e;
    }
  }  

}

module.exports = DeploymentService;
