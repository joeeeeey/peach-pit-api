'use strict';
const jwt = require('jsonwebtoken');


function jwtEncode(data, secret, expiresSeconds=86400){
  const token = jwt.sign({
    data: data
  }, secret, { expiresIn: expiresSeconds });
  return token;
}


function jwtDecode(token, secret){
  try {
    var decoded = jwt.verify(token, secret);
    return {code: 0, decoded: decoded}
  } catch(err) {
    return {code: 1, err: err}
  }
}

module.exports = {
  jwtEncode,
  jwtDecode,
};
