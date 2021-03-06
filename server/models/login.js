const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

//Login Schema
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
    var token = jwt.sign({ _id: login._id.toHexString(), access }, process.env.JWT_SECRET).toString();

    login.tokens = login.tokens.concat([{ access, token }]);

    return login.save().then(() => {
        return token;
    });
};

LoginSchema.methods.removeToken = function (token) {
    var login = this;

    return login.update({
        $pull: {
            tokens: { token }
        }
    });
};

LoginSchema.statics.findByToken = function (token) {
    var Login = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject();
    }

    return Login.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};


LoginSchema.statics.findByCredentials = function (email, password) {
    var Login = this;

    return Login.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        })
    });
};

LoginSchema.pre('save', function (next) {
    var login = this;

    if (login.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(login.password, salt, (err, hash) => {
                login.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});

//Login model
var Login = mongoose.model('Login', LoginSchema);

module.exports = { Login };