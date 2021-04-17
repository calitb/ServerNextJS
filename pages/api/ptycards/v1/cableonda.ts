import type { NextApiRequest, NextApiResponse } from 'next';
import { PTYCardsParams, curlHandler } from '@/utils/common';

import { fetch } from '../v2/cableonda';

export default async (req: NextApiRequest, res: NextApiResponse<Record<string, any>>) => {
  const { query, method, body } = req;

  const inParams = method === 'GET' ? query : body;
  const { numCuenta, device, version, lang } = inParams;

  const params: PTYCardsParams = {
    user: numCuenta,
    device,
    version,
    lang,
  };

  return curlHandler(params, fetch, req, res, (inputV2: Record<string, any>) => ({
    status: inputV2.status,
    data: {
      numCuenta: numCuenta,
      saldo: inputV2.balance,
      fechaVencimiento: inputV2.datetime ? inputV2.datetime.date : null,
      montoActual: inputV2.details ? inputV2.details.montoActual : null,
      montoVencido30: inputV2.details ? inputV2.details.montoVencido30 : null,
      montoVencido60: inputV2.details ? inputV2.details.montoVencido60 : null,
      montoVencido90: inputV2.details ? inputV2.details.montoVencido90 : null,
    },
  }));
};
