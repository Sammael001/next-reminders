// each case object should have 2 timestamps:
// 1) followupDate is just a string: Wed Jan 23, 2021
// .. this way multiple cases can have the same followupDate
// 2) lastUpdated is a (UTC?) string representing the exact day/time the case was updated:
// EX: 1624308117000 representing "Monday, June 21, 2021 8:41:57 PM"
// when sorting cases, sort by followupDate UNLESS the followupDates for 2 sequential cases are the same
// if so, then sort by lastUpdated string

import dayjs from "dayjs";

let myObjArr = [
  { name: "D", followupDate: "003", updateTime: "1201"  },
  { name: "B", followupDate: "001", updateTime: "1430"  },
  { name: "A", followupDate: "001", updateTime: "1120" },
  { name: "C", followupDate: "002", updateTime: "960" }
];

function sortDatesExample(arr){
  arr.sort((a, b) => {
    if (a.followupDate === b.followupDate) {
      return (a.updateTime - b.updateTime);
    } else {
      return (a.followupDate - b.followupDate);
    }
  });
  return arr;
}

// console.log(sortDates(myObjArr));

function sortDates(arr){
  arr.sort((a, b) => {
    if (a.followupDate === b.followupDate) {
      return (b.updateTime - a.updateTime); // sort reminders for same day with most recently edited (largest updateTime) FIRST
    } else {
      // convert followupDate to #, sort reminders from SMALLEST (oldest) date to LARGEST (newest) date
      return (dayjs(a.followupDate).format('YYMMDD') - dayjs(b.followupDate).format('YYMMDD'));
    }
  });
  return arr;
}

export { sortDates };

// output: [
//   {name: "A", followupDate: "001", updateTime: "1120"},
//   {name: "B", followupDate: "001", updateTime: "1430"},
//   {name: "C", followupDate: "002", updateTime: "960"},
//   {name: "D", followupDate: "003", updateTime: "1201"}
// ]



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
// notes: "these are my notes",
// lastUpdate: "this is the last update",
// updateTime: **NOTE** this is a UTC string representing the last time the case was updated...captures the current date/time
