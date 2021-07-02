
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
// fix favicon
// remove img tags
// host site on Vercel :D

// NOTE TO SELF: when switching from <img> to <Image> tags, saw edges of gem images from disappearing during animation
// to resolve, it was necessary to remove animation classes from gem <Image>s, wrap each <Image> in its own parent <div>, and animate the parent

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.homeMenuBox}>

        <h1 className={styles.title} onClick={() => router.push("/allReminders")}>RMA Reminders</h1>

        <div className={styles.rainbowDiv} onClick={() => router.push("/allReminders")}>

          <div className={`${styles.gemContainer}`}>
            <Image src="/images/redgem.gif" alt="gem" width={32} height={32} />
          </div>
          <div className={`${styles.gemContainer} ${styles.second}`}>
            <Image src="/images/orangegem.gif" alt="gem" width={32} height={32} />
          </div>
          <div className={`${styles.gemContainer} ${styles.third}`}>
            <Image src="/images/yellowgem.gif" alt="gem" width={32} height={32} />
          </div>
          <div className={`${styles.gemContainer} ${styles.fourth}`}>
            <Image src="/images/greengem.gif" alt="gem" width={32} height={32} />
          </div>
          <div className={`${styles.gemContainer} ${styles.fifth}`}>
            <Image src="/images/cyangem.gif" alt="gem" width={32} height={32} />
          </div>
          <div className={`${styles.gemContainer} ${styles.sixth}`}>
            <Image src="/images/bluegem.gif" alt="gem" width={32} height={32} />
          </div>
          <div className={`${styles.gemContainer} ${styles.seventh}`}>
            <Image src="/images/purplegem.gif" alt="gem" width={32} height={32} />
          </div>
          <div className={`${styles.gemContainer} ${styles.eighth}`}>
            <Image src="/images/pinkgem.gif" alt="gem" width={32} height={32} />
          </div>


        </div>

      </div>
    </div>
  )
}
