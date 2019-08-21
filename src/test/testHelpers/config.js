import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../../index';
import messages from '../../utils/messages';

// Define the expect assertion
const { expect } = chai;

// chai middleware
chai.use(chaiHttp);
chai.use(sinonChai);

export {
  app,
  messages,
  chai,
  expect,
  sinon
};
