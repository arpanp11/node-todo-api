const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//Login 

var LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlegnth: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email.'
        }
    },
    password: {
        type: String,
        required: true,
        minlegnth: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

LoginSchema.methods.toJSON = function () {
var login = this;
var loginObject = login.toObject();

return _.pick(loginObject, ['_id', 'email']);
};

LoginSchema.methods.generateAuthToken = function () {
    var login = this;
    var access = 'auth';
    var token = jwt.sign({ _id: login._id.toHexString(), access }, 'dec16').toString();

    login.tokens = login.tokens.concat([{ access, token }]);

    return login.save().then(() => {
        return token;
    });
};
var Login = mongoose.model('Login', LoginSchema);

module.exports = { Login };