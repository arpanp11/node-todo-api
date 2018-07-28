const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }

    console.log('Connect to MongoDB Server.');

    var db = client.db('TodoApp');

    db.collection('Todo').insertOne({
        text: 'Pick Up mom',
        completed: true
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.collection('User').insertOne({
        name: 'Kavya',
        age: 6,
        location: 'USA'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();

});