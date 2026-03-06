export const authOptions = {
  providers: [

CredentialsProvider({
    name: 'Credentials',

    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {

      return null
    }
  })
    // ...add more providers here
  ],
}