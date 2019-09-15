import {
  app, chai, expect, BACKEND_BASE_URL, messages, sinon
} from '../testHelpers/config';
import {
  validAccommodationDetail, inValidAccommodationDetail, travelAdmin, inValidRoomType,
  validFeedbackmessage, validBookingDetails, inValidBookingDetails, inValidBookingDate,
  accommodationId, wrongAccommodationId, unverifiedTravelAdmin
} from '../mockData/accommodationMock';
import models from '../../models';

const {
  Rating, Accommodation, Request, AccommodationLike, AccomodationFeedback
} = models;

describe('Create Accommodation', () => {
  const accommodationEndpoint = `${BACKEND_BASE_URL}/accommodation`;
  const bookAccommodationEndpoint = `${BACKEND_BASE_URL}/book/accommodation`;
  const feedbackAccommodationEndpoint = `${BACKEND_BASE_URL}/feedback/accommodation`;
  const signinEndpoint = `${BACKEND_BASE_URL}/user/signin`;
  let token;
  let unverifiedToken;
  let id;

  describe('POST /accommodation', () => {
    it('should generate verified travel admin token', (done) => {
      chai
        .request(app)
        .post(signinEndpoint)
        .send(travelAdmin)
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(200);
          expect(data).to.have.property('token');
          token = data.token;
          done(err);
        });
    });

    it('should generate unverified travel admin token', (done) => {
      chai
        .request(app)
        .post(signinEndpoint)
        .send(unverifiedTravelAdmin)
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(200);
          expect(data).to.have.property('token');
          unverifiedToken = data.token;
          done(err);
        });
    });

    it('should not post accommodation if email address is not verified', (done) => {
      chai.request(app)
        .post(accommodationEndpoint)
        .set('Authorization', `Bearer ${unverifiedToken}`)
        .send(validAccommodationDetail)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done(err);
        });
    });

    it('should post accommodation successfully', (done) => {
      chai.request(app)
        .post(accommodationEndpoint)
        .set('Authorization', `Bearer ${token}`)
        .send(validAccommodationDetail)
        .end((err, res) => {
          const { data } = res.body;
          id = data.id;
          expect(res.status).to.equal(201);
          expect(data).to.have.property('country');
          expect(data).to.have.property('city');
          expect(data).to.have.property('accommodation');
          expect(data).to.have.property('accommodationType');
          expect(data).to.have.property('roomType');
          expect(data).to.have.property('numOfRooms');
          expect(data).to.have.property('facilities');
          done(err);
        });
    });

    it('should not post accommodation if country is invalid', (done) => {
      chai.request(app)
        .post(accommodationEndpoint)
        .set('Authorization', `Bearer ${token}`)
        .send(inValidAccommodationDetail)
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(400);
          expect(data).to.have.property('Incorrect');
          expect(data.Incorrect).to.be.equal(messages.inValidCountry);
          done(err);
        });
    });

    it('should not post accommodation with empty data', (done) => {
      chai.request(app)
        .post(accommodationEndpoint)
        .set('Authorization', `Bearer ${token}`)
        .attach('images', '')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(err);
        });
    });

    it('should return an internal server error', (done) => {
      const stub = sinon.stub(Accommodation, 'create').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .post(accommodationEndpoint)
        .set('Authorization', `Bearer ${token}`)
        .send(validAccommodationDetail)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });


  describe('POST /book/accommodation', () => {
    it('should book accommodation successfully', (done) => {
      chai.request(app)
        .post(`${bookAccommodationEndpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(validBookingDetails)
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(201);
          expect(data).to.have.property('accommodationId');
          expect(data).to.have.property('adults');
          expect(data).to.have.property('children');
          expect(data).to.have.property('checkIn');
          expect(data).to.have.property('checkOut');
          expect(data).to.have.property('userId');
          expect(data).to.have.property('typeOfRoom');
          expect(data).to.have.property('numOfRooms');
          done(err);
        });
    });

    it('should return a 404 if request not found while booking an accommodation', (done) => {
      const stub = sinon.stub(Request, 'findByPk').callsFake(() => null);
      chai
        .request(app)
        .post(`${bookAccommodationEndpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(validBookingDetails)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });

    it('should return an internal server error', (done) => {
      const stub = sinon.stub(Request, 'findByPk').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .post(`${bookAccommodationEndpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(validBookingDetails)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });

    it('should return error if room specify is not in accommodation', (done) => {
      chai.request(app)
        .post(`${bookAccommodationEndpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(inValidRoomType)
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(400);
          expect(data).to.have.property('message');
          done(err);
        });
    });

    it('should not book unavailable accommodation', (done) => {
      chai.request(app)
        .post(`${bookAccommodationEndpoint}/bf4d0b97-2e80-44cc-bc0e-bafafdb8c9bb`)
        .set('Authorization', `Bearer ${token}`)
        .send(validBookingDetails)
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(404);
          expect(data).to.have.property('message');
          expect(data.message).to.be.equal(messages.notExistAccommodation);
          done(err);
        });
    });

    it('should not post accommodation with empty data', (done) => {
      chai.request(app)
        .post(`${bookAccommodationEndpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(inValidBookingDetails)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('error');
          done(err);
        });
    });

    it('should return 400 error if checkIn date is equal or greater than checkOut date', (done) => {
      chai.request(app)
        .post(`${bookAccommodationEndpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(inValidBookingDate)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.equal('error');
          done(err);
        });
    });
  });

  describe('PATCH /accommodations/:accommodationId/like', () => {
    const likeAccommodationEndpoint = `${BACKEND_BASE_URL}/accommodations/${accommodationId}/like`;
    const wrongLikeAccommodationEndpoint = `${BACKEND_BASE_URL}/accommodations/${wrongAccommodationId}/like`;

    it('should return 201 when an accommodation is successfully liked for the first time', async () => {
      const response = await chai.request(app)
        .patch(likeAccommodationEndpoint)
        .set('authorization', token);
      const { status, body: { data: { liked } } } = response;
      expect(status).to.equal(201);
      expect(liked).to.equal(true);
    });

    it('should return 202 when an accommodation is successfully unliked', async () => {
      const { status, body: { data: { liked } } } = await chai.request(app)
        .patch(likeAccommodationEndpoint)
        .set('authorization', token);
      expect(status).to.equal(202);
      expect(liked).to.equal(false);
    });

    it('should return 404 when an accommodationId is wrong', async () => {
      const { status } = await chai.request(app)
        .patch(wrongLikeAccommodationEndpoint)
        .set('authorization', token);
      expect(status).to.equal(404);
    });

    it('should return an internal server error', (done) => {
      const stub = sinon.stub(AccommodationLike, 'findOrCreate').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .patch(likeAccommodationEndpoint)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });

  describe('POST /feedback/accommodation', () => {
    it('should be able to post feedback on accomodation', (done) => {
      chai.request(app)
        .post(`${feedbackAccommodationEndpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(validFeedbackmessage)
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(200);
          expect(data).to.have.property('message');
          done(err);
        });
    });

    it('should return validation error if no message', (done) => {
      chai.request(app)
        .post(`${feedbackAccommodationEndpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .end((err, res) => {
          const { data } = res.body;
          expect(res.status).to.equal(400);
          expect(data).to.have.property('message');
          done(err);
        });
    });

    it('should return an internal server error', (done) => {
      const stub = sinon.stub(AccomodationFeedback, 'create').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .post(`${feedbackAccommodationEndpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(validFeedbackmessage)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });

  describe('GET /accommodation/:destinationCity', () => {
    it('should return 200 when an accommodation is successfully gotten by destination city', async () => {
      const response = await chai.request(app)
        .get(`${accommodationEndpoint}/lagos`)
        .set('authorization', token);
      const { status } = response;
      expect(status).to.equal(200);
    });

    it('should return an internal server error', (done) => {
      const stub = sinon.stub(Accommodation, 'findAll').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .get(`${accommodationEndpoint}/lagos`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });

  describe('POST /accommodation/:accommodationId/rate', () => {
    const endpoint = `${BACKEND_BASE_URL}/accommodations/${accommodationId}/rate`;

    it('should succesfully rate an accommodation', (done) => {
      chai.request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .send({ value: 4 })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });

    it('should succesfully update a user\'s rating on an accommodation', (done) => {
      chai.request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .send({ value: 4 })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });

    it('should invalidate rating value', (done) => {
      chai.request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .send({ value: 4.2 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').that.equals('error');
          done(err);
        });
    });

    it('should return an internal server error', (done) => {
      const stub = sinon.stub(Rating, 'findOne').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .send({ value: 4 })
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });

    it('should return a 404 if accommodation was not found', (done) => {
      const stub = sinon.stub(Accommodation, 'findByPk').callsFake(() => null);
      chai
        .request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .send({ value: 4 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });

    it('should return an internal server error', (done) => {
      const stub = sinon.stub(Accommodation, 'findByPk').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .send({ value: 4 })
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });
});
