import { GithubIcon, PlayIcon } from "@/components/Icons";
import { getRepos } from "@/github/api";
import { ReposViewModel } from "@/github/mappers/repos";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Repositories",
  description: "Personal Site",
};

export default async function Page() {
  const reposToShow = [
    "Unmatched",
    "Sample-VueJS",
    "Sample-NextJS",
    "calitbdev",
  ];

  const repos = (await getRepos()).filter((repo) =>
    reposToShow.includes(repo.name),
  );

  return (
    <main className="notch flex flex-wrap justify-center bg-gray-100">
      {repos.map((r, index) => (
        <RepoListItemView key={r.name} repo={r} index={index} />
      ))}
    </main>
  );
}

interface ListItemProps {
  repo: ReposViewModel;
  index: number;
}

function RepoListItemView({
  index,
  repo: { name, url, description, topics, homepageUrl },
}: ListItemProps): JSX.Element {
  return (
    <div className="my-2 flex w-10/12 flex-col items-center justify-center p-4 sm:w-6/12 lg:w-96">
      <div className="mx-auto h-full w-full overflow-hidden rounded-md bg-white shadow-md">
        <div className="flex h-full flex-col justify-between px-8 py-4">
          <div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-700">{name}</h2>

              <p className="text-base text-gray-500">{description}</p>
            </div>
            <div className="-m-1 my-3 flex flex-wrap">
              {topics.map((t, index) => (
                <span
                  key={t}
                  className="m-1 rounded-md bg-gray-200 px-2 text-xs font-bold leading-loose"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <Link
                href={url}
                target="_blank"
                className="rounded-md bg-gray-800 p-1"
              >
                <GithubIcon />
              </Link>
              <Link
                href={homepageUrl}
                target="_blank"
                className="rounded-md bg-gray-800 p-1 text-white"
              >
                <PlayIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
