
// revamped version of edit page that does not rely on route params to obtain idToEdit
// this was done bc we saw errors on refreshing the page whwn we relied on route params

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/NewEdit.module.css";
import dayjs from "dayjs";
// yyyy-MM-dd

export default function NewEdit() {
  const [ idToEdit, setIdToEdit ] = useState("");
  const [ formVal, setFormVal ] = useState(null);

  useEffect(() => {
    let savedID = window.localStorage.getItem("idToEdit") || null;
    if (savedID) {
      setIdToEdit(savedID);
    }
  }, []);

  useEffect(() => {
    if (idToEdit) {
      console.log(`Inside newEdit.js we have an ID to edit: ${idToEdit}`);
      console.log("useEffect: loading stored reminders");
      // load savedReminders arr from localStorage
      let saved = JSON.parse(window.localStorage.getItem("savedReminders"));
      // locate one reminder whose caseID matches idToEdit
      let myCaseObj = saved.filter(rem => rem.caseID === idToEdit).pop(); // filter returns arr of 1, .pop that elem from arr + return it
      // setFormVal with that reminder's properties
      console.log("myCaseObj is", myCaseObj);
      setFormVal(myCaseObj);
    }
  }, [idToEdit]);

  // this change handler receives evt BY DEFAULT, no need to pass explicitly
  function handleChange(evt){
    // setstate by duplicating all values in current state...but also set the value of evt.target.name, to evt.target.value
    setFormVal(currState => ({...currState, [evt.target.name]: evt.target.value}));
    // as long as the input name prop matches a key in blankFormObj, this one handler will update each state val accordingly
  }

  function onSubmitForm(evt){
    evt.preventDefault();
    // pull down savedReminders arr from localStorage
    // find one obj in the arr whose caseID matches idToEdit
    // overwrite that obj with the formVal obj
    // save memoText into localStorage (success msg for updating the reminder)
    // save mutated copy of savedReminders into localStorage
    // TO DO: make memos display here inside newEdit
  }

  function deleteRem(){
    console.log("Deleting reminder...");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Reminder</h1>
      {
        formVal &&

        <form className={styles.editForm} id="edit" autoComplete="off" onSubmit={onSubmitForm}>

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
              <option value="Get Tracking">Get Tracking</option>
              <option value="Send Track Num">Send Track Num</option>
              <option value="Verify Delivery">Verify Delivery</option>
              <option value="Send Final Email">Send Final Email</option>
              <option value="Await Return">Await Return</option>
            </select>
          </label>

          <label htmlFor="followupDate">
            <span className={styles.redSpan}>Follow Up On: </span>
            <input name="followupDate" type="date" value={ dayjs(formVal.followupDate).format('YYYY-MM-DD') } onChange={handleChange} required />
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
            <button className={styles.grnButn} type="submit">Save</button>
            <Link href="/">
              <a className={styles.bluButn}>Cancel</a>
            </Link>
            <span className={styles.redButn} onClick={deleteRem}>Delete</span>
          </div>

        </form>

      }
    </div>
  );
};
