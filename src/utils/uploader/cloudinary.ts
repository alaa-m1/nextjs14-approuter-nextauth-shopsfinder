import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImgaesToCloudinary(newFile: {
  filePath: string;
  fileName: string;
}) {
  const photoPromise = cloudinary.v2.uploader.upload(newFile.filePath, {
    folder: "shope_finder_upload",
  });
  return await photoPromise;
}

export { uploadImgaesToCloudinary, cloudinary };
