
import { useState, useEffect } from "react";

import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { dummyCaseData } from "../vars/fillerData";

// today's reminders
// add new
// all reminders
// all returns
// search
// upload
// download

export default function Home() {
  const [ caseData, setCaseData ] = useState("");

  useEffect(() => {
    console.log("Running useEffect");
    setCaseData(dummyCaseData);
  }, []);

  function renderCaseData(){
    let caseMap = "";
    if (Array.isArray(caseData)){
      caseMap = caseData.map(caseObj => {
        return <p>{caseObj.caseNum}</p>;
      });
    } else {
      caseMap = <p>foo</p>;
      console.log("foo!")
    }
    return caseMap;
  }


  return (
    <div className={styles.container}>
      {renderCaseData()}
    </div>
  )
}
