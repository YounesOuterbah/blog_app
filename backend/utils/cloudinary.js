const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const cloudinaryUploadImage = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto",
    });
    return data;
  } catch (error) {
    return error;
  }
};

const cloudinaryRemoveImage = async (imagePublicID) => {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicID);
    return result;
  } catch (error) {
    return error;
  }
};

const cloudinaryRemoveAllImg = async (imagePublicIDS) => {
  try {
    const result = await cloudinary.v2.api.delete_resources(imagePublicIDS);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryRemoveAllImg,
};
