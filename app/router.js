'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
    app.get('/isLive', '/peach_pit_space_api/isLive', app.controller.user.baseController.isLive);
    // app.get('/getKey', '/ems_api/get_key', app.controller.baseController.getKey);
    // 用户路由
    require('./router/user/userRouter')(app);
    require('./router/user/templateRouter')(app);
    require('./router/user/siteRouter')(app);
    // admin 路由
    require('./router/admin/adminRouter')(app);
    require('./router/admin/templateRouter')(app);
};
