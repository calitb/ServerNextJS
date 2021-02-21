import { spaceId, client, targetEnv, success, log } from "./management";

(async () => {
  const space = await client.getSpace(spaceId);
  const env = await space.getEnvironment(targetEnv);

  await env.delete();

  log(
    success(
      " deleted environment:",
      env.name,
      " status",
      env.sys.status?.sys.id
    )
  );
})();

export {};
