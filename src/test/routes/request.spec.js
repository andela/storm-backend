import {
  app, chai, expect, sinon, BASE_URL
} from '../testHelpers/config';
import models from '../../models';
import mockData from '../mockData';
import { generateToken } from '../../utils/authHelper';

const { Request } = models;
const { validTripRequest, badInputTripRequest } = mockData.requestMock;

describe('REQUESTS', () => {
  const requestTripEndpoint = `${BASE_URL}/requests`;
  let token;

  before(async () => {
    token = generateToken({ id: validTripRequest.userId });
  });

  describe('POST /requests', () => {
    it('should request a trip successfully', (done) => {
      chai.request(app)
        .post(requestTripEndpoint)
        .set('authorization', token)
        .send(validTripRequest)
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(201);
          expect(data).to.have.property('type');
          expect(data).to.have.property('originCity');
          expect(data).to.have.property('destinationCity');
          expect(data).to.have.property('departureDate');
          expect(data).to.have.property('reason');
          expect(data).to.have.property('accommodation');
          done(err);
        });
    });

    it('should show validation error', (done) => {
      chai.request(app)
        .post(requestTripEndpoint)
        .set('authorization', token)
        .send(badInputTripRequest)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
        });
    });

    it('should return an internal server error', (done) => {
      const stub = sinon.stub(Request, 'create').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .post(requestTripEndpoint)
        .set('authorization', token)
        .send(validTripRequest)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });
});
