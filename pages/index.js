
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
// host site on Vercel :D

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.homeMenuBox}>

        <h1 className={styles.title} onClick={() => router.push("/allReminders")}>RMA Reminders</h1>

        <div className={styles.rainbowDiv} onClick={() => router.push("/allReminders")}>

          <img className={styles.gemAnimated} src="/images/redgem.gif" alt="gem" />
          <img className={`${styles.gemAnimated} ${styles.second}`} src="/images/orangegem.gif" alt="gem" />
          <img className={`${styles.gemAnimated} ${styles.third}`} src="/images/yellowgem.gif" alt="gem" />
          <img className={`${styles.gemAnimated} ${styles.fourth}`} src="/images/greengem.gif" alt="gem" />
          <img className={`${styles.gemAnimated} ${styles.fifth}`} src="/images/cyangem.gif" alt="gem" />
          <img className={`${styles.gemAnimated} ${styles.sixth}`} src="/images/bluegem.gif" alt="gem" />
          <img className={`${styles.gemAnimated} ${styles.seventh}`} src="/images/purplegem.gif" alt="gem" />
          <img className={`${styles.gemAnimated} ${styles.eighth}`} src="/images/pinkgem.gif" alt="gem" />

        </div>

      </div>
    </div>
  )
}
