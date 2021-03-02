import type { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';

export async function verifyJWT(req: NextApiRequest, res: NextApiResponse<Record<string, any>>): Promise<boolean> {
  if (process.env.JWT_SECRET) {
    try {
      const token = req.headers.authorization.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: 'HS256' });
      if (decoded) {
        return true;
      }
    } catch (ex) {
      console.error(JSON.stringify(ex));
    }
    res.status(401).json({
      status: 'error',
      msg: 'Access Denied',
    });
    res.end();
    return false;
  }

  return true;
}
