'use strict';

const SYSTEM_ERROR = {
  code: 41312081,
  msg: '内部服务器错误'
};
const PARAMETER_ERROR = {
  code: 41312082,
  msg: '参数校验不通过'
};
const COMMON_PARAMETER_ERROR = {
  code: 41312083,
  msg: '通用参数校验不通过'
};
const SIGN_ERROR = {
  code: 41312084,
  msg: '签名错误'
};
const UPLOAD_FAILED = {
  code: 41312085,
  msg: '上传文件不正确'
};
const NOT_EXIST_USER = {
  code: 41312086,
  msg: '用户不存在'
};
const UPLOAD_FILE_FAILED = {
  code: 41312087,
  msg: '文件上传失败，请重试'
};
const REQUEST_UPLOAD_URL_FAILED = {
  code: 41312088,
  msg: '请求获取上传URL服务失败'
};
const USER_FREEZE = {
  code: 41312089,
  msg: '用户已冻结'
};
const UPLOAD_FILE_ERROR = {
  code: 413120810,
  msg: '文件上传错误，请重试'
};
const CATALOG_NAME_EXIST = {
  code: 413120811,
  msg: '该目录名称已经存在'
};
const CATALOG_IS_NONEMPTY = {
  code: 413120812,
  msg: '该目录不是空目录'
};
const NOT_EXIST_CATALOG = {
  code: 413120813,
  msg: '目录不存在'
};
const TAG_NAME_EXIST = {
  code: 413120814,
  msg: '该标签名称已经存在'
};
const RESOURCE_TITLE_EXIST = {
  code: 413120815,
  msg: '该资源标题已经存在'
};
const NOT_EXIST_RESOURCE = {
  code: 413120816,
  msg: '资源不存在'
};
const NO_ACCESS_TO_THIS_OPERATION = {
  code: 413120817,
  msg: '没有操作权限'
};
const FILE_MD5_CHECK_FAILED = {
  code: 413120818,
  msg: '文件MD5标识检查不通过'
};
const BLOCK_UPLOAD_TASK_NOT_EXIST = {
  code: 413120819,
  msg: '分块上传任务不存在'
};
const BLOCK_UPLOAD_TASK_HAS_BEEN_CANCELLED = {
  code: 413120820,
  msg: '分块上传任务已经被取消'
};
const CHECK_FAILED_TOKEN = {
  code: 413120821,
  msg: '未登录'
};
const NOT_ACCESS_PERMISSION = {
  code: 413120822,
  msg: '没有访问权限'
};
const MGR_AUTH_ERROR = {
  code: 413120823,
  msg: 'MGR鉴权服务异常，请稍后重试'
};
const MGR_REALM_ERROR = {
  code: 413120824,
  msg: 'MGR获取用户权限服务异常，请稍后重试'
};
const DEPENDENT_ERROR = {
  code: 413120825,
  msg: '依赖服务错误稍后重试'
};

const USER_INCORRECT_PASSWORD = {
  code: 413120826,
  msg: '密码有误'
};

const NO_AUTHORITY = {
  code: 413120827,
  msg: '尚无权限'
};

const DEPLOY_FAILED = {
  code: 413120828,
  msg: '部署失败'
};

const UPDATE_DEP_FAILED = {
  code: 413120829,
  msg: '更新部署内容出现异常'
}

module.exports = {
  SYSTEM_ERROR,
  PARAMETER_ERROR,
  COMMON_PARAMETER_ERROR,
  SIGN_ERROR,
  UPLOAD_FAILED,
  NOT_EXIST_USER,
  UPLOAD_FILE_FAILED,
  CATALOG_NAME_EXIST,
  BLOCK_UPLOAD_TASK_HAS_BEEN_CANCELLED,
  FILE_MD5_CHECK_FAILED,
  CATALOG_IS_NONEMPTY,
  NOT_EXIST_CATALOG,
  TAG_NAME_EXIST,
  BLOCK_UPLOAD_TASK_NOT_EXIST,
  RESOURCE_TITLE_EXIST,
  NOT_EXIST_RESOURCE,
  NO_ACCESS_TO_THIS_OPERATION,
  REQUEST_UPLOAD_URL_FAILED,
  USER_FREEZE,
  UPLOAD_FILE_ERROR,
  CHECK_FAILED_TOKEN,
  NOT_ACCESS_PERMISSION,
  MGR_AUTH_ERROR,
  MGR_REALM_ERROR,
  DEPENDENT_ERROR,
  USER_INCORRECT_PASSWORD,
  NO_AUTHORITY,
  DEPLOY_FAILED,
  UPDATE_DEP_FAILED,
};
