

import Link from 'next/link';
import dayjs from "dayjs";

import styles from "../styles/Navbar.module.css";

export default function Navbar(props) {
  return (
    <>
      <div className={styles.navContainer}>

        <div className={styles.logoContainer}>
          <Link href="/">
            <h1 className={styles.logo}>RMA Reminders</h1>
          </Link>
        </div>

        <p className={styles.today}>{dayjs().format('ddd MMM D YYYY')}</p>

        <div className={styles.linkContainer}>
          <Link href="/allReminders">
            <a className={styles.navLinkButn}>
              Reminders
            </a>
          </Link>
          <Link href="/addNew">
            <a className={styles.grnNavButn}>
              Add New
            </a>
          </Link>
          <Link href="/search">
            <a className={styles.navLinkButn}>
              Search
            </a>
          </Link>
          <Link href="/download">
            <a className={styles.navLinkButn}>
              Download
            </a>
          </Link>
          <Link href="/upload">
            <a className={styles.navLinkButn}>
              Upload
            </a>
          </Link>
        </div>

      </div>


      <div className={styles.smallNavContainer}>

        <div className={styles.logoContainer}>
          <Link href="/">
            <h1 className={styles.logo}>RMA Reminders</h1>
          </Link>
        </div>

        <p className={styles.today}>{dayjs().format('ddd MMM D YYYY')}</p>

        <div className={styles.linkContainer}>
          <Link href="/allReminders">
            <a className={styles.navLinkButn}>
              Reminders
            </a>
          </Link>
          <Link href="/addNew">
            <a className={styles.grnNavButn}>
              <i className="fas fa-calendar-plus"></i>
            </a>
          </Link>
          <Link href="/search">
            <a className={styles.navLinkButn}>
              <i className="fas fa-search"></i>
            </a>
          </Link>
          <Link href="/download">
            <a className={styles.navLinkButn}>
              <i className="fas fa-download"></i>
            </a>
          </Link>
          <Link href="/upload">
            <a className={styles.navLinkButn}>
              <i className="fas fa-file-upload"></i>
            </a>
          </Link>
        </div>

      </div>

    </>
  );
};
