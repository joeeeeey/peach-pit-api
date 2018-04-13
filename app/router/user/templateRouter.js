'use strict';

module.exports = app => {
    // 获取板块中的所有模板
    app.get(
        '/getAllTemplates',
        '/templates/get_all_templates',
        app.controller.user.block.templateController.getAllTemplates
    );
};
