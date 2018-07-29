const expect = require('expect');
const request = require('supertest');

var { app } = require('./../server');
var { Todo } = require('./../models/todo');
var { User } = require('./../models/user');

//POST /todos route test
beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
});

//POST /user route test
beforeEach((done) => {
    User.remove({}).then(() => done());
});

describe('POST /user', () => {
    it('should create a new user data', (done) => {
        var name = 'Dizy';

        request(app)
            .post('/user')
            .send({ name })
            .expect(200)
            .expect((res) => {
                expect(res.body.name).toBe(name);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.find().then((user) => {
                    expect(user.length).toBe(1);
                    expect(user[0].name).toBe(name);
                    done();
                }).catch((e) => done(e));
            });

    });

    it('should not create user with invalid data', (done) => {
        request(app)
            .post('/user')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.find().then((user) => {
                    expect(user.length).toBe(0);
                    done();
                }).catch((e) => done());
            });
    });
});