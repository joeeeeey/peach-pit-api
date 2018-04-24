'use strict';
const Controller = require('./baseController');
const shell = require('shelljs');
class DeploymentController extends Controller {

  async getNginxConfig() {
    const { ctx } = this;
    const params = { domainScope: 'internal' }
    const result = await ctx.service.admin.deploymentService.getDeployments(params)
    const { records } = result
    let nginxConfigContent = ''
    for (let i = 0; i < records.length; i++) {
      let dp = records[i]
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

    // !NOTICE
    // shelljs 中 cat 转义的默认行为与在 macos 中不同, 需多加一个 \ 进行转义
    let nginxFile = 'tmp/nginx.conf'
    await shell.exec(`cat > ${nginxFile} << EOF 
    ${nginxConfigContent}
  `);

    this.success({ nginxConfigContent: nginxConfigContent });
  }
}

module.exports = DeploymentController;