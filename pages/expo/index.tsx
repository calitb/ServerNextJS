import Meta from "@/components/Meta";
import Navbar from "@/components/Navbar";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { ExpoBuild, ExpoBuildFileData } from "types";

export interface Props {
  builds: ExpoBuildFileData;
}

export default function ExpoBuilds({ builds }: Props): JSX.Element {
  const appIdentifiers = Object.keys(builds);

  const now = new Date();

  return (
    <>
      <Meta
        title="Expo Builds"
        description="Expo builds"
        url="/expo"
      />
      <Navbar />
      <main className="flex flex-col items-center notch">
        <section className="w-full">
          {appIdentifiers.map(appIdentifier => (
            <div key={appIdentifier}>
              {builds[appIdentifier].filter((build) => {
                const expiration = new Date(build.expirationDate);
                const availability = Math.floor((expiration.getTime() - now.getTime()) / (1000 * 3600 * 24));
                return availability > 1;
              }).map(build => (
                <BuildView key={build.id} build={build} />
              ))}
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

interface BuildProps {
  build: ExpoBuild;
}

function BuildView({ build }: BuildProps): JSX.Element {
  const { id, expirationDate, createdAt, platform, artifacts: { buildUrl }, metadata: { appName, appVersion, appBuildVersion, distribution, buildProfile, gitCommitHash, sdkVersion } } = build;

  const now = new Date();
  const expiration = new Date(expirationDate);
  const availability = Math.floor((expiration.getTime() - now.getTime()) / (1000 * 3600 * 24));

  return (
    <div id={`card-${id}`} className="flex flex-col justify-center items-center my-2 p-4 w-full">
      <div className="h-full w-full bg-gray-100 shadow-md rounded-lg overflow-hidden mx-auto">
        <div className="flex flex-col justify-between h-full py-4 px-8">
          <div>
            <div id="summary" className="flex flex-col">
              <h2 id="name" className="text-gray-700 font-semibold text-2xl tracking-wide mb-2">
                {`${appName} ${platform} ${distribution} distribution build  (${new Date(createdAt).toLocaleString()})`}
              </h2>
            </div>
            <div id="tags" className="my-3 flex flex-wrap -m-1">
              {[
                `Profile: ${buildProfile}`,
                `Version: ${appVersion}`,
                `Build Number: ${appBuildVersion}`,
                `Commit ${gitCommitHash.substring(0, 7)}`,
                `Expo: ${sdkVersion}`,
                `Availability: ${availability} days`].map((t, index) => (
                  <span id={`tech-${index}`} key={t} className="m-1 bg-gray-200 rounded-full px-2 font-bold text-xs leading-loose">
                    {t}
                  </span>
                ))}
            </div>
          </div>
          <div>
            <div id="button" className="py-2">
              <Link href={buildUrl}>
                <a
                  target="_blank"
                  className="block tracking-widest uppercase text-center shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded"
                >
                  Download
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <div className="text-xl">{formatDate(createdAt)}{platform}</div>
    //   {appName}{appVersion}{appBuildVersion}{distribution}{buildProfile}{gitCommitHash}{sdkVersion}{status}{expirationDate}

    //   {buildUrl}
    //   <Link href={buildUrl}>
    //     <a target="_blank" className="hover:text-gray-400 underline">
    //       Download
    //     </a>
    //   </Link>
    // </div>
  )
}


export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(`http://localhost:3000/api/expo/build`)
  const data: { status: string; builds: ExpoBuildFileData } = await res.json()
  return { props: { builds: data.builds } };
};
