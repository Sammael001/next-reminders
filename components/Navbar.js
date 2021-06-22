

import Link from 'next/link';

import styles from "../styles/Navbar.module.css";

export default function Navbar(props) {
  return (
    <div className={styles.navContainer}>

      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>RMA Reminders</h1>
      </div>

      <div className={styles.linkContainer}>

        <Link href="/today">
          <a className={styles.navLinkButn}>
            Today
          </a>
        </Link>
        <Link href="/addNew">
          <a className={styles.grnNavButn}>
            Add New
          </a>
        </Link>
        <Link href="/allReminders">
          <a className={styles.navLinkButn}>
            All Reminders
          </a>
        </Link>
        <Link href="/">
          <a className={styles.navLinkButn}>
            All Returns
          </a>
        </Link>
        <Link href="/">
          <a className={styles.navLinkButn}>
            Search
          </a>
        </Link>
        <Link href="/">
          <a className={styles.navLinkButn}>
            Upload
          </a>
        </Link>
        <Link href="/">
          <a className={styles.navLinkButn}>
            Download
          </a>
        </Link>

      </div>

    </div>
  );
};
