let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('/POST register', () => {
    it('it should register a new user', (done) => {
        let user = {
            name: "Marty",
            email: "marty@bttf.com",
            password: "marty",
            role:"STAFF"
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