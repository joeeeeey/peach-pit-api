"use strict";

const Controller = require("./baseController");
const tools = require("upyun/tools");
const utils = require("upyun/upyun/utils");

class CdnController extends Controller {
  // 得到 basic 文件下上传的路径， /basic/layouts/ /basic/templates/
  // 必填 source
  async getBasicImgToken() {
    // TODO 
    // judge which cdn vendor and use different code.
    const { ctx } = this;

    const { params } = ctx.request.body;
    const { source, fileName } = params;

    const paramRule = {
      fileName: { type: "string", require: true, allowEmpty: false },
      source: { type: "string", require: true, allowEmpty: false }
    };

    if (!this.validate(paramRule, params)) return;
    const uniqFileName = utils.md5sum(fileName + Math.random().toString());
    let filePath = `/basic/${source}/${uniqFileName}`;

    // 以下可以抽离成公共方法
    const secret = this.app.config.upyun.key;
    const saveKey = this.app.config.upyun.savePathPrefix + filePath; // 文件保存路径
    const imgUrl = this.app.config.upyun.urlPrefix + saveKey;
    const bucket = this.app.config.upyun.bucket;
    const imgUploadUrl = this.app.config.upyun.imgUploadUrl;
    let opts = {
      "save-key": saveKey,
      bucket: bucket,
      expiration: Math.round(new Date().getTime() / 1000) + 86400
    };
    let policy = tools.policy(opts);
    let token = utils.md5sum(policy + "&" + secret);
    this.success({
      token: token,
      policy: policy,
      imgUrl: imgUrl,
      saveKey: saveKey,
      imgUploadUrl: imgUploadUrl
    });
  }
}

module.exports = CdnController;
