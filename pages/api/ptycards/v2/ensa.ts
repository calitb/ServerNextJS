import {
  INVALID_ENSA_CREDENTIALS_ERROR,
  MISSING_CEDULA_ERROR,
  MISSING_PASSWORD_ERROR,
  PTYCardsParams,
  ResponseCallback,
  Split,
  curlHandler,
  get,
  post,
  processResponseString,
  returnError,
  strpos,
} from '@/utils/common';
import type { NextApiRequest, NextApiResponse } from 'next';

const REFERER = 'https://clientes.ensa.com.pa/Inicio';
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36';
const URL1 = 'https://clientes.ensa.com.pa/';
const URL2 = URL1;
const URL3 = 'https://clientes.ensa.com.pa/Pages/Cuentas';
const URL4 = 'https://clientes.ensa.com.pa/Pages/Cuentas.aspx/Details';
const URL5 = 'https://clientes.ensa.com.pa/Pages/UltimaFactura';

const HEADERS = { Referer: REFERER, 'User-Agent': USER_AGENT };
const HEADERS4 = {
  'Content-Type': 'application/json',
  Referer: REFERER,
  'User-Agent': USER_AGENT,
};

export default async (req: NextApiRequest, res: NextApiResponse<Record<string, any>>) => {
  const { query, method, body } = req;

  const inParams = method === 'GET' ? query : body;
  const { user, pass, device, version, lang } = inParams;

  const params: PTYCardsParams = {
    user,
    pass,
    device,
    version,
    lang,
  };

  return curlHandler(params, fetch, req, res);
};

export const fetch = (params: PTYCardsParams, callback: ResponseCallback) => {
  if (params.pass.length == 0) {
    return returnError(null, MISSING_PASSWORD_ERROR, params.lang, callback);
  }

  const isCedula = params.user.split('-').length > 1;
  if (!isCedula) {
    return returnError(null, MISSING_CEDULA_ERROR, params.lang, callback);
  }

  const body = {
    ctl00$PageContent$ScriptManager: 'ctl00$PageContent$UpdatePanel|ctl00$PageContent$BtnEnter',
    __LASTFOCUS: '',
    __EVENTTARGET: '',
    __EVENTARGUMENT: '',
    __VIEWSTATE: '/wEPDwULLTExNDc5Nzk1MDJkZHK+KD5DTwygLqfYIn8MxGX9FyrWdeykWS6sp2rqCuyD',
    __VIEWSTATEGENERATOR: 'CA0B0334',
    __EVENTVALIDATION: '/wEdAASX1r1t5ha1B1TEtdS8S1NPhlMHfInnE96XUBqK4RvoMIJZlfQ9X2NSL0EVdSpJzTTebHEaNQL/mB/LXoXtvbZIvCEo7+rVTL4hGPjQh5EX2iGzDL5Op5LRSGjwV05XcgE=',
    ctl00$PageContent$TbUser: params.user,
    ctl00$PageContent$TbPassword: params.pass,
    __ASYNCPOST: true,
    ctl00$PageContent$BtnEnter: 'Entrar',
  };

  get(URL1, null, HEADERS, null, (responseString1, responseHeaders1, cookiejar1) => {
    post(URL2, body, HEADERS, cookiejar1, (responseString2, responseHeaders2, cookiejar2) => {
      if (!autenticated(cookiejar2)) {
        return returnError(null, INVALID_ENSA_CREDENTIALS_ERROR, params.lang, callback);
      }
      get(URL3, null, HEADERS, cookiejar2, (responseString3, responseHeaders3, cookiejar3) => {
        const result = processResponseString(responseString3, CONFIG3);
        const error = result.status == 'error';
        if (error) {
          return returnError(result, null, params.lang, callback);
        } else {
          const body4 = {
            account: params.account || result.account,
          };
          post(URL4, body4, HEADERS4, cookiejar3, (responseString4, responseHeaders4, cookiejar4) => {
            get(URL5, null, HEADERS, cookiejar4, (responseString5) => {
              const result2 = processResponseString(responseString5, CONFIG5);
              const error2 = result2.status == 'error' || result2.fechaVencimiento.length < 5;

              if (error2) {
                return returnError(result2, null, params.lang, callback);
              }

              callback({
                status: result2.status,
                msg: result2.msg,
                account: result.account,
                balance: result.balance ? Number.parseFloat(result.balance).toFixed(2) : null,
                datetime: {
                  date: formatDate(result2.fechaVencimiento),
                  type: 'EXPIRATION',
                },
              });
            });
          });
        }
      });
    });
  });
};

/*************** HELPERS ***************/

const autenticated = (cookiejar: any): boolean => {
  const cookies = cookiejar.getCookies(URL2);

  const matches = cookies.filter((cookie: string) => {
    return strpos(cookie, 'ASPXFORMSAUTH') !== -1;
  });

  return matches.length !== 0;
};

/*************** FORMATTING ***************/

// turns "29 de agosto de 2019" into "30/04/2018"
const formatDate = (input: string): string => {
  const tokens = input.split(' de ');
  const day = tokens[0];
  let month = tokens[1].toUpperCase();
  const year = tokens[2];

  switch (month) {
    case 'ENERO':
      month = '01';
      break;
    case 'FEBRERO':
      month = '02';
      break;
    case 'MARZO':
      month = '03';
      break;
    case 'ABRIL':
      month = '04';
      break;
    case 'MAYO':
      month = '05';
      break;
    case 'JUNIO':
      month = '06';
      break;
    case 'JULIO':
      month = '07';
      break;
    case 'AGOSTO':
      month = '08';
      break;
    case 'SEPTIEMBRE':
      month = '09';
      break;
    case 'OCTUBRE':
      month = '10';
      break;
    case 'NOVIEMBRE':
      month = '11';
      break;
    case 'DICIEMBRE':
      month = '12';
      break;
  }

  return `${day}/${month}/${year}`;
};

/*************** SPLITTERS ***************/

const CONFIG3: Split[] = [
  {
    end: 'left">',
    ignore: true,
    field: 'none',
    start: '<div class="panel-body text-',
  },
  {
    end: '</h2>',
    required: true,
    field: 'account',
    start: '<h2>',
  },
  {
    end: '</h4>',
    required: true,
    field: 'balance',
    start: '<h4 class="text-muted">',
  },
];

const CONFIG5: Split[] = [
  {
    end: '<h4 class=',
    ignore: true,
    field: 'none',
    start: 'Fecha de Vencimiento:</label>',
  },
  {
    end: '</strong>',
    required: true,
    field: 'fechaVencimiento',
    start: '<strong>',
  },
];
