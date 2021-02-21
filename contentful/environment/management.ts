/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createClient } from "contentful-management";
import chalk from "chalk";
import { Entry } from "contentful-management/dist/typings/entities/entry";
import { Asset } from "contentful-management/dist/typings/entities/asset";

const {
  CONTENTFUL_SPACE_ID,
  MANAGEMENT_ACCESS_TOKEN,
  CONTENTFUL_TARGET_ENVIRONMENT,
} = process.env;

export const client = createClient({
  accessToken: <string>MANAGEMENT_ACCESS_TOKEN,
});
export const sourceEnv = "tabula-rasa";
export const targetEnv = <string>CONTENTFUL_TARGET_ENVIRONMENT;
export const spaceId = <string>CONTENTFUL_SPACE_ID;
export const locale = "en-US";

// eslint-disable-next-line no-console
export const log = console.log;
export const error = chalk.bgRed.black;
export const warn = chalk.bgKeyword("orange").black;
export const success = chalk.bgGreen.black;

export const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

export const publish = async (entry: Entry | Asset) => {
  await entry.publish();
  const { type, id } = entry.sys;
  log(success("published:", type, id));
};

export const update = async (entry: Entry | Asset) => {
  const updatedEntry = await entry.update();
  const { type, id } = entry.sys;
  log(success("update:", type, id));
  return updatedEntry;
};