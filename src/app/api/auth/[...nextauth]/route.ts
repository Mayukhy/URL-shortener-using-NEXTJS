import connectDB from "@/app/libs/connectdb";
import User from "@/models/User";
import bcrypt from "bcrypt"
import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"



//code for SignIn
export const authOptions:any = {
  providers: [
    //Login with credentials
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {label: "username", type: "text" },
        password: {label: "password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Invalid credentials")
        }
        await connectDB()

        const user = await User.findOne({
            username: credentials.username
        })

        if (!user || !user?.password) {
          throw new Error("Invalid credentials")
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials")
        }

        return user

                // // Store user._id in the session
                // return Promise.resolve({
                //   id: user._id, // Assuming _id is a valid property of your User model
                //   username: user.username, // You can include other properties as needed
                // });

        
      }

      
    }),
        //github login
        GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET
        }),
        //google login
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

  ],

  callbacks: {
    async signIn({ user, account, profile}) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "github") {
        await connectDB();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              profile:profile,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    },
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
