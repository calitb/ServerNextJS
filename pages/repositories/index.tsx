import { Repo, fetchRepos } from 'api/github';

import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface Props {
  repos: Repo[];
}

export default function Repositories({ repos }: Props) {
  return (
    <>
      <Head>
        <title>Repositories</title>
      </Head>
      <Navbar />
      <main className="flex flex-wrap justify-center notch bg-gray-100">
        {repos.map((r) => (
          <RepoListItemView key={r.name} repo={r} />
        ))}
      </main>
    </>
  );
}

interface ListItemProps {
  repo: Repo;
}

function RepoListItemView({ repo: { name, url, description, topics } }: ListItemProps): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center my-2 p-4 w-10/12 sm:w-6/12 lg:w-96">
      <div className="h-full w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
        <div className="flex flex-col justify-between h-full py-4 px-8">
          <div>
            <div id="summary" className="flex flex-col">
              <h2 className="text-gray-700 font-semibold text-2xl tracking-wide mb-2">{name.replace('Sample-', '')}</h2>
              <p className="text-gray-500 text-base">{description}</p>
            </div>
            <div id="techs" className="my-3 flex flex-wrap -m-1">
              {topics.map((t) => (
                <span key={t} className="m-1 bg-gray-200 rounded-full px-2 font-bold text-xs leading-loose">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div id="button" className="py-2">
              <Link href={url}>
                <a
                  target="_blank"
                  className="block tracking-widest uppercase text-center shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded"
                >
                  Go to repo
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const repos = await fetchRepos();

  return { props: { repos } };
};
