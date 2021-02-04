import type { NextApiRequest, NextApiResponse } from 'next';
import { PTYCardsParams, curlHandler } from '@/utils/common';

import { fetch } from '../v2/naturgy';

export default async (req: NextApiRequest, res: NextApiResponse<Record<string, any>>) => {
  const { query, method, body } = req;

  const inParams = method === 'GET' ? query : body;
  const { username, password, device, version, lang } = inParams;

  const accountData = username.split(',');
  var accountNumber = null;
  if (accountData.length == 2) {
    accountNumber = accountData[1];
  }

  const params: PTYCardsParams = {
    user: accountData[0],
    pass: password,
    account: accountNumber,
    device,
    version,
    lang,
  };

  return curlHandler(params, fetch, req, res, (inputV2: Record<string, any>) => ({
    status: inputV2.status,
    data: {
      username: username,
      numCuenta: inputV2.account,
      saldo: inputV2.balance,
      fechaFactura: inputV2.datetime ? inputV2.datetime.date : null,
      address: '',
    },
  }));
};
