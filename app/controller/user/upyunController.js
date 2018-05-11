
'use strict';
const Controller = require('./baseController');
const tools = require('upyun/tools')
const utils = require('upyun/upyun/utils')
const UpYun = require('upyun');
const upYunUtil = require('../../utils/upyun')
const axios = require('axios')
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

  async showFiles() {
    const { ctx } = this
    const { params } = ctx.request.body;
    const bucket = this.app.config.upyun.bucket
    const operator = this.app.config.upyun.admin
    const password = this.app.config.upyun.password
    const endpoint = this.app.config.upyun.endpoint


    const upyun = new UpYun(bucket, operator, password, 'v0.api.upyun.com', {
      apiVersion: 'v2',
      secret: this.app.config.upyun.key
    });

    // upyun.usage( (err, result) =>{
    //   console.log(result)
    // })

    // upyun.listDir('/', 10000, 'asc', 0, (err, result) =>{ 
    //   console.log(result)
    // })


    // let url = `http://v0.api.upyun.com/${bucket}/`

    // const urlPrefix = `http://v0.api.upyun.com/${bucket}/`

    // 传入参数路径
    const path = '/taohe/'

    const filePathSuffix = `/${bucket + path}`
    let url = endpoint + filePathSuffix
    console.log(url)
    let date = (new Date()).toGMTString()

    const headers = {
      'Authorization': upYunUtil.getUpSign(
        'GET',
        filePathSuffix,
        date,
        operator,
        password),
      'Date': date
    }
    const req = axios.create({
      headers: headers
    })

    let response = null;
    try {
      response = await req.get(url);
    } catch (error) {
      console.log(`error is`)
      console.log(error.response.data)
      // TODO throw exception msg and return 
      // return 

      // { msg: 'file or directory not found',
      // code: 40400001,
      // id: '9123ad7327e2cda0243483ca9acd5836' }
    }

    let fileList = []
    let fileListRaw = response.data
    let arr = fileListRaw.split('\n')
    let len = arr.length
    for (let i = 0; i < len; i++) {
      let file = arr[i].split('\t')
      if (file[0] === '') { continue }
      fileList.push({
        name: file[0],
        type: file[1],
        size: file[2],
        updatedAt: file[3]
      })
    }

    this.success({ fileList: fileList })
    // {
    //   files: [
    //     {
    //       name: 'example.txt', // file or dir name
    //       type: 'N', // file type, N: file; F: dir
    //       size: 28392812, // file size
    //       time: 1486053098 // last modify time
    //     }
    //   ],
    //   next: 'dlam9pd2Vmd2Z3Zg==' // next page iter
    // }
  }
}

module.exports = UpYunController;