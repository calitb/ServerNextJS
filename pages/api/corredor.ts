import type { NextApiRequest, NextApiResponse } from 'next';
import { PTYCardsParams, ResponseCallback, SplitJSON, curlHandler, post, processResponseJSONString } from '../../utils/common';

const URL1 = 'http://enacorredores.com/api/v2/get-saldo-panapass/json';

export default async (req: NextApiRequest, res: NextApiResponse<Record<string, any>>) => {
  const { query, method, body } = req;

  const inParams = method === 'GET' ? query : body;
  const { numTarjeta, device, version, lang } = inParams;

  const params: PTYCardsParams = {
    user: numTarjeta,
    device: device,
    version: version,
    lang: lang,
  };

  return curlHandler(params, fetch, req, res);
};

const fetch = (params: PTYCardsParams, callback: ResponseCallback) => {
  const headers = {
    Referer: 'http://enacorredores.com',
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
