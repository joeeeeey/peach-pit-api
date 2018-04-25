'use strict';
const Controller = require('./blockController');

const shell = require('shelljs');
const { DEPLOY_FAILED, PARAMETER_ERROR, NO_AUTHORITY } = require('../../../exception/exceptionCode');
const Exception = require('../../../exception/exception');

class SiteController extends Controller {
  // 获取用户所有 sites
  // TODO jwt 认证用户
  async getAllSites() {
    const { ctx } = this;
    const { user_id } = ctx.request.query
    const result = await ctx.service.user.block.siteService.getAllSites(parseInt(user_id));
    this.success(result);
  }

  // TODO jwt 认证用户
  async getSiteById() {
    const { ctx } = this;
    const { id } = ctx.request.query

    const result = await ctx.service.user.block.siteService.getSiteById(parseInt(id));
    this.success(result);
  }

  async updateSite() {
    const { ctx } = this;
    const { params } = ctx.request.body;

    if (!params.id) {
      throw new Exception(PARAMETER_ERROR);
    }

    const result = await ctx.service.user.block.siteService.updateSite(params);
    this.success(result);
  }

  async getContainerPreviewFileRelativePath() {
    const result = { containerPreviewFileRelativePath: this.app.config.packing.containerPreviewFileRelativePath }
    this.success(result);
  }

  // TODO jwt 认证用户
  async addSiteByTemplate() {
    const { ctx } = this;
    const { params } = ctx.request.body;
    const paramRule = {
      templateId: { type: 'number', required: true, allowEmpty: false },
      userId: { type: 'number', required: true, allowEmpty: false },
    };


    if (!this.validate(paramRule, params)) return;

    const { templateId, userId } = params
    const template = await ctx.service.user.block.templateService.getTemplateById(templateId)

    let data = {
      user_id: userId,
      name: template.name,
      template_id: template.id,
      data: template.data,
    }

    const result = await ctx.service.user.block.siteService.addSite(data);

    this.success(result)
  }

  async deploy() {
    const { ctx } = this;
    const { params } = ctx.request.body;

    const jwt = ctx.cookies.get('jwt')

    if (jwt === null || jwt === "") {
      throw new Exception(NO_AUTHORITY);
    }

    const decodeResult = this.jwtDecode(jwt, ctx.app.config.jwt_secret)
    // console.log(decodeResult)

    if (decodeResult.code !== 0) {
      throw new Exception(NO_AUTHORITY);
    }

    const userId = decodeResult.decoded.data.id

    const paramRule = {
      siteId: { type: 'number', required: true, allowEmpty: false },
      indexFileCode: { type: 'string', required: true, allowEmpty: false },
    };

    console.log(params)

    // TODO 根据 siteId 得到 user deployment
    // 已经部署的 site 则取出该 deployment
    // 
    if (!this.validate(paramRule, params)) return;
    const { indexFileCode, siteId } = params
    console.log(siteId)
    const site = await ctx.service.user.block.siteService.getSiteById(siteId);
    const deploymentId = site.deployment_id
    let deployment = null

    if (deploymentId) {
      deployment = await ctx.service.user.deploymentService.getDeploymentById(deploymentId);
      // deployment = 
    } else {
      let conditions = {
        limit: 1,
        offset: 0,
        where: { available: true },
        orders: [['id', 'asc']],
      }
      deployment = await ctx.service.user.deploymentService.getDeployment(conditions)
    }
    console.log(deployment)

    // return this.success({})
    // TODO 获取可用的部署地址，端口，二级域名
    // await ctx.service.user.deploymentService.getAvailableDeployment(parseInt(id));
    // TODO
    // containerProjectPath 应从数据库获取，可用的容器，考虑 docker? 先不急这个问题
    const {
      containerProjectPath,
      containerIndexFileRelativePath
    } = this.app.config.packing

    // const containerBuildFileRelativePath = ''

    // shell do
    // 1. 替换 index.html 
    // 2. 执行 npm run build 得到打包完的结果 
    // 3. 执行移动build 到 nginx 指定路径

    // 删除容器中的 index 文件
    await shell.cd(`${containerProjectPath}`);

    await shell.rm(`${containerIndexFileRelativePath}`);

    // 重写 index 
    // !NOTICE
    // shelljs 中 cat 转义的默认行为与在 macos 中不同, 需多加一个 \ 进行转义
    // 此处转义前代码在前端生成
    await shell.exec(`cat >> ${containerIndexFileRelativePath} << EOF 
    ${indexFileCode}
  `);

    // shell.echo("begin build..")
    // TODO read from deployments
    // deployment
    const { domain, port, folder_location } = deployment
    // const serverName = 'localhost'
    // const port = '4323'
    // const nginxDirPath = "/Users/jun/sites/mougerandomzhi"

    const buildResult = await shell.exec('npm run build')

    if (buildResult.code === 0) {
      await shell.mkdir('-p', folder_location)
      const moveDirResult = await shell.exec(`cp -r  build/ ${folder_location}`)
      if (moveDirResult.code === 0) {
        // update deployment and site
        deployment.available = false
        deployment.user_id = userId
        // TODO 使用事务?
        const updateDepResult = await ctx.service.user.deploymentService.updateDeployment(deployment)
        if (updateDepResult.updateSuccess) {
          const updateSiteResult = await ctx.service.user.block.siteService.updateSite(
            {
              id: site.id,
              deployment_id: deployment.id
            }
          );
          if (updateSiteResult.updateSuccess) {
            // 部署功能只会发生在内部域名, 所以此处取内部域名的配置
            const httpPrefix = this.app.config.deployment.internalScopeDomianUseSSL ? 'https://' : 'http://'

            this.success({ siteUrl: httpPrefix + domain + ':' + port });
          }
        }
      } else {
        throw new Exception(DEPLOY_FAILED);
      }
    } else {
      throw new Exception(DEPLOY_FAILED);
    }
  }

}
module.exports = SiteController;