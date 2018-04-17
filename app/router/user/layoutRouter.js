'use strict';

module.exports = app => {
    // 获取板块中的所有模板
    app.get(
        '/getAllLayouts',
        '/get_all_layouts',
        app.controller.user.block.layoutController.getAllLayouts
    );

    app.get(
        '/getAllLayouts',
        '/get_layout_by_id',
        app.controller.user.block.layoutController.getLayoutById
    );    
};
