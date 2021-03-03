import { INVALID_NATURGY_CREDENTIALS_ERROR, MISSING_PASSWORD_ERROR, PTYCardsParams, ResponseCallback, Split, curlHandler, processResponseString, returnError } from '@/utils/common';
import type { NextApiRequest, NextApiResponse } from 'next';

import puppeteer from 'puppeteer';

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
    return returnError(null, MISSING_PASSWORD_ERROR, lang, callback);
  }

  (async () => {
    const config = process.env.CHROMIUM_PATH
      ? {
          headless: true,
          executablePath: process.env.CHROMIUM_PATH,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }
      : undefined;

    const browser = await puppeteer.launch(config);

    const page = await browser.newPage();

    await page.goto(URL1);
    await page.type('#username', user);
    await page.type('#password', pass);
    await page.keyboard.press('Enter');

    await page.waitForNavigation();
    await page.goto(URL2);

    const sourceCode = await page.content();

    const result = processResponseString(sourceCode, CONFIG);
    const error = result.status == 'error';

    await browser.close();

    if (error) {
      return returnError(null, INVALID_NATURGY_CREDENTIALS_ERROR, lang, callback);
    }

    callback({
      status: result.status,
      msg: result.msg,
      account: result.account ? result.account.substr(0, result.account.length - 10) : '',
      balance: result.balance ? Number.parseFloat(result.balance.replace(',', '.')).toFixed(2) : null,
      datetime: error
        ? null
        : {
            date: result.fechaSaldo,
            type: 'CURRENT',
          },
    });
  })();
};

/*************** SPLITTERS ***************/

const CONFIG: Split[] = [
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
