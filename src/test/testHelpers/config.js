import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import messages from '../../utils/messages';

// Define the expect assertion
const { expect } = chai;

// chai middleware
chai.use(chaiHttp);

export {
  app,
  messages,
  chai,
  expect
};
