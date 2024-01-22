import { Account, NextAuthOptions, Profile, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";
import clientPromise from "../mongoLib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { JWT } from "next-auth/jwt";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID as string,
            clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
            issuer: process.env.AUTH0_ISSUER as string,
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
                session.user.accessToken = token.accessToken as string;
                session.user.expires_at = token.expires_at as string;
                session.user.userId = token.userId as string;
            }
            return session;
        },
        async jwt({
            token,
            user,
            account,
        }: {
            token: JWT;
            user?: User | Adapter;
            account?: Account | null;
            profile?: Profile;
            isNewUser?: boolean;
        }) {
            if (user) {
                token.accessToken = account?.access_token
                token.expires_at = account?.expires_at;
                token.userId = account?.userId;
            }
            return token;
        },
    },
};