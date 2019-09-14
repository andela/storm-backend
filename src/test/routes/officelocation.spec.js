import {
  app, chai, expect, sinon, BACKEND_BASE_URL,
} from '../testHelpers/config';
import mockData from '../mockData';
import models from '../../models';
import { generateToken } from '../../utils/authHelper';
import roles from '../../utils/roles';

const {
  OfficeLocation
} = models;
const { officelocationMock } = mockData;
const { validLocationData, inValidLocationData, usersData } = officelocationMock;
const { REQUESTER, MANAGER, SUPER_ADMIN } = roles;


describe('OFFICE LOCATIONS', () => {
  let managerToken, requesterToken, superAdminToken;

  before(async () => {
    managerToken = generateToken({ id: usersData.managerId, roleId: MANAGER });
    requesterToken = generateToken({ id: usersData.requesterId, roleId: REQUESTER });
    superAdminToken = generateToken({ id: usersData.superAdminId, roleId: SUPER_ADMIN });
  });

  const endpoint = `${BACKEND_BASE_URL}/officelocation`;

  describe('POST /officelocation', () => {
    it('should return validation error', (done) => {
      chai
        .request(app)
        .post(`${endpoint}`)
        .set('authorization', superAdminToken)
        .send(inValidLocationData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
        });
    });
    it('should return manager unauthorized error', (done) => {
      chai
        .request(app)
        .post(`${endpoint}`)
        .set('authorization', managerToken)
        .send(validLocationData)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
        });
    });
    it('should return requester unauthorized error', (done) => {
      chai
        .request(app)
        .post(`${endpoint}`)
        .set('authorization', requesterToken)
        .send(validLocationData)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
        });
    });
    it('should return location created successfully', (done) => {
      chai
        .request(app)
        .post(`${endpoint}`)
        .set('authorization', superAdminToken)
        .send(validLocationData)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equal('success');
          done(err);
        });
    });

    it('should return internal server error if a problem occurs while creating office location', (done) => {
      const stub = sinon.stub(OfficeLocation, 'create').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .post(`${endpoint}`)
        .send(validLocationData)
        .set('authorization', superAdminToken)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });

  describe('GET /officelocation', () => {
    it('should get all office locations', (done) => {
      chai
        .request(app)
        .get(`${endpoint}`)
        .set('authorization', superAdminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });

    it('should get office locations by id', (done) => {
      chai
        .request(app)
        .get(`${endpoint}/${usersData.locationId}`)
        .set('authorization', requesterToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });

    it('should return location not found', (done) => {
      chai
        .request(app)
        .get(`${endpoint}/${usersData.invalidLocationId}`)
        .set('authorization', managerToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equal('success');
          expect(res.body.data).to.have.property('message').that.equal('Office Location not found');
          done(err);
        });
    });

    it('should return bad request response if locationId is wrong uuid', (done) => {
      chai
        .request(app)
        .get(`${endpoint}/uyuuyu9797`)
        .set('authorization', superAdminToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
        });
    });
  });
});
