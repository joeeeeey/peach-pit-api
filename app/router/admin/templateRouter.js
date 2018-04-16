'use strict';

module.exports = app => {
    const adminAuthentication = app.middleware.adminAuthentication();
    // 新增模板
    app.router.post(
        '/admin/add_template',
        adminAuthentication,
        app.controller.admin.block.templateController.addTemplate
    );          
};


