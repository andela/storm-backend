import multer from 'multer';
import storage from '../utils/cloudinaryStorage';

const multerUploads = multer({ storage }).array('images', 10);

export default multerUploads;
