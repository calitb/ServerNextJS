import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar(): JSX.Element {
  const router = useRouter();

  const openMenu = () => {
    document.getElementById('mobile-menu-icon-open').classList.toggle('block');
    document.getElementById('mobile-menu-icon-open').classList.toggle('hidden');

    document.getElementById('mobile-menu-icon-close').classList.toggle('hidden');
    document.getElementById('mobile-menu-icon-close').classList.toggle('block');

    document.getElementById('mobile-menu').classList.toggle('block');
    document.getElementById('mobile-menu').classList.toggle('hidden');
  };

  const activeRoute = 'text-white bg-gray-900 ';
  const inactiveRoute = 'text-gray-300 hover:bg-gray-700 hover:text-white ';

  const routes = [
    {
      name: 'Repositories',
      url: '/repositories',
      active: router.pathname === '/repositories',
    },
    {
      name: 'Engineering Wiki',
      url: 'https://www.notion.so/Engineering-Wiki-fe57c54e12574cc6801070cf719ccd1f',
      active: router.pathname.startsWith('https://www.notion.so/Engineering-Wiki-fe57c54e12574cc6801070cf719ccd1f'),
    },
  ];

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
      </Head>
      <nav className="notch bg-gray-800">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
              >
                <svg
                  onClick={openMenu}
                  id="mobile-menu-icon-open"
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>

                <svg
                  onClick={openMenu}
                  id="mobile-menu-icon-close"
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <a id="link-home" className="text-lg text-white">
                    calitb.dev
                  </a>
                </Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {routes.map(({ name, url, active }) => (
                    <Link key={name} href={url}>
                      <a id={`link-${name}`} target={url.startsWith('http') ? '_blank' : undefined} className={`${active ? activeRoute : inactiveRoute} px-3 py-2 rounded-md text-sm font-medium`}>
                        {name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">
                <div>
                  <button
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Link href="https://github.com/calitb">
                      <a id="link-github" target="_blank">
                        <svg width="36" height="36" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"
                            fill="#fff"
                          />
                        </svg>
                      </a>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="mobile-menu" className="hidden sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {routes.map(({ name, url, active }) => (
              <Link key={name} href={url}>
                <a id={`mlink-${name}`} className={`${active ? activeRoute : inactiveRoute}  block px-3 py-2 rounded-md text-base font-medium`}>
                  {name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
