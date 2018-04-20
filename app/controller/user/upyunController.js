
'use strict';
const Controller = require('./baseController');
const tools = require('upyun/tools')
const utils = require('upyun/upyun/utils')

class UpYunController extends Controller {
  async getImgToken() {
    const {ctx} = this
    const { params } = ctx.request.body;

    const {filePath} = params
    const secret = this.app.config.upyun.key
    const saveKey = this.app.config.upyun.savePathPrefix + filePath // 文件保存路径
    const imgUrl = this.app.config.upyun.urlPrefix + saveKey
    const bucket = this.app.config.upyun.bucket
    let opts = {
      'save-key': saveKey,
      'bucket': bucket,
      'expiration': Math.round(new Date().getTime() / 1000) + 3600
    }
    let policy = tools.policy(opts)
    let token = utils.md5sum(policy + '&' + secret)
    this.success({token: token, policy: policy, imgUrl: imgUrl,saveKey: saveKey});
  }  
}

module.exports = UpYunController;