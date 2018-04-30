

'use strict';

module.exports = app => {
    // 获取 basic 路径下的 token
    app.post(
        '/getBasicImgToken',
        '/admin/get_basic_img_token',
        app.controller.admin.upyunController.getBasicImgToken
    ); 
    
    // app.get(
    //     '/getBasicImgToken',
    //     '/get_basic_img_token',
    //     app.controller.admin.upyunController.getBasicImgToken
    // );     
};
