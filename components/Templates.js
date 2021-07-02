
import styles from "../styles/Templates.module.css";
import { useState, useEffect, useRef } from "react";

import { giveText } from "../vars/emailTemplatesHelper";

// Templates receives the entire caseObj via props (EX: props.caseNum, props.defectSN) from parent NewEdit.js
export default function Templates(props) {
  const myTextAreaRef = useRef(null);
  const [ templateName, setTemplateName ] = useState("Select an Email Template");
  const [ templateText, setTemplateText ] = useState("");

  // called by buttons inside buttonBox, sets the templateText to a certain email template
  function pickTemplate(tempName) {
    setTemplateName(tempName);
    // external function giveText expects 2 params: a string with templateName, and a props obj with all relevant reminder props
    let returnStr = giveText(tempName, props); // it returns an email template string (with reminder values inserted)
    setTemplateText(returnStr); // setTemplateText with this string
  }

  function handleChange(evt) {
    // makes templateText a controlled component (in case we make changes to the textarea before copying)
    setTemplateText(evt.target.value);
  }

  function copyText() {
    myTextAreaRef.current.select();
    document.execCommand("copy");
  }

  // MISC: Cheat Sheet
  // MISC: Intl RMA (inquiry to Brad)
  // MISC: Intl RMA (IoR inquiry to cust)

  // Func Equivalent: inquiry to MFG
  // Func Equivalent: email to cust

  // NEED MORE INFO: parts
  // NEED MORE INFO: whole unit

  // PROCESSED RMA: Standard
  // PROCESSED RMA: Big HD

  // SHIPPING: RMA Shipped
  // SHIPPING: Delay

  // RETURN: Closing Case
  // RETURN: Return Reminder


  return (
    <div className={styles.templateBox}>
      <h1 className={styles.title}>{templateName}</h1>

      <div className={styles.buttonDiv}>

        <div className={styles.buttonBox}>
          <p className={styles.buttonTitle}>Misc</p>
          <button className={styles.bluButn} onClick={() => pickTemplate("Cheat Sheet")}>Cheat Sheet</button>
          <button className={styles.bluButn} onClick={() => pickTemplate("Intl RMA Inquiry to Brad")}>Int&apos;l RMA</button>
          <button className={styles.bluButn} onClick={() => pickTemplate("IoR Inquiry for Cust")}>IoR</button>
        </div>

        <div className={styles.buttonBox}>
          <p className={styles.buttonTitle}>Func Equiv</p>
          <button className={styles.bluButn} onClick={() => pickTemplate("Func Equiv Inquiry to MFG")}>Inquiry to Mfg</button>
          <button className={styles.bluButn} onClick={() => pickTemplate("Func Equiv Inquiry to SE/Cust")}>Inquiry to SE/Cust</button>
        </div>

        <div className={styles.buttonBox}>
          <p className={styles.buttonTitle}>Need Info</p>
          <button className={styles.bluButn} onClick={() => pickTemplate("Need More Info: Parts")}>Parts</button>
          <button className={styles.bluButn} onClick={() => pickTemplate("Need More Info: Whole Unit")}>Whole Unit</button>
        </div>

        <div className={styles.buttonBox}>
          <p className={styles.buttonTitle}>Processed</p>
          <button className={styles.bluButn} onClick={() => pickTemplate("Processed RMA: Standard")}>Standard</button>
          <button className={styles.bluButn} onClick={() => pickTemplate("Processed RMA: Big HD")}>Big HD</button>
        </div>

        <div className={styles.buttonBox}>
          <p className={styles.buttonTitle}>Shipping</p>
          <button className={styles.bluButn} onClick={() => pickTemplate("RMA Shipped")}>Track Email</button>
          <button className={styles.bluButn} onClick={() => pickTemplate("RMA Delayed")}>Delayed</button>
        </div>

        <div className={styles.buttonBox}>
          <p className={styles.buttonTitle}>Closing</p>
          <button className={styles.bluButn} onClick={() => pickTemplate("Closing Case")}>Closing Case</button>
          <button className={styles.bluButn} onClick={() => pickTemplate("Return Reminder")}>Return Reminder</button>
        </div>

      </div>

      <textarea
        className={styles.lgTextarea}
        name="templateText"
        ref={myTextAreaRef}
        value={templateText}
        onChange={handleChange}
        rows="5"
        cols="50"
      />

      <br/>
      <button className={styles.bluButn} onClick={copyText}>Copy!</button>

    </div>
  );
};

// function getText(tempName, propObj) {
//   console.log(propObj);
//   if (tempName === "lorem") {
//     return `Case # ${propObj.caseNum} || Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
//   } else if (tempName === "cats") {
//     return `Case # ${propObj.caseNum} || CATS CATS CATS Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Meow!`;
//   }
// };
// let textString = getText(tempName, props);
// console.log(textString); // setTemplateText with this val
