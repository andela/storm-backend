import {
  app, chai, expect
} from '../testHelpers/config';

import mockData from '../mockData';

const { userMock } = mockData;

const BASE_URL = '/api/v1';

describe('AUTH', () => {
  describe('POST /user/signup', () => {
    const signupEndpoint = `${BASE_URL}/user/signup`;
    it('should #create a user and #generate jwt', (done) => {
      chai
        .request(app)
        .post(signupEndpoint)
        .send(userMock.validUser)
        .end((err, res) => {
          const { data } = res.body;
          expect(data.user).property('token');
          expect(data.user).property('email');
          done(err);
        });
    });
  });
});
