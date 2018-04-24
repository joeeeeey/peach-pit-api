'use strict';

module.exports = app => {

    app.get(
        '/getContainerPreviewFileRelativePath',
        '/site/get_container_preview_file_relative_path',
        app.controller.user.block.siteController.getContainerPreviewFileRelativePath
      );
    
      // 获取板块中的所有模板
      app.post(
        '/deploy',
        '/site/deploy',
        app.controller.user.block.siteController.deploy
      );

    // app.post('/addCatalog', '/ems_api/ued/v1/add_catalog', app.controller.ued.catalogController.addCatalog);
    // app.post('/updateCatalog', '/ems_api/ued/v1/update_catalog', app.controller.ued.catalogController.updateCatalog);
    // app.post('/removeCatalog', '/ems_api/ued/v1/remove_catalog', app.controller.ued.catalogController.removeCatalog);
    // app.post('/moveCatalog', '/ems_api/ued/v1/move_catalog', app.controller.ued.catalogController.moveCatalog);
    // app.get('/getAllCatalogs', '/ems_api/ued/v1/get_catalogs', app.controller.ued.catalogController.getAllCatalogs);
};
