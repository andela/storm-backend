import {
  app, chai, expect
} from '../testHelpers/config';
import mockData from '../mockData';
import authHelper from '../../utils/authHelper';

const invalidToken = 'invalidToken';
const { userMock } = mockData;
const { generateToken } = authHelper;
const baseEmailVerificationEndpoint = '/api/v1/user/verify/';


describe('VERIFY EMAIL', () => {
  describe('GET /user/verify/:token', () => {
    it('should return error response when token is invalid', async () => {
      const response = await chai.request(app)
        .get(baseEmailVerificationEndpoint + invalidToken);
      expect(response.status).to.equal(403);
    });

    it('should return error response when token is invalid', async () => {
      const jwtToken = generateToken({ id: userMock.userId });
      const response = await chai.request(app)
        .get(baseEmailVerificationEndpoint + jwtToken);
      expect(response).to.have.property('redirect');
    });
  });
});
