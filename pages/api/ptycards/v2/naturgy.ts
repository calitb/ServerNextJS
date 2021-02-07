import {
  INVALID_NATURGY_CREDENTIALS_ERROR,
  MISSING_PASSWORD_ERROR,
  PTYCardsParams,
  RequestCallback,
  ResponseCallback,
  Split,
  curlHandler,
  get,
  post,
  processResponseString,
  returnError,
} from '@/utils/common';
import type { NextApiRequest, NextApiResponse } from 'next';

import { JSDOM } from 'jsdom';

const REFERER = 'https://oficinavirtual.naturgy.com.pa/ovlatam-web/MyOfficeHomeLatam.gas';
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36';
const HEADERS = { Referer: REFERER, 'User-Agent': USER_AGENT, Host: 'oficinavirtual.naturgy.com.pa' };

const URL1 = 'https://oficinavirtual.naturgy.com.pa/ovlatam-web/LoginAuthentication.gas';
const URL2 = 'https://oficinavirtual.naturgy.com.pa/ovlatam-web/MyOfficeHomeLatam.gas';

export default async (req: NextApiRequest, res: NextApiResponse<Record<string, any>>) => {
  const { query, method, body } = req;

  const inParams = method === 'GET' ? query : body;
  const { user, pass, account, device, version, lang } = inParams;

  const params: PTYCardsParams = {
    user,
    pass,
    account,
    device,
    version,
    lang,
  };

  return curlHandler(params, fetch, req, res);
};

export const fetch = (params: PTYCardsParams, callback: ResponseCallback) => {
  const { user, pass, account, lang } = params;

  if (pass.length == 0) {
    return returnError(null, MISSING_PASSWORD_ERROR, params.lang, callback);
  }

  const body = {
    username: user,
    password: pass,
    submitBtn: 'Entrar',
  };

  post(URL1, body, undefined, undefined, (responseString1, response, cookie) => {
    const result = processResponseString(responseString1, CONFIG1);
    const error = result.status == 'error';

    if (error) {
      return returnError(null, INVALID_NATURGY_CREDENTIALS_ERROR, lang, callback);
    }

    get('https://oficinavirtual.naturgy.com.pa/ovlatam-web/j_spring_security_check' + result.JSESSIONID, undefined, HEADERS, cookie, (resp, response, cookie2) => {
      fetchAccount(account, result.JSESSIONID, (_) => {
        get(URL2 + result.JSESSIONID, undefined, HEADERS, cookie2, (responseString2) => {
          const dom = new JSDOM(responseString2, { pretendToBeVisual: true, referrer: REFERER, userAgent: USER_AGENT, cookieJar: cookie2 });
          const sourceCode = dom.serialize();

          const result2 = processResponseString(sourceCode, CONFIG2);
          const error2 = result2.status == 'error';
          debugger;

          console.log({ sourceCode });

          callback({
            status: result2.status,
            msg: result2.msg,
            account: result2.account ? result2.account.substr(0, result2.account.length - 10) : '',
            balance: result2.balance ? Number.parseFloat(result2.balance).toFixed(2) : null,
            datetime: error2
              ? null
              : {
                  date: result2.fechaSaldo,
                  type: 'CURRENT',
                },
          });
        });
      });
    });
  });
};

/*************** HELPERS ***************/

const fetchAccount = (_account: string, JSESSIONID: string, callback: RequestCallback) => {
  if (!_account) {
    return callback('', undefined, undefined);
  }

  const splits = _account.split('-');
  if (splits.length != 2) {
    return callback('', undefined, undefined);
  }

  const account = splits[0] + '-' + splits[1].padStart(3, '0');

  const body = {
    supplyPointId1: account,
    paginaOrigen: 'https://oficinavirtual.naturgy.com.pa/ovlatam-web/MyOfficeHomeLatam.gas;',
    supplyPointId2: '',
    'b-buscar': 'Ir',
  };

  const url = 'https://oficinavirtual.naturgy.com.pa/ovlatam-web/SwitchSupplyPoint.gas;' + JSESSIONID;

  post(url, body, null, undefined, callback);
};

/*************** SPLITTERS ***************/

const CONFIG1: Split[] = [
  {
    end: '">Mi oficina</a>',
    required: true,
    field: 'JSESSIONID',
    start: '/ovlatam-web/MyOfficeHomeLatam.gas;',
  },
];

const CONFIG2: Split[] = [
  {
    end: '">',
    required: true,
    field: 'account',
    start: '?idInvoice=',
  },
  {
    end: '</span>',
    required: true,
    field: 'fechaSaldo',
    start: '<span class="factura-fecha">',
  },
  {
    end: ' ($)</li>',
    required: true,
    field: 'balance',
    start: '<li class="lista-tipo-1-item">',
  },
];
