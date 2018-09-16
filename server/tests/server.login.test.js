const expect = require('expect');
const request = require('supertest');
//const { ObjectID } = require('mongodb');

var { app } = require('./../server');
var { Login } = require('./../models/login');
var { users, populateLogin } = require('./seed/seed');

beforeEach(populateLogin);

//GET /login/me route test
describe('GET /login/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/login/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });
    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/login/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

//POST /login route test
describe('POST /login', () => {
    it('should create a user', (done) => {
        var email = 'dizy123@gmail.com';
        var password = 'dj@456';

        request(app)
            .post('/login')
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }

                Login.findOne({ email }).then((user) => {
                    expect(user).toExist();
                    expect(user).toNotBe(password);
                    done();
                }).catch((e)=> done(e));
            });
    });

    it('should return validation erros if request invalid', (done) => {
        request(app)
            .post('/login')
            .send({
                email: 'dizy',
                password: 'dj456'
            })
            .expect(400)
            .end(done);
    });

    it('should not create user if email in use', (done) => {
        request(app)
            .post('/login')
            .send({
                email: users[0].email,
                password: 'Password87@'
            })
            .expect(400)
            .end(done);
    });
});

//POST /login/signin route test
describe('POST /login/signin', () => {
    it('should signin user and return auth token', (done) => {
        request(app)
            .post('/login/signin')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
            })
            .end((err, res)=>{
                if(err){
                    return done(err);
                }

                Login.findById(users[1]._id).then((user)=>{
                    expect(user.tokens[0]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    done();
                }).catch((e)=> done(e));
            });
    });

    it('should reject invalid singin', (done) => {
        request(app)
        .post('/login/signin')
        .send({
            email: users[1].email,
            password: users[1].password + '1'
        })
        .expect(400)
        .expect((res) => {
            expect(res.headers['x-auth']).toNotExist();
        })
        .end((err, res)=>{
            if(err){
                return done(err);
            }

            Login.findById(users[1]._id).then((user)=>{
                expect(user.tokens.length).toBe(0);
                done();
            }).catch((e)=> done(e));
        });
    });
});

//DELETE /login/me/token route test
describe('DELETE /login/me/token', () => {
    it('should remove auth token on logout', (done) => {
      request(app)
        .delete('/login/me/token')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          Login.findById(users[0]._id).then((user) => {
            expect(user.tokens.length).toBe(0);
            done();
          }).catch((e) => done(e));
        });
    });
  });