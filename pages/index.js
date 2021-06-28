
import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

import Reminder from "../components/Reminder";
import { dummyCaseData } from "../vars/fillerData";

// TO DO:
// ~ create email templates component that can display on newEdit.js
// ~~~ autopop templates with data from current formVal
// ~ on allReminders.js, give color classes to <Reminder>s based on proximity from today's date
// ~ create today.js page, which only displays today's reminders

export default function Home() {

  return (
    <div className={styles.container}>
      <div className={styles.homeMenuBox}>

        <Link href="/today">
          <a className={styles.butn}>
            Today
          </a>
        </Link>
        <Link href="/addNew">
          <a className={`${styles.butn} ${styles.borderButn}`}>
            Add New
          </a>
        </Link>
        <Link href="/allReminders">
          <a className={styles.butn}>
            All Reminders
          </a>
        </Link>
        <Link href="/">
          <a className={styles.butn}>
            All Returns
          </a>
        </Link>
        <Link href="/">
          <a className={styles.butn}>
            Search
          </a>
        </Link>
        <Link href="/">
          <a className={styles.butn}>
            Upload
          </a>
        </Link>
        <Link href="/">
          <a className={styles.butn}>
            Download
          </a>
        </Link>

      </div>
    </div>
  )
}
