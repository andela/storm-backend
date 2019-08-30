import {
  app, chai, expect, BACKEND_BASE_URL
} from '../testHelpers/config';
import mockData from '../mockData';
import authHelper from '../../utils/authHelper';

const { generateToken } = authHelper;
const { userMock } = mockData;
const { requestToBeRejected } = mockData.requestMock;

describe('REQUESTS', () => {
  const rejectRequestTripEndpoint = `${BACKEND_BASE_URL}/requests/reject/${requestToBeRejected.requestId}`;
  let token;

  before(async () => {
    token = generateToken({ id: `${userMock.wrongId}` });
  });

  describe('VERIFY MANAGER', () => {
    it('should return a error response when manager is not a line manager', async () => {
      const response = await chai.request(app)
        .patch(rejectRequestTripEndpoint)
        .set('authorization', `Bearer ${token}`);
      expect(response.status).to.equal(401);
    });
  });
});
