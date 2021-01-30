import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className="absolute h-full w-full p-16 uppercase">
        <h1 className="text-5xl font-bold my-8">calitb.dev</h1>
        <p className={`text-terminal-green opacity-80 ${styles['terminal-shadow']}`}>&gt; This page is under construction</p>
      </div>
    </div>
  );
}
