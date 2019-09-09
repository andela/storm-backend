import {
  app, chai, expect, BACKEND_BASE_URL
} from '../testHelpers/config';
import mockData from '../mockData';
import { generateToken } from '../../utils/authHelper';

const { userMock } = mockData;
const { requestToBeRejected, requestToBeEdited, acceptedRequest } = mockData.requestMock;

describe('REQUESTS', () => {
  const rejectRequestTripEndpoint = `${BACKEND_BASE_URL}/requests/reject/${requestToBeRejected.requestId}`;
  const editRequestTripEndpoint = `${BACKEND_BASE_URL}/requests/edit/${requestToBeEdited.requestId}`;
  const acceptedRequestTripEndpoint = `${BACKEND_BASE_URL}/requests/edit/${acceptedRequest.requestId}`;
  let wrongIdToken, editRequesterIdToken;

  before(async () => {
    wrongIdToken = generateToken({ id: `${userMock.wrongId}` });
    editRequesterIdToken = generateToken({ id: `${userMock.editRequesterUserId}` });
  });

  describe('VERIFY MANAGER', () => {
    it('should return a error response when manager is not a line manager', async () => {
      const response = await chai.request(app)
        .patch(rejectRequestTripEndpoint)
        .set('authorization', `Bearer ${wrongIdToken}`);
      expect(response.status).to.equal(401);
    });
  });

  describe('VERIFY AUTHORIZATION TO EDIT REQUEST', () => {
    it('should return a 401 error response when approval status is not open', async () => {
      const response = await chai.request(app)
        .put(acceptedRequestTripEndpoint)
        .set('authorization', `Bearer ${editRequesterIdToken}`)
        .send(requestToBeEdited.requestBody);
      expect(response.status).to.equal(401);
    });
    it('should return a 401 error response when user is not authourized', async () => {
      const response = await chai.request(app)
        .put(editRequestTripEndpoint)
        .set('authorization', `Bearer ${wrongIdToken}`);
      expect(response.status).to.equal(401);
    });
  });
});
