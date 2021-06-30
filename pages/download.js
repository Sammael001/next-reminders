
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/Download.module.css";
// import encoding from "../images/encoding.png";

export default function Download() {
  const textareaRef = useRef(null);
  const [ savedReminders, setSavedReminders ] = useState("");

  useEffect(() => {
    let saved = window.localStorage.getItem("savedReminders") || "No saved reminders found in local browser storage!";
    setSavedReminders(saved);
  }, []);

  function handleChange(evt) {
    setSavedReminders(evt.target.value);
  };

  function copyData() {
    textareaRef.current.select();
    document.execCommand("copy");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Download Reminder Data</h1>
      <p className={styles.directions}>To download a backup copy of the reminder data stored in this browser, copy the data shown in the box below.</p>
      <p className={styles.directions}>After copying, open a Notepad document and paste in the copied data, then save as a <strong>.txt</strong> file.</p>
      <p className={styles.directions}><strong>Important!</strong> You'll want to change the Encoding of your .txt file to <strong>UTF-8</strong> as shown below. This keeps your reminders from having weird characters in them when you re-upload.</p>
      <Image src={"/images/encoding.png"} width={700} height={250} alt="encoding" />
      <p className={styles.padded}>To upload your saved .txt file, click <Link href="/upload"><a>here</a></Link></p>
      <textarea className={styles.bigTextArea} value={savedReminders} ref={textareaRef} onChange={handleChange} rows="6" cols="10" />
      <button className={styles.bluButn} onClick={copyData}>Copy All</button>
    </div>
  );
};
