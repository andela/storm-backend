import {
  app, messages, chai, expect
} from '../testHelpers/config';

describe('Index route', () => {
  it('should return 200 if successful', async () => {
    const response = await chai.request(app).get('/api/v1');
    expect(response.status).to.equal(200);
    expect(response.body.data.message).to.equal(messages.apiV1Welcome);
  });
});
