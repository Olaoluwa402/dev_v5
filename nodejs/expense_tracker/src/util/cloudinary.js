import cloudinary from "cloudinary";

const uploadToCloudinary = async (
  file, //any,
  type, // "image" | "video" | "raw" | "auto" | undefined,
  resourceId // string,
) => {
  return new Promise(async (resolve, reject) => {
    cloudinary.v2.config({
      cloud_name: process.env.cloudinaryCloudName,
      api_key: process.env.cloudinaryApiKey,
      api_secret: process.env.cloudinaryApiSecret,
    });

    try {
      if (resourceId) {
        await cloudinary.v2.uploader.destroy(resourceId);
      }
      // if the image is an actual file
      const uploadedResponse = await cloudinary.v2.uploader.upload(file, {
        resource_type: type,
        folder: "ha_products",
        crop: "scale",
        quality: "auto",
      });
      resolve(uploadedResponse);
    } catch (err) {
      reject(err);
    }
  });
};

const uploadSIngleOrMultiImagesToClodinary = async (
  files // imageFile[],
) => {
  const [firstImage, ...others] = files;
  let singleImageRes;
  let otherImagesRes;
  //upload the first Image as the main product image
  singleImageRes = await uploadToCloudinary(firstImage.path, "image");
  // console.log(singleImageRes, "singleImageRes");

  //upload other images
  if (files.length > 1) {
    otherImagesRes = await Promise.all(
      others.map(async (file) => {
        return await uploadToCloudinary(file.path, "image");
      })
    );

    // console.log(otherImagesRes, "otherImagesRes");
  }

  return { singleImageRes, otherImagesRes };
};

export { uploadToCloudinary, uploadSIngleOrMultiImagesToClodinary };
