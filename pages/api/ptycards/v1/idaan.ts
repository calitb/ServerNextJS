import type { NextApiRequest, NextApiResponse } from 'next';
import { PTYCardsParams, curlHandler } from '@/utils/common';

import { fetch } from '../v2/idaan';

export default async (req: NextApiRequest, res: NextApiResponse<Record<string, any>>) => {
  const { query, method, body } = req;

  const inParams = method === 'GET' ? query : body;
  const { numCliente, name, device, version, lang } = inParams;

  const params: PTYCardsParams = {
    user: numCliente,
    name,
    device,
    version,
    lang,
  };

  return curlHandler(params, fetch, req, res, (inputV2: Record<string, any>) => ({
    status: inputV2.status,
    data: {
      numCliente: numCliente,
      fechaVencimiento: inputV2 ? inputV2.date : null,
      saldoAgua: inputV2 ? inputV2.water : null,
      saldoBasura: inputV2 ? inputV2.waste : null,
      saldo: inputV2.balance,
    },
  }));
};
