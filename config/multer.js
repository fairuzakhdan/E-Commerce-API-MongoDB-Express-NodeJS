// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const path = require('path');
const ErrorHandler = require('../utils/errorHandler');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images'); // directory penyimpanan didalm folder public/images
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}_${uniqueSuffix}${path.extname(file.originalname)}`); // penamaan file images
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    // fungsi format yang diijinkan
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new ErrorHandler('Only images are allowed', 405));
    }
  },
});

module.exports = upload;
