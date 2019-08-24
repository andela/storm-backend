import {
  app, chai, expect, messages, sinon
} from '../testHelpers/config';
import models from '../../models';
import mockData from '../mockData';
import authHelper from '../../utils/authHelper';

const { userMock } = mockData;
const { generateToken } = authHelper;
const { User } = models;

const BASE_URL = '/api/v1';

let token,
  invalidToken;

before(async () => {
  const jwtToken = generateToken({ id: userMock.userId });
  token = jwtToken;
  invalidToken = generateToken({ id: userMock.wrongId });
});

describe('User route', () => {
  describe('GET /users/:userId', () => {
    it('should get user details', async () => {
      const response = await chai.request(app).get(`${BASE_URL}/users/${userMock.userId}`)
        .set('authorization', token);
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
    });
  });

  describe('PUT /users/:userId', () => {
    it('should update user details', async () => {
      const response = await chai.request(app).put(`${BASE_URL}/users/${userMock.userId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send(userMock.updateUser);
      expect(response.status).to.equal(202);
      expect(response.body.status).to.equal('success');
      expect(response.body.data.updatedUser.firstName).to.equal(userMock.updateUser.firstName);
    });

    it('should return an error if user tries to update another users profile', async () => {
      const response = await chai.request(app).put(`${BASE_URL}/users/${userMock.anotherUserId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send(userMock.updateUser);
      expect(response.status).to.equal(403);
      expect(response.body.status).to.equal('error');
      expect(response.body.data.message).to.equal(messages.unauthorizedUserProfile);
    });

    it('should return an error if user tries to update with incomplete credentials', async () => {
      const response = await chai.request(app).put(`${BASE_URL}/users/${userMock.anotherUserId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send(userMock.validUser);
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal('error');
    });

    it('should return an error if userId passed to params does not exist', async () => {
      const response = await chai.request(app).put(`${BASE_URL}/users/${userMock.wrongId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send(userMock.updateUser);
      expect(response.status).to.equal(404);
      expect(response.body.status).to.equal('error');
      expect(response.body.data.message).to.equal(messages.userNotFoundId);
    });

    it('should return an error if no token is passed', async () => {
      const response = await chai.request(app).put(`${BASE_URL}/users/${userMock.userId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .send(userMock.updateUser);
      expect(response.status).to.equal(401);
      expect(response.body.status).to.equal('error');
      expect(response.body.data.message).to.equal(messages.noToken);
    });

    it('should return an error if token is invalid', async () => {
      const response = await chai.request(app).put(`${BASE_URL}/users/${userMock.wrongId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', invalidToken)
        .send(userMock.updateUser);
      expect(response.status).to.equal(401);
      expect(response.body.status).to.equal('error');
      expect(response.body.data.message).to.equal(messages.invalidToken);
    });

    it('should return an error if userId is not a valid uuid string', async () => {
      const response = await chai.request(app).put(`${BASE_URL}/users/${userMock.invalidUuid}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send(userMock.updateUser);
      expect(response.status).to.equal(401);
      expect(response.body.status).to.equal('error');
      expect(response.body.data.message).to.equal(messages.invalidUserId);
    });

    it('should return an internal server error', async () => {
      const stub = sinon.stub(User, 'findOne').callsFake(() => Promise.reject(new Error('Internal server error')));
      const response = await chai.request(app).put(`${BASE_URL}/users/${userMock.userId}`)
        .set('authorization', token)
        .send(userMock.updateUser);
      expect(response.status).to.equal(500);
      expect(response.body).to.have.property('status').that.equal('error');
      stub.restore();
    });
  });
});
