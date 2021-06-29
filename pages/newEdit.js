
// revamped version of edit page that does not rely on route params to obtain idToEdit
// this was done bc we saw errors on refreshing the page when we relied on route params

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import styles from "../styles/NewEdit.module.css";
import { sortDates } from "../vars/sortDates";
import Templates from "../components/Templates";

export default function NewEdit() {
  const router = useRouter();
  const bottomDivRef = useRef(null);
  const [ idToEdit, setIdToEdit ] = useState(""); // stores idToEdit from localStorage
  const [ formVal, setFormVal ] = useState(null); // stores data for this one reminder obj
  const [ showMsg, setShowMsg ] = useState(false); // controls save message
  const [ showDelete, setShowDelete ] = useState(false); // controls delete dialog
  const [ scrollCommand, setScrollCommand ] = useState(null); // controls up/down scroll buttons in sideNav
  const [ showTemplates, setShowTemplates ] = useState(false); // hides/shows email templates

  // picks up idToEdit from localStorage and sets it into state
  useEffect(() => {
    let savedID = window.localStorage.getItem("idToEdit") || null;
    if (savedID) {
      setIdToEdit(savedID);
    }
  }, []);

  // if idToEdit exists, pulls savedReminders from localStorage and sets the correct reminder obj into state
  useEffect(() => {
    if (idToEdit) {
      console.log(`Inside newEdit.js we have an ID to edit: ${idToEdit}`);
      console.log("useEffect: loading stored reminders");
      // load savedReminders arr from localStorage
      let saved = JSON.parse(window.localStorage.getItem("savedReminders"));
      // locate one reminder whose caseID matches idToEdit
      let myCaseObj = saved.filter(rem => rem.caseID === idToEdit).pop(); // filter returns arr of 1, .pop that elem from arr + return it
      // setFormVal with that reminder's properties
      // console.log("myCaseObj is", myCaseObj);
      setFormVal(myCaseObj);
    }
  }, [idToEdit]);

  // scrolls to bottom or top
  useEffect(() => {
    if (scrollCommand === "top") {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    } else if (bottomDivRef.current && scrollCommand === "bottom") {
      bottomDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setScrollCommand(null); // reset scrollCommand so it can be reused
  }, [scrollCommand]);


  // dismisses save msg, if it hasn't already been dismissed
  useEffect(() => {
    // we were getting a memory leak if we navigated away from newEdit before 3s was up, bc we were trying to set state for an unmounted component...
    let mounted = true; // ...so to resolve this, we 1) let mounted = true...
    setTimeout(() => {
      if (showMsg && mounted) { // 2) check if mounted before trying to set component state, and ...
        console.log("auto-dismissing the save msg");
        setShowMsg(false);
      }
    }, 3000);
    // ... 3) return a cleanup function that sets mounted to FALSE
    return function cleanup() {
      mounted = false;
    }
  }, [showMsg]);

  // this change handler receives evt BY DEFAULT, no need to pass explicitly
  function handleChange(evt){
    // setstate by duplicating all values in current state (for formVal)...but also set the value of evt.target.name, to evt.target.value
    setFormVal(currState => ({...currState, [evt.target.name]: evt.target.value}));
    // as long as the input name prop matches a key in formVal, this one handler will update each value accordingly
  };

  // called by clicking a span for a copyable input field
  function copyToClipboard(evt){
    // we set the id prop on each clickable span, to the key we want to access inside formVal
    // EX: <span id="caseNum" onClick={copyToClipboard}>
    // so evt.target.id === "caseNum", and formval[evt.target.id] will be "123456-234567" or w/e
    navigator.clipboard.writeText(formVal[evt.target.id]); // navigator.clipboard.writeText() copies that value to the clipboard
  }

  // called when we save changes
  function onSubmitForm(evt){
    evt.preventDefault();
    let myNewCaseObj = {...formVal }; // create new case obj with copy of all current formVal data
    // dates are received from date input form like so: "2021-06-17", format these like "Wed Jun 17 2021"
    myNewCaseObj.followupDate = dayjs(myNewCaseObj.followupDate).format('ddd MMM D YYYY');
    myNewCaseObj.updateTime = dayjs().valueOf(); // capture TODAY'S date/time in UTC (ex: 1624539988406) to populate updateTime
    // pull down savedReminders arr from localStorage
    let saved = JSON.parse(window.localStorage.getItem("savedReminders"));
    // find one obj in the arr whose caseID matches idToEdit...and overwrite that obj with the formVal obj
    let newReminderMap = saved.map(remObj => {
      return (remObj.caseID === idToEdit) ? myNewCaseObj : remObj; // if the idToEdit does not match, return that obj unchanged
    });
    // call our custom sortDates function, rcv back an array of all reminders, sorted by followupDate and updateTime
    let sorted = sortDates(newReminderMap);
    // save mutated copy of savedReminders into localStorage
    window.localStorage.setItem("savedReminders", JSON.stringify(sorted));
    setShowMsg(true); // reveal "saved changes!" msg
  };


  // called when we confirm reminder deletion
  function deleteRem(){
    console.log("Deleting reminder...");
    let saved = JSON.parse(window.localStorage.getItem("savedReminders"));
    let newReminderMap = saved.filter(caseObj => caseObj.caseID !== idToEdit);
    // push delete confirmation memo into localStorage
    let msg = `Deleted one reminder with case # ${formVal.caseNum}`;
    window.localStorage.setItem("reminderMemo", msg);
    window.localStorage.setItem("savedReminders", JSON.stringify(newReminderMap));
    router.push("/allReminders"); // redirect after deleting a reminder
  };

  // reveals/hides email templates and scrolls to bottom of page
  function handleShowTemplates(){
    setShowTemplates(!showTemplates); // TOGGLES template menu open/shut
    setScrollCommand("bottom");
  }


  // note that the input form will NOT display if we don't have formVal
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Reminder</h1>

      <div className={styles.sideNav}>
        <span className={styles.sideNavButn} onClick={() => setScrollCommand("top")}>
          <i className="fas fa-chevron-circle-up"></i>
        </span>
        <label htmlFor="submit-button" className={styles.sideNavButn}>
          <i className="fas fa-save"></i>
        </label>
        <span className={styles.sideNavButn} onClick={() => setScrollCommand("bottom")}>
          <i className="fas fa-chevron-circle-down"></i>
        </span>
      </div>

      { showMsg &&
        <div className={styles.memoBox}>
          <p>Saved changes!</p>
          <button onClick={() => setShowMsg(false)}><i className="fas fa-window-close"></i></button>
        </div>
      }

      {
        formVal &&
        <>
          <form className={styles.editForm} id="edit" autoComplete="off" onSubmit={onSubmitForm}>

            <label htmlFor="caseNum">
              <span className={styles.copySpan} id="caseNum" onClick={copyToClipboard}>Case #: </span>
              <input className={styles.medInput} name="caseNum" type="text" value={formVal.caseNum} onChange={handleChange} required />
            </label>

            <label htmlFor="rmaNum">
              <span className={styles.copySpan} id="rmaNum" onClick={copyToClipboard}>RMA #: </span>
              <input className={styles.medInput} name="rmaNum" type="text" value={formVal.rmaNum} onChange={handleChange}/>
            </label>

            <label htmlFor="company">
              <span className={styles.copySpan} id="company" onClick={copyToClipboard}>Company: </span>
              <input className={styles.lgInput} name="company" type="text" value={formVal.company} onChange={handleChange} required />
            </label>

            <label htmlFor="refID">
              <span className={styles.copySpan} id="refID" onClick={copyToClipboard}>ref_ID #: </span>
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
              <span>Follow Up On: </span>
              <input name="followupDate" type="date" value={ dayjs(formVal.followupDate).format('YYYY-MM-DD') } onChange={handleChange} required />
            </label>

            <hr className={styles.myHr}/>

            <label htmlFor="partNeeded">
              <span className={styles.copySpan} id="partNeeded" onClick={copyToClipboard}>Part Needed: </span>
              <input className={styles.lgInput} name="partNeeded" type="text" value={formVal.partNeeded} onChange={handleChange} required />
            </label>

            <label htmlFor="defectSN">
              <span className={styles.copySpan} id="defectSN" onClick={copyToClipboard}>Defective S/N: </span>
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
              <span>Premium?: </span>
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
              <span className={styles.copySpan} id="shipAddress" onClick={copyToClipboard}>Shipping Address: </span>
              <br/>
              <textarea className={styles.lgTextarea} name="shipAddress" value={formVal.shipAddress} onChange={handleChange} rows="6" cols="50"/>
            </label>

            <label htmlFor="contactInfo">
              <span className={styles.copySpan} id="contactInfo" onClick={copyToClipboard}>Contact Info: </span>
              <br/>
              <textarea className={styles.lgTextarea} name="contactInfo" value={formVal.contactInfo} onChange={handleChange} rows="5" cols="50"/>
            </label>

            <label htmlFor="specialIns">
              <span className={styles.copySpan} id="specialIns" onClick={copyToClipboard}>Special Instructions: </span>
              <input className={styles.lgInput} name="specialIns" type="text" value={formVal.specialIns} onChange={handleChange}/>
            </label>

            <hr className={styles.myHr}/>

            <label htmlFor="ibaInfo">
              <span className={styles.copySpan} id="ibaInfo" onClick={copyToClipboard}>IBA Info: </span>
              <br/>
              <textarea className={styles.lgTextarea} name="ibaInfo" value={formVal.ibaInfo} onChange={handleChange} rows="6" cols="50"/>
            </label>

            <hr className={styles.myHr}/>

            <label htmlFor="trackNum">
              <span className={styles.copySpan} id="trackNum" onClick={copyToClipboard}>Tracking #: </span>
              <input className={styles.lgInput} name="trackNum" type="text" value={formVal.trackNum} onChange={handleChange}/>
            </label>

            <label htmlFor="notes">
              <span className={styles.copySpan} id="notes" onClick={copyToClipboard}>Notes: </span>
              <br/>
              <textarea className={styles.lgTextarea} name="notes" value={formVal.notes} onChange={handleChange} rows="8" cols="50"/>
            </label>

            <label htmlFor="lastUpdate">
              <span>Last Update: </span>
              <input className={styles.lgInput} name="lastUpdate" type="text" value={formVal.lastUpdate} onChange={handleChange}/>
            </label>

            <div className={styles.butnBox}>
              {
                !showDelete
                ? (<>
                    <button className={styles.grnButn} id="submit-button" type="submit">Save</button>
                    <span className={styles.bluButn} onClick={handleShowTemplates}>Email Templates</span>
                    <span className={styles.redButn} onClick={() => setShowDelete(true)}>Delete</span>
                  </>)
                : (<>
                    <h1 className={styles.redWarning}>Delete this reminder?</h1>
                    <span className={styles.bluButn} onClick={() => setShowDelete(false)}>Nevermind</span>
                    <span className={styles.redButn} onClick={deleteRem}>Yes, Delete</span>
                  </>)
              }
            </div>

          </form>

          { showTemplates && <Templates {...formVal}/> }
        </>
      }

      <div ref={bottomDivRef}></div>
    </div>
  );
};
