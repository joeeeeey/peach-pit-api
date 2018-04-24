'use strict';

module.exports = {
  keys: 'pps_1523536800402_9097',
  security: {
    csrf: false
  },
  mysql: {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '',
      database: 'taohe_development'
    }
  },
  middleware: ['catchError'],
  jwt_secret: "XInJiZhengBAWanDEFEIQI041418",
  app_key: "yOnGShaKeyHaoNe3387",
  domian: 'localhost',
  // CDN 配置
  upyun: {
    imgUploadUrl: "http://v0.api.upyun.com/blog-src/",
    bucket: 'blog-src',
    key: 'ZvmSM4XlWxmvJ6th7K9HR2BjXH0=',
    admin: 'admin2',
    password: 'jj930328',
    urlPrefix: 'http://blog-src.b0.upaiyun.com', // 图片上传成功后的地址前缀
    // saveKey: '/taohe/development',
    savePathPrefix: '/taohe/dev', // 保存图片的环境, 生产模式应为 production
  },
  // 打包配置
  packing: {
    containerPreviewFileRelativePath: '../components/preview/',
    containerProjectPath: '/Users/jun/ppsapce/pack-container', // 打包项目目录
    containerIndexFileRelativePath: 'src/pages/index.js ', // 打包项目中 index 目录
  }
};
