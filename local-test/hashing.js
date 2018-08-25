const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 15
};

var token  = jwt.sign(data,'dec16');
console.log(token);

var decode = jwt.verify(token, 'dec16');
console.log(decode);