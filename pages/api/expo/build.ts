import crypto from 'crypto';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import safeCompare from 'safe-compare';
import { ExpoBuild, ExpoBuildFileData } from 'types';

const OUTPUT_DIR = "./files";
const OUTPUT_FILE = `${OUTPUT_DIR}/expo_builds.json`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method, body } = req;

  if (method === 'POST') {
    const build: ExpoBuild = body;
    if (!checkSignature(req)) {
      res.status(500).send("Signatures didn't match!");
    } else {
      const previousBuilds = readBuilds();
      const appIdentifier = build.metadata.appIdentifier;
      addBuild(appIdentifier, previousBuilds, build);
      res.status(200).json({ 'status': 'OK' });
    }
  } else {
    const previousBuilds = readBuilds();
    const appIdentifier = query.appIdentifier as string;
    const builds = appIdentifier ? (previousBuilds[appIdentifier] ?? []) : (previousBuilds ?? {});
    res.status(200).json({ 'status': 'OK', builds });
  }
};

function checkSignature(req: NextApiRequest): boolean {
  const expoSignature = req.headers['expo-signature'];
  const hmac = crypto.createHmac('sha1', process.env.EXPO_SECRET_WEBHOOK_KEY);
  hmac.update(JSON.stringify(req.body));
  const hash = `sha1=${hmac.digest('hex')}`;

  return safeCompare(expoSignature, hash);
}

function readBuilds(): Record<string, any> {
  try {
    createDir();
    const fileContent = fs.readFileSync(OUTPUT_FILE, 'utf8');
    return JSON.parse(fileContent);
  } catch {
    return {}
  }
}

function addBuild(appIdentifier: string, previousBuilds: ExpoBuildFileData, buildData: ExpoBuild) {
  createDir();
  const appBuilds: ExpoBuild[] = previousBuilds[appIdentifier] ?? [];
  appBuilds.push(buildData);
  previousBuilds[appIdentifier] = appBuilds;
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(previousBuilds))
}

function createDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
}