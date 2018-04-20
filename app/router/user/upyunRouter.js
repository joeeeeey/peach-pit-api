

'use strict';

module.exports = app => {
    // 获取板块中的所有模板
    app.get(
        '/getImgToken',
        '/get_img_token',
        app.controller.user.upyunController.getImgToken
    ); 
    
    app.post(
      '/getImgToken',
      '/get_img_token',
      app.controller.user.upyunController.getImgToken
  );     
};
