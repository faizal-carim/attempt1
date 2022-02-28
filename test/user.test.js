let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
const sequelize = require("../util/database");
const User = require("../models/user");
chai.use(chaiHttp);
let bearer = "";
const {step} = require('mocha-steps');

describe('/POST register', () => {
    
    step('it should register a new user', (done) => {
        let user = {
            name: "Marty",
            email: "marty@bttf.com",
            password: "marty",
            role:"ADMIN"
        }
        chai.request(app)
          .post('/register')
          .send(user)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
            done();
          });
    });

});

describe('/POST login', () => {
    step('it should login the user', (done) => {
        let user = {
            email: "marty@bttf.com",
            password: "marty"
        }
      chai.request(app)
          .post('/login')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                bearer = res.body.token;
            done();
          });
    });

});

describe('/POST newSchedule', () => {
    step('it it should create a new schedule for a user', (done) => {
        let schedule = {
            userId: 1,
            workDate: "2022-03-26",
            shiftLength: 8
        }
      chai.request(app)
          .post('/newSchedule')
          .send(schedule)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
            done();
          });
    });

});

describe('/GET getAllUsersSchedules', () => {
    step('it should get the user info', (done) => {
        chai.request(app)
          .get('/getAllUsersSchedules')
          .set({ "Authorization": 'Bearer '+ bearer })
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
        });
    });       
}); 

