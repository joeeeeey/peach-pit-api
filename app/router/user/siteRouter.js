'use strict';

module.exports = app => {
  app.get(
    '/getContainerPreviewFileRelativePath',
    '/site/get_container_preview_file_relative_path',
    app.controller.user.block.siteController.getContainerPreviewFileRelativePath
  );

  // 网站部署
  app.post(
    '/deploy',
    '/deploy_site',
    app.controller.user.block.siteController.deploy
  );

  // 根据模板新建网站
  app.post(
    '/addSiteByTemplate',
    '/add_site_by_template',
    app.controller.user.block.siteController.addSiteByTemplate
  );

  // 更新 site
  app.post(
    '/updateSite',
    '/update_site',
    app.controller.user.block.siteController.updateSite
  );

  

  app.get(
    '/getSiteById',
    '/get_site_by_id',
    app.controller.user.block.siteController.getSiteById
  );
};
