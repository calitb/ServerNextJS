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
      <main className="flex flex-wrap justify-center notch">
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
    <Link href={url}>
      <a target="_blank" title={name} className="flex flex-col justify-between my-2 mx-2 p-4 w-5/12 sm:w-48 bg-gray-400 rounded-xl shadow-md space-y-2 border">
        <div className="text-center mb-2">
          <p className="text-lg font-semibold">{name.replace('Sample-', '')}</p>
          <p className="text-sm">{description}</p>
        </div>
        <div className="border-t-2 pt-2 text-center h-32 sm:h-24">
          <p className="text-md font-semibold">Technologies</p>
          <p className="text-sm">{topics.join(', ')}</p>
        </div>
      </a>
    </Link>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const repos = await fetchRepos();

  return { props: { repos } };
};
