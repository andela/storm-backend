import {
  app, chai, expect, BACKEND_BASE_URL, messages,
} from '../testHelpers/config';
import {
  validAccommodationDetail, inValidAccommodationDetail, travelAdmin, inValidRoomType,
  validBookingDetails, inValidBookingDetails, inValidBookingDate
} from '../mockData/accommodationMock';

describe('Create Accommodation', () => {
  const accommodationEndpoint = `${BACKEND_BASE_URL}/accommodation`;
  const bookAccommodationEndpoint = `${BACKEND_BASE_URL}/book/accommodation`;
  const signinEndpoint = `${BACKEND_BASE_URL}/user/signin`;
  let token;
  let id;

  describe('POST /accommodation', () => {
    it('should generate travel admin token', (done) => {
      chai
        .request(app)
        .post(signinEndpoint)
        .send(travelAdmin)
        .end((err, res) => {
          const { data } = res.body;
          token = data.token;
          expect(data).to.have.property('token');
          done(err);
        });
    });

    it('should post accommodation successfully', (done) => {
      chai.request(app)
        .post(accommodationEndpoint)
        .set('authorization', token)
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
        .set('authorization', token)
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
        .set('authorization', token)
        .set('Authorization', `Bearer ${token}`)
        .attach('images', '')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(err);
        });
    });
  });


  describe('POST /book/accommodation', () => {
    it('should book accommodation successfully', (done) => {
      chai.request(app)
        .post(`${bookAccommodationEndpoint}/${id}`)
        .set('authorization', token)
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

    it('should return error if room specify is not in accommodation', (done) => {
      chai.request(app)
        .post(`${bookAccommodationEndpoint}/${id}`)
        .set('authorization', token)
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
        .set('authorization', token)
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
        .set('authorization', token)
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
        .set('authorization', token)
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
});
