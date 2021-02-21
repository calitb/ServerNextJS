import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import styles from '@/styles/Home.module.css';

export default function Home(): JSX.Element {
  return (
    <>
      <Meta title="calitb.dev" description="Personal Site" url="/" />
      <Navbar />
      <div className={styles.container}>
        <main>
          <div className={styles.overlay}></div>
          <div className="absolute h-full w-full p-16 uppercase">
            <h1 id="title" className="text-5xl font-bold my-8">
              calitb.dev
            </h1>
            <p id="message" className={`text-terminal-green opacity-80 ${styles['terminal-shadow']}`}>
              &gt; This page is under construction
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
