
import { useState, useEffect } from "react";
import styles from "../styles/Upload.module.css";

export default function Upload() {
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
    window.localStorage.setItem("savedReminders", JSON.stringify(fileData));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Reminder Backup File</h1>
      <input type="file" name="myFileUpload" accept=".txt" onChange={uploadToClient} />
      <p>Warning! The data uploaded here will replace all reminder data stored in this browser!</p>
      <button className={styles.bluButn} type="submit" onClick={uploadToStorage}>Upload</button>
    </div>
  );
};
