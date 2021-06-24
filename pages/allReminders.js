
import { useState, useEffect } from "react";
import Image from 'next/image';

import styles from '../styles/AllReminders.module.css';

import Reminder from "../components/Reminder";

import { dummyCaseData } from "../vars/fillerData";

// today's reminders
// add new
// all reminders
// all returns
// search
// upload
// download

export default function AllReminders() {
  const [ myReminders, setMyReminders ] = useState(dummyCaseData);
  const [ showMemo, setShowMemo ] = useState(false);
  const [ memoText, setMemoText ] = useState("");

  useEffect(() => {
    console.log("useEffect: loading savedReminders into state");
    let saved = JSON.parse(window.localStorage.getItem("savedReminders")) || null;
    if (saved) {
      setMyReminders(saved);
    }
  }, []);

  useEffect(() => {
    console.log("useEffect: looking for memos");
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
      if (showMemo) {
        console.log("auto-dismissing the memo");
        dismissMemo();
      }
    }, 3000);
  }, []);

  function dismissMemo() {
    setShowMemo(false);
    setMemoText("");
  }


  function renderCaseData(){
    let caseMap = "";
    if (Array.isArray(myReminders)){
      caseMap = myReminders.map(caseObj => {
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
        <div className={styles.memoBox}>
          <p>{memoText}</p>
          <button onClick={dismissMemo}><i className="fas fa-window-close"></i></button>
        </div>
      }

      <h1 className={styles.title}>All Reminders</h1>
      <div className={styles.caseBox}>{renderCaseData()}</div>
    </div>
  )
}
