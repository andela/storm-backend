import {
  app, chai, expect, BACKEND_BASE_URL, messages,
} from '../testHelpers/config';
import { validAccommodationDetail, inValidAccommodationDetail, userId } from '../mockData/accommodationMock';
import authHelper from '../../utils/authHelper';

const { generateToken } = authHelper;

describe('Create Accommodation', () => {
  const accommodationEndpoint = `${BACKEND_BASE_URL}/accommodation`;
  let token;

  before(async () => {
    token = generateToken({ id: userId });
  });

  describe('POST /accommodation', () => {
    it('should post accommodation successfully', (done) => {
      chai.request(app)
        .post(accommodationEndpoint)
        .set('authorization', token)
        .set('Authorization', `Bearer ${token}`)
        .send(validAccommodationDetail)
        .end((err, res) => {
          const { data } = res.body;
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
});
