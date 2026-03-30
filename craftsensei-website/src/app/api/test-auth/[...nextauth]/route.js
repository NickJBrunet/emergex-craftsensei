import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

let users = []
let nextId = 1

export const authOptions = {  // ✅ EXPORT IT
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = users.find((u) => u.email === credentials.email)
        if (!user) throw new Error("No user found")

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) throw new Error("Invalid password")

        return { id: user.id, email: user.email, name: user.name }
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login" }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

