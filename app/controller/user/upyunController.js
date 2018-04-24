
'use strict';
const Controller = require('./baseController');
const tools = require('upyun/tools')
const utils = require('upyun/upyun/utils')
class UpYunController extends Controller {
  // 得到文件上传的路径
  // 必填 role roleId page filename 
  async getImgToken() {
    const { ctx } = this
    const { params } = ctx.request.body;

    // role: user admin
    // roleId: 在 role 是 admin 或者 user 的 id
    // page: 所在的页面 可能是 editPage
    const { role, roleId, source, sourceId, fileName, page } = params

    const paramRule = {
      role: { type: 'string', require: true, allowEmpty: false },
      roleId: { type: 'number', require: true, allowEmpty: false },
      fileName: { type: 'string', require: true, allowEmpty: false },
      page: { type: 'string', require: true, allowEmpty: false },
      source: { type: 'string', require: false, allowEmpty: true },
      sourceId: { type: 'string', require: false, allowEmpty: true },
    };

    const uniqFileName = utils.md5sum(fileName + (Math.random().toString()))
    let filePath = `/${page}/${role}/${roleId}${source ? ('/' + source) : ''}${sourceId ? ('/' + sourceId) : ''}/${uniqFileName}`
    if (!this.validate(paramRule, params)) return;

    const secret = this.app.config.upyun.key
    const saveKey = this.app.config.upyun.savePathPrefix + filePath // 文件保存路径
    const imgUrl = this.app.config.upyun.urlPrefix + saveKey
    const bucket = this.app.config.upyun.bucket
    const imgUploadUrl = this.app.config.upyun.imgUploadUrl
    let opts = {
      'save-key': saveKey,
      'bucket': bucket,
      'expiration': Math.round(new Date().getTime() / 1000) + 86400
    }
    let policy = tools.policy(opts)
    let token = utils.md5sum(policy + '&' + secret)
    this.success({
      token: token, policy: policy,
      imgUrl: imgUrl, saveKey: saveKey,
      imgUploadUrl: imgUploadUrl,
    });
  }
}

module.exports = UpYunController;