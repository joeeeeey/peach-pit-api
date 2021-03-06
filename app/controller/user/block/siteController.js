'use strict';
const Controller = require('./blockController');

const shell = require('shelljs');
const { UPDATE_DEP_FAILED, DEPLOY_FAILED, PARAMETER_ERROR, NO_AUTHORITY } = require('../../../exception/exceptionCode');
const Exception = require('../../../exception/exception');

function indexHtmlCode(options = { title: 'MY PAGE' }) {
  return `<!doctype html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height">
      <!-- PWA primary color -->
      <meta name="theme-color" content="#000000">
      <title>${options.title}</title>
      <link rel="shortcut icon" href="%PUBLIC_URL%/images/favicon.ico">
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
  `
}

class SiteController extends Controller {

  // // TODO jwt 认证用户
  async getSiteById() {
    const { ctx } = this;
    const { id } = ctx.request.query

    const result = await ctx.service.user.block.siteService.getSiteById(parseInt(id));
    this.success(result);
  }

  // 获取用户的网站信息
  async getUserSitesInfo() {
    const { ctx } = this;
    const userId = this.userId()
    // tODO 增加 deployment 信息
    let conditions = {
      limit: 1000,
      offset: 0,
      where: { active: true, user_id: userId },
      orders: [['created_at', 'desc']],
    }
    let result = await ctx.service.user.block.siteService.getSites(conditions)
    let { records } = result
    for (let i = 0; i < records.length; i++) {
      const deploymentId = records[i].deployment_id
      if (deploymentId) {
        const deployment = await ctx.service.user.deploymentService.getDeploymentById(deploymentId);
        records[i].deploymentUrl = 'http://' + deployment.url
      }
    }

    this.success(result)
  }

  async deleteSite() {
    // TODO 若有 deployment 要释放
    const { ctx } = this;
    const { params } = ctx.request.body;
    const { siteId } = params

    const site = await ctx.service.user.block.siteService.getSiteById(siteId);
    const deploymentId = site.deployment_id
    // let deployment = null

    if (deploymentId) {
      let deployment = await ctx.service.user.deploymentService.getDeploymentById(deploymentId);

      deployment.available = true
      deployment.user_id = null

      const updateDepResult = await ctx.service.user.deploymentService.updateDeployment(deployment)
      if (!updateDepResult.updateSuccess) {
        throw new Exception(UPDATE_DEP_FAILED);
      }
    }

    const result = await ctx.service.user.block.siteService.deleteSite({ id: siteId })

    this.success(result)
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

    if (decodeResult.code !== 0) {
      throw new Exception(NO_AUTHORITY);
    }

    const userId = decodeResult.decoded.data.id

    const paramRule = {
      siteId: { type: 'number', required: true, allowEmpty: false },
      indexFileCode: { type: 'string', required: true, allowEmpty: false },
    };

    // 已经部署的 site 则取出该 deployment
    if (!this.validate(paramRule, params)) return;
    const { indexFileCode, siteId } = params
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

    // TODO
    // containerProjectPath 应从数据库获取，可用的容器，考虑 docker? 先不急这个问题
    const {
      containerProjectPath,
      containerIndexJsFileRelativePath,
      containerIndexHtmlFileRelativePath,
    } = this.app.config.packing

    // const containerBuildFileRelativePath = ''

    // shell do
    // 1. 替换 index.html 
    // 2. 执行 npm run build 得到打包完的结果 
    // 3. 执行移动build 到 nginx 指定路径

    // 删除容器中的 index.js 文件
    await shell.cd(`${containerProjectPath}`);

    await shell.rm(`${containerIndexJsFileRelativePath}`);

    // 重写 index.js
    // !NOTICE
    // shelljs 中 cat 转义的默认行为与在 macos 中不同, 需多加一个 \ 进行转义
    // 此处转义前代码在前端生成
    await shell.exec(`cat >> ${containerIndexJsFileRelativePath} << EOF 
    ${indexFileCode}`
    )

    // 删除容器中的 index.html 文件
    await shell.rm(`${containerIndexHtmlFileRelativePath}`);
    // 重写 index.html
    await shell.exec(`cat > ${containerIndexHtmlFileRelativePath} << EOF 
      ${indexHtmlCode({ title: site.name })}`
    )


    // shell.echo("begin build..")

    const { domain, port, folder_location } = deployment
    const buildResult = await shell.exec('npm run build')

    if (buildResult.code === 0) {
      await shell.mkdir('-p', folder_location)
      // !! cp -r 指令 macos 与 linux 不同
      // macos 下 cp -r a/ b 则 b 下不会包含 a 文件夹名
      // linux 下 需要 cp -r a/* b 才能达到相同功效
      // this.app.config.env
      // 此处用 环境判断
      const stupidCp = this.app.config.env === 'pro' ? '*' : ''
      const moveDirResult = await shell.exec(`cp -r  build/${stupidCp} ${folder_location}`)
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


  // https://stackoverflow.com/questions/18681595/tar-a-directory-but-dont-store-full-absolute-paths-in-the-archive
  // tar -czvf /Users/jun/compress_sites/4afda6b9e.tar.gz  -C /Users/jun/sites/4afda6b9e .
  // 压缩文件
  // 目前前端以 nginx 发布压缩文件目录的方式提供给前端下载
  // TODO 回传给前端流文件，前端生成新的文件并下载
  async compressStaticFile() {
    const { ctx } = this;
    const { params } = ctx.request.body;

    const paramRule = {
      siteId: { type: 'number', required: true, allowEmpty: false },
    };

    if (!this.validate(paramRule, params)) return;
    const { siteId } = params

    // const siteId = 38
    const site = await ctx.service.user.block.siteService.getSiteById(siteId);
    const deploymentId = site.deployment_id

    if (!deploymentId) { throw new Exception(NO_AUTHORITY) }

    const deployment = await ctx.service.user.deploymentService.getDeploymentById(deploymentId);
    const staticFileDir = deployment.folder_location
    const fileName = staticFileDir.split('/').slice(-1)[0] // 取出最后一个值

    const {
      compressLocation,
      nginxCompressedFileServerPath,
    } = this.app.config.compress

    const compressedFileName = `${fileName}.tar.gz`

    // 进行存放压缩文件的目录
    await shell.cd(`${compressLocation}`);
    await shell.rm(`${compressedFileName}`);

    const compressResult = await shell.exec(`tar -czvf ${compressedFileName} -C ${staticFileDir} .`)

    if(compressResult.code === 0){
      this.success({
        compressedFileName: compressedFileName,
        compressedFilePath: `${nginxCompressedFileServerPath}/${compressedFileName}`})
    }else{
      throw new Exception({code: 30312312, msg: compressResult.stderr})
    }
  }
}
module.exports = SiteController;