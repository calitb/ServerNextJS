import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.AUTH_JWT_SECRET,
  }
})
