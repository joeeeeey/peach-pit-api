'use strict';
const jwt = require('jsonwebtoken');


function encode(data){
  const token = jwt.sign({
    data: data
  }, 'secret', { expiresIn: 60 * 60 });
  return token;
}


function decode(token){
  try {
    var decoded = jwt.verify(token, 'wrong-secret');
    return {code: 0, decoded: decoded}
  } catch(err) {
    return {code: 1, err: err}
  }
}

module.exports = {
  encode,
  decode,
};
