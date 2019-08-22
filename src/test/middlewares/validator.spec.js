import validate from '../../middlewares/validator';
import { mockRequest, mockResponse, sinon, expect } from '../testHelpers/config';

describe('Validate middleware', () => {
  it('should call the next function if no schema is pass as arguement', () => {
    const res = mockResponse();
    const req = mockRequest({
      body: {}
    });
    const next = sinon.fake()
    validate()(req, res, next);
    expect(next.calledOnce).to.be.true;
  });
});
