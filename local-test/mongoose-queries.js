const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const { ObjectID } = require('mongodb');

// var id = '5b5e70957e769205579f656c';

// if(!ObjectID.isValid(id)){
// console.log('ID is not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos :', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((doc) => {
//     console.log('Todo :', doc);
// });

// Todo.findById(id).then((todo) => {
//     console.log('Todo by ID :', todo);
// });

User.findById('5b674d004fe3bf04051de2b2').then((doc) => {
    if (!doc) {
        console.log('Unable to find user.');
    }
    console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
    console.log(e);
});