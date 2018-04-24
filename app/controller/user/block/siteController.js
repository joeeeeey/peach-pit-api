'use strict';
const Controller = require('./blockController');

const shell = require('shelljs');
const { DEPLOY_FAILED } = require('../../../exception/exceptionCode');
const Exception = require('../../../exception/exception');


class SiteController extends Controller {
  // 获取用户所有 sites
  async getAllSites() {
    const { ctx } = this;
    const { user_id } = ctx.request.query
    const result = await ctx.service.user.block.siteService.getAllSites(parseInt(user_id));
    this.success(result);
  }

  async getSiteById() {
    const { ctx } = this;
    const { id } = ctx.request.query

    const result = await ctx.service.user.block.siteService.getSiteById(parseInt(id));
    this.success(result);
  }

  async getContainerPreviewFileRelativePath() {
    const result = { containerPreviewFileRelativePath: this.app.config.packing.containerPreviewFileRelativePath }
    this.success(result);
  }

  async deploy() {
    const { ctx } = this;
    const { params } = ctx.request.body;

    console.log(params)
    const paramRule = {
      indexFileCode: { type: 'string', required: true, allowEmpty: false },
      userId: { type: 'number', required: true, allowEmpty: false },
    };

    const { indexFileCode, userId } = params
    if (!this.validate(paramRule, params)) return;

    // TODO 获取可用的部署地址，端口，二级域名
    // await ctx.service.user.deploymentService.getAvailableDeployment(parseInt(id));
    // TODO
    // containerProjectPath 应从数据库获取，可用的容器，考虑 docker? 先不急这个问题
    const {
      containerProjectPath,
      containerIndexFileRelativePath
    } = this.app.config.packing

    const containerBuildFileRelativePath = ''

    // shell do
    // 1. 替换 index.html 
    // 2. 执行 npm run build 得到打包完的结果 
    // 3. 执行移动build 到 nginx 指定路径

    // 删除容器中的 index 文件
    await shell.cd(`${containerProjectPath}`);


    await shell.rm(`${containerIndexFileRelativePath}`);

    // 重写 index 
    await shell.exec(`cat >> ${containerIndexFileRelativePath} << EOF 
    ${indexFileCode}
  `);

    // shell.echo("begin build..")
    // TODO read from deployments
    const serverName = 'localhost'
    const port = '4323'
    const nginxDirPath = "/Users/jun/sites/mougerandomzhi"

    const buildResult = await shell.exec('npm run build')

    if (buildResult.code === 0) {
      await shell.mkdir('-p', nginxDirPath)
      const moveDirResult = await shell.exec(`cp -r  build/ ${nginxDirPath}`)
      if (moveDirResult.code === 0) {
        this.success({ siteUrl: serverName + port });
      } else {
        throw new Exception(DEPLOY_FAILED);
      }
    } else {
      throw new Exception(DEPLOY_FAILED);
    }
  }

}
module.exports = SiteController;