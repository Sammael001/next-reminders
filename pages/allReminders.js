
import { useState, useEffect } from "react";
import Image from 'next/image';

import styles from '../styles/allReminders.module.css';

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
  const [ caseData, setCaseData ] = useState(dummyCaseData);

  useEffect(() => {
    console.log("Running useEffect");
    setCaseData(dummyCaseData);
  }, []);

  function renderCaseData(){
    let caseMap = "";
    if (Array.isArray(caseData)){
      caseMap = caseData.map(caseObj => {
        return <Reminder key={caseObj.caseID} {...caseObj}/>;
      });
    } else {
      caseMap = <p>foo</p>;
      console.log("foo!")
    }
    return caseMap;
  }


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Reminders</h1>
      <div className={styles.caseBox}>{renderCaseData()}</div>
    </div>
  )
}
