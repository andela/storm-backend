import {
  app, chai, expect, sinon, messages
} from '../testHelpers/config';
import models from '../../models';
import mockData from '../mockData';
import mockProfile from '../mockData/mockProfile';
import { findByEmail } from '../../services/userServices';

const { User } = models;

const { userMock } = mockData;
const { facebook, google } = mockProfile;

const BACKEND_BASE_URL = '/api/v1';

let user = null;
describe('AUTH', () => {
  describe('POST /user/signup', () => {
    const signupEndpoint = `${BACKEND_BASE_URL}/user/signup`;
    it('should #create a user and #generate jwt', (done) => {
      chai
        .request(app)
        .post(signupEndpoint)
        .send(userMock.validUser)
        .end((err, res) => {
          const { data } = res.body;
          user = data.user;
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

    it('should not allow duplicate email address & phone number when creating a user', (done) => {
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

    it('should return an internal server error', (done) => {
      const stub = sinon.stub(User, 'create').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .post(signupEndpoint)
        .send(userMock.validUser2)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });

  describe('POST /user/signin', () => {
    const signinEndpoint = `${BACKEND_BASE_URL}/user/signin`;
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
  describe('POST /user/logout', () => {
    const logoutEndpoint = `${BACKEND_BASE_URL}/user/logout`;
    it('should logout user', (done) => {
      chai
        .request(app)
        .post(logoutEndpoint)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${user.token}`)
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(200);
          expect(data).property('message');
          done(err);
        });
    });
    it('should throw no token error', (done) => {
      chai
        .request(app)
        .post(logoutEndpoint)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(401);
          expect(data).property('message');
          expect(res.body.data.message).to.equal(messages.noToken);
          done(err);
        });
    });
    it('should throw bad token error', (done) => {
      chai
        .request(app)
        .post(logoutEndpoint)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${user.token} wrong`)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          done(err);
        });
    });
    it('should throw user already logged out', (done) => {
      chai
        .request(app)
        .post(logoutEndpoint)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${user.token}`)
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(500);
          expect(data).property('message');
          expect(res.body.data.message).to.equal(messages.blacklisted);
          done(err);
        });
    });
  });

  describe('GET /auth/', () => {
    it('should accept a response from google', async () => {
      const res = await chai
        .request(app)
        .get(`${BACKEND_BASE_URL}/auth/google/callback`);
      const { _json: userDetails } = google;
      const { email } = userDetails;
      const { userId } = await findByEmail(email);
      res.should.redirectTo(`${process.env.FRONTEND_BASE_URL}/?callback=social&userId=${userId}&email=${email}&token=automaticgeneratedtoken`);
    });

    it('should accept a response from facebook', async () => {
      const res = await chai
        .request(app)
        .get(`${BACKEND_BASE_URL}/auth/facebook/callback`);
      const { _json: userDetails } = facebook;
      const { email } = userDetails;
      const { userId } = await findByEmail(email);
      res.should.redirectTo(`${process.env.FRONTEND_BASE_URL}/?callback=social&userId=${userId}&email=${email}&token=automaticgeneratedtoken`);
    });
  });
});
