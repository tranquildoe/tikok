const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

// giving access to your cloudinary account
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// uploading the file to yopurt cloudinary account
const storage = cloudinaryStorage({
  cloudinary,
  folder: "tikok-Products",
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); }
  //     ressource_type: "raw"
  // }

});

const fileUploader = multer({ storage }); // a middleware designed to parse file from requests and associate to req.file
module.exports = fileUploader;
