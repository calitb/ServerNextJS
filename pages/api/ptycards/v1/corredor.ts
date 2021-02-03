import type { NextApiRequest, NextApiResponse } from 'next';
import { PTYCardsParams, curlHandler } from '@/utils/common';

import { fetch } from '../v2/corredor';

export default async (req: NextApiRequest, res: NextApiResponse<Record<string, any>>) => {
  const { query, method, body } = req;

  const inParams = method === 'GET' ? query : body;
  const { numTarjeta, device, version, lang } = inParams;

  const params: PTYCardsParams = {
    user: numTarjeta,
    device,
    version,
    lang,
  };

  return curlHandler(params, fetch, req, res, (inputV2: Record<string, any>) => ({
    status: inputV2.status,
    data: {
      numTarjeta: numTarjeta,
      saldo: inputV2.balance,
    },
  }));
};
