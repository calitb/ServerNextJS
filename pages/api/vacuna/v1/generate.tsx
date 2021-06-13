import type { NextApiRequest, NextApiResponse } from 'next';

import { Template } from '@walletpass/pass-js';
import getConfig from 'next/config';
import path from 'path';

const { serverRuntimeConfig } = getConfig();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method, body } = req;

  const inParams = method === 'GET' ? query : body;
  const { name, identifier, dosis, vacuna, date, url } = inParams;

  const user = {
    dosis,
    vacuna,
    date: new Date(date + 'T00:00:00.000-05:00').toLocaleDateString('es-PA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    identifier,
    name,
    url,
  };

  // const user = {
  //   dosis: 1,
  //   vacuna: "Astrazeneca",
  //   fechaDosis: "28 de Julio de 2021",
  //   identificacion: "8-797-2082",
  //   nombre: "Carlos Thurber B.",
  //   url:
  //     "https://www.panamadigital.gob.pa/DatosUsuario?guid=09b235b8-7f27-4937-ada5-f8d927cd6682&p=ZgAAAB LCAAAAAAAAAurVkpUslKy0DW3NNc1MrAwUtJRyiwBigDpJCUrAx2lFCDH2T/M0wUoElCUX5GZm5icWQLUVK3klpqcAdINlPEpTU8sAjFrdZSygLQhUCw5DcgIys/KV6oFAOy9LU1mAAAA",
  // };

  const template = new Template('generic', {
    passTypeIdentifier: 'pass.com.mindslab.vacunacovid',
    teamIdentifier: 'W2V774VD96',
    sharingProhibited: true,
    organizationName: 'MindsLab',
  });

  const ROOT_DIR = process.env.NODE_ENV === 'production' ? '/usr/src/app' : serverRuntimeConfig.PROJECT_ROOT;

  const pemPath = path.join(ROOT_DIR, 'passkit/keys/vacunacovid.pem');
  await template.loadCertificate(pemPath, process.env.PASSKIT_PEM_PASS);

  await template.images.add('icon', path.join(ROOT_DIR, 'passkit/images/icon.png'));
  await template.images.add('logo', path.join(ROOT_DIR, 'passkit/images/logo.png'));
  await template.images.add('icon', path.join(ROOT_DIR, 'passkit/images/icon@3x.png'), '3x');
  await template.images.add('logo', path.join(ROOT_DIR, 'passkit/images/logo@3x.png'), '3x');

  const pass = template.createPass({
    serialNumber: user.identifier,
    description: 'Vacuna COVID',
  });
  pass.logoText = 'Panama Digital';
  pass.foregroundColor = FOREGROUND_COLORS[user.dosis];
  pass.backgroundColor = BACKGROUND_COLORS[user.dosis];
  pass.primaryFields.add({
    key: 'name',
    label: 'Nombre',
    value: user.name,
  });

  if (user.dosis > 0) {
    if (user.vacuna.length > 0) {
      pass.secondaryFields.add({
        key: 'vacuna',
        label: 'Vacuna',
        value: user.vacuna,
      });
    }
    if (user.date.length > 0) {
      pass.secondaryFields.add({
        key: 'status',
        label: DOSIS_STRINGS[user.dosis],
        value: user.date,
      });
    }
  }

  pass.backFields.add({
    key: 'url-panama-digital',
    label: 'Panama Digital',
    value: 'https://www.panamadigital.gob.pa/Login/LoginOidc',
    dataDetectorTypes: ['PKDataDetectorTypeLink'],
  });
  pass.backFields.add({
    key: 'url-pass-generator',
    label: 'Generador de Pase',
    value: 'https://calitb.dev/vacuna',
    dataDetectorTypes: ['PKDataDetectorTypeLink'],
  });

  pass.barcodes = [
    {
      message: user.url,
      format: 'PKBarcodeFormatQR',
      messageEncoding: 'iso-8859-1',
    },
  ];

  const passContent = await pass.asBuffer();
  res.setHeader('Content-Type', 'application/vnd.apple.pkpass');
  res.setHeader('Content-Disposition', 'attachment;filename=' + 'vacuna.pkpass');
  res.status(200).send(passContent);
};

const BACKGROUND_COLORS = {
  '0': '#ff6347',
  '1': '#FFFF05',
  '1.5': '#F1A93B',
  '2': '#A6EB9A',
};

const FOREGROUND_COLORS = {
  '0': '#ffffff',
  '1': '#000000',
  '1.5': '#000000',
  '2': '#000000',
};

const DOSIS_STRINGS = {
  '0': '',
  '1': '1era Dosis',
  '2': '2da Dosis',
};
