'use strict';

module.exports = app => {
  // const adminAuthentication = app.middleware.adminAuthentication();
  app.router.get(
    'getNginxConfig',
    '/admin/getNginxConfig',
    app.controller.admin.deploymentController.getNginxConfig
  );
};


