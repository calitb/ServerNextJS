import type { NextApiRequest, NextApiResponse } from 'next';
import { PTYCardsParams, ResponseCallback, Split, curlHandler, get, processResponseString } from '@/utils/common';

const URL1 = 'http://200.46.245.230:8080/PortalCAE-WAR-MODULE/SesionPortalServlet';

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
    accion: 6,
    NumDistribuidor: 99,
    NomUsuario: 'usuInternet',
    NomHost: 'AFT',
    NomDominio: 'aft.cl',
    RutUsuario: 0,
    NumTarjeta: params.user,
    bloqueable: '',
  };

  get(URL1, body, undefined, undefined, (responseString) => {
    const result = processResponseString(responseString, CONFIG);
    const error = result.status == 'error';

    callback({
      status: result.status,
      msg: result.msg,
      balance: result.balance ? Number.parseFloat(result.balance).toFixed(2) : null,
      datetime: error
        ? null
        : {
            date: result.datetime.split(' ')[0],
            time: militarToStandardTime(result.datetime.split(' ')[1]),
            type: 'CURRENT',
          },
      details: error
        ? null
        : {
            model: result.model,
            ksi: result.ksi,
            fechalogueoString: result.fechalogueoString,
          },
    });
  });
};

/*************** FORMATTING ***************/

// 17:38 -> 05:38 PM
const militarToStandardTime = (militarTime: string): string => {
  const parts = militarTime.split(':');
  let hour = Number.parseInt(parts[0]);
  let am = 'AM';
  if (hour > 12) {
    hour = hour - 12;
    am = 'PM';
  } else if (hour == 0) {
    hour = 12;
  }
  return `${hour.toString().padStart(2, '0')}:${parts[1]} ${am}`;
};

/*************** SPLITTERS ***************/

const CONFIG: Split[] = [
  {
    end: '"',
    required: true,
    field: 'ksi',
    start: 'sTmp3 = sTmp3 + "&KSI=',
  },
  {
    end: '">',
    required: true,
    field: 'fechalogueoString',
    start: 'name="fechalogeo"\tvalue="',
  },
  {
    end: '</td>',
    required: true,
    field: 'balance',
    start: '<td bgcolor="#F15B22" class="verdanabold-ckc">',
  },
  {
    type: 'datetime',
    end: '</td>',
    required: true,
    field: 'datetime',
    start: '<td bgcolor="#F15B22" class="verdanabold-ckc">',
  },
  {
    end: ' ',
    default: 'R',
    required: false,
    field: 'model',
    start: 'Escolar',
  },
];
