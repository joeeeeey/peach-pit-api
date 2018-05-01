'use strict';
const Controller = require('./baseController');
const shell = require('shelljs');
class DeploymentController extends Controller {
  async getNginxConfig() {
    const { ctx } = this;
    const params = { domainScope: 'internal' }
    // TODO 得到 counts 从去书库中用 limit offset 分批取出
    const result = await ctx.service.admin.deploymentService.getDeployments(params)
    const { records } = result

    // 如果 cat 一个太大的字符串会爆炸 分批操作
    const batchNumber = 100
    // 向上取整 Example: 0.45 => 1 
    const counts = Math.ceil(records.length/batchNumber) 
    for(let i = 0; i < counts; i++){
      let batchDeployments = records.slice(batchNumber*i, (batchNumber*(i+1) - 1))
      let nginxConfigContent = ''
      for (let j = 0; j < batchDeployments.length; j++) {
        let dp = batchDeployments[j]
        nginxConfigContent += `
server {
  listen       ${dp.port};
  server_name  ${dp.domain};

  charset utf-8;

  location / {
      root ${dp.folder_location};
      index index.html;
      try_files \\$uri /index.html;

  }

  location @router {
      rewrite ^.*$ /index.html last;
  }
} 
`        
       }

      let operator = i === 0 ? '>' : '>>'
      // !NOTICE
      // shelljs 中 cat 转义的默认行为与在 macos 中不同, 需多加一个 \ 进行转义
      let nginxFile = 'tmp/nginx.conf'
      await shell.exec(`cat ${operator} ${nginxFile} << EOF 
      ${nginxConfigContent}
    `);
    }

    this.success({ a: 1 });
  }
}

module.exports = DeploymentController;