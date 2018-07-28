const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }

    console.log('Connect to MongoDB Server.');

    var db = client.db('TodoApp');

    //Todo Collection
    db.collection('Todo').find({
        _id: new ObjectID('5b5cacda5e47fe021e8d9e44')
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to find the todo', err);
    });

    //User Collection
    db.collection('User').find({
        name: 'Jay'
    }).toArray().then((docs) => {
        console.log('User');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to find the todo', err);
    });
    
    db.collection('Todo').find().count().then((count)=>{
        console.log(`Todos count: ${count}`);
    });

    db.collection('User').find().count().then((count)=>{
        console.log(`User count: ${count}`);
    });
    //client.close();

});