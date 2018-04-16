'use strict';

module.exports = app => {
    // 获取板块中的所有模板
    app.post(
        '/addLayout',
        '/admin/add_layout',
        app.controller.admin.block.layoutController.addLayout
    );
};


