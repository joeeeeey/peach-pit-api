'use strict';

const { Service } = require('egg');

class AdminService extends Service {
  async findAdminByLogin(login) {
    const { app } = this;
    try {
      let sqlStr = "select id, login, password, nickname, secret_key from administrators where login = ? limit 1"
      const administrators = await this.app.mysql.query(sqlStr, [login]);
      let administrator = administrators[0]
      return  administrator ? (({secret_key, login, id, password, nickname }) => ({secret_key, login, id, password, nickname}))(administrator) : null;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = AdminService;
