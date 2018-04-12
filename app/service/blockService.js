'use strict';

const {Service} = require('egg');

class BlockService extends Service {
    /**
     * 新增日志
     * @param none
     * @returns {Number}
     */
    async getAllTemplates(params) {
        console.log("here is getAllTemplates")
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

module.exports = BlockService;
