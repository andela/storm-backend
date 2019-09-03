import {
  app, chai, expect, messages
} from '../testHelpers/config';
import mockData from '../mockData';
import { generateToken } from '../../utils/authHelper';

const { userMock } = mockData;

const BASE_URL = '/api/v1';

let token,
  invalidToken;

before(async () => {
  const jwtToken = generateToken({ id: userMock.userId });
  token = jwtToken;
  invalidToken = generateToken({ id: userMock.wrongId });
});

describe('Reset and Update Password Endpoint', () => {
  it('should return 200 for existing user - Reset Password', async () => {
    const response = await chai.request(app)
      .post(`${BASE_URL}/forgot/password`)
      .send({ email: 'samuelman@gmail.com' });

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
  });
  it('should return 404 for non existing user - Update Password', async () => {
    const response = await chai.request(app)
      .patch(`${BASE_URL}/reset/password/${userMock.wrongId}/${token}`)
      .send({ password: 'newpassword' });

    expect(response.status).to.equal(403);
    expect(response.body.status).to.equal('error');
    expect(response.body.data.message).to.equal(messages.userNotFoundId);
  });
  it('should return 400 if user is found, token is valid but new password is empty', async () => {
    const response = await chai.request(app)
      .patch(`${BASE_URL}/reset/password/${userMock.wrongId}/${invalidToken}`)
      .send({ password: '' });

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal('error');
  });
  it('should return success if user is found, password and token is valid', async () => {
    const response = await chai.request(app)
      .patch(`${BASE_URL}/reset/password/${userMock.userId}/${token}`)
      .send({ password: 'newPassword' });

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
  });
});
