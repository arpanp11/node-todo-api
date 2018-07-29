const mongoose = require('mongoose');

//User collection
var User = mongoose.model('User', {
    name:{
        type: String,
        required: true,
        trim: true,
        minlegnth: 1
    },
    email: {
        type: String,
        //required: true,
        trim: true,
        minlegnth: 1
    },
    location: {
        type: String
    }
});

module.exports = {User};