export interface ExpoBuild {
  id: string;
  error?: {
    message: string;
    errorCode: string;
  };
  status: "errored" | "finished" | "canceled";
  createdAt: string;
  expirationDate: string;
  platform: 'android' | 'ios';
  artifacts: {
    buildUrl?: string;
  };
  metadata: {
    appIdentifier: string;
    appName: string;
    appVersion: string;
    appBuildVersion: string;
    distribution: string;
    buildProfile: string;
    gitCommitHash: string;
    sdkVersion: string;
  }
}

export type ExpoBuildFileData = Record<string, ExpoBuild[]>;
