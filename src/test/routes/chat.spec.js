import {
  app, chai, expect, sinon, BACKEND_BASE_URL
} from '../testHelpers/config';
import mockData from '../mockData';
import models from '../../models';
import authHelper from '../../utils/authHelper';

const { generateToken } = authHelper;
const { User, Chat } = models;

const { chatMock: { validChat, badChatMessage, emptyChatMessage } } = mockData;

const user = { data: {}, token: '' };

before(async () => {
  user.data = await User.findOne();
  user.token = `Bearer ${generateToken({ id: user.data.id })}`;
});

describe('Chat Bot', () => {
  describe('POST /chat', () => {
    const endpoint = `${BACKEND_BASE_URL}/chat`;
    it('should create a new message in chat room', (done) => {
      chai
        .request(app)
        .post(endpoint)
        .set('authorization', user.token)
        .send(validChat)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });
    it('should return message is required', (done) => {
      chai
        .request(app)
        .post(endpoint)
        .set('authorization', user.token)
        .send(badChatMessage)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').that.equal('error');
          expect(res.body.data.message).to.equal('message is required');
          done(err);
        });
    });
    it('should return message is not allowed to be empty', (done) => {
      chai
        .request(app)
        .post(endpoint)
        .set('authorization', user.token)
        .send(emptyChatMessage)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status').that.equal('error');
          expect(res.body.data.message).to.equal('message is not allowed to be empty');
          done(err);
        });
    });
  });
  describe('GET /chat', () => {
    const endpoint = `${BACKEND_BASE_URL}/chat`;
    it('should return all chat messages', (done) => {
      chai
        .request(app)
        .get(endpoint)
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          done(err);
        });
    });
    it('should return an internal server error', (done) => {
      const stub = sinon.stub(Chat, 'findAll').callsFake(() => Promise.reject(new Error('Internal server error')));
      chai
        .request(app)
        .get(endpoint)
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status').that.equal('error');
          done(err);
          stub.restore();
        });
    });
  });
});
