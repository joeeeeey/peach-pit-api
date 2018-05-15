

'use strict';

module.exports = app => {
  // app.get(
  //     '/getImgToken',
  //     '/get_img_token',
  //     app.controller.user.upyunController.getImgToken
  // ); 
  // 得到 token
  app.post(
    '/getImgToken',
    '/get_img_token',
    app.controller.user.upyunController.getImgToken
  )

  // app.get(
  //   '/showFiles',
  //   '/show_files',
  //   app.controller.user.upyunController.showFiles
  // );

  app.post(
    '/showUploadedFiles',
    '/show_uploaded_files',
    app.controller.user.upyunController.showUploadedFiles
  );

  app.get(
    '/showUploadedFiles',
    '/show_uploaded_files',
    app.controller.user.upyunController.showUploadedFiles
  );  
};
