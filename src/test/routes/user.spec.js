import {
  app, chai, expect, messages, sinon, testImage,
} from '../testHelpers/config';
import models from '../../models';
import mockData from '../mockData';
import { generateToken } from '../../utils/authHelper';
import roles from '../../utils/roles';
import { uploader } from '../../config/cloudinaryConfig';

const { userMock, roleMock, cloudinaryMock } = mockData;

const { User } = models;

const BACKEND_BASE_URL = '/api/v1';

let token, invalidToken, managerToken;

before(async () => {
  const jwtToken = generateToken({ id: userMock.userId, roleId: roles.SUPER_ADMIN });
  token = jwtToken;
  invalidToken = generateToken({ id: userMock.wrongId });
  managerToken = generateToken({ id: userMock.anotherUserId });
});

describe('User route', () => {
  describe('GET /users/:userId', () => {
    it('should get user details', async () => {
      const response = await chai.request(app).get(`${BACKEND_BASE_URL}/users/?userId=${userMock.userId}`)
        .set('authorization', token);
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
    });
  });

  describe('PUT /users/:userId', () => {
    it('should update user details', async () => {
      const stub = sinon.stub(uploader, 'upload').callsFake(() => Promise.resolve(cloudinaryMock.response));

      const response = await chai.request(app).put(`${BACKEND_BASE_URL}/users/${userMock.userId}`)
        .set('authorization', token)
        .set('Content-Type', 'multipart/form-data')
        .attach('images', testImage, 'test.png')
        .field('firstName', 'Kunle')
        .field('lastName', 'Afolayan')
        .field('phoneNo', '08075489632')
        .field('gender', 'Male')
        .field('birthDate', '1983-08-08')
        .field('preferredCurrency', 'Naira')
        .field('preferredLanguage', 'Yoruba')
        .field('currentLocation', 'Lagos');

      expect(response.status).to.equal(202);
      expect(response.body.status).to.equal('success');
      expect(response.body.data.updatedUser.firstName).to.equal('Kunle');

      stub.restore();
    });

    it('should update user details with no image attached', async () => {
      const response = await chai.request(app).put(`${BACKEND_BASE_URL}/users/${userMock.userId}`)
        .set('authorization', token)
        .set('Content-Type', 'multipart/form-data')
        .field('firstName', 'Kunle')
        .field('lastName', 'Afolayan')
        .field('phoneNo', '08075489632')
        .field('gender', 'Male')
        .field('birthDate', '1983-08-08')
        .field('preferredCurrency', 'Naira')
        .field('preferredLanguage', 'Yoruba')
        .field('currentLocation', 'Lagos');

      expect(response.status).to.equal(202);
      expect(response.body.status).to.equal('success');
      expect(response.body.data.updatedUser.firstName).to.equal('Kunle');
    });

    it('should return an error if user tries to update another users profile', async () => {
      const response = await chai.request(app).put(`${BACKEND_BASE_URL}/users/${userMock.anotherUserId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send(userMock.updateUser);
      expect(response.status).to.equal(403);
      expect(response.body.status).to.equal('error');
      expect(response.body.data.message).to.equal(messages.unauthorizedUserProfile);
    });

    it('should return an error if user tries to update with incomplete credentials', async () => {
      const response = await chai.request(app).put(`${BACKEND_BASE_URL}/users/${userMock.anotherUserId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send(userMock.validUser);
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal('error');
    });

    it('should return an error if userId passed to params does not exist', async () => {
      const response = await chai.request(app).put(`${BACKEND_BASE_URL}/users/${userMock.wrongId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send(userMock.updateUser);
      expect(response.status).to.equal(404);
      expect(response.body.status).to.equal('error');
      expect(response.body.data.message).to.equal(messages.userNotFoundId);
    });

    it('should return an error if no token is passed', async () => {
      const response = await chai.request(app).put(`${BACKEND_BASE_URL}/users/${userMock.userId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .send(userMock.updateUser);
      expect(response.status).to.equal(401);
      expect(response.body.status).to.equal('error');
      expect(response.body.data.message).to.equal(messages.noToken);
    });

    it('should return an error if token is invalid', async () => {
      const response = await chai.request(app).put(`${BACKEND_BASE_URL}/users/${userMock.wrongId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', invalidToken)
        .send(userMock.updateUser);
      expect(response.status).to.equal(401);
      expect(response.body.status).to.equal('error');
      expect(response.body.data.message).to.equal(messages.invalidToken);
    });

    it('should return an error if userId is not a valid uuid string', async () => {
      const response = await chai.request(app).put(`${BACKEND_BASE_URL}/users/${userMock.invalidUuid}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send(userMock.updateUser);
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal('error');
    });

    it('should return an internal server error', async () => {
      const stub = sinon.stub(User, 'findOne').callsFake(() => Promise.reject(new Error('Internal server error')));
      const response = await chai.request(app).put(`${BACKEND_BASE_URL}/users/${userMock.userId}`)
        .set('authorization', token)
        .send(userMock.updateUser);
      expect(response.status).to.equal(500);
      expect(response.body).to.have.property('status').that.equal('error');
      stub.restore();
    });
  });

  describe('PATCH /users/:userId', () => {
    it('should return unauthorize error', async () => {
      const response = await chai.request(app).patch(`${BACKEND_BASE_URL}/role/users/${userMock.anotherUserId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', managerToken)
        .send(roleMock.unAuthorizeRole);

      expect(response).to.have.status(403);
      const { status, data } = response.body;
      expect(status).to.equal('error');
      expect(data).to.be.a('object');
      expect(data).to.have.property('message');
    });

    it('should return validation error', async () => {
      const response = await chai.request(app).patch(`${BACKEND_BASE_URL}/role/users/${userMock.userId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send({});

      expect(response).to.have.status(400);
      const { status, data } = response.body;
      expect(status).to.equal('error');
      expect(data).to.be.a('object');
    });

    it('should succesfully set user role', async () => {
      const response = await chai.request(app).patch(`${BACKEND_BASE_URL}/role/users/${userMock.anotherUserId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send(roleMock.validRole);

      expect(response).to.have.status(200);
      const { status, data } = response.body;
      expect(status).to.equal('success');
      expect(data).to.be.a('object');
      expect(data).to.have.property('message');
    });

    it('should return incorrect staff id error', async () => {
      const response = await chai.request(app).patch(`${BACKEND_BASE_URL}/role/users/${userMock.wrongId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send(roleMock.incorrectStaffId);

      expect(response).to.have.status(404);
      const { status, data } = response.body;
      expect(status).to.equal('error');
      expect(data).to.be.a('object');
      expect(data).to.have.property('message');
    });

    it('should return an internal server error', async () => {
      const stub = sinon.stub(User, 'findOne').callsFake(() => Promise.reject(new Error('Internal server error')));
      const response = await chai.request(app).patch(`${BACKEND_BASE_URL}/role/users/${userMock.userId}`)
        .type('form')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send(roleMock.validRole);

      expect(response.status).to.equal(500);
      expect(response.body).to.have.property('status').that.equal('error');
      stub.restore();
    });
  });
});
