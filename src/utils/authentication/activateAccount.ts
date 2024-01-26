import connectMongoDB from "../mongoLib/connectMongoDB";
import User from "../mongoLib/models/User";
import jwt from "jsonwebtoken"

type DecodedToken = {
    id: string;
};
export async function activateAccount(token: string) {
    try {
        await connectMongoDB();
        const decodedToken = jwt.verify(
            token,
            process.env.ACTIVATION_ACCOUNT_TOKEN_SECRET!
        ) as DecodedToken;

        const user = await User.findById(decodedToken.id);
        if (!user) {
            return { message: "Email is not existed, go to the signup page to register a new user", status: 400 }
        }
        if (user.accountActivated) {
            return { message: "Your account has already been verified", status: 400 }
        }
        await User.findByIdAndUpdate(user.id, { accountActivated: true });
        return { message: "Your account has been verified successfully", status: 200 }
    } catch (error) {
        return { message: (error as Error).message, status: 500 }
    }
}