import uploadImage from '../../middlewares/imageUploader';
import { uploader } from '../../config/cloudinaryConfig';
import {
  sinon, expect, mockRequest, mockResponse,
} from '../testHelpers/config';
import mockData from '../mockData';

const { fileMock } = mockData;


describe('Image Uploder', () => {
  it('should return an internal server error', async () => {
    const stub = sinon.stub(uploader, 'upload').callsFake(() => Promise.reject(new Error('Internal server error')));

    const req = mockRequest({
      files: [fileMock.image],
      decoded: { id: '5896' }
    });
    const res = mockResponse();
    const next = sinon.fake();
    uploadImage(req, res, next);
    expect(next.calledOnce).to.be.false;

    stub.restore();
  });
});
