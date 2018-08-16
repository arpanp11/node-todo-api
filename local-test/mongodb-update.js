const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {

    if (err) {
        return console.log('Unable to connect MongoDB Server.');
    }

    console.log('Connect MongoDB Server successfully.');

    var db = client.db('TodoApp'); // database name

    db.collection('Todo').findOneAndUpdate({
        _id: new ObjectID('5b5caed14138140259819cd3')
    }, {
            $set: { completed: false }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(JSON.stringify(result, undefined, 2));
        });
});