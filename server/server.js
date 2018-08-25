require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { Login } = require('./models/login');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

//post todos route 
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

//post user route
app.post('/user', (req, res) => {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        location: req.body.location
    });

    user.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

//get todos route
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

//get todos/id route
app.get('/todos/:id', (req, res) => {

    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

//get user route
app.get('/user', (req, res) => {
    User.find().then((user) => {
        res.send({ user });
    }, (e) => {
        res.status(400).send(e);
    });
});

//get user/id route
app.get('/user/:id', (req, res) => {

    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    Todo.findById(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }

        res.send({ doc });
    }).catch((e) => {
        res.status(400).send();
    });
});

//delete todos route
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send(todo);
    }).catch((e) => {
        res.status(400).send();
    });
});

//delete user route
app.delete('/user/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }

        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port: ${port}.`);
});

//update todos route
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })
});

//update user route
// app.patch('/user/:id', (req, res) => {
//     var id = req.params.id;
//     var body = _.pick(req.body, ['name', 'kenny']);

//     if (!ObjectID.isValid(id)) {
//         return res.status(404).send();
//     }

//     Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((doc) => {
//         if (!doc) {
//             return res.status(404).send();
//         }

//         res.send({ doc });
//     }).catch((e) => {
//         res.status(400).send();
//     })
// });

//POST /login

app.post('/login', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);
    var login = new Login(body);

    login.save().then(() => {
        return login.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(login);
    }).catch((e) => {
        res.status(400).send(e);
    })
});
module.exports = { app };