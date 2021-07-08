
// caseID: "98765-98765-gi57i5wwhwru",
// caseNum: "98765-98765",
// rmaNum: "33398765",
// company: "CyberDyne Inc",
// refID: "ref:_00LEBJJ3b._5004T8oGRU:ref",
// lastUpdate: "this is the last update",
// nextTask: "this is the next task",
// followupDate: "Tue Jun 22 2021",
// partNeeded: "(1 x 4TB HD) 321-1823",
// defectSN: "NS7181290034",
// warehouse: "DAL",
// return: "NO",
// premium: "YES",
// encrypted: "N/A",
// shipAddress: "709 Greene St, Dallas TX 77777",
// contactInfo: "Alice Williams, 123-456-7890, alice.williams@cyber.net",
// specialIns: "N/A",
// ibaInfo: "THIS IS THE IBA INFO",
// trackNum: "11112222333333",
// notes: "these are my notes"

// Process RMA - red
// Need More Info - orange
// Other Hold - yellow
// Send Tracking - green
// Verify Delivery - cyan
// Send Final Email - blue
// Await Return - pink

import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import dayjs from "dayjs";

import styles from "../styles/Reminder.module.css";

export default function Reminder(props) {
  const [ isOpen, setIsOpen ] = useState(false);
  const router = useRouter();

  function toggleSlide(){
    setIsOpen(currIsOpen => !currIsOpen);
  }

  // this is called when we click to edit a reminder
  function goEdit(idToEdit){
    console.log("Editing reminder with ID ", idToEdit);
    if (idToEdit === "00001" || idToEdit === "00002" || idToEdit === "00003") { // IDs for the dummy cases
      window.localStorage.setItem("reminderMemo", `This reminder is just a demo, and can't be edited`);
      router.reload(window.location.pathname); // reload page to show the reminderMemo text above
    } else {
      window.localStorage.setItem("idToEdit", idToEdit); // add param "idToEdit" to localStorage
      router.push("/newEdit"); // redirect to /newEdit page
    }
  }

  // gives red, yel or grn color classes based on followupDate's proximity to today's date
  function giveColorClass(){
    let today = dayjs().format('ddd MMM D YYYY');
    if (today === props.followupDate) {
      return styles.remBodyYel;
    } else if ( dayjs(props.followupDate).isBefore(dayjs(today)) ){
      return styles.remBodyRed;
    } else {
      return styles.remBodyGrn;
    }
  }

  // object with keys matching nextTask, and values which are the src for the paired gem image
  const gemColors = {
    "Process RMA": "/images/redgem.gif",
    "Need More Info": "/images/orangegem.gif",
    "Other Hold": "/images/yellowgem.gif",
    "Send Tracking": "/images/greengem.gif",
    "Verify Delivery": "/images/cyangem.gif",
    "Send Final Email": "/images/bluegem.gif",
    "Await Return": "/images/pinkgem.gif"
  };


  return (
    <div className={`${styles.remBody} ${giveColorClass()} ${isOpen ? styles.parentOpenSlide : styles.parentClosedSlide}`}>
      <p><span className={styles.fieldName}>Case #:</span> {props.caseNum}</p>
      <p><span className={styles.fieldName}>RMA #:</span> {props.rmaNum}</p>
      <p><span className={styles.fieldName}>Company:</span> {props.company}</p>
      <p><span className={styles.fieldName}>Ref ID:</span> {props.refID}</p>

      <hr className={styles.regHr}/>

      <p><span className={styles.fieldName}>Part Needed:</span> {props.partNeeded}</p>
      <p><span className={styles.fieldName}>Defective S/N:</span> {props.defectSN}</p>

      <hr className={styles.regHr}/>

      <p><span className={styles.fieldName}>Last Update:</span> {props.lastUpdate}</p>

      <div className={styles.dotDivHolder}>
        <p><span className={styles.fieldName}>Next Task:</span> {props.nextTask}</p>
        <Image src={ gemColors[props.nextTask] } alt="colorDot" width={20} height={20}/>
      </div>

      <p><span className={styles.fieldName}>Followup Date:</span> {props.followupDate}</p>

      <hr className={styles.regHr}/>

      <div className={styles.butnHolder}>
        <span className={styles.iconButn} onClick={toggleSlide}>
          <i className={ isOpen ? "fas fa-minus-square" : "fas fa-plus-square" }></i>
        </span>
        <span className={styles.iconButn} onClick={() => goEdit(props.caseID)}>
          <i className="fas fa-edit"></i>
        </span>
      </div>

      <div className={`${styles.slideDefaults} ${isOpen ? styles.showSlide : styles.hideSlide}`}>
        <hr className={styles.myHr}/>

        <p><span className={styles.fieldName}>Warehouse:</span> {props.warehouse}</p>

        <p><span className={styles.fieldName}>Return:</span> {props.return}</p>
        <p><span className={styles.fieldName}>Premium:</span> {props.premium}</p>
        <p><span className={styles.fieldName}>Encrypted:</span> {props.encrypted}</p>
        <hr className={styles.myHr}/>
        <p><span className={styles.fieldName}>Shipping Address:</span> {props.shipAddress}</p>
        <p><span className={styles.fieldName}>Contact Info:</span> {props.contactInfo}</p>
        <p><span className={styles.fieldName}>Special Ins:</span> {props.specialIns}</p>
        <hr className={styles.myHr}/>
        <p><span className={styles.fieldName}>IBA Info:</span> {props.ibaInfo}</p>
        <hr className={styles.myHr}/>
        <p><span className={styles.fieldName}>Tracking:</span> {props.trackNum}</p>
        <p><span className={styles.fieldName}>Notes:</span> {props.notes}</p>
        <hr className={styles.dottedHr}/>
      </div>
    </div>
  );
};
