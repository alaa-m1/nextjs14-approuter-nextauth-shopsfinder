"use server";
import connectMongoDB from "@/utils/mongoLib/connectMongoDB";
import User from "@/utils/mongoLib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/types";

export async function updateUserPassword(formData: {
  currentPassword: string;
  newPassword: string;
  newConfirmPassword: string;
  id: string;
}) {
  try {
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
