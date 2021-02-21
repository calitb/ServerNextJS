import { GetStaticProps } from 'next';
import Link from 'next/link';
import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import { ReposViewModel } from '@/github/mappers/repos';
import { getRepos } from '@/github/api';

export interface ReposProps {
  repos: ReposViewModel[];
}

export default function Repositories({ repos }: ReposProps): JSX.Element {
  return (
    <>
      <Meta title="Repositories" description="Demo Repositories" url="/repositories" image="https://git-scm.com/images/logos/downloads/Git-Icon-Black.png" />
      <Navbar />
      <main className="flex flex-wrap justify-center notch bg-gray-100">
        {repos.map((r, index) => (
          <RepoListItemView key={r.name} repo={r} index={index} />
        ))}
      </main>
    </>
  );
}

interface ListItemProps {
  repo: ReposViewModel;
  index: number;
}

function RepoListItemView({ index, repo: { name, url, description, topics } }: ListItemProps): JSX.Element {
  return (
    <div id={`card-${index}`} className="flex flex-col justify-center items-center my-2 p-4 w-10/12 sm:w-6/12 lg:w-96">
      <div className="h-full w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
        <div className="flex flex-col justify-between h-full py-4 px-8">
          <div>
            <div id="summary" className="flex flex-col">
              <h2 id="name" className="text-gray-700 font-semibold text-2xl tracking-wide mb-2">
                {name.replace('Sample-', '')}
              </h2>
              <p id="description" className="text-gray-500 text-base">
                {description}
              </p>
            </div>
            <div id="techs" className="my-3 flex flex-wrap -m-1">
              {topics.map((t, index) => (
                <span id={`tech-${index}`} key={t} className="m-1 bg-gray-200 rounded-full px-2 font-bold text-xs leading-loose">
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

export const getStaticProps: GetStaticProps<ReposProps> = async () => {
  const repos = await getRepos();

  return { props: { repos } };
};
