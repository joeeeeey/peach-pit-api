'use strict';

module.exports = app => {
   
    // 用户获取所有样式
    app.post(
        '/getAllLayouts',
        '/get_all_layouts',
        app.controller.user.block.layoutController.getAllLayouts
    );

    // app.get(
    //     '/getAllLayouts',
    //     '/get_layout_by_id',
    //     app.controller.user.block.layoutController.getLayoutById
    // );    
};
