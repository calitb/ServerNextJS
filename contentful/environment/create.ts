import {
  spaceId,
  client,
  targetEnv,
  sourceEnv,
  warn,
  success,
  log,
  delay,
} from "./management";

(async () => {
  const space = await client.getSpace(<string>spaceId);
  const environments = await space.getEnvironments();

  let env = environments.items.find((_) => _.name === targetEnv);
  if (env) {
    await env.delete();
    log(
      warn(" deleted environment:", env.name, "space:", env.sys.space.sys.id)
    );
  }

  env = await space.createEnvironmentWithId(
    targetEnv,
    { name: targetEnv },
    sourceEnv
  );

  let status = env.sys.status?.sys.id;

  while (status !== "ready") {
    log(warn(" checking status of:", env.name, status));
    status = (await space.getEnvironment(targetEnv)).sys.status?.sys.id;
    await delay(500);
  }

  log(success(" created environment:", env.name, status));
})();

export {};
