import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAuth } from "../lib/auth";

export default function Home() {
  const { user, signinWithGithub, signout } = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={signinWithGithub}>Sign In</button>
        <div>{user?.email}</div>
        {user && <button onClick={signout}>Sign Out</button>}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
