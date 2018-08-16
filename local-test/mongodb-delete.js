const { MongoClient, objectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {

    if (err) {
        return console.log("Unable to connect MOngoDB Server");
    }

    console.log("Connect MongoDB Server successfully.");

    var db = client.db('TodoApp'); //database name

    //delete document from Todo collection with different delete method
    db.collection('Todo').deleteMany({ text: "Wash car" }).then((res) => {
        console.log(res);
    });

    // db.collection('Todo').deleteOne({ text: "Pick up mom" }).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todo').findOneAndDelete({ complete: false }).then((result) => {
    //     console.log(JSON.stringify(result, undefined, 2));
    // });

    //delete document from User collection
    // db.collection('User').deleteMany({ location: "India" }).then((result) => {
    //         console.log(JSON.stringify(result, undefined, 2));
    //     });

    //client.close();
});