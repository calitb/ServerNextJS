import * as request from 'request';

import { CookieJar, Headers, Response } from 'request';
import { NextApiRequest, NextApiResponse } from 'next';

import { stringify } from 'querystring';

export type RequestCallback = (body: any, response: Response, cookiejar: CookieJar) => void;
export type ResponseCallback = (body: Record<string, any>) => void;

export interface PTYCardsParams {
  user: string;
  pass?: string;
  name?: string;
  account?: string;
  device: string;
  version: string;
  lang: string;
  background?: number;
}

export type Split = {
  start: string;
  end: string;
  field: string;
  required?: boolean;
  type?: string;
  default?: string;
  ignore?: boolean;
};

export type SplitJSON = {
  field: string;
  required?: boolean;
  type?: string;
  default?: string;
  ignore?: boolean;
};

type FETCH = (params: PTYCardsParams, callback: ResponseCallback) => void;
type V2_TO_V1 = (inputV2: Record<string, any>) => Record<string, any>;

const defaultConverter: V2_TO_V1 = (inputV2: Record<string, any>) => {
  return inputV2;
};

export const curlHandler = (params: PTYCardsParams, fetch: FETCH, req: NextApiRequest, res: NextApiResponse<Record<string, any>>, converter = defaultConverter) => {
  const { method } = req;
  return new Promise((resolve, reject) => {
    switch (method) {
      case 'GET':
        fetch(params, (body: Record<string, any>) => {
          // insertLog(input, body, req.params.service, () => {
          // services.register(input, body.status, req.params.service);
          res.status(200).json(converter(body));
          return resolve(body);
          // });
        });
        break;
      case 'POST':
        fetch(params, (body: Record<string, any>) => {
          // insertLog(input, body, req.params.service, () => {
          // services.register(input, body.status, req.params.service);
          res.status(200).json(converter(body));
          return resolve(body);
          // });
        });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
        return resolve({});
    }
  });
};

const rejectUnauthorized = true;

export const get = (baseURL: string, params: Record<string, any>, headers: Headers, cookiejar: CookieJar, callback: RequestCallback) => {
  const encodedParams = stringify(params);
  const url = `${baseURL}?${encodedParams}`;
  const j = cookiejar !== undefined ? (cookiejar ? cookiejar : request.jar()) : undefined;
  request.get({ rejectUnauthorized, url, followAllRedirects: true, jar: j, headers }, (error: any, response: Response, body: any) => {
    if (error) {
      console.log(url, error);
    }
    callback(body, response, j);
  });
};

export const post = (url: string, form: Record<string, any> | string, headers: Headers, cookiejar: CookieJar, callback: RequestCallback, timeout = 60000) => {
  const isJSON = headers && headers['Content-Type'] === 'application/json';
  const j = cookiejar !== undefined ? (cookiejar ? cookiejar : request.jar()) : undefined;
  if (!isJSON) {
    request.post({ rejectUnauthorized, url, form, followAllRedirects: true, jar: j, headers, timeout }, (error: any, response: Response, body: any) => {
      if (error) {
        console.log(url, error);
      }
      callback(body, response, j);
    });
  } else {
    request.post({ rejectUnauthorized, url, body: form, followAllRedirects: true, jar: j, headers, json: isJSON }, (error: any, response: Response, body: any) => {
      if (error) {
        console.log(url, error);
      }
      callback(body, response, j);
    });
  }
};

export const getField = (_string: string, begin: string, end: string, field: string, offset = 0): Record<string, any> => {
  var pos = strpos(_string, begin, offset);
  if (pos === -1) {
    return { status: 'error', msg: `Value for ${field} not found` };
  } else {
    var string = _string.substring(pos + begin.length);
    pos = strpos(string, end);
    const value = string.substring(0, pos).trim();

    if (value.length == 0) {
      return {
        status: 'error',
        temp: string,
        msg: `Value for ${field} not found`,
      };
    } else {
      const res: Record<string, any> = { temp: string };
      res[field] = value;
      return res;
    }
  }
};

