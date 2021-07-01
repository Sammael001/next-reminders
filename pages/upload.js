
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Upload.module.css";
import Link from "next/link";

export default function Upload() {
  const router = useRouter();
  const [ fileData, setFileData ] = useState(null);

  const uploadToClient = (evt) => {
    if (evt.target.files && evt.target.files[0]) {
      const myFileObj = evt.target.files[0]; // <-- myFileObj is a File object which must be read to extract the data
      const reader = new FileReader(); // construct new FileReader called "reader"
      reader.readAsText(myFileObj); // tell reader to read our fileObj as a text string
      reader.onerror = function() { // catch errors if they happen
        console.log(reader.error);
      };
      // once the reader has processed all the data it's reading, we obtain reader.result (a text string of the file contents)
      reader.onload = function() {
        setFileData(JSON.parse(reader.result)); // parse into object and store in state
      }
    }
  };

  const uploadToStorage = () => {
    console.log("...Uploading to storage...");
    window.localStorage.setItem("reminderMemo", "Successfully uploaded reminder data from backup!");
    window.localStorage.setItem("savedReminders", JSON.stringify(fileData));
    router.push("/allReminders");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Reminder Backup File</h1>
      <p className={styles.directions}>This form will accept reminder backup .txt files generated <Link href="/download"><a>here</a></Link>, and will upload their data to local browser storage.</p>

      <div className={styles.uploadForm}>
        <input type="file" name="myFileUpload" accept=".txt" onChange={uploadToClient} />
        <h2 className={styles.warning}>Warning!</h2>
        <h3 className={styles.warning}>Uploads will replace <span className={styles.emphasis}>all</span> reminder data stored in this browser!</h3>
        <button className={styles.bluButn} type="submit" onClick={uploadToStorage} disabled={!fileData}>Upload</button>
      </div>

    </div>
  );
};
