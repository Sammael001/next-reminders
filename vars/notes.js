// each case object should have 2 timestamps:
// 1) followupDate is just a string: Wed Jan 23, 2021
// .. this way multiple cases can have the same followupDate
// 2) lastUpdated is a (UTC?) string representing the exact day/time the case was updated:
// EX: 1624308117000 representing "Monday, June 21, 2021 8:41:57 PM"
// when sorting cases, sort by followupDate UNLESS the followupDates for 2 sequential cases are the same
// if so, then sort by lastUpdated string

let myObjArr = [
  { name: "D", followup: "003", lastUpdated: "1201"  },
  { name: "B", followup: "001", lastUpdated: "1430"  },
  { name: "A", followup: "001", lastUpdated: "1120" },
  { name: "C", followup: "002", lastUpdated: "960" }
];

function sortDates(arr){
  arr.sort((a, b) => {
    if (a.followup === b.followup) {
      return (a.lastUpdated - b.lastUpdated);
    } else {
      return (a.followup - b.followup);
    }
  });
  return arr;
}

console.log(sortDates(myObjArr));
// output: [
//   {name: "A", followup: "001", lastUpdated: "1120"},
//   {name: "B", followup: "001", lastUpdated: "1430"},
//   {name: "C", followup: "002", lastUpdated: "960"},
//   {name: "D", followup: "003", lastUpdated: "1201"}
// ]


// NEXT TASKS:
// Process RMA
// Need More Info
// Other Hold
// Get Tracking
// Send Track Num
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
// notes: "these are my notes",
// lastUpdate: "this is the last update",
// updateTime: **NOTE** this is a UTC string representing the last time the case was updated...captures the current date/time
