import {
  app, chai, expect, sinon, BACKEND_BASE_URL, messages
} from '../testHelpers/config';
import models from '../../models';
import mockData from '../mockData';
import { generateToken } from '../../utils/authHelper';
import roles from '../../utils/roles';

import { travelAdmin } from '../mockData/accommodationMock';

const { Request } = models;
const {
  userMock: {
    userId, anotherManagerId, requesterId, noLineManager,
    editRequesterUserId, lineManager2, unauthorizedUser
  }, requestMock
} = mockData;
const {
  validTripRequest, badInputTripRequest, oneWayTripRequestWithReturnDate,
  validReturnTripRequest, returnTripRequestWithDepartureGreaterThanReturnDate,
  validMultiCityRequest, multiCityBadRequest, requestToBeRejected, requestToBeEdited
} = requestMock;


describe('REQUESTS', () => {
  let token, unassignedUserToken, managerToken, superAdmin,
    editRequesterIdToken, manager2Token, unauthorizedUserToken;
  const requestTripEndpoint = `${BACKEND_BASE_URL}/requests`;
  const searchRequestTripEndpoint = `${BACKEND_BASE_URL}/search/requests`;
  const rejectRequestTripEndpoint = `${BACKEND_BASE_URL}/requests/reject/${requestToBeRejected.requestId}`;
  const acceptRequestTripEndpoint = `${BACKEND_BASE_URL}/requests/accept/${requestToBeRejected.requestId}`;
  const invalidRejectRequestTripEndpoint = `${BACKEND_BASE_URL}/requests/reject/${requestToBeRejected.wrongRequestId}`;
  const xTripStatEndpoint = `${BACKEND_BASE_URL}/stats/requests`;
  const signinEndpoint = `${BACKEND_BASE_URL}/user/signin`;
  const { REQUESTER, SUPER_ADMIN, MANAGER } = roles;
  const editRequestTripEndpoint = `${BACKEND_BASE_URL}/requests/edit/${requestToBeEdited.requestId}`;

  let token1;

  before(async () => {
    token = `Bearer ${generateToken({ id: requesterId, roleId: REQUESTER })}`;
    managerToken = `Bearer ${generateToken({ id: anotherManagerId, roleId: MANAGER })}`;
    superAdmin = `Bearer ${generateToken({ id: userId, roleId: SUPER_ADMIN })}`;
    unassignedUserToken = `Bearer ${generateToken({ id: noLineManager, roleId: REQUESTER })}`;
    editRequesterIdToken = generateToken({ id: `${editRequesterUserId}` });
    manager2Token = `Bearer ${generateToken({ id: lineManager2, roleId: MANAGER })}`;
    unauthorizedUserToken = `Bearer ${generateToken({ id: unauthorizedUser, roleId: MANAGER })}`;
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

    it('should not create a request if user has no line manager', (done) => {
      chai.request(app)
        .post(requestTripEndpoint)
        .set('authorization', unassignedUserToken)
        .send(validReturnTripRequest)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('status').that.equals('error');
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

  describe('GET /requests/user', () => {
    it('should get a users requests', async () => {
      const response = await chai.request(app).get(`${BACKEND_BASE_URL}/requests/user/?userId=${requesterId}`)
        .set('authorization', token);
      const { body: { data, status } } = response;
      expect(response.status).to.equal(200);
      expect(status).to.equal('success');
      expect(data).to.have.property('meta');
    });

    it('should get a users requests when userId is not provided', async () => {
      const response = await chai.request(app).get(`${BACKEND_BASE_URL}/requests/user/?page=2&perPage=1`)
        .set('authorization', token);
      const { body: { data, status } } = response;
      expect(response.status).to.equal(200);
      expect(status).to.equal('success');
      expect(data).to.have.property('meta');
    });

    it('should get a users requests when "page" and "perPage" are passed to the req.query', async () => {
      const response = await chai.request(app).get(`${BACKEND_BASE_URL}/requests/user/?userId=${requesterId}&page=2&perPage=1`)
        .set('authorization', token);
      const { body: { data, status } } = response;
      expect(response.status).to.equal(200);
      expect(status).to.equal('success');
      expect(data).to.have.property('meta');
    });

    it('should get a users requests when "approvalStatus" is passed to the req.query', async () => {
      const response = await chai.request(app).get(`${BACKEND_BASE_URL}/requests/user/?userId=${requesterId}&page=1&perPage=1&approvalStatus=accepted`)
        .set('authorization', token);
      const { body: { data, status } } = response;
      expect(response.status).to.equal(200);
      expect(status).to.equal('success');
      expect(data).to.have.property('meta');
    });

    it('should return a message if result is empty', async () => {
      const response = await chai.request(app).get(`${BACKEND_BASE_URL}/requests/user/?userId=${requesterId}&page=5&perPage=2`)
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
        .get(searchRequestTripEndpoint)
        .set('authorization', token)
        .send({ type: 'return' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });
    });

    it('should able to search for request successfully using origin and destination', (done) => {
      chai.request(app)
        .get(searchRequestTripEndpoint)
        .set('authorization', token)
        .send({ originCity: 'lagos', destinationCity: 'Istanbul' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });
    });

    it('should able to search for request successfully using approvalstatus', (done) => {
      chai.request(app)
        .get(searchRequestTripEndpoint)
        .set('authorization', token)
        .send({ originCity: 'Lagos', approvalStatus: 'accepted' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });
    });

    it('should able to search for request successfully using multiCity', (done) => {
      chai.request(app)
        .get(searchRequestTripEndpoint)
        .set('authorization', token)
        .send({ originCity: 'Lagos', multiCity: true })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });
    });

    it('should return 200 for ilike search', (done) => {
      chai.request(app)
        .get('/api/v1/search/requests/?originCity=LAGOS')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });

      describe('LINE MANAGER REJECTS A TRIP REQUEST', () => {
        it('should return 201 response when confirmation boolean is not passed', async () => {
          const response = await chai.request(app)
            .patch(rejectRequestTripEndpoint)
            .set('Authorization', managerToken);
          expect(response.status).to.equal(201);
          expect(response.body.data.message).to.equal('Please confirm this action by passing confirmation as true as query parameter in your request');
        });

        it('should return 201 response when trip is rejected', async () => {
          const response = await chai.request(app)
            .patch(`${rejectRequestTripEndpoint}?confirmation=true`)
            .set('Authorization', managerToken);
          expect(response.status).to.equal(201);
        });

        it('should return 201 response when trip is rejected', async () => {
          const response = await chai.request(app)
            .patch(`${acceptRequestTripEndpoint}?confirmation=true`)
            .set('Authorization', managerToken);
          expect(response.status).to.equal(201);
        });

        it('should return 404 response when requestId is wrong', async () => {
          const response = await chai.request(app)
            .patch(invalidRejectRequestTripEndpoint)
            .set('Authorization', managerToken);
          expect(response.status).to.equal(404);
        });
      });

      describe('USER EDITS TRIP REQUEST', () => {
        it('should return 201 response when trip request is edited', async () => {
          const response = await chai.request(app)
            .put(editRequestTripEndpoint)
            .set('authorization', `Bearer ${editRequesterIdToken}`)
            .send(requestToBeEdited.requestBody);
          expect(response.status).to.equal(201);
        });
      });
    });
  });

  describe('GET /requests/manager', () => {
    it('should get a managers requests', async () => {
      const response = await chai.request(app).get(`${BACKEND_BASE_URL}/requests/manager/?userId=${anotherManagerId}`)
        .set('authorization', managerToken);
      const { body: { data, status } } = response;
      expect(response.status).to.equal(200);
      expect(status).to.equal('success');
      expect(data).to.have.property('meta');
    });

    it('should get a managers requests if userId is not passed to query', async () => {
      const response = await chai.request(app).get(`${BACKEND_BASE_URL}/requests/manager`)
        .set('authorization', managerToken);
      const { body: { data, status } } = response;
      expect(response.status).to.equal(200);
      expect(status).to.equal('success');
      expect(data).to.have.property('meta');
    });

    it('should get a managers requests if super admin is logged in', async () => {
      const response = await chai.request(app).get(`${BACKEND_BASE_URL}/requests/manager/?userId=${anotherManagerId}`)
        .set('authorization', superAdmin);
      const { body: { data, status } } = response;
      expect(response.status).to.equal(200);
      expect(status).to.equal('success');
      expect(data).to.have.property('meta');
    });

    it('should get a managers requests when "page" and "perPage" are passed to the req.query', async () => {
      const response = await chai.request(app).get(`${BACKEND_BASE_URL}/requests/manager/?userId=${anotherManagerId}&page=1&perPage=1`)
        .set('authorization', managerToken);
      const { body: { data, status } } = response;
      expect(response.status).to.equal(200);
      expect(status).to.equal('success');
      expect(data).to.have.property('meta');
    });

    it('should return a message if result is empty', async () => {
      const response = await chai.request(app).get(`${BACKEND_BASE_URL}/requests/manager/?userId=${anotherManagerId}&page=5&perPage=2`)
        .set('authorization', managerToken);
      const { body: { data: { message }, status } } = response;
      expect(response.status).to.equal(200);
      expect(status).to.equal('success');
      expect(message).to.equal(messages.noRequests);
    });
  });

  describe('GET /stats/requests', () => {
    it('should generate travel admin token', (done) => {
      chai
        .request(app)
        .post(signinEndpoint)
        .send(travelAdmin)
        .end((err, res) => {
          const { data } = res.body;
          token1 = data.token;
          expect(data).to.have.property('token');
          done(err);
        });
    });

    it('should get all user trip requests stats', async () => {
      const response = await chai.request(app).get(`${xTripStatEndpoint}`)
        .set('authorization', token1);
      const { body: { status } } = response;
      expect(response.status).to.equal(200);
      expect(status).to.equal('success');
    });
  });

  describe('GET SPECIFIC REQUEST (/requests/:requestId)', () => {
    it('should respond with 401 when line manager is not authorized', async () => {
      const response = await chai.request(app).get(`${BACKEND_BASE_URL}/requests/${requestToBeEdited.requestId}`)
        .set('authorization', manager2Token);
      const { body: { status } } = response;
      expect(response.status).to.equal(401);
      expect(status).to.equal('error');
    });

    it('should respond with 401 when user is not authorized', async () => {
      const response = await chai.request(app).get(`${BACKEND_BASE_URL}/requests/${requestToBeEdited.requestId}`)
        .set('authorization', unauthorizedUserToken);
      const { body: { status } } = response;
      expect(response.status).to.equal(401);
      expect(status).to.equal('error');
    });

    it('should respond with 200 when user is a SUPER ADMIN', async () => {
      const response = await chai.request(app).get(`${BACKEND_BASE_URL}/requests/${requestToBeEdited.requestId}`)
        .set('authorization', superAdmin);
      const { body: { status } } = response;
      expect(response.status).to.equal(200);
      expect(status).to.equal('success');
    });
  });
});
