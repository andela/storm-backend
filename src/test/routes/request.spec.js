import { Op } from 'sequelize';
import {
  app, chai, expect, sinon, BASE_URL, messages
} from '../testHelpers/config';
import models from '../../models';
import mockData from '../mockData';
import authHelper from '../../utils/authHelper';

const { Request, User } = models;
const {
  validTripRequest, badInputTripRequest, oneWayTripRequestWithReturnDate,
  validReturnTripRequest, returnTripRequestWithDepartureGreaterThanReturnDate,
  validMultiCityRequest, multiCityBadRequest
} = mockData.requestMock;
const { generateToken } = authHelper;

describe('REQUESTS', () => {
  const requestTripEndpoint = `${BASE_URL}/requests`;
  const searchRequestTripEndpoint = `${BASE_URL}/search/requests`;
  let user, token;

  before(async () => {
    user = await User.findOne({ where: { lineManager: { [Op.ne]: null } } });
    token = `Bearer ${generateToken({ id: user.id })}`;
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
          expect(data).to.have.property('type', 'one-way');
          expect(data).to.have.property('originCity');
          expect(data).to.have.property('destinationCity');
          expect(data).to.have.property('departureDate');
          expect(data).to.have.property('reason');
          expect(data).to.have.property('accommodation');
          done(err);
        });
    });

    it('should request a return trip successfully', (done) => {
      chai.request(app)
        .post(requestTripEndpoint)
        .set('authorization', token)
        .send(validReturnTripRequest)
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(201);
          expect(data).to.have.property('type', validReturnTripRequest.type);
          expect(data).to.have.property('originCity', validReturnTripRequest.originCity);
          expect(data).to.have.property('destinationCity', validReturnTripRequest.destinationCity);
          expect(data).to.have.property('departureDate');
          expect(data).to.have.property('returnDate');
          expect(data).to.have.property('reason', validReturnTripRequest.reason);
          expect(data).to.have.property('accommodation', validReturnTripRequest.accommodation);
          done(err);
        });
    });

    it('should show missing key validation error', (done) => {
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

    it('should show daparture date is greater than return date validation error', (done) => {
      chai.request(app)
        .post(requestTripEndpoint)
        .set('authorization', token)
        .send(returnTripRequestWithDepartureGreaterThanReturnDate)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
        });
    });

    it('should show validation error', (done) => {
      chai.request(app)
        .post(requestTripEndpoint)
        .set('authorization', token)
        .send(oneWayTripRequestWithReturnDate)
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

    it('should request a multi city trip successfully', (done) => {
      chai.request(app)
        .post(requestTripEndpoint)
        .set('authorization', token)
        .send(validMultiCityRequest)
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(201);
          expect(data).to.have.property('requestedTrip');
          expect(data).to.have.property('subRequestedTrips');
          expect(data.requestedTrip).to.have.property('type');
          expect(data.requestedTrip).to.have.property('originCity');
          expect(data.requestedTrip).to.have.property('destinationCity');
          expect(data.requestedTrip).to.have.property('departureDate');
          expect(data.requestedTrip).to.have.property('reason');
          expect(data.requestedTrip).to.have.property('multiCity');
          expect(data.requestedTrip).to.have.property('accommodation');
          done(err);
        });
    });

    it('should return an bad request error 400', (done) => {
      const stub = sinon.stub(Request, 'create').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .post(requestTripEndpoint)
        .set('authorization', token)
        .send(multiCityBadRequest)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });

  describe('GET /requests/user/:userId', () => {
    it('should get a users requests', async () => {
      const response = await chai.request(app).get(`${BASE_URL}/requests/user/${user.id}`)
        .set('authorization', token);
      const { body: { data, status } } = response;
      expect(response.status).to.equal(200);
      expect(status).to.equal('success');
      expect(data).to.have.property('meta');
    });

    it('should get a users requests when "page" and "perPage" are passed to the req.query', async () => {
      const response = await chai.request(app).get(`${BASE_URL}/requests/user/${user.id}?page=2&perPage=1`)
        .set('authorization', token);
      const { body: { data, status } } = response;
      expect(response.status).to.equal(200);
      expect(status).to.equal('success');
      expect(data).to.have.property('meta');
    });

    it('should return a message if result is empty', async () => {
      const response = await chai.request(app).get(`${BASE_URL}/requests/user/${user.id}?page=5&perPage=2`)
        .set('authorization', token);
      const { body: { data: { message }, status } } = response;
      expect(response.status).to.equal(200);
      expect(status).to.equal('success');
      expect(message).to.equal(messages.noRequests);
    });
  });

  describe('GET /requests', () => {
    it('should able to search for request successfully', (done) => {
      chai.request(app)
        .post(searchRequestTripEndpoint)
        .set('authorization', token)
        .send({ type: 'return' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });
    });

    it('should able to search for request successfully using origin and destination', (done) => {
      chai.request(app)
        .post(searchRequestTripEndpoint)
        .set('authorization', token)
        .send({ originCity: 'lagos', destinationCity: 'Istanbul' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });
    });

    it('should able to search for request successfully using approvalstatus', (done) => {
      chai.request(app)
        .post(searchRequestTripEndpoint)
        .set('authorization', token)
        .send({ originCity: 'Lagos', approvalStatus: true })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });
    });

    it('should able to search for request successfully using multiCity', (done) => {
      chai.request(app)
        .post(searchRequestTripEndpoint)
        .set('authorization', token)
        .send({ originCity: 'Lagos', multiCity: true })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });
    });

    it('should return 200 for ilike search', (done) => {
      chai.request(app)
        .post('/api/v1/search/requests/?originCity=LAGOS')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });
    });
  });
});
