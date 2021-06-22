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
