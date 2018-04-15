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
};
