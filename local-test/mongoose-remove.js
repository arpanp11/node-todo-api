const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findOneAndRemove({_id: '57c4610dbb35fcbf6fda1154'}).then((todo) => {
//
// });

// Todo.findByIdAndRemove
Todo.findByIdAndRemove('57c4610dbb35fcbf6fda1154').then((todo) => {
  console.log(todo);
});

// User.remove({}).then((doc)=>{
//     console.log(doc);
// });

// User.findByIdAndRemove({_id: '5b674d004fe3bf04051de2b2'}).then((doc)=>{

// });

User.findByIdAndRemove('5b674d004fe3bf04051de2b2').then((doc)=>{
    console.log(doc);
});