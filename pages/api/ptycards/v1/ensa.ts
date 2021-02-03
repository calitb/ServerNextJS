import type { NextApiRequest, NextApiResponse } from 'next';
import { PTYCardsParams, curlHandler } from '@/utils/common';

import { fetch } from '../v2/ensa';

export default async (req: NextApiRequest, res: NextApiResponse<Record<string, any>>) => {
  const { query, method, body } = req;

  const inParams = method === 'GET' ? query : body;
  const { numCliente, password, device, version, lang } = inParams;

  const params: PTYCardsParams = {
    user: numCliente,
    pass: password,
    device,
    version,
    lang,
  };

  return curlHandler(params, fetch, req, res, (inputV2: Record<string, any>) => ({
    status: inputV2.status,
    error_msg: inputV2.error_msg,
    data: {
      numCuenta: inputV2.account,
      numCliente: numCliente,
      saldo: inputV2.balance,
      fechaVencimiento: inputV2.datetime ? inputV2.datetime.date : null,
    },
  }));
};
