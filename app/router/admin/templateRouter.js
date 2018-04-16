'use strict';

module.exports = app => {
    // 获取板块中的所有模板
    app.post(
        '/addTemplate',
        '/admin/add_template',
        app.controller.admin.block.templateController.addTemplate
    );
};


