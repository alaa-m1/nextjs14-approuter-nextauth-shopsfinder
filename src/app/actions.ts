"use server";
import connectMongoDB from "@/utils/mongoLib/connectMongoDB";
import User from "@/utils/mongoLib/models/User";
import bcrypt from "bcryptjs";
import validator from "validator";
import { UserSchemaType } from "./(auth)/signup/page";
import sendCustomEmail from "@/utils/mailing/sendEmail";
import { activateEmailTemplate } from "@/emailTemplate/activation";
import { resetPasswordTemplate } from "@/emailTemplate/reserPassword";
import jwt from "jsonwebtoken";
import {
  createActivationJWT,
  createResetJWT,
} from "@/utils/authentication/authTokens";
import { validateCsrfToken } from "@/utils/authentication/validateCsrfToken";
import { UserInfo } from "@/types";
import fs from "fs/promises";
import path from "path";
import { v4 as uId } from "uuid";
import os from "os";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import ProfilePhoto from "@/utils/mongoLib/models/ProfilePhoto";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function createNewUser(formData: UserSchemaType) {
  try {
    await connectMongoDB();
    const { firstName, lastName, mobile, email, address, gender, password } =
      formData;
    if (!firstName || !lastName || !email || !password) {
      return {
        message: "Please fill all the required fields to sign up",
        status: 400,
      };
    }
    if (!validator.isEmail(email)) {
      return { message: "Please enter a valid email", status: 400 };
    }
    if (mobile && !validator.isMobilePhone(mobile)) {
      return { message: "Please enter a valid mobile number", status: 400 };
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return { message: "This email is already used", status: 400 };
    }
    if (password.length < 8) {
      return {
        message: "Password length must be at least 8 characters",
        status: 400,
      };
    }
    if (password.length > 60) {
      return {
        message: "Password length must be less than 60 characters",
        status: 400,
      };
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      provider: "credentials",
      userName: "",
      firstName,
      lastName,
      email,
      mobile,
      address,
      gender,
      password: cryptedPassword,
    });
    await newUser.save();

    const activation_jwt = createActivationJWT({
      id: newUser._id.toString(),
    });

    const url = `${process.env.NEXTAUTH_URL}/activate/${activation_jwt}`;
    await sendCustomEmail(
      newUser.email,
      newUser.userName || `${newUser.firstName} ${newUser.lastName}`,
      url,
      "Activate your Shops Finder account",
      activateEmailTemplate
    );

    return {
      message:
        "Registration success. Please check your email for the activation message.",
      status: 200,
    };
  } catch (error) {
    return { message: (error as Error).message, status: 500 };
  }
}

export async function sendResetPasswordLink(formData: { email: string }) {
  try {
    await connectMongoDB();
    const { email } = formData;
    const user = await User.findOne({ email });

    if (!user) {
      return { message: "The entered email does not exist", status: 400 };
    }
    if (!user.accountActivated) {
      return {
        message:
          "Your account has not been activated, please check your email for the activation link",
        status: 400,
      };
    }
    const user_id = createResetJWT({
      id: user._id.toString(),
    });

    const url = `${process.env.NEXTAUTH_URL}/resetpassword/${user_id}`;
    await sendCustomEmail(
      email,
      user.userName || `${user.firstName} ${user.lastName}`,
      url,
      "Reset your password",
      resetPasswordTemplate
    );

    return {
      message: "The reset link has already been sent to your email",
      status: 200,
    };
  } catch (error) {
    return { message: (error as Error).message, status: 500 };
  }
}

