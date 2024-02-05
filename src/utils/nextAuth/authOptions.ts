import { Account, NextAuthOptions, Profile, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../mongoLib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { JWT } from "next-auth/jwt";
import { Adapter } from "next-auth/adapters";
import connectMongoDB from "../mongoLib/connectMongoDB";
import { default as UserModel } from "@/utils/mongoLib/models/User";
import bcrypt from "bcryptjs";
import { createUpdateJWT } from "../authentication/authTokens";
import ProfilePhoto from "../mongoLib/models/ProfilePhoto";
import { UserPhoto } from "@/types";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        const userName =
          profile.name || profile.login || profile.email.split("@")[0];
        return {
          id: profile.id.toString(),
          provider: "github",
          email: profile.email,
          userName: userName,
          firstName: userName.split(/\s+/)[0] ?? "",
          lastName: userName.split(/\s+/)[1] ?? "",
          image: profile.avatar_url,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_CLIENT_ID as string,
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
    //   issuer: process.env.AUTH0_ISSUER as string,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@emailprovider.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongoDB();
        const user = await UserModel.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("Email is not existed");
        }
        const checkPassword = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!checkPassword) {
          throw new Error("Password is not correct");
        }
        if (!user.accountActivated) {
          throw new Error(
            "Your account has not been activated, please check your email for the activation link"
          );
        }
        return user;
      },
    }),
  ],
  //  Not providing any secret or NEXTAUTH_SECRET will throw an error in production
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({
      session,
      token,
    }: {
      session: Session;
      user?: User;
      token: JWT;
    }) {
      if (session.user) {
        const id = (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (token.user as any)._id || (token.user as any).id
        ).toString();
        const user_id = createUpdateJWT({
          id,
        });

        const photos: Array<UserPhoto> = await ProfilePhoto.find({
          userId: id,
        });
        session.user.expires_at = token.expires_at as string;
        session.user = {
          ...session.user,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(token.user as any),
          id: user_id,
          image: {
            imgURL: photos[0]?.imgURL ? photos[0]?.imgURL : session.user.image,
            publicId: photos[0]?.publicId ? photos[0]?.publicId : "",
            updatedAt: photos[0]?.updatedAt ? photos[0]?.updatedAt : "",
            createdAt: photos[0]?.createdAt ? photos[0]?.createdAt : "",
          },
          _id: "",
        };
      }
      return session;
    },
    async jwt({
      token,
      user,
      account,
      trigger,
      session,
    }: {
      token: JWT;
      user?: User | Adapter;
      account?: Account | null;
      profile?: Profile;
      isNewUser?: boolean;
      trigger?: "signIn" | "signUp" | "update" | undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session?: any;
    }) {
      if (trigger === "update" && session) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.user = { ...(token.user as any), ...session };
      }
      if (user) {
        token.accessToken = account?.access_token;
        token.expires_at = account?.expires_at;
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
