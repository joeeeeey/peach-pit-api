'use strict';

module.exports = app => {
    // admin 登录
    app.post(
        '/adminLogin',
        '/admin/login',
        app.controller.admin.adminController.login
    );
};
