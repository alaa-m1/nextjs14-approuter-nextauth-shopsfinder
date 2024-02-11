"use server";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/types";
import { revalidatePath } from "next/cache";
import ProfilePhoto from "@/utils/mongoLib/models/ProfilePhoto";
import { cloudinary } from "@/utils/uploader/cloudinary";

async function uploadImgaesToCloudinary(formData: FormData) {
  const uploadFormData = new FormData();
  const file = formData.get("profilePhoto") as File;
  uploadFormData.append("file", file);
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/upload`, {
    method: "POST",
    body: uploadFormData,
  });
  const data = await response.json();

  if (response.status !== 200) {
    return {
      message: "File upload failed, please try later",
      status: 500,
      imageUrl: "",
      publicId: "",
    };
  }
  return data;
}

export async function uploadProfilePhoto(formData: FormData) {
  try {
    const photo = await uploadImgaesToCloudinary(formData);

    const id = formData.get("userId") as string;
    const imagePublicId = formData.get("imagePublicId") as string;

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
    console.log((error as Error).message);
    return {
      message: "Photo upload failed, please try later",
      status: 500,
      imageUrl: "",
      publicId: "",
    };
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
    return { message: "Delete image successfully", status: 200 };
  } catch (error) {
    console.log((error as Error).message);
    return {
      message: "Delete Photo failed, please try later",
      status: 500,
      imageUrl: "",
      publicId: "",
    };
  }
}
