import { GetStaticProps } from 'next';
import Head from 'next/head';
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
      <div className={styles.container}>
        <div className={styles.overlay}></div>
        <div className="absolute h-full w-full p-16 uppercase">
          <h1 className="text-5xl font-bold my-8">calitb.dev</h1>
          <p className={`text-terminal-green opacity-80 ${styles['terminal-shadow']}`}>&gt; {message}</p>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const STRINGS = {
    en: 'This page is under construction',
    es: 'Esta página está en construcción',
  };

  console.log({ locale });

  return { props: { message: STRINGS[locale] ?? STRINGS['en'] } };
};
