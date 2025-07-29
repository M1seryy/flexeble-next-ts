import { getServerSession } from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import UserModel from "../models/User"; // ✅
import { connectDataBase } from "../utils/database";
import { UserProfile } from "@/common.types";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
        }),
    ],
    theme: {
        colorScheme: "light",
        logo: "/logo.png",
    },
    callbacks: {
        async session({ session }) {
            const email = session?.user?.email as string;

            try {
                const data = await UserModel.findOne({ email }) as UserProfile;

                const newSession = {
                    ...session,
                    user: {
                        ...session.user,
                        data,
                    },
                };

                return newSession;
            } catch (error) {
                console.log("[SESSION CALLBACK ERROR]", error);
                return session;
            }
        },

        async signIn({ profile }: any) {
            try {
                await connectDataBase();
                const userExist = await UserModel.findOne({ email: profile.email });

                if (!userExist) {
                    await UserModel.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
};
