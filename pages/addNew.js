
// NEXT TASKS:
// Process RMA
// Need More Info
// Other Hold
// Send Tracking
// Verify Delivery
// Send Final Email
// Await Return

// caseID: "98765-98765-gi57i5wwhwru",
// caseNum: "98765-98765",
// rmaNum: "33398765",
// company: "CyberDyne Inc",
// refID: "ref:_00LEBJJ3b._5004T8oGRU:ref",
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
// lastUpdate: "this is the last update",
// updateTime: **NOTE** this is a UTC string representing the last time the case was updated...captures the current date/time

import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { sortDates } from "../vars/sortDates";

import styles from "../styles/AddNew.module.css";

// init empty obj with all keys we want to fill
const blankFormObj = { caseNum: "", rmaNum: "", company: "", refID: "", nextTask: "", followupDate: "", partNeeded: "", defectSN: "", warehouse: "", return: "TBD", premium: "", encrypted: "N/A", shipAddress: "", contactInfo: "", specialIns: "", ibaInfo: "", trackNum: "", notes: "", lastUpdate: "", updateTime: "" };


export default function AddNew(props) {
  // the useLocalStorage hook sets myReminders to the value in localStorage at key "savedReminders" (if it exists there)
  // const [ myReminders, setMyReminders ] = useState("savedReminders", []);
  // this hook also syncs our changes with localStorage whenever we use the state-setter setMyReminders()
  const [ formVal, setFormVal ] = useState(blankFormObj); // init pcOfSt8 and state-setter with our blank form obj
  const router = useRouter();

  // this change handler receives evt BY DEFAULT, no need to pass explicitly
  function handleChange(evt){
    // setstate by duplicating all values in current state...but also set the value of evt.target.name, to evt.target.value
    setFormVal(currState => ({...currState, [evt.target.name]: evt.target.value}));
    // as long as the input name prop matches a key in blankFormObj, this one handler will update each state val accordingly
  }

  function onSubmitForm(evt){
    evt.preventDefault();
    let myNewCaseObj = {...formVal, caseID: `${formVal.caseNum}-${uuidv4()}`}; // generate unique ID, concat w/caseNum for caseID
    // dates are received from date input form like so: "2021-06-17", format these like "Wed Jun 17 2021"
    myNewCaseObj.followupDate = dayjs(myNewCaseObj.followupDate).format('ddd MMM D YYYY');
    myNewCaseObj.updateTime = dayjs().valueOf(); // capture TODAY'S date/time in UTC (ex: 1624539988406) to populate updateTime
    // load savedReminders from localStorage, or create a blank arr if nothing stored
    let mySavedRems = JSON.parse(window.localStorage.getItem("savedReminders")) || [];
    mySavedRems.push(myNewCaseObj); // add new case obj to mySavedRems
    // call our custom sortDates function, rcv back an array of all reminders, sorted by followupDate and updateTime
    let sorted = sortDates(mySavedRems);
    window.localStorage.setItem("savedReminders", JSON.stringify(sorted)); // put the sorted copy back into localStorage
    // set memo in localStorage, which will display on home page
    window.localStorage.setItem("reminderMemo", `Saved new reminder with Case # ${myNewCaseObj.caseNum}`);
    router.push("/allReminders"); // redirect to allReminders page
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Reminder</h1>

      <form className={styles.addNewForm} id="addNew" autoComplete="off" onSubmit={onSubmitForm}>

        <label htmlFor="caseNum">
          <span className={styles.redSpan}>Case #: </span>
          <input className={styles.medInput} name="caseNum" type="text" value={formVal.caseNum} onChange={handleChange} required />
        </label>

        <label htmlFor="rmaNum">
          <span>RMA #: </span>
          <input className={styles.medInput} name="rmaNum" type="text" value={formVal.rmaNum} onChange={handleChange}/>
        </label>

        <label htmlFor="company">
          <span className={styles.redSpan}>Company: </span>
          <input className={styles.lgInput} name="company" type="text" value={formVal.company} onChange={handleChange} required />
        </label>

        <label htmlFor="refID">
          <span className={styles.redSpan}>ref_ID #: </span>
          <input className={styles.lgInput} name="refID" type="text" value={formVal.refID} onChange={handleChange} required />
        </label>

        <label htmlFor="nextTask">
          <span>Next Task: </span>
          <select name="nextTask" value={formVal.nextTask} onChange={handleChange}>
            <option value="Process RMA">Process RMA</option>
            <option value="Need More Info">Need More Info</option>
            <option value="Other Hold">Other Hold</option>
            <option value="Send Tracking">Send Tracking</option>
            <option value="Verify Delivery">Verify Delivery</option>
            <option value="Send Final Email">Send Final Email</option>
            <option value="Await Return">Await Return</option>
          </select>
        </label>

        <label htmlFor="followupDate">
          <span className={styles.redSpan}>Follow Up On: </span>
          <input name="followupDate" type="date" value={formVal.followupDate} onChange={handleChange} required />
        </label>

        <hr className={styles.myHr}/>

        <label htmlFor="partNeeded">
          <span className={styles.redSpan}>Part Needed: </span>
          <input className={styles.lgInput} name="partNeeded" type="text" value={formVal.partNeeded} onChange={handleChange} required />
        </label>

        <label htmlFor="defectSN">
          <span>Defective S/N: </span>
          <input className={styles.medInput} name="defectSN" type="text" value={formVal.defectSN} onChange={handleChange}/>
        </label>

        <label htmlFor="warehouse">
          <span>Warehouse: </span>
          <input className={styles.medInput} name="warehouse" type="text" value={formVal.warehouse} onChange={handleChange}/>
        </label>

        <hr className={styles.myHr}/>

        <label htmlFor="return">
          <span>Return?: </span>
          <select name="return" value={formVal.return} onChange={handleChange}>
            <option value="TBD">TBD</option>
            <option value="NO">NO</option>
            <option value="YES">YES</option>
          </select>
        </label>

        <label htmlFor="premium">
          <span className={styles.redSpan}>Premium?: </span>
          <select name="premium" value={formVal.premium} onChange={handleChange} required >
            <option value=""></option>
            <option value="NO">NO</option>
            <option value="YES">YES</option>
          </select>
        </label>

        <label htmlFor="encrypted">
          <span>Encrypted?: </span>
          <select name="encrypted" value={formVal.encrypted} onChange={handleChange}>
            <option value="N/A">N/A</option>
            <option value="NO">NO</option>
            <option value="YES">YES</option>
          </select>
        </label>

        <hr className={styles.myHr}/>

        <label htmlFor="shipAddress">
          <span>Shipping Address: </span>
          <br/>
          <textarea className={styles.lgTextarea} name="shipAddress" value={formVal.shipAddress} onChange={handleChange} rows="6" cols="50"/>
        </label>

        <label htmlFor="contactInfo">
          <span>Contact Info: </span>
          <br/>
          <textarea className={styles.lgTextarea} name="contactInfo" value={formVal.contactInfo} onChange={handleChange} rows="5" cols="50"/>
        </label>

        <label htmlFor="specialIns">
          <span>Special Instructions: </span>
          <input className={styles.lgInput} name="specialIns" type="text" value={formVal.specialIns} onChange={handleChange}/>
        </label>

        <hr className={styles.myHr}/>

        <label htmlFor="ibaInfo">
          <span>IBA Info: </span>
          <br/>
          <textarea className={styles.lgTextarea} name="ibaInfo" value={formVal.ibaInfo} onChange={handleChange} rows="6" cols="50"/>
        </label>

        <hr className={styles.myHr}/>

        <label htmlFor="trackNum">
          <span>Tracking #: </span>
          <input className={styles.lgInput} name="trackNum" type="text" value={formVal.trackNum} onChange={handleChange}/>
        </label>

        <label htmlFor="notes">
          <span>Notes: </span>
          <br/>
          <textarea className={styles.lgTextarea} name="notes" value={formVal.notes} onChange={handleChange} rows="8" cols="50"/>
        </label>

        <label htmlFor="lastUpdate">
          <span>Last Update: </span>
          <input className={styles.lgInput} name="lastUpdate" type="text" value={formVal.lastUpdate} onChange={handleChange}/>
        </label>

        <div className={styles.butnBox}>
          <button className={styles.bluButn} type="submit">Submit</button>
          <Link href="/">
            <a className={styles.redButn}>Cancel</a>
          </Link>
        </div>

      </form>

    </div>
  );
};

// const blankFormObj = { caseID: "", caseNum: "", rmaNum: "", company: "", refID: "", nextTask: "", followupDate: "", partNeeded: "", defectSN: "", warehouse: "", return: "", premium: "", encrypted: "", shipAddress: "", contactInfo: "", specialIns: "", ibaInfo: "", trackNum: "", notes: "", lastUpdate: "", updateTime: "" };

// INPUTs: caseNum, rmaNum, company, refID, followupDate, partNeeded, defectSN, warehouse, specialIns, trackNum, lastUpdate
// SELECTs: nextTask, return, premium, encrypted
// TEXTAREAs: shipAddress, contactInfo, ibaInfo, notes
// CALCULATED on save: caseID, updateTIme
