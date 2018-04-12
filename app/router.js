'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
    app.get('/isLive', '/peach_pit_space_api/isLive', app.controller.baseController.isLive);
    // app.get('/getKey', '/ems_api/get_key', app.controller.baseController.getKey);
    // UED资产池管理模块-目录相关
    require('./router/userRouter')(app);
    require('./router/blockRouter')(app);
    // require('./router/siteRouter')(app);
    // UED资产池管理模块-贡献者相关
};
