import {
  app, chai, expect, sinon, BACKEND_BASE_URL
} from '../testHelpers/config';
import mockData from '../mockData';
import models from '../../models';
import { generateToken } from '../../utils/authHelper';

const { User, Notification } = models;

const { requestMock: { validTripRequest }, userMock: { requesterId, anotherManagerId } } = mockData;

const manager = { data: {}, token: '' };
const requester = { data: {}, token: '' };
let notification;

before(async () => {
  manager.token = `Bearer ${generateToken({ id: anotherManagerId })}`;
  requester.token = `Bearer ${generateToken({ id: requesterId })}`;
});

describe('Notification', () => {
  describe('POST /notification/optOut', () => {
    const endpoint = `${BACKEND_BASE_URL}/notification/optOut`;
    it('should opt out of email notificaitons', (done) => {
      chai
        .request(app)
        .patch(endpoint)
        .set('authorization', manager.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });
    it('should return an internal server error', (done) => {
      const stub = sinon.stub(User, 'update').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .patch(endpoint)
        .set('authorization', manager.token)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });
  describe('POST /notification/optIn', () => {
    const endpoint = `${BACKEND_BASE_URL}/notification/optIn`;
    it('should opt in to email notificaitons', (done) => {
      chai
        .request(app)
        .patch(endpoint)
        .set('authorization', manager.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });
    it('should return an internal server error', (done) => {
      const stub = sinon.stub(User, 'update').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .patch(endpoint)
        .set('authorization', manager.token)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });
  describe('POST /requests', () => {
    const endpoint = `${BACKEND_BASE_URL}/requests`;
    it('should request a trip successfully', (done) => {
      chai.request(app)
        .post(endpoint)
        .set('authorization', requester.token)
        .send(validTripRequest)
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(201);
          expect(data).to.have.property('type', 'one-way');
          expect(data).to.have.property('originCity');
          expect(data).to.have.property('destinationCity');
          expect(data).to.have.property('departureDate');
          expect(data).to.have.property('reason');
          expect(data).to.have.property('accommodation');
          done(err);
        });
    });
  });
  describe('GET /notification', () => {
    const endpoint = `${BACKEND_BASE_URL}/notification`;
    it('should return all notificaitons for a specific user', (done) => {
      chai
        .request(app)
        .get(endpoint)
        .set('authorization', manager.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          ([notification] = res.body.data);
          done(err);
        });
    });
    it('should return an internal server error', (done) => {
      const stub = sinon.stub(Notification, 'findAll').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .get(endpoint)
        .set('authorization', manager.token)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });

  describe('POST /notification/markAsRead', () => {
    it('should mark a notificaiton as read', (done) => {
      const endpoint = `${BACKEND_BASE_URL}/notification/markAsRead/${notification.id}`;
      chai
        .request(app)
        .patch(endpoint)
        .set('authorization', manager.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });
    it('should return an internal server error', (done) => {
      const endpoint = `${BACKEND_BASE_URL}/notification/markAsRead/${notification.id}`;
      const stub = sinon.stub(Notification, 'update').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .patch(endpoint)
        .set('authorization', manager.token)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });
  describe('POST /notification/markAllAsRead', () => {
    const endpoint = `${BACKEND_BASE_URL}/notification/markAllAsRead`;
    it('should mark all notificaitons as read', (done) => {
      chai
        .request(app)
        .patch(endpoint)
        .set('authorization', manager.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });
    it('should return an internal server error', (done) => {
      const stub = sinon.stub(Notification, 'update').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .patch(endpoint)
        .set('authorization', manager.token)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });
  describe('POST /notification/clear', () => {
    const endpoint = `${BACKEND_BASE_URL}/notification/clear`;
    it('should clear all notificaitons for a user', (done) => {
      chai
        .request(app)
        .delete(endpoint)
        .set('authorization', manager.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });
    it('should return an internal server error', (done) => {
      const stub = sinon.stub(Notification, 'destroy').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .delete(endpoint)
        .set('authorization', manager.token)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });
});
