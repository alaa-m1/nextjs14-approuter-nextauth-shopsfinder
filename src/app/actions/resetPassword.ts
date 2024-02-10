"use server";
import { DecodedToken } from "@/types";
import connectMongoDB from "@/utils/mongoLib/connectMongoDB";
import User from "@/utils/mongoLib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function resetPassword(formData: FormData) {
  try {
    const token = formData.get("userToken") as string;
    const password = formData.get("password") as string;

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
    console.log((error as Error).message);
    return { message: "Changing password failed, please try later", status: 500 };
  }
}
