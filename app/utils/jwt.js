'use strict';
const jwt = require('jsonwebtoken');


function jwtEncode(data){
  const token = jwt.sign({
    data: data
  }, 'secret', { expiresIn: 60 * 60 });
  return token;
}


function jwtDecode(token){
  try {
    var decoded = jwt.verify(token, 'secret');
    return {code: 0, decoded: decoded}
  } catch(err) {
    return {code: 1, err: err}
  }
}

module.exports = {
  jwtEncode,
  jwtDecode,
};
