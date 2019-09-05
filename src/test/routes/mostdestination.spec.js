import {
  app, chai, expect, sinon, BACKEND_BASE_URL
} from '../testHelpers/config';
import mockData from '../mockData';
import models from '../../models';
import authHelper from '../../utils/authHelper';
import roles from '../../utils/roles';

const { generateToken } = authHelper;
const { User, Mostdestination } = models;

let managerToken;

const { requestMock: { requestToBeAccepted }, userMock: { anotherManagerId } } = mockData;

const acceptRequestTripEndpoint = `${BACKEND_BASE_URL}/requests/accept/${requestToBeAccepted.requestId}`;
const endpoint = `${BACKEND_BASE_URL}/mostdestination`;

const user = { data: {}, token: '' };
const { MANAGER } = roles;

before(async () => {
  user.data = await User.findOne();
  user.token = `Bearer ${generateToken({ id: user.data.id })}`;
  managerToken = `Bearer ${generateToken({ id: anotherManagerId, roleId: MANAGER })}`;
});

describe('Most Traveled Destinations', () => {
  describe('GET /mostdestination', () => {
    it('should return top 10 traveled destination', (done) => {
      chai
        .request(app)
        .get(endpoint)
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });
    it('should return an internal server error', (done) => {
      const stub = sinon.stub(Mostdestination, 'findAll').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .get(endpoint)
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });
  describe('POST /requests/accept/requestId', () => {
    it('should return 201 response when trip is accepted and most traveled destination updated', async () => {
      const response = await chai.request(app)
        .patch(acceptRequestTripEndpoint)
        .set('Authorization', managerToken);
      expect(response.status).to.equal(201);
    });
  });
});
