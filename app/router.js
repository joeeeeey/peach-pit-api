'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
    app.get('/isLive', '/peach_pit_space_api/isLive', app.controller.user.baseController.isLive);

    // admin 路由
    require('./router/admin/adminRouter')(app);
    require('./router/admin/templateRouter')(app);
    require('./router/admin/layoutRouter')(app);
    require('./router/admin/deploymentRouter')(app);
    require('./router/admin/upyunRouter')(app);
        
    // 用户路由
    require('./router/user/userRouter')(app);
    require('./router/user/templateRouter')(app);
    require('./router/user/layoutRouter')(app); 
    require('./router/user/siteRouter')(app);
    require('./router/user/upyunRouter')(app);

    // 打包
    // require('./router/user/deployRouter')(app);
    
    
};
