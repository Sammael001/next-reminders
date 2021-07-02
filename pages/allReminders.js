
import { useState, useEffect } from "react";
import Image from 'next/image';
import dayjs from "dayjs";

import styles from "../styles/AllReminders2.module.css";
import Reminder from "../components/Reminder";
import { dummyCaseData } from "../vars/fillerData";

// reminder filters: "today", "reminders", "returns", "everything"

export default function AllReminders() {
  const [ myReminders, setMyReminders ] = useState(dummyCaseData);
  const [ remFilter, setRemFilter ] = useState("reminders"); // filters reminders
  const [ showMemo, setShowMemo ] = useState(false);
  const [ memoText, setMemoText ] = useState("");

  // loads savedReminders from localStorage (if found), replacing dummyCaseData
  useEffect(() => {
    // console.log("useEffect: loading savedReminders into state");
    let saved = JSON.parse(window.localStorage.getItem("savedReminders")) || null;
    if (saved) {
      setMyReminders(saved);
    }
  }, []);

  // checks for "added new rem" or "deleted rem" memos in localStorage, and displays them if found
  useEffect(() => {
    let mounted = true;
    // check for memo text in window.localStorage
    let memo = window.localStorage.getItem("reminderMemo") || null;
    // if a memo exists, show the memo in an absolutely positioned div
    if (memo) {
      console.log("Found a memo!");
      setShowMemo(true); // show memo div
      setMemoText(memo);
      window.localStorage.removeItem("reminderMemo"); // erase memo from storage after it is shown
    }
    setTimeout(() => {
      if (showMemo && mounted) {
        console.log("auto-dismissing the memo");
        dismissMemo();
      }
    }, 3000);
    return function cleanup() {
      mounted = false;
    };
  }, []);

  // hides memo automatically if not manually dismissed
  function dismissMemo() {
    setShowMemo(false);
    setMemoText("");
  }

  // renders map of reminders, filtered by remFilter settings
  // reminder filters: "today", "reminders", "returns", "everything"
  function renderCaseData(){
    let filtered; // holds filtered array we will map over to produce caseMap
    let caseMap = ""; // holds map with a <Reminder/> component for each reminder element

    if (Array.isArray(myReminders)){
      if (remFilter === "today") {
        filtered = myReminders.filter(function(caseObj) {
          // returns TRUE if reminder's followupdate is ON or BEFORE today's date
          return (caseObj.followupDate === dayjs().format('ddd MMM D YYYY') || dayjs(caseObj.followupDate).isBefore(dayjs()))
        });
      } else if (remFilter === "reminders") {
        filtered = myReminders.filter(caseObj => caseObj.nextTask !== "Await Return");
      } else if (remFilter === "returns") {
        filtered = myReminders.filter(caseObj => caseObj.nextTask === "Await Return");
      } else {
        filtered = [...myReminders];
      }

      caseMap = filtered.map(caseObj => {
        return <Reminder key={caseObj.caseID} {...caseObj}/>;
      });
    } else {
      caseMap = <p>Something went wrong!</p>;
      console.log("Something went wrong!")
    }
    return caseMap;
  }


  return (
    <div className={styles.container}>

      { showMemo &&
        <div className={styles.memoBox} onClick={dismissMemo}>
          <p>{memoText}</p>
          <button onClick={dismissMemo}><i className="fas fa-window-close"></i></button>
        </div>
      }

      <h1 className={styles.title}>Reminders</h1>

      <div className={styles.filterBox}>
        <button
          className={`${styles.butn} ${remFilter === "today" ? styles.grnButn : styles.bluButn}`}
          onClick={() => setRemFilter("today")}
        >Today</button>
        <button
          className={`${styles.butn} ${remFilter === "reminders" ? styles.grnButn : styles.bluButn}`}
          onClick={() => setRemFilter("reminders")}
        >All Reminders</button>
        <button
          className={`${styles.butn} ${remFilter === "returns" ? styles.grnButn : styles.bluButn}`}
          onClick={() => setRemFilter("returns")}
        >All Returns</button>
        <button
          className={`${styles.butn} ${remFilter === "everything" ? styles.grnButn : styles.bluButn}`}
          onClick={() => setRemFilter("everything")}
        >Everything</button>
      </div>

      <div className={styles.caseBox}>
        { renderCaseData() }
      </div>

    </div>
  )
}
