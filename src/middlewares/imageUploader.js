import Datauri from 'datauri';
import path from 'path';
import response from '../utils/response';
import messages from '../utils/messages';
import { uploader } from '../config/cloudinaryConfig';

const dUri = new Datauri();
let ownerId = '';

/**
 * extract the content of a raw file
 * @param {Object} rawFile - the raw file
 * @returns {Object} - return the content of the raw file
 */
const extractSingleFile = (rawFile) => {
  const { originalname, buffer } = rawFile;
  return dUri.format(path.extname(originalname).toString(), buffer).content;
};

/**
 * extract the content of the supplied raw files
 * @param {Object} rawFiles - the list of the raw files
 * @returns {Object} - return the list of the content of the raw files
 */
const extractFiles = (rawFiles) => rawFiles.map(
  (rawFile) => extractSingleFile(rawFile)
);

/**
 * a function that is used to upload the supplied image to the cloud
 * @param {Object} file - a proccessed file
 * @param {Object} index - the index of the file
 * @returns {Object} - return the uploaded image url
 */
const uploadSingleFile = async (file, index) => {
  const { secure_url: imageUrl } = await uploader.upload(file, {
    public_id: `${ownerId}-${index}`,
    overwrite: true,
    folder: 'rk-items',
    transformation: [{
      width: 500, height: 250, crop: 'scale', quality: 'auto'
    }],
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
  });

  return imageUrl;
};

/**
 * a middleware to upload image
 * @param {Object} req - request object
 * @param {Oject} res - response object
 * @param {Function} next - next function
 * @returns {Object} - Returns Object
 */
const uploadImage = async (req, res, next) => {
  try {
    const { files: rawFiles, decoded } = req;
    if (!rawFiles) {
      return next();
    }
    const { id } = decoded;
    ownerId = id;
    const files = extractFiles(rawFiles);
    const imageUrls = await Promise.all(files.map((file, index) => uploadSingleFile(file, index)));
    req.imageUrls = imageUrls;

    return next();
  } catch (error) {
    return response(res, 400, 'error', { message: messages.imageError });
  }
};

export default uploadImage;
