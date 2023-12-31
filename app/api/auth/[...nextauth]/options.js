import GoogleProvider from 'next-auth/providers/google'

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        
        const userRole = profile.email === process.env.ADMIN_EMAIL ? 'admin' : 'user'
        console.log("User Role", userRole);
        return {
          ...profile,
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: userRole,
        }
      },

      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
     async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
     },
     async session({ session, token }) {
      if(session?.user) session.user.role = token.role
      return session
     }
    }
  }

       