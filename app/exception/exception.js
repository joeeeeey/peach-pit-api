'use strict';

class Exception extends Error {
    constructor(customError) {
        super();
        this.msg = customError.msg;
        this.code = customError.code;
    }
}

module.exports = Exception;
