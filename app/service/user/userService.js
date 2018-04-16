'use strict';

const { Service } = require('egg');

class UserService extends Service {
  /**
   * 新增日志
   * @param none
   * @returns {Number}
   */
  async addUser(data) {
    const { app } = this;
    try {
      const user = {
        login: data.login,
        email: data.email,
        phone: data.phone,
        password: data.password,
        nickname: data.nickname,
        created_at: app.mysql.literals.now,
        updated_at: app.mysql.literals.now
      };
      const result = await app.mysql.insert('users', user);
      
      return  {id: result.insertId, login: user.login, nickname: user.nickname}
    } catch (e) {
      throw e;
    }
  }

  async findUserByLogin(login) {
    const { app } = this;
    try {
      let sqlStr = "select id, login, password, nickname from users where login = ? limit 1"
      const users = await this.app.mysql.query(sqlStr, [login]);
      let user = users[0]
      return  user ? (({ login, id, password, nickname }) => ({ login, id, password, nickname}))(user) : null;
    } catch (e) {
      throw e;
    }
  }

}

module.exports = UserService;
