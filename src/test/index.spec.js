import {
  app, messages, chai, expect
} from './testHelpers/config';

describe('Index js', () => {
  it('should display a welcome message successfully', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.status).to.be.equal('success');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.message).to.be.equal(messages.welcome);
        done();
      });
  });

  it('should return 404 if route not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/home')
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body.status).to.be.equal('error');
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.message).to.be.equal(messages.notFound);
        done();
      });
  });
});
