import { curlHandler, post, processResponseJSONString, PTYCardsParams, ResponseCallback, SplitJSON } from '@/utils/common';
import type { NextApiRequest, NextApiResponse } from 'next';

const URL1 = 'https://enacorredores.com/api/v2/get-saldo-panapass/json';

export default async (req: NextApiRequest, res: NextApiResponse<Record<string, any>>) => {
  const { query, method, body } = req;

  const inParams = method === 'GET' ? query : body;
  const { user, device, version, lang } = inParams;

  const params: PTYCardsParams = {
    user,
    device,
    version,
    lang,
  };

  return curlHandler(params, fetch, req, res);
};

export const fetch = (params: PTYCardsParams, callback: ResponseCallback) => {
  const headers = {
    Referer: 'https://enacorredores.com',
  };

  const body = {
    panapass: params.user,
  };

  post(
    URL1,
    body,
    headers,
    undefined,
    (responseString) => {
      const result = processResponseJSONString(responseString, CONFIG);

      callback({
        status: result.status,
        msg: result.msg,
        balance: result.saldo ? Number.parseFloat(result.saldo).toFixed(2) : null,
      });
    },
    30000
  );
};

/*************** SPLITTERS ***************/

const CONFIG: SplitJSON[] = [
  {
    field: 'saldo',
    required: true,
  },
];
