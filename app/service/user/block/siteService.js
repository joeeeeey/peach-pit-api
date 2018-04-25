'use strict';

const { Service } = require('egg');

class SiteService extends Service {
  /**
   * 新增日志
   * @param {}
   * @returns {Number}
   */

  async addSite(data) {
    const { app } = this;
    try {
      const site = {
        user_id: data.user_id,
        name: data.name,
        template_id: data.template_id,
        deployment_id: data.deployment_id,
        data: data.data,
        created_at: app.mysql.literals.now
      };
      const result = await app.mysql.insert('sites', site);

      return { id: result.insertId }
    } catch (e) {
      throw e;
    }
  }

  async updateSite(data) {
    const { app } = this;
    try {
      data.updated_at = app.mysql.literals.now
      const result = await app.mysql.update('sites', data);
      const updateSuccess = result.affectedRows === 1;
      return { updateSuccess: updateSuccess }
    } catch (e) {
      throw e;
    }
  }

  async deleteSite(data){
    const { app } = this;
    try {
      const result = await this.app.mysql.delete('sites', data);
      const success = result.affectedRows === 1;
      return { deleteSuccess: success }
    } catch (e) {
      throw e;
    }
  }

  async getAllSites(user_id) {
    const { app } = this;
    try {
      const sites = await this.app.mysql.get('sites', { user_id: user_id });
      return site
    } catch (e) {
      throw e;
    }
  }

  async getSites(conditions) {
    const { app } = this;
    try {
      const results = await this.app.mysql.select('sites', conditions);
      return { records: results }
    } catch (e) {
      throw e;
    }
  }
  


  async getSiteById(id) {
    const { app } = this;
    try {
      const site = await this.app.mysql.get('sites', { id: id });
      return site
    } catch (e) {
      throw e;
    }
  }
}

module.exports = SiteService;
