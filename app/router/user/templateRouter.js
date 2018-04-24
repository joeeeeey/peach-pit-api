'use strict';

module.exports = app => {
    // 获取板块中的所有模板
    app.post(
        '/getAllTemplates',
        '/get_all_templates',
        app.controller.user.block.templateController.getAllTemplates
    );

    app.get(
        '/getAllTemplates',
        '/get_template_by_id',
        app.controller.user.block.templateController.getTemplateById
    );    

    app.post(
        '/getGroupedTemplate',
        '/get_grouped_template',
        app.controller.user.block.templateController.getGroupedTemplate
    );    
    
};
