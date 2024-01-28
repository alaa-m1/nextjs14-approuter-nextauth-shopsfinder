'use server'
import connectMongoDB from "@/utils/mongoLib/connectMongoDB";
import User from "@/utils/mongoLib/models/User";
import bcrypt from "bcryptjs";
import validator from "validator";
import { UserSchemaType } from "./(auth)/signup/page";
import sendCustomEmail from "@/utils/mailing/sendEmail";
import { activateEmailTemplate } from "@/emailTemplate/activation";
import { resetPasswordTemplate } from "@/emailTemplate/reserPassword";
import jwt from "jsonwebtoken";
import { createActivationJWT, createResetJWT } from "@/utils/authentication/authTokens";
import { validateCsrfToken } from "@/utils/authentication/validateCsrfToken";

export async function createNewUser(formData: UserSchemaType) {
  try {
    await connectMongoDB();
    const { firstName, lastName, mobile, email, address, gender, password } = formData;
    if (!firstName || !lastName || !email || !password) {
      return { message: "Please fill all the required fields to sign up", status: 400 }
    }
    if (!validator.isEmail(email)) {
      return { message: "Please enter a valid email", status: 400 }
    }
    if (mobile && !validator.isMobilePhone(mobile)) {
      return { message: "Please enter a valid mobile number", status: 400 }
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return { message: "This email is already used", status: 400 }
    }
    if (password.length < 8) {
      return { message: "Password length must be at least 8 characters", status: 400 }
    }
    if (password.length > 60) {
      return { message: "Password length must be less than 60 characters", status: 400 }
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name: `${firstName} ${lastName}`,
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
      newUser.name,
      url,
      "Activate your Shops Finder account",
      activateEmailTemplate
    );

    return { message: "Registration success. Please check your email for the activation message.", status: 200 }

  } catch (error) {
    return { message: (error as Error).message, status: 500 }
  }
}

export async function sendResetPasswordLink(formData: { email: string }) {
  try {
    await connectMongoDB();
    const { email } = formData;
    const user = await User.findOne({ email });

    if (!user) {
      return { message: "The entered email does not exist", status: 400 }
    }
    if (!user.accountActivated) {
      return { message: "Your account has not been activated, please check your email for the activation link", status: 400 }
    }
    const user_id = createResetJWT({
      id: user._id.toString(),
    });

    const url = `${process.env.NEXTAUTH_URL}/resetpassword/${user_id}`;
    await sendCustomEmail(
      email,
      user.name,
      url,
      "Reset your password",
      resetPasswordTemplate
    );
    
    return { message: "The reset link has already been sent to your email", status: 200 }

  } catch (error) {
    return { message: (error as Error).message, status: 500 }
  }
}



type DecodedToken = {
  id: string;
};
export async function resetPassword(formData: FormData) {
  try {
    const token=formData.get('userToken') as string
    const password=formData.get('password') as string
    if (!await validateCsrfToken()) {
      return { message: "User cannot be verified", status: 400 }
    }
    await connectMongoDB();

    const decodedToken = jwt.verify(
      token,
      process.env.RESET_PASSWORD_TOKEN_SECRET!
    ) as DecodedToken;

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return { message: "This account does not exist", status: 400 }
    }

    const newCryptedPassword = await bcrypt.hash(password, 12);
    await User.findByIdAndUpdate(user.id, { password: newCryptedPassword });

    return { message: "Your password has been changed successfully", status: 200 }

  } catch (error) {
    return { message: (error as Error).message, status: 500 }
  }
}