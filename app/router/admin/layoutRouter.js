'use strict';

module.exports = app => {
  const adminAuthentication = app.middleware.adminAuthentication();
  // 新增样式
  app.router.post(
    '/admin/add_layout',
    adminAuthentication,
    app.controller.admin.block.layoutController.addLayout
  );
};