type DecodedToken = {
  id: string;
};
export async function resetPassword(formData: FormData) {
  try {
    const token = formData.get("userToken") as string;
    const password = formData.get("password") as string;
    if (!(await validateCsrfToken())) {
      return { message: "User cannot be verified", status: 400 };
    }
    await connectMongoDB();

    const decodedToken = jwt.verify(
      token,
      process.env.RESET_PASSWORD_TOKEN_SECRET!
    ) as DecodedToken;

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return { message: "This account does not exist", status: 400 };
    }

    const newCryptedPassword = await bcrypt.hash(password, 12);
    await User.findByIdAndUpdate(user.id, { password: newCryptedPassword });

    return {
      message: "Your password has been changed successfully",
      status: 200,
    };
  } catch (error) {
    return { message: (error as Error).message, status: 500 };
  }
}

export async function updateUserInfo(
  formData: Omit<UserInfo, "image" | "provider">
) {
  try {
    if (!(await validateCsrfToken())) {
      return { message: "User cannot be verified", status: 400 };
    }
    await connectMongoDB();
    const { userName, firstName, lastName, mobile, address, gender, id } =
      formData;

    if (!firstName || !lastName) {
      return {
        message: "Please fill all the required fields to sign up",
        status: 400,
      };
    }
    if (mobile && !validator.isMobilePhone(mobile)) {
      return { message: "Please enter a valid mobile number", status: 400 };
    }

    const decodedToken = jwt.verify(
      id,
      process.env.RESET_PASSWORD_TOKEN_SECRET!
    ) as DecodedToken;

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return { message: "This account does not exist", status: 400 };
    }

    await User.findByIdAndUpdate(user.id, {
      userName,
      firstName,
      lastName,
      mobile,
      address,
      gender,
    });

    return {
      message: "Your information has been updated successfully",
      status: 200,
    };
  } catch (error) {
    return { message: (error as Error).message, status: 500 };
  }
}
export async function updateUserPassword(formData: {
  currentPassword: string;
  newPassword: string;
  newConfirmPassword: string;
  id: string;
}) {
  try {
    if (!(await validateCsrfToken())) {
      return { message: "User cannot be verified", status: 400 };
    }
    await connectMongoDB();
    const { currentPassword, newPassword, newConfirmPassword, id } = formData;

    if (currentPassword.length < 8) {
      return {
        message: "Current Password length must be at least 8 characters",
        status: 400,
      };
    }
    if (currentPassword.length > 60) {
      return {
        message: "Current Password length must be less than 60 characters",
        status: 400,
      };
    }
    if (newPassword.length < 8) {
      return {
        message: "Password length must be at least 8 characters",
        status: 400,
      };
    }
    if (newPassword.length > 60) {
      return {
        message: "Password length must be less than 60 characters",
        status: 400,
      };
    }
    if (newPassword !== newConfirmPassword) {
      return {
        message: "Passwords do not match",
        status: 400,
      };
    }

    const decodedToken = jwt.verify(
      id,
      process.env.RESET_PASSWORD_TOKEN_SECRET!
    ) as DecodedToken;

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return { message: "This account does not exist", status: 400 };
    }
    const checkPassword = await bcrypt.compare(currentPassword, user.password);
    if (!checkPassword) {
      return { message: "Password is not correct", status: 400 };
    }

    const newCryptedPassword = await bcrypt.hash(newPassword, 12);
    await User.findByIdAndUpdate(user.id, { password: newCryptedPassword });

    return {
      message: "Your password has been changed successfully",
      status: 200,
    };
  } catch (error) {
    return { message: (error as Error).message, status: 500 };
  }
}

async function saveImageToLoacal(formData: FormData) {
  const file = formData.get("profilePhoto") as File;
  const fileBufferPromise = file.arrayBuffer().then((data) => {
    const buffer = Buffer.from(data);
    const uniqueName = `${uId()}--${file.name}`;
    const ext = file.type.split("/")[1];

    const tempDir = os.tmpdir();
    const uploadDir = path.join(tempDir, `/${uniqueName}.${ext}`);

    fs.writeFile(uploadDir, buffer);
    return { filePath: uploadDir, fileName: uniqueName };
  });

  return await fileBufferPromise;
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
    return { message: (error as Error).message, status: 500 };
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
