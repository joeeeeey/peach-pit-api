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
      database: 'taohe_default'
    }
  },
  middleware: ['catchError'],
  jwt_secret: "jwt_secret",
  app_key: "yOnGShaKeyHaoNe3387",
  domian: 'localhost', // 主项目部署域名
  deployment: {
    internalScopeDomianUseSSL: false // 内部域名使用 https ?
  },
  // CDN 配置
  cnd: {
    vender: 'upyun' // TODO It should be configurable.
  },
  // 又拍云 cnd 的配置
  upyun: {
    endpoint: "https://v0.api.upyun.com",
    imgUploadUrl: "https://v0.api.upyun.com/bucket/",
    bucket: 'bucket',
    key: 'bucket-key',
    admin: 'bucket-admin',
    password: 'bucket-admin-password',
    urlPrefix: 'https://blog-src.b0.upaiyun.com', // 图片上传成功后的地址前缀
    savePathPrefix: '/taohe/dev', // 保存图片的环境, 生产模式应为 production
  },
  // 打包配置
  packing: {
    containerPreviewFileRelativePath: '../components/preview/',
    containerProjectPath: `${process.env.HOME}/ppsapce/pack-container`, // 打包项目目录
    containerIndexJsFileRelativePath: 'src/pages/index.js ', // 打包项目中 index js 目录
    containerIndexHtmlFileRelativePath: 'public/index.html ', // 打包项目中 index 目录
  },
  // 压缩文件的选项
  // TODO 和 deployment 中的 folder_location 结合起来，修改 folder_location 的逻辑?
  compress: {
    compressLocation: `${process.env.HOME}/compressed_sites`,
    nginxCompressedFileServerPath: 'http://localhost:7788',
  },
  env: 'dev'
};
