import { GetStaticProps } from 'next';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import styles from '@/styles/Home.module.css';

interface Props {
  message: string;
}

export default function Home({ message }: Props) {
  return (
    <>
      <Head>
        <title>calitb.dev</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <main>
          <div className={styles.overlay}></div>
          <div className="absolute h-full w-full p-16 uppercase">
            <h1 id="title" className="text-5xl font-bold my-8">
              calitb.dev
            </h1>
            <p id="message" className={`text-terminal-green opacity-80 ${styles['terminal-shadow']}`}>
              &gt; {message}
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const STRINGS = {
    en: 'This page is under construction',
    es: 'Esta página está en construcción',
  };

  return { props: { message: STRINGS[locale] ?? STRINGS['es'] } };
};
