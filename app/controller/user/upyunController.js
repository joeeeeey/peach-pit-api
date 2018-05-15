
'use strict';
const Controller = require('./baseController');
const tools = require('upyun/tools')
const utils = require('upyun/upyun/utils')
const Exception = require('../../exception/exception');

// const UpYun = require('upyun');
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

    const uniqFileName = utils.md5sum(fileName + (Math.random().toString())) + '.' + fileName.split('.')[1]
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

  // 工具方法，没有路由
  async getDir(path) {
    const operator = this.app.config.upyun.admin
    const { bucket, password, endpoint } = this.app.config.upyun
    const filePathSuffix = `/${bucket + path}`
    let url = endpoint + filePathSuffix

    const date = (new Date()).toGMTString()

    const authorization = upYunUtil.getUpSign(
      'GET',
      filePathSuffix,
      date,
      operator,
      password
    )
    const headers = {
      'Authorization': authorization,
      'Date': date,
      'X-List-Limit': 100,
      // 'X-List-Iter': '1', 分页。遍历的起点（当指定 `limit` 小于实际文件数时，在第二次请求时候，指定此参数，即可继续上次的遍历） 
    }

    const req = axios.create({
      headers: headers
    })

    let response = null;
    try {
      response = await req.get(url);
    } catch (error) {
      // throw new Exception(error.response.data);
      return error.response.data
      // error.response.data => { msg: 'file or directory not found', code: 40400001 }
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

    const res = {
      code: 0,
      msg: 'OK',
      data: { fileList: fileList }
    };

    return res
  }

  // 列出路径下的图片
  // 传入: 1. path Sting  2. traversal Bollean 是否遍历子文件夹 只遍历一层
  // 用户编辑: 
  // 1. 认证 userId, /taohe/dev/editPage/user/${userId}/site/
  // 2. 递归查找 user 所有图片
  async showUploadedFiles() {
    const { ctx } = this
    const { params = {} } = ctx.request.body;
    // console.log(params)
    const { urlPrefix, savePathPrefix } = this.app.config.upyun

    const roleId = this.userId()

    const { page, role, traversal, source, sourceId } = params

    const paramRule = {
      page: { type: 'string', require: true, allowEmpty: false },
      role: { type: 'string', require: true, allowEmpty: false },
      source: { type: 'string', require: true, allowEmpty: false },
      traversal: { type: 'boolean', require: true, allowEmpty: false },
    };

    if (!this.validate(paramRule, params)) return;

    const path = `${savePathPrefix}/${page}/${role}/${roleId}/${source}/${sourceId ? (sourceId + '/') : ''}`

    const showType = 'N' // 显示文件
    const notShowType = 'F' // 不显示文件夹

    let result = await this.getDir(path)
    if (result.code !== 0) {
      throw new Exception(result);
    }
    let imageFiles = []
    let { fileList } = result.data
    imageFiles = imageFiles.concat(fileList.filter(x => x.type === showType)).map(
      x => {
        x.path = urlPrefix + path + x.name
        return x
      }
    )
    // [{
    //   name: 'dev', // file or dir name
    //   type: 'N', // file type, N: file; F: dir
    //   size: 0, // file size
    //   time: 1486053098 // last modify time
    // }]

    if (traversal) {
      // => ['layouts', 'templates']
      let newPath = fileList.filter(x => x.type === notShowType).map(x => {
        return x.name
      })
      for (let i = 0; i < newPath.length; i++) {
        result = await this.getDir(path + newPath[i] + '/')
        if (result.code !== 0) {
          throw new Exception(result);
        }
        fileList = result.data.fileList
        // console.log(fileList)
        // TODO x.path = urlPrefix+ path + x.name
        imageFiles = imageFiles.concat(fileList.filter(x => {
          if (x.type === showType) {
            x.path = urlPrefix + path + newPath[i] + '/' + x.name
            return x
          }
        }

        ))
      }
    }

    this.success({ imageFiles: imageFiles })
  }
}

module.exports = UpYunController;