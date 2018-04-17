'use strict';

module.exports = app => {
    const adminAuthentication = app.middleware.adminAuthentication();
    // 新增模板
    app.router.post(
        '/admin/add_template',
        adminAuthentication,
        app.controller.admin.block.templateController.addTemplate
    );

    app.router.post(
        '/admin/update_template',
        adminAuthentication,
        app.controller.admin.block.templateController.updateTemplate
    );    
        
    app.router.get(
        '/admin/get_all_templates',
        adminAuthentication,
        app.controller.admin.block.templateController.getAllTemplates
    );
};


