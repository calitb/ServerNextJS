import type { NextApiRequest, NextApiResponse } from 'next';
import { PTYCardsParams, curlHandler } from '@/utils/common';

import { fetch } from './v2/metrobus';

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
      numTarjeta: inputV2.numTarjeta,
      ksi: inputV2.details ? inputV2.details.ksi : null,
      fechalogueoString: inputV2.details ? inputV2.details.fechalogueoString : null,
      saldo: inputV2.balance,
      fechaSaldo: inputV2.datetime ? inputV2.datetime.date + ' ' + inputV2.datetime.time : null,
      modelo: inputV2.details ? inputV2.details.model : null,
    },
  }));
};
