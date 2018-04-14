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
      console.log(user)
      return  (({ login }) => ({ login }))(user);
    } catch (e) {
      throw e;
    }
  }

}

module.exports = UserService;
