import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: {  label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      if (credentials.username === process.env.NEXTAUTH_USER && credentials.password === process.env.NEXTAUTH_PASSWORD) {
        const user = { id: 1, username: "admin", email: "imran@example.com" }
        return Promise.resolve(user);
      } else {
        // If you return null or false then the credentials will be rejected
        return Promise.resolve(null)
        // You can also Reject this callback with an Error or with a URL:
        // throw new Error("error message") // Redirect to error page
        // throw "/path/to/redirect"        // Redirect to a URL
      }
    }
  })
]
})