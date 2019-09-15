import fs from 'fs';
import path from 'path';
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mockRequest, mockResponse } from 'mock-req-res';
import app from '../../index';
import messages from '../../utils/messages';

// Define the expect assertion
const { expect } = chai;
const BACKEND_BASE_URL = '/api/v1';

// chai middleware
chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

const testImage = fs.readFileSync(path.join(__dirname, '../../../testImages/test.png'));

export {
  app,
  messages,
  chai,
  expect,
  sinon,
  mockRequest,
  mockResponse,
  BACKEND_BASE_URL,
  testImage,
};
