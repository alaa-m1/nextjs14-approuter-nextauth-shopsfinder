"use server";
import fs from "fs/promises";
import path from "path";
import { v4 as uId } from "uuid";
import os from "os";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import Photo from "../models/Photo";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function saveImagesToLoacal(formData: FormData) {
  const files = formData.getAll("profileImage") as Array<File>;
  const multipleBuffersPromise = files.map((file) =>
    file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);
      const uniqueName = `${uId()}-${file.name}`;
      // const uniqueName = uId();
      const ext = file.type.split("/")[1];

      // const uploadDir=path.join(process.cwd(),"public",`/uploadedImages/${uniqueName}.${ext}`)
      //doesnot work in vercel

      const tempDir = os.tmpdir();
      const uploadDir = path.join(tempDir, `/${uniqueName}.${ext}`);

      fs.writeFile(uploadDir, buffer);
      return { filePath: uploadDir, fileName: uniqueName };
    })
  );
  return await Promise.all(multipleBuffersPromise);
}

async function uploadImgaesToCloudinary(
  newFiles: Array<{
    filePath: string;
    fileName: string;
  }>
) {
  const muliplePhotosPromise = newFiles.map((file) => {
    console.log("cloudinary file.filePath=", file.filePath);
    return cloudinary.v2.uploader.upload(file.filePath, {
      folder: "shope_finder_upload",
    });
  });
  return await Promise.all(muliplePhotosPromise);
}
export async function uploadProfileImage(formData: FormData) {
  try {
    const newFiles = await saveImagesToLoacal(formData);
    console.log("newFiles=", newFiles);

    const photos = await uploadImgaesToCloudinary(newFiles);

    // await revalidate("/");
    // console.log("photos=", photos);

    /////Remove files from tempDir after a successfull upload
    newFiles.map((file) => fs.unlink(file.filePath));

    // revalidatePath("/","layout");

    const newPhotos = photos.map((photo) => {
      const newPhoto = new Photo({
        public_id: photo.public_id,
        secure_url: photo.secure_url,
      });
      return newPhoto.save();
    });
    console.log("newPhotos=", newPhotos);
    await Promise.all(newPhotos);
    // await Photo.insertMany(newPhotos)

    return {
      message: "Uploaded success",
      status: 200,
    };
  } catch (error) {
    return { message: (error as Error).message, status: 500 };
  }
}

// const delay = (delayInms: number) => {
//   return new Promise((resolve) => setTimeout(resolve, delayInms));
// };
export async function revalidate(path: string) {
  revalidatePath(path);
}
export async function getAllPhotos() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { resources } = await cloudinary.v2.search
      .expression("folder:shope_finder_upload/*")
      .sort_by("created_at", "desc")
      .max_results(500)
      .execute();
    const photos = await Photo.find().sort("-createdAt");
    const resources2 = photos.map((photo) => ({
      ...photo._doc,
      _id: photo._id.toString(),
    }));
    return resources2;
  } catch (error) {
    return { message: (error as Error).message, status: 500 };
  }
}

export async function deletePhoto(publicId: string) {
  try {
    await Promise.all([
      Photo.findOneAndDelete({ public_id: publicId }),
      cloudinary.v2.uploader.destroy(publicId),
    ]);
    await revalidate("/");
    return { message: "Delete image successfully", status: 200 };
  } catch (error) {
    return { message: (error as Error).message, status: 500 };
  }
}
