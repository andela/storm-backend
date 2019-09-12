import multer from 'multer';

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).array('images', 10);

export default multerUploads;
