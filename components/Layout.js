
import Navbar from "./Navbar";
import Head from 'next/head';

import styles from "../styles/Layout.module.css";

const Layout = ({children}) => {
  return (
    <>
      <Head>
        <title>RMA Reminders</title>
        <meta name="description" content="RMA Reminder app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Roboto+Condensed&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.container}>
        <Navbar />
        <>
          { children }
        </>
      </div>
    </>
  );
};

export default Layout;
