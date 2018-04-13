'use strict';

const {Service} = require('egg');

class TemplateService extends Service {
    /**
     * 新增日志
     * @param none
     * @returns {Number}
     */
    async addTemplate(params) {
        console.log("here is addTemplates")
        const {app} = this;
        try {
            console.log(params)
            return params;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = TemplateService;
