import Head from 'next/head';
import Link from 'next/link';

export default (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>

      <main className="h-full bg-gray-200 flex-grow">
        <header className="flex flex-col items-center text-center pt-20 md:pt-36">
          <h1 className="uppercase text-lg text-green-500">404</h1>
          <h2 className="mt-1">Page not found</h2>
        </header>
        <div className="flex flex-col items-center text-center mt-6">
          <div className="max-w-sm md:max-w-md px-4 md:px-0">Sorry we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Or the page might be unavailable.</div>
          <div className="mt-8">
            <Link href="/">
              <a className="block tracking-widest uppercase text-center shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded">
                Go to Homepage
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
