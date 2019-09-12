import { config, v2 } from 'cloudinary';
import './env';

const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next();
};

const { uploader } = v2;
export { cloudinaryConfig, uploader };
