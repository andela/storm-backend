import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mockRequest, mockResponse } from 'mock-req-res';
import app from '../../index';
import messages from '../../utils/messages';

// Define the expect assertion
const { expect } = chai;
const BASE_URL = '/api/v1';

// chai middleware
chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

export {
  app,
  messages,
  chai,
  expect,
  sinon,
  mockRequest,
  mockResponse,
  BASE_URL,
};
