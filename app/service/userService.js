'use strict';

const {Service} = require('egg');

class UserService extends Service {
    /**
     * 新增日志
     * @param data
     * @returns {Number}
     */
    async test(data={}) {
        console.log("here is service")
        const {app} = this;
        try {
            const bs = await app.mysql.get('bairong_scores', {id: 3});
            console.log(bs)
            return bs;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = UserService;
