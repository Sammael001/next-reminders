// to get route params, 1) import useRouter
// 2) declare router = useRouter()
// 3) receive router.query obj, destruct route param we want (ex: router.query.idToEdit)

// this component is located in pages/edit/[idToEdit]
// if we navigate on our site to localhost:3000/edit/foobar ...
// ...router.query will be an obj with 1 property: { idToEdit: "foobar" }

// NOTE! be aware that idToEdit is UNDEFINED when we use F5 to refresh the page
// to resolve, store idToEdit in localStorage, have links in <Reminder/> navigate to generic "edit" page
// when we hit the edit page, then pull the idToEdit AND savedReminders from localStorage and locate correct reminder this way?

import { useRouter } from 'next/router'; // to get route params, 1) import useRouter

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/Edit.module.css";

export default function Edit(props) {
  const [ formVal, setFormVal ] = useState(null);
  const router = useRouter(); // 2) declare router = useRouter()

  useEffect(() => {
    const { idToEdit } = router.query; // 3) receive router.query obj, destruct route param we want
    console.log(idToEdit);
    console.log("useEffect: loading stored reminders");
    // load savedReminders arr from localStorage
    let saved = JSON.parse(window.localStorage.getItem("savedReminders"));
    // locate one reminder whose caseID matches idToEdit
    let myCaseObj = saved.filter(rem => rem.caseID === idToEdit).pop(); // filter returns arr of 1, .pop that elem from arr + return it
    // setFormVal with that reminder's properties
    console.log("myCaseObj is", myCaseObj);
    setFormVal(myCaseObj);
  }, []);



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Reminder</h1>
      {
        formVal &&
        <p>{formVal.caseNum}</p>
      }

    </div>
  );
};
