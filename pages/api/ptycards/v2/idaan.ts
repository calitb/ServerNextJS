import type { NextApiRequest, NextApiResponse } from 'next';
import { PTYCardsParams, ResponseCallback, SplitJSON, curlHandler, post, processResponseJSONString } from '@/utils/common';

const URL1 = 'https://www.idaan.gob.pa/idata/servd/';

export default async (req: NextApiRequest, res: NextApiResponse<Record<string, any>>) => {
  const { query, method, body } = req;

  const inParams = method === 'GET' ? query : body;
  const { user, name, device, version, lang } = inParams;

  const params: PTYCardsParams = {
    user,
    name,
    device,
    version,
    lang,
  };

  return curlHandler(params, fetch, req, res);
};

export const fetch = (params: PTYCardsParams, callback: ResponseCallback) => {
  const headers = {
    Referer: 'https://www.idaan.gob.pa/saldo/',
  };

  const body = {
    nic: params.user.toString().padStart(6, '0'),
    valname: params.name || '',
    key: 'Y5R3v1pXp',
  };

  post(URL1, body, headers, undefined, (responseString) => {
    const result = processResponseJSONString(responseString, CONFIG);
    const error = result.status == 'error';

    let details = null;
    let saldoTotal = null;
    if (!error) {
      const saldoAgua = Number.parseFloat(result.deudatotal_idaan.replace('B./', ''));
      const saldoBasura = Number.parseFloat(result.deudatotal_aseo.replace('B./', ''));
      saldoTotal = (saldoAgua + saldoBasura).toFixed(2);

      details = {
        waste: saldoBasura.toFixed(2),
        water: saldoAgua.toFixed(2),
      };
    }

    callback({
      status: result.status,
      msg: result.msg,
      balance: saldoTotal,
      details: details,
    });
  });
};

/*************** SPLITTERS ***************/

const CONFIG: SplitJSON[] = [
  {
    field: 'deudatotal_idaan',
    required: true,
  },
  {
    field: 'deudatotal_aseo',
    required: true,
  },
];
