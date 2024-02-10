"use server";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/types";
import fs from "fs/promises";
import path from "path";
import os from "os";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import ProfilePhoto from "@/utils/mongoLib/models/ProfilePhoto";
import { getFileName } from "@/utils/uploader/getFileName";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function saveImageToLoacal(formData: FormData) {
  const uploadFormData = new FormData();
  const file = formData.get("profilePhoto") as File;
  const { uniqueName, fullName } = getFileName(file);
  uploadFormData.append("fullName", fullName);
  uploadFormData.append("profilePhoto", file);
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/upload-image`, {
    method: "POST",
    body: uploadFormData,
  });

  const data = await response.json();
  let status: "200" | "500" = "200";

  if (data.msg !== "uploaded success") {
    status = "500";
  }

  const tempDir = os.tmpdir();
  const uploadDir = path.join(tempDir, `/${fullName}`);

  return { filePath: uploadDir, fileName: uniqueName, status };
}

async function uploadImgaesToCloudinary(newFile: {
  filePath: string;
  fileName: string;
}) {
  const photoPromise = cloudinary.v2.uploader.upload(newFile.filePath, {
    folder: "shope_finder_upload",
  });
  return await photoPromise;
}

export async function uploadProfilePhoto(formData: FormData) {
  try {
    const newFile = await saveImageToLoacal(formData);
    if (newFile.status === "500") {
      return {
        message: "File upload failed, please try later",
        status: 500,
        imageUrl: "",
        publicId: "",
      };
    }
    const id = formData.get("userId") as string;
    const imagePublicId = formData.get("imagePublicId") as string;

    const photo = await uploadImgaesToCloudinary(newFile);

    /////Remove files from tempDir after a successfull upload
    fs.unlink(newFile.filePath);

    const decodedToken = jwt.verify(
      id,
      process.env.RESET_PASSWORD_TOKEN_SECRET!
    ) as DecodedToken;

    // Remove the previous profile photo if existed
    if (imagePublicId !== "-1") await deletePhoto(imagePublicId);

    //Add the new profile photo to mongoDB
    const newPhoto = new ProfilePhoto({
      userId: decodedToken.id,
      publicId: photo.public_id,
      imgURL: photo.secure_url,
    });

    await newPhoto.save();

    return {
      imageUrl: photo.secure_url,
      publicId: photo.public_id,
      message: "Uploaded profile photo success",
      status: 200,
    };
  } catch (error) {
    return { message: (error as Error).message, status: 500, imageUrl: "", publicId:"" };
  }
}

export async function revalidate(path: string) {
  revalidatePath(path);
}

export async function getUserPhoto(id: string) {
  try {
    const decodedToken = jwt.verify(
      id,
      process.env.RESET_PASSWORD_TOKEN_SECRET!
    ) as DecodedToken;
    const photos = await ProfilePhoto.find({ userId: decodedToken.id });
    const resources2 = photos.map((photo) => ({
      ...photo._doc,
      _id: photo._id.toString(),
    }));
    return resources2;
  } catch (error) {
    return null;
  }
}

export async function deletePhoto(publicId: string) {
  try {
    await Promise.all([
      ProfilePhoto.findOneAndDelete({ publicId }),
      cloudinary.v2.uploader.destroy(publicId),
    ]);
    await revalidate("/");
    return { message: "Delete image successfully", status: 200 };
  } catch (error) {
    return { message: (error as Error).message, status: 500 };
  }
}
