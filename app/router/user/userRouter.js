'use strict';

module.exports = app => {
    // user 登录
    app.post(
        '/userLogin',
        '/user/login',
        app.controller.user.userController.login
    );
};
