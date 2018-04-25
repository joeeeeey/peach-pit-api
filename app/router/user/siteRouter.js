'use strict';

module.exports = app => {
  const userAuthentication = app.middleware.userAuthentication();

  app.get(
    '/getContainerPreviewFileRelativePath',
    '/site/get_container_preview_file_relative_path',
    app.controller.user.block.siteController.getContainerPreviewFileRelativePath
  );

  // 网站部署
  app.post(
    '/deploy_site',
    userAuthentication,
    app.controller.user.block.siteController.deploy
  );

  // 根据模板新建网站
  app.post(
    '/add_site_by_template',
    userAuthentication,
    app.controller.user.block.siteController.addSiteByTemplate
  );

  // 更新 site
  app.post(
    '/update_site',
    userAuthentication,
    app.controller.user.block.siteController.updateSite
  );
  // 删除 site
  app.post(
    '/delete_site',
    userAuthentication,
    app.controller.user.block.siteController.deleteSite
  );

  app.get(
    '/get_site_by_id',
    userAuthentication,
    app.controller.user.block.siteController.getSiteById
  );

  // 获取用户的网站信息
  app.get(
    '/get_user_sites_info',
    userAuthentication,
    app.controller.user.block.siteController.getUserSitesInfo
  );


};
