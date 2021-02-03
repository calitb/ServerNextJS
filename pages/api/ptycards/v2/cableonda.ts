import type { NextApiRequest, NextApiResponse } from 'next';
import { PTYCardsParams, ResponseCallback, Split, curlHandler, get, post, processResponseString } from '@/utils/common';

const REFERER = 'https://coapps.cableonda.com/saldo/index.php';
const URL1 = 'http://www.cableonda.com/residencial/consulta-de-saldo';
const URL2 = 'https://coapps.cableonda.com/saldo/index.php';

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
  const body = {
    Resp09: 'SUSCRIPTOR',
    cedula: 'CEDULA',
    telefono: 'TELEFONO',
    selectcuenta: params.user,
    ruta: 'www.cableonda.com%2Fresidencial%2Fconsulta-de-saldo',
  };

  const headers = {
    Referer: REFERER,
  };

  get(URL1, undefined, headers, undefined, (responseString1, responseHeaders, cookiejar) => {
    post(URL2, body, headers, cookiejar, (responseString2) => {
      const responseString = responseString1 + responseString2;

      const result = processResponseString(responseString, CONFIG1);
      const result2 = processResponseString(responseString, CONFIG2);
      const error1 = result.status == 'error';
      const error2 = result2.status == 'error';
      var error = error1;
      var msg = result.msg;
      var facturaAlDia = false;

      if (result.msg == 'Value for fechaVencimiento not found') {
        //factura al dia
        if (!error2) {
          msg = null;
          facturaAlDia = true;
          error = false;
        }
      }

      callback({
        status: error ? 'error' : 'success',
        msg: msg,
        balance: error ? null : facturaAlDia ? '0.00' : (Number.parseFloat(result.montoVencido30) + Number.parseFloat(result.montoVencido60) + Number.parseFloat(result.montoActual)).toFixed(2),
        datetime: error
          ? null
          : {
              date: facturaAlDia ? '' : result.fechaVencimiento,
              type: 'EXPIRATION',
            },
        details: error
          ? null
          : {
              montoVencido30: facturaAlDia ? '0.00' : Number.parseFloat(result.montoVencido30).toFixed(2),
              montoVencido60: facturaAlDia ? '0.00' : Number.parseFloat(result.montoVencido60).toFixed(2),
              montoActual: facturaAlDia ? '0.00' : Number.parseFloat(result.montoActual).toFixed(2),
            },
      });
    });
  });
};

/*************** SPLITTERS ***************/

const CONFIG1: Split[] = [
  {
    type: 'date',
    end: '</div>',
    required: true,
    field: 'fechaVencimiento',
    start: 'Factura Vence: ',
  },
  {
    end: '<span class=',
    required: true,
    field: 'montoActual',
    start: '<span id="dolar_simbolo">$</span> ',
  },
  {
    end: '<span class=',
    required: true,
    field: 'montoVencido30',
    start: '<span id="dolar_simbolo">$</span> ',
  },
  {
    end: '<span class=',
    required: true,
    field: 'montoVencido60',
    start: '<span id="dolar_simbolo">$</span> ',
  },
];

const CONFIG2: Split[] = [
  {
    end: '</div>',
    field: 'fechaVencimiento',
    start: 'Su Factura est&aacute; al d&iacute;',
    required: true,
  },
];
