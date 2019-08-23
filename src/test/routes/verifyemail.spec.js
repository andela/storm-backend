import {
  app, chai, expect
} from '../testHelpers/config';

const invalidToken = 'invalidToken';
const baseEmailVerificationEndpoint = '/api/v1/user/verify/';


describe('VERIFY EMAIL', () => {
  describe('GET /user/verify/:token', () => {
    it('should return error response when token is invalid', async () => {
      const response = await chai.request(app)
        .get(baseEmailVerificationEndpoint + invalidToken);
      expect(response.status).to.equal(403);
    });
  });
});
