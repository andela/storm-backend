import cloudinaryStorage from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'rk-items',
  transformation: [{
    width: 500, height: 250, crop: 'scale', quality: 'auto'
  }],
  allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
});

export default storage;
