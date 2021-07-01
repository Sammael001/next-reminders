// NEXT TASKS:
// Process RMA
// Need More Info
// Other Hold
// Get Tracking
// Send Track Num
// Verify Delivery
// Send Final Email
// Await Return
import dayjs from "dayjs";


const dummyCaseData = [
  {
    caseID: "00001",
    caseNum: "12345-12345",
    rmaNum: "33312345",
    company: "Big Mega Corp",
    refID: "ref:_00DU0JJ3b._5004T8ocyt:ref",
    lastUpdate: "This is an EXAMPLE reminder",
    nextTask: "Send Tracking",
    followupDate: dayjs().subtract(7, 'day').format('ddd MMM D YYYY'),
    partNeeded: "(1 x 4TB HD) 321-1823",
    defectSN: "NS5181291022",
    warehouse: "DAL",
    return: "NO",
    premium: "YES",
    encrypted: "NO",
    shipAddress: "123 Main St, Houston TX 77777",
    contactInfo: "Bob Jones, 123-456-7890, bob.jones@megacorp.net",
    specialIns: "N/A",
    ibaInfo: "THIS IS THE IBA INFO",
    trackNum: "35683797804467",
    notes: "These are my notes\nI have lots of notes\nI want them to appear on multiple lines\nAnd also show that the reminder contents are scrollable\nSo I added all these newlines.\nThese are my notes\nI have lots of notes\nI want them to appear on multiple lines\nAnd also show that the reminder contents are scrollable\nSo I added all these newlines.\nThese are my notes\nI have lots of notes\nI want them to appear on multiple lines\nAnd also show that the reminder contents are scrollable\nSo I added all these newlines."
  },
  {
    caseID: "00002",
    caseNum: "45678-45678",
    rmaNum: "33345678",
    company: "Arasaka Industries",
    refID: "ref:_00YEBJJ3b._5004T8oLUO:ref",
    lastUpdate: "This is an EXAMPLE reminder. This text should also demonstrate that the reminder component will stretch above the fold",
    nextTask: "Verify Delivery",
    followupDate: dayjs().format('ddd MMM D YYYY'),
    partNeeded: "(2 x PSU) 321-1850",
    defectSN: "NS8181299763",
    warehouse: "DAL",
    return: "NO",
    premium: "YES",
    encrypted: "N/A",
    shipAddress: "404 State St, Austin TX 77777",
    contactInfo: "Dana Smith,\n 123-456-7890,\n dana.smith@arasaka.com",
    specialIns: "N/A",
    ibaInfo: "THIS IS THE IBA INFO",
    trackNum: "1658653589993",
    notes: "these are my notes"
  },
  {
    caseID: "00003",
    caseNum: "98765-98765",
    rmaNum: "33398765",
    company: "CyberDyne Inc",
    refID: "ref:_00LEBJJ3b._5004T8oGRU:ref",
    lastUpdate: "This is an EXAMPLE reminder",
    nextTask: "Need More Info",
    followupDate: dayjs().add(7, 'day').format('ddd MMM D YYYY'),
    partNeeded: "1 whole unit 4595/DS",
    defectSN: "NS7181290034",
    warehouse: "DAL",
    return: "NO",
    premium: "YES",
    encrypted: "N/A",
    shipAddress: "709 Greene St, Dallas TX 77777",
    contactInfo: "Alice Williams,\n 123-456-7890,\n alice.williams@cyber.net\n sylvia.moore@mail.com\n randomperson@mail.net",
    specialIns: "N/A",
    ibaInfo: "THIS IS THE IBA INFO",
    trackNum: "2452456246869",
    notes: "these are my notes"
  }
];

export { dummyCaseData };
