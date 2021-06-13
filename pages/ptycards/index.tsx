import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

export default function PTYCardsPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>PTYCards</title>
        <meta name="description" content="Conoce el saldo de Metrobus, Panapass, IDAAN y la luz." />
        <meta property="og:title" content="PTYCards" />
        <meta property="og:url" content="https://calitb.dev/ptycards" />
        <meta property="og:description" content="Conoce el saldo de Metrobus, Panapass, IDAAN y la luz." />
        <meta property="og:image" content="https://calitb.dev/ptycards/share/ptycards_og.jpg" />
        <link rel="shortcut icon" href="https://calitb.dev/ptycards/share/ptycards.png" type="image/x-icon" />
      </Head>

      <div className="flex items-center">
        <div className="flex items-center max-w-md">
          <h3 className="text-3xl bold text-center">PTYCards</h3>
          <img className="mt-2 w-40 h-40 rounded-2xl" src="./ptycards/share/ptycards.png" />
          <div className="mt-4 flex flex-row">
            <Link href="https://appsto.re/pa/VyNC0.i">
              <a className="mr-2" target="_blank">
                <img className="h-12" src="./ptycards/share/iOS_badge.png" />
              </a>
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=com.mindslab.ptycards.app">
              <a target="_blank">
                <img className="h-12" src="./ptycards/share/android_badge.png" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req;

  const ipad = !!req.headers['user-agent'].match(/iPad/);
  const ipod = !!req.headers['user-agent'].match(/iPod/);
  const iphone = !!req.headers['user-agent'].match(/iPhone/);
  const android = !!req.headers['user-agent'].match(/Android/);

  if (ipad || ipod || iphone) {
    return {
      redirect: {
        destination: 'https://appsto.re/pa/VyNC0.i',
        permanent: false,
      },
    };
  } else if (android) {
    return {
      redirect: {
        destination: 'https://play.google.com/store/apps/details?id=com.mindslab.ptycards.app',
        permanent: false,
      },
    };
  } else {
    return { props: {} };
  }
};
