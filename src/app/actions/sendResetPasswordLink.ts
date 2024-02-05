"use server";
import connectMongoDB from "@/utils/mongoLib/connectMongoDB";
import User from "@/utils/mongoLib/models/User";
import sendCustomEmail from "@/utils/mailing/sendEmail";

import { resetPasswordTemplate } from "@/emailTemplate/reserPassword";

import { createResetJWT } from "@/utils/authentication/authTokens";

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