export const returnError = (result: any, error_msg: Record<string, any>, lang: string, callback: ResponseCallback) => {
  callback({
    status: 'error',
    msg: result && result.msg,
    error_msg: error_msg ? error_msg[lang] || error_msg['es'] : undefined,
  });
};

// http://locutus.io/php/strings/strpos/
export const strpos = (haystack: string, needle: string, offset = 0): number => {
  return (haystack + '').indexOf(needle, offset);
};

export const processResponseString = (responseString: string, splits: Split[]): Record<string, any> => {
  const results: Record<string, any> = { status: 'success' };
  var string = responseString;
  for (var i = 0; i < splits.length; i++) {
    const split = splits[i];
    const start = split.start;
    const end = split.end;
    const field = split.field;
    const required = split.required;
    const type = split.type || null;
    const defaultValue = split.default || null;
    const ignore = split.ignore || false;

    const result = getField(string, start, end, field);
    const value = result[field] || null;
    string = result['temp'] || null;

    if (result['status'] == 'error') {
      if (required) {
        return result;
      } else if (defaultValue) {
        results[field] = format(type, defaultValue);
      }
    } else if (!ignore) {
      results[field] = format(type, value);
    }
  }

  return results;
};

export const processResponseJSONString = (responseString: string, splits: SplitJSON[]): Record<string, any> => {
  const results: Record<string, any> = { status: 'success' };
  var json: Record<string, any> = {};
  try {
    json = JSON.parse(responseString);
  } catch {}
  for (var i = 0; i < splits.length; i++) {
    const split = splits[i];
    const field = split.field;
    const required = split.required;
    const type = split.type || null;
    const defaultValue = split.default || null;
    const ignore = split.ignore || false;

    const value = json[field] || null;

    if (value) {
      if (!ignore) {
        results[field] = format(type, value);
      }
    } else {
      if (defaultValue) {
        results[field] = format(type, defaultValue);
      } else if (required) {
        return { status: 'error', msg: `Value for ${field} not found` };
      }
    }
  }

  return results;
};

const format = (type: string, value: string): string => {
  return value;
};

/*************** ERRORS ***************/

export const MISSING_PASSWORD_ERROR: Record<string, any> = {
  es: 'No olvides configurar el pasword de tu cuenta',
  en: 'Missing password for this account',
};

export const MISSING_CEDULA_ERROR: Record<string, any> = {
  es:
    'Para poder volver a consultar tu factura haz lo siguiente:\n\n1. Elimina esta cuenta del app utilizando la opcion Borrar Cuenta.\n\n2. Agrega una nueva cuenta tipo ENSA al app. Pero esta vez escribe tu cedula en lugar de tu numero NAC, y utiliza tu mismo password.\n\nYa no utilices tu numero NAC.',
  en:
    'Para poder volver a consultar tu factura haz lo siguiente:\n\n1. Elimina esta cuenta del app utilizando la opcion Borrar Cuenta.\n\n2. Agrega una nueva cuenta tipo ENSA al app. Pero esta vez escribe tu cedula en lugar de tu numero NAC, y utiliza tu mismo password.\n\nYa no utilices tu numero NAC.',
};

export const INVALID_ENSA_CREDENTIALS_ERROR: Record<string, any> = {
  es: 'Identificacion y/o password incorrectos. Por favor verifica estos datos en https://www.ensa.com.pa',
  en: 'Invalid identification and/or password. Please check this information in https://www.ensa.com.pa',
};

export const INVALID_NATURGY_CREDENTIALS_ERROR: Record<string, any> = {
  es: 'Identificacion y/o password incorrectos. Por favor verifica estos datos en https://www.oficinavirtual.gasnaturalfenosa.com.pa',
  en: 'Invalid identification and/or password. Please check this information in https://www.oficinavirtual.gasnaturalfenosa.com.pa',
};
