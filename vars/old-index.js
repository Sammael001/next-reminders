
import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

import Reminder from "../components/Reminder";
import { dummyCaseData } from "../vars/fillerData";

//   https://sims4studio.com/thread/492/make-buyable-recolor-locked-debug
//  (NEWER)  https://sims4studio.com/thread/7218/video-tutorial-unlock-objects-debug
//  0x11A66	 --  Synthetic Food Serum
//  0x11A6F	 --  Need Fixer Serum

// TO DO:
// ~ gif for home page
// ~ upload route
// ~~~ hide upload button until warning is accepted and file is added to input
// ~ fill out dummy case data with information that demonstrates that these are examples only
// ~ prevent snap to bottom on save?
// ~ color dots for each nextTask


export default function Home() {

  return (
    <div className={styles.container}>
      <div className={styles.homeMenuBox}>

        <Link href="/allReminders">
          <a className={styles.butn}>
            Reminders
          </a>
        </Link>
        <Link href="/addNew">
          <a className={`${styles.butn} ${styles.borderButn}`}>
            Add New
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
