"use server";
import connectMongoDB from "@/utils/mongoLib/connectMongoDB";
import User from "@/utils/mongoLib/models/User";
import bcrypt from "bcryptjs";
import validator from "validator";
import sendCustomEmail from "@/utils/mailing/sendEmail";
import { activateEmailTemplate } from "@/emailTemplate/activation";
import { createActivationJWT } from "@/utils/authentication/authTokens";
import { UserSchemaType } from "../(auth)/signup/page";

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
    console.log((error as Error).message);
    return { message: "Create a new user failed, please try later", status: 500 };
  }
}
