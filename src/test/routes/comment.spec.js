import {
  app, chai, expect, sinon, BACKEND_BASE_URL,
} from '../testHelpers/config';
import mockData from '../mockData';
import models from '../../models';
import authHelper from '../../utils/authHelper';
import roles from '../../utils/roles';

const {
  Comment, Request, User, Notification
} = models;
const { generateToken } = authHelper;
const { commentMock } = mockData;
const {
  managerId, unAuthorizedManagerId, requesterId, unAuthorizedRequesterId,
  superAdminId, requestId, invalidRequestId, content, invalidContent, requestWithNoCommentId,
} = commentMock;
const { REQUESTER, MANAGER, SUPER_ADMIN } = roles;


describe('COMMENTS', () => {
  let managerToken, unAuthorizedManagerToken, requesterToken,
    unAuthorizedRequesterToken, superAdminToken;

  before(async () => {
    managerToken = generateToken({ id: managerId, roleId: MANAGER });
    unAuthorizedManagerToken = generateToken({ id: unAuthorizedManagerId, roleId: MANAGER });
    requesterToken = generateToken({ id: requesterId, roleId: REQUESTER });
    unAuthorizedRequesterToken = generateToken({ id: unAuthorizedRequesterId, roleId: REQUESTER });
    superAdminToken = generateToken({ id: superAdminId, roleId: SUPER_ADMIN });
  });

  const endpoint = `${BACKEND_BASE_URL}/comments`;

  describe('POST /comments/:requestId', () => {
    it('should return validation error', (done) => {
      chai
        .request(app)
        .post(`${endpoint}/${requestId}`)
        .set('authorization', managerToken)
        .send(invalidContent)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
        });
    });

    it('should return internal server error if a problem occurs while creating the comment in the database', (done) => {
      const stub = sinon.stub(Comment, 'create').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .post(`${endpoint}/${requestId}`)
        .send(content)
        .set('authorization', managerToken)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });

    it('should allow manager to post comment', (done) => {
      chai
        .request(app)
        .post(`${endpoint}/${requestId}`)
        .send(content)
        .set('authorization', managerToken)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });

    it('should allow requester to post comment', (done) => {
      chai
        .request(app)
        .post(`${endpoint}/${requestId}`)
        .send(content)
        .set('authorization', requesterToken)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });

    it('should allow super-admin to post comment', (done) => {
      chai
        .request(app)
        .post(`${endpoint}/${requestId}`)
        .send(content)
        .set('authorization', superAdminToken)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });

    it('should stop unauthorized manager from posting comment', (done) => {
      chai
        .request(app)
        .post(`${endpoint}/${requestId}`)
        .send(content)
        .set('authorization', unAuthorizedManagerToken)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
        });
    });

    it('should stop unauthorized requester from posting comment', (done) => {
      chai
        .request(app)
        .post(`${endpoint}/${requestId}`)
        .send(content)
        .set('authorization', unAuthorizedRequesterToken)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
        });
    });

    it('should return internal server error if problem occurs while getting the request from the db', (done) => {
      const stub = sinon.stub(Request, 'findByPk').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .post(`${endpoint}/${requestId}`)
        .send(content)
        .set('authorization', managerToken)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });

    it('should return request not found', (done) => {
      chai
        .request(app)
        .post(`${endpoint}/${invalidRequestId}`)
        .send(content)
        .set('authorization', managerToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
        });
    });

    it('should return internal server error if a problem occurs while fetching the managerId from the db', (done) => {
      const stub = sinon.stub(User, 'findByPk').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .post(`${endpoint}/${requestId}`)
        .send(content)
        .set('authorization', managerToken)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });

    it('should return internal server error if a problem occurs while adding the new notification to the db', (done) => {
      const stub = sinon.stub(Notification, 'create').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .post(`${endpoint}/${requestId}`)
        .send(content)
        .set('authorization', managerToken)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });

  describe('GET /comments/:requestId', () => {
    it('should return validation error', (done) => {
      chai
        .request(app)
        .get(`${endpoint}/38eb202c-3f67`)
        .set('authorization', managerToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
        });
    });

    it('should return internal server error if a problem occurs while getting the comments from the db', (done) => {
      const stub = sinon.stub(Comment, 'findAndCountAll').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .get(`${endpoint}/${requestId}`)
        .set('authorization', superAdminToken)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });

    it('should get all request comments', (done) => {
      chai
        .request(app)
        .get(`${endpoint}/${requestId}`)
        .set('authorization', superAdminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });

    it('should return no comment', (done) => {
      chai
        .request(app)
        .get(`${endpoint}/${requestWithNoCommentId}`)
        .set('authorization', superAdminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });
  });
});
