

'use strict';

module.exports = app => {
  // app.get(
  //     '/getImgToken',
  //     '/get_img_token',
  //     app.controller.user.cdnController.getImgToken
  // ); 
  // 得到 token
  app.post(
    '/getImgToken',
    '/get_img_token',
    app.controller.user.cdnController.getImgToken
  )

  // app.get(
  //   '/showFiles',
  //   '/show_files',
  //   app.controller.user.cdnController.showFiles
  // );

  app.post(
    '/showUploadedFiles',
    '/show_uploaded_files',
    app.controller.user.cdnController.showUploadedFiles
  );

  app.get(
    '/showUploadedFiles',
    '/show_uploaded_files',
    app.controller.user.cdnController.showUploadedFiles
  );  
};
