
import { useState, useEffect } from "react";

import styles from "../styles/Search.module.css";
import Reminder from "../components/Reminder";
// import { dummyCaseData } from "../vars/fillerData";

export default function Search(props) {
  const [ allReminders, setAllReminders ] = useState(null);
  const [ searchField, setSearchField ] = useState("all");
  const [ searchText, setSearchText ] = useState("");
  const [ showResults, setShowResults ] = useState(false); // controls whether search form or search results should display

  // loads savedReminders from localStorage (if found)
  useEffect(() => {
    // console.log("useEffect: loading savedReminders into state");
    let saved = JSON.parse(window.localStorage.getItem("savedReminders")) || null;
    if (saved) {
      setAllReminders(saved);
    }
  }, []);

  // controls select and input values
  function handleChange(evt) {
    if (evt.target.name === "searchField") {
      setSearchField(evt.target.value);
    } else {
      setSearchText(evt.target.value);
    }
  }

  // called when search form is submitted
  function submitSearch(evt){
    evt.preventDefault();
    setShowResults(true); // hide search form, show results
  };

  // resets and displays search form
  function resetSearch(){
    setSearchField("all");
    setSearchText("");
    setShowResults(false);
  }

  // takes in searchField and returns nicely formatted field names
  function formatSearchField(){
    switch (searchField) {
      case "all":
        return "all";
        break;
      case "caseNum":
        return "Case #";
        break;
      case "rmaNum":
        return "RMA #";
        break;
      case "company":
        return "Company Name";
        break;
      case "partNeeded":
        return "Part #";
        break;
      case "defectSN":
        return "Defective S/N";
        break;
      case "shipAddress":
        return "Shipping Address";
        break;
      case "contactInfo":
        return "Contact Info";
        break;
      default:
        return "Err!";
        break;
    }
  };

  // renders a <Reminder/> for each search result, or an error message
  function renderResultData(){
    let filtered; // holds filtered array we will map over to produce caseMap
    let caseMap = ""; // holds map with a <Reminder/> component for each reminder element

    if (Array.isArray(allReminders)){ // make sure we HAVE allReminders to loop over
      if (searchField === "all") { // search all keys in all remObjs
        filtered = [];
        allReminders.forEach(remObj => { // loop through each elem in allReminders arr
          let match = false;
          for (let key in remObj) { // loop through each key in elem
            if (remObj[key].toString().toLowerCase().includes( searchText.toLowerCase() )) {
              match = true;
            }
          }
          if (match) filtered.push(remObj);
        })
      } else { // else, we don't need to search every field, just the specified searchField
        filtered = allReminders.filter(remObj => remObj[searchField].toLowerCase().includes( searchText.toLowerCase() ));
      }

      if (filtered[0]) { // after filtering, check to see that we have at least 1 match
        caseMap = filtered.map(caseObj => {
          return <Reminder key={caseObj.caseID} {...caseObj}/>;
        });
      } else { // if not, return a message about no results found
        caseMap = <h3><span className={styles.redSpan}>No matches found for this search!</span></h3>;
      }

    } else { // if we wind up here, there is no array for allReminders
      caseMap = <h3><span className={styles.redSpan}>No saved reminders found in local storage!</span></h3>;
      console.log("No saved reminders found in local browser storage!")
    }
    return caseMap;
  }

  return (
    <div className={styles.container}>

      { !showResults &&
        <>
          <h1 className={styles.title}>Search Reminders</h1>

          <form className={styles.searchForm} onSubmit={submitSearch}>

            <div className={styles.labelAndInput}>
              <p className={styles.searchLabel}>Look within: </p>
              <select value={searchField} className={styles.mySelect} name="searchField" onChange={handleChange}>
                <option value="all">All Fields</option>
                <option value="caseNum">Case #</option>
                <option value="rmaNum">RMA #</option>
                <option value="company">Company Name</option>
                <option value="partNeeded">Part # Needed</option>
                <option value="defectSN">Defective S/N</option>
                <option value="shipAddress">Shipping Address</option>
                <option value="contactInfo">Contact Info</option>
              </select>
            </div>

            <div className={styles.labelAndInput}>
              <p className={styles.searchLabel}>Find this text: </p>
              <input type="text" value={searchText} className={styles.lgInput} name="searchText" onChange={handleChange} required/>
            </div>

            <button className={styles.bluButn} type="submit">Search!</button>

          </form>
        </>

      }

      { showResults &&
        <>
          <h1 className={styles.title}>
            Searched for <span className={styles.redSpan}>
              {searchText}
            </span> within <span className={styles.redSpan}>
              {formatSearchField()}
            </span> fields
          </h1>

          <div className={styles.caseBox}>
            { renderResultData() }
          </div>

          <button className={styles.bluButn} onClick={resetSearch}>Back to Search</button>
        </>
      }

    </div>
  );
};

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
