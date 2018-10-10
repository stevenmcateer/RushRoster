// // Nodejs encryption with CT
// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

export function encrypt(value, key){
  var text = buffer(value);
  var cipher = crypto.createCipher(algorithm, key);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}

export function buffer(str){
  var curLen = str.length;
  var desired = (36 - curLen);
  for (var i = curLen; i < desired; i++) {
    str += "*";
  };
  return str;
}
