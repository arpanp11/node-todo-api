const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'hello$dj';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashPass = '$2a$10$vy8Emnluj.WbgDsYJPYXaeGc9bYTnYhoel.XBJxxYEn.Eqb5KDgVu';

bcrypt.compare(password, hashPass, (err, res) => {
    console.log(res);
});
// var data = {
//     id: 15
// };

// var token  = jwt.sign(data,'dec16');
// console.log(token);

// var decode = jwt.verify(token, 'dec16');
// console.log(decode);