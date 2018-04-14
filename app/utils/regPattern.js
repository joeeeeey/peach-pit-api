'use strict';

function emailReg(){
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
}
/*eslint-disable */
function cnPhoneReg(){
  return /^1(3|4|5|7|8)\d{9}$/
}

/*eslint-disable */
function emailAndCnPhoneReg(){
  return /^1(3|4|5|7|8)\d{9}$|^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
}
/*eslint-disable */

// const regPattern = {
//   emailReg: emailReg,
//   cnPhoneReg: cnPhoneReg,
//   emailAndCnPhoneReg: emailAndCnPhoneReg,
// }

module.exports = {
  emailReg,
  cnPhoneReg,
  emailAndCnPhoneReg,
};
