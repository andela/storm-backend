import {
  app, chai, expect, sinon
} from '../testHelpers/config';
import models from '../../database/models';
import mockData from '../mockData';

const { User } = models;

const { userMock } = mockData;

const BASE_URL = '/api/v1';

describe('AUTH', () => {
  describe('POST /user/signup', () => {
    const signupEndpoint = `${BASE_URL}/user/signup`;
    it('should #create a user and #generate jwt', (done) => {
      chai
        .request(app)
        .post(signupEndpoint)
        .send(userMock.validUser)
        .end((err, res) => {
          const { data } = res.body;
          expect(data.user).property('token');
          expect(data.user).property('email');
          done(err);
        });
    });

    it('should not signup user if password length is less than 8', (done) => {
      chai
        .request(app)
        .post(signupEndpoint)
        .send(userMock.inValidUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(err);
        });
    });

    it('should not #create a user with wrong email', (done) => {
      chai
        .request(app)
        .post(signupEndpoint)
        .send(userMock.inValidEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(err);
        });
    });

    it('should not allow duplicate email address when creating a user', (done) => {
      chai
        .request(app)
        .post(signupEndpoint)
        .send(userMock.validUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').that.equal('error');
          expect(res.body.data).to.not.have.property('token');
          done(err);
        });
    });
  });

  describe('POST /user/signin', () => {
    const signinEndpoint = `${BASE_URL}/user/signin`;
    it('should authenticate a user with their email address and password', (done) => {
      chai
        .request(app)
        .post(signinEndpoint)
        .send(userMock.validUser)
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equal('success');
          expect(data).to.have.property('token');
          done(err);
        });
    });

    it('should not authenticate a user if email address is not recognized', (done) => {
      chai
        .request(app)
        .post(signinEndpoint)
        .send({ ...userMock.validUser, email: 'unrecognized@email.com' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
        });
    });

    it('should not authenticate a user if password is incorrect ', (done) => {
      chai
        .request(app)
        .post(signinEndpoint)
        .send({ ...userMock.validUser, password: 'incorrectpassword' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
        });
    });

    it('should return an internal server error', (done) => {
      const stub = sinon.stub(User, 'findOne').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .post(signinEndpoint)
        .send(userMock.validUser)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });
});
