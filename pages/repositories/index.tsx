import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface Repo {
  name: string;
  url: string;
  description: string;
}

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

function RepoListItemView({ repo: { name, url, description } }: ListItemProps): JSX.Element {
  return (
    <Link href={url}>
      <a target="_blank" title={name} className="my-2 mx-2 p-4 w-5/12 sm:w-48 bg-gray-400 rounded-xl shadow-md space-y-2 border">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">{name.replace('Sample-', '')}</p>
          <p className="text-sm">{description}</p>
        </div>
      </a>
    </Link>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const response = await fetch('https://api.github.com/users/calitb/repos');
  const body = await response.json();

  const repos = body.reduce((acum: Repo[], repo: any) => {
    if (repo.name.startsWith('Sample-')) {
      acum.push({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
      });
    }

    return acum;
  }, []);

  return { props: { repos } };
};
