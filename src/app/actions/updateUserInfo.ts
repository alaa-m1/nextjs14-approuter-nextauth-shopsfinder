"use server";
import connectMongoDB from "@/utils/mongoLib/connectMongoDB";
import User from "@/utils/mongoLib/models/User";
import validator from "validator";
import jwt from "jsonwebtoken";
import { DecodedToken, UserInfo } from "@/types";

export async function updateUserInfo(
  formData: Omit<UserInfo, "image" | "provider">
) {
  try {
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
    console.log((error as Error).message);
    return { message: "Information upload failed, please try later", status: 500 };
  }
}
