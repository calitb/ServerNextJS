import Meta from "@/components/Meta";
import Navbar from "@/components/Navbar";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { ExpoBuild, ExpoBuildFileData } from "types";

export interface Props {
  builds: ExpoBuildFileData;
}

const BUILD_URLS = {
  "com.mindslab.tvguide": "https://expo.dev/accounts/calitb-org/projects/tv-guide/builds"
};
const APP_IDENTIFIERS = Object.keys(BUILD_URLS);

const TYPES_FILTERS = {
  "Preview (AdHoc)": (build: ExpoBuild) => build.metadata.buildProfile === "preview" && !build.error,
  "Store": (build: ExpoBuild) => build.metadata.buildProfile === "production" && build.metadata.distribution === 'store' && !build.error,
  "Expo Development client": (build: ExpoBuild) => build.metadata.buildProfile === "development" && !build.error,
}
const TYPES = Object.keys(TYPES_FILTERS);

export default function ExpoBuilds({ builds }: Props): JSX.Element {
  const [selectedAppIdentifier, setSelectedAppIdentifier] = useState(APP_IDENTIFIERS[0])
  const [selectedBuildType, setSelectedBuildType] = useState(TYPES[0])

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
          <div className="px-5">
            <label>App Identifier:</label>
            <select name="appIdentifier" id="appIdentifier" onChange={(event) => setSelectedAppIdentifier(event.target.value)}>
              {APP_IDENTIFIERS.map((identifier) => <option key={identifier} value={identifier}>{identifier}</option>)}
            </select>
          </div>
          <div className="px-5">
            <label>Build type:</label>
            <select name="buildType" id="buildType" onChange={(event) => setSelectedBuildType(event.target.value)}>
              {TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          {builds[selectedAppIdentifier].filter((build) => {
            const expiration = new Date(build.expirationDate);
            const availability = Math.floor((expiration.getTime() - Date.now().valueOf()) / (1000 * 3600 * 24));
            return availability > 1 && TYPES_FILTERS[selectedBuildType](build);
          }).map(build => (
            <BuildView key={build.id} build={build} />
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
  const { id, expirationDate, createdAt, platform, metadata: { appIdentifier, appName, appVersion, appBuildVersion, distribution, buildProfile, gitCommitHash, sdkVersion } } = build;

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
              <Link href={`${BUILD_URLS[appIdentifier]}/${id}`}>
                <a
                  target="_blank"
                  className="block tracking-widest uppercase text-center shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded"
                >
                  Go to Expo
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(`https://calitb.dev/api/expo/build`)
  const data: { status: string; builds: ExpoBuildFileData } = await res.json()
  return { props: { builds: data.builds } };
};
