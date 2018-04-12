const _ = require('lodash');
const md5 = require('./md5');
const Exception = require('../exception/exception');
const { failure, systemError } = require('./apiResponse');

const getCookie = (name, cookie) => {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const arr = cookie.match(reg);
    if (arr) {
        return arr[2];
    } else {
        return null;
    }
};

const _sign = map => {
    let signstr = map.appsecret;
    delete map['sign'];
    delete map['appsecret'];

    const keys = Object.keys(map);
    const count = keys.length;
    keys.sort();
    for (let i = 0; i < count; i++) {
        let k = keys[i];
        let v = map[k];
        signstr = signstr + k + v;
    }
    // console.log('signstr = ' + signstr);
    return _.toUpper(md5.md5(signstr));
};

const suffix = objForSign => {
    const signStr = _sign(objForSign);
    const signed = _.assign({}, objForSign, { sign: signStr });
    // console.log('signed object = ' + JSON.stringify(signed));
    return signed;
};

const generalFailure = e => {
    let result = systemError();
    if (e && e instanceof Exception) {
        if (e.code && e.msg) {
            const data = { code: e.code, msg: e.msg };
            result = failure(data);
        }
    }
    return result;
};

const generateDataMap = slice => {
    let result = {};
    for (let i = 0; i < slice; i++) {
        result[i] = { hasUploaded: false, index: i };
    }
    return result;
};

const initTempFiles = async ctx => {
    let res = ctx.service.ued.resourceService.getKey('upload-temp');
    if (!res) {
        ctx.service.ued.resourceService.setKey('upload-temp', {});
        res = ctx.service.ued.resourceService.getKey('upload-temp');
    }
    return res;
};

module.exports = {
    getCookie,
    suffix,
    initTempFiles,
    generalFailure,
    generateDataMap
};
