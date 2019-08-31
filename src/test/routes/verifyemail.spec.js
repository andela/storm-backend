import {
  app, chai, expect, sinon
} from '../testHelpers/config';
import models from '../../models';
import authHelper from '../../utils/authHelper';

const { User } = models;
const { generateToken } = authHelper;

const invalidToken = 'invalidToken';

let user, token;

before(async () => {
  user = await User.findOne({ where: { verified: false } });
  token = generateToken({ id: user.id });
});

describe('Verify Email', () => {
  const endpoint = '/api/v1/user/verify/';
  describe('GET /user/verify/:token', () => {
    it('should return error response when token is invalid', (done) => {
      chai.request(app)
        .get(endpoint + invalidToken)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

  describe('GET /user/verify/:token', () => {
    it('should verify email successfully and redirect to signup page', (done) => {
      chai.request(app)
        .get(endpoint + token).redirects(0)
        .end((err, res) => {
          res.should.redirectTo(process.env.SIGNIN_PAGE);
          done();
        });
    });
  });

  describe('GET /user/verify/:token', () => {
    it('should return an internal server error', (done) => {
      const stub = sinon.stub(User, 'update').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai.request(app)
        .get(endpoint + token).redirects(0)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });
});
