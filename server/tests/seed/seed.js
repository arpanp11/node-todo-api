const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

var { Todo } = require('./../../models/todo');
var { Login } = require('./../../models/login');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'dizy_babu@example.com',
    password: 'itsmeDJ',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    email: 'jay_jb@example.com',
    password: 'callmeJB!',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET).toString()
    }]
}];

var todos = [{
    _id: new ObjectID(),
    text: 'Todo - First test',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Todo - Second test',
    completed: true,
    completedAt: 090118,
    _creator: userTwoId
}];

var populateTodo = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateLogin = (done) => {
    Login.remove({}).then(() => {
        var userOne = new Login(users[0]).save();
        var userTwo = new Login(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

module.exports = { todos, populateTodo, users, populateLogin }