'use strict';

const SYSTEM_ERROR = {
    code: 1032199999,
    msg: '内部服务器错误'
};
const PARAMETER_ERROR = {
    code: 1032210001,
    msg: '参数校验不通过'
};
const COMMON_PARAMETER_ERROR = {
    code: 1032210002,
    msg: '通用参数校验不通过'
};
const SIGN_ERROR = {
    code: 1032210003,
    msg: '签名错误'
};
const UPLOAD_FAILED = {
    code: 1032310001,
    msg: '上传文件不正确'
};
const NOT_EXIST_USER = {
    code: 1032310002,
    msg: '用户不存在'
};
const UPLOAD_FILE_FAILED = {
    code: 1032310003,
    msg: '文件上传失败，请重试'
};
const REQUEST_UPLOAD_URL_FAILED = {
    code: 1032310004,
    msg: '请求获取上传URL服务失败'
};
const USER_FREEZE = {
    code: 1032310005,
    msg: '用户已冻结'
};
const UPLOAD_FILE_ERROR = {
    code: 1032310006,
    msg: '文件上传错误，请重试'
};
const CATALOG_NAME_EXIST = {
    code: 1032310007,
    msg: '该目录名称已经存在'
};
const CATALOG_IS_NONEMPTY = {
    code: 1032310008,
    msg: '该目录不是空目录'
};
const NOT_EXIST_CATALOG = {
    code: 1032310009,
    msg: '目录不存在'
};
const TAG_NAME_EXIST = {
    code: 1032310010,
    msg: '该标签名称已经存在'
};
const RESOURCE_TITLE_EXIST = {
    code: 1032310011,
    msg: '该资源标题已经存在'
};
const NOT_EXIST_RESOURCE = {
    code: 1032310012,
    msg: '资源不存在'
};
const NO_ACCESS_TO_THIS_OPERATION = {
    code: 1032310013,
    msg: '没有操作权限'
};
const FILE_MD5_CHECK_FAILED = {
    code: 1032310014,
    msg: '文件MD5标识检查不通过'
};
const BLOCK_UPLOAD_TASK_NOT_EXIST = {
    code: 1032310015,
    msg: '分块上传任务不存在'
};
const BLOCK_UPLOAD_TASK_HAS_BEEN_CANCELLED = {
    code: 1032310016,
    msg: '分块上传任务已经被取消'
};
const CHECK_FAILED_TOKEN = {
    code: 1032510001,
    msg: '未登录'
};
const NOT_ACCESS_PERMISSION = {
    code: 1032500051,
    msg: '没有访问权限'
};
const MGR_AUTH_ERROR = {
    code: 1032400001,
    msg: 'MGR鉴权服务异常，请稍后重试'
};
const MGR_REALM_ERROR = {
    code: 1032400002,
    msg: 'MGR获取用户权限服务异常，请稍后重试'
};
const DEPENDENT_ERROR = {
    code: 1032499999,
    msg: '依赖服务错误稍后重试'
};

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
    DEPENDENT_ERROR
};
