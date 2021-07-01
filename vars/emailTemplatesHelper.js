
// EMAIL TEMPLATES:

// MISC: Cheat Sheet
// MISC: Int'l RMA (inquiry to Brad)
// MISC: Int'l RMA (IoR inquiry to cust)

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



// <Templates/> component calls giveText with 2 params: templateName and propObj
// giveText switches on templateName and returns a string (the email template text) w/ relevant propObj values inserted

function giveText(templateName, propObj) {
  switch (templateName) {
    case "Lorem Ipsum":
      return `You chose LOREM for case ${propObj.caseNum}`;
      break;
    case "Cats!":
      return `You chose CATS for case ${propObj.caseNum}`;
      break;
    case "Cheat Sheet":
      return `International/Whole Unit RMAs - Shipping Instructions: \nPLS SEND RETURN LABEL; PLEASE SHIP DDP - CHANGE COMMERCIAL INV VALUE TO OUR COST \n\nIf Customs Docs Needed: \nPLS FWD CUSTOMS/INTL DOCS TO email.address@netscout.com BEFORE SHIPPING; PLS SEND RETURN LABEL; PLEASE SHIP DDP - CHANGE COMMERCIAL INV VALUE TO OUR COST \n\n   Line 2.1 / INCOMING LINE: \n[[ Actions ]] > Installation Details > [ Source Transactions Details ] \nPaste Item Instance in field for Instance Num \n\n   Line 1.1..0 *or* Line 1 / OUTGOING LINE: \n[[ Actions ]] > Installation Details > [ NON Source Transaction Details ] \nDelete Item # in Item field \nCopy entire Item # from IB and paste into Item field \nEnter Quantity: 1 \nCopy Item Instance # from IB and paste into Instance Num field \nClick [ Replace/Upgrade ] tab in window below \nClick in field for Relationship and field for Inventory Item (they will autopopulate)`;
      break;
    case "Int'l RMA Inquiry to Brad":
      return `Hello,\n\nToday I received a RMA for ${propObj.partNeeded}, going to XX_COUNTRY_XX, for customer ${propObj.company}.\n\nCase: ${propObj.caseNum} \nDefective unit S/N: ${propObj.defectSN} \nPart Required: ${propObj.partNeeded} \n\nThe customer is requesting this RMA to be shipped to the following address: \n\n${propObj.shipAddress} \n\nShould we contact the customer and ask if they agree to be the IoR?`;
      break;
    case "IoR Inquiry for Cust":
      return `Dear Customer,\n\nBefore NETSCOUT can process this International RMA request, please advise which option you approve for shipment:\n\n1. NETSCOUT will handle all the shipment and importation responsibilities. NETSCOUT can import and deliver international RMAs via our MasterCare Maintenance Partner Network.  However, shipments will need to be cross docked and may take up to 7 to 10 days longer to get delivered. \n\n2. The customer or reseller will handle the importation paperwork and accept direct shipment - To expedite delivery, we can direct ship to either ${propObj.company} or your Reseller.  NETSCOUT shipments are sent via FEDEX and the terms are DDP, but the customer or reseller will be responsible for completing the import paperwork.\n\nLet us know if you have any questions or need additional information.\n\nRegards,\nSylvia M.\nNETSCOUT Customer Care\n1-888-357-7667`;
      break;
    case "Func Equiv Inquiry to MFG":
      return `Hello Depot Team,\n\nWe have received an RMA for whole unit: ${propObj.partNeeded} (S/N ${propObj.defectSN}) on Case # ${propObj.caseNum}.\n\nThe last RMA we shipped for a ${propObj.partNeeded} was RMA # OLD_RMA_NUM which shipped on OLD_RMA_DATE. The defective unit with S/N ${propObj.defectSN} is AGE_OF_UNIT years old.\n\nPlease let us know if we have ${propObj.partNeeded} in stock. If not, please advise the correct functional equivalent model number.\n\nThanks in advance for your assistance.`;
      break;
    case "Func Equiv Inquiry to SE/Cust":
      return `Hello,\n\nFor defective S/N ${propObj.defectSN} (RMA Case: ${propObj.caseNum} - ${propObj.company} - MC # MASTERCARE_NUM ), MFG has advised that they cannot ship a model DEFECT_MODEL.\n\nThey request we ship a functional equivalent - model ${propObj.partNeeded}.\n\nORIGINAL MODEL:  DEFECT_MODEL | DEFECT_MODEL_DESCRIPTION \nFunctional equivalent MODEL:  ${propObj.partNeeded} | FUNC_EQUIV_MODEL_DESCRIPTION\n\n1)   Please check with the customer and make sure that they are willing to receive this functional equivalent as a replacement.\n2)   IF THERE IS AN ESU attached to the customer's original unit, please also check to make sure that the functional equivalent is compatible with their ESU.\n3)   Please also advise if the customer was using SFPs in the old unit. If not, we must ship SFPs with this replacement unit, and will need to know whether the data lines were running on copper/UTC or fiber in the old unit.\n\nOnce you advise us regarding the above three questions, we will proceed with the RMA.\n\nIf you have any questions, please let us know. `;
      break;
    case "Need More Info: Parts":
      return `In order to process your Return Material Authorization for replacement part(s), we require the following information: \n\nCompany name: \nSite address: \nContact name: \nPhone number: \nEmail Address: \n\nReplacement Part number needed: \nQuantity needed: \nPart no. description: \nIf RMA for Defective Hard Drive - HD capacity: \nSoftware Version: \n\nSpecial instructions: \n\nSerial number of Defective Unit: \nModel No. of Defective Unit: `;
      break;
    case "Need More Info: Whole Unit":
      return `In order to process your Return Material Authorization for a whole unit, we require the following information: \n\nCompany name: \nSite address: \nContact name: \nPhone number: \nEmail Address: \nSoftware version: \n\nSpecial instructions: \n\nIs this a COTS/CERTIFIED unit? (Yes / No): \nIf this is a COTS unit, do you need a NIC and/or Server? (NIC Only / Server Only / Both NIC and Server / NA): \nIs ESU connected? (Yes / No / NA): \n**Reminder: ESU drive size must match appliance** \n\nSerial number of Defective Unit: \nModel no. of Defective Unit: `;
      break;
    case "Processed RMA: Standard":
      return `Hello, \n\nYour RMA for the replacement hardware has been processed on RMA ${propObj.rmaNum}. \n\nWe will ship in accordance with our standard RMA shipping terms (click on link for details): https://www.netscout.com/support/advanced-replacement-onsite-support-policy\n\nPlease confirm once you have received the replacement(s).\n\nRegards,\nSylvia M.\nNETSCOUT Customer Care\n1-888-357-7667`;
      break;
    case "Processed RMA: Big HD":
      return `Hello, \n\nYour RMA ${propObj.rmaNum} for the replacement HD has been processed and will ship in accordance with our standard RMA shipping terms (click on link for details): https://www.netscout.com/support/advanced-replacement-onsite-support-policy\n\nPlease note that MFG has advised that P/N _____ is no longer available. We will be shipping you a upgraded drive (P/N 321-1823) which is compatible with your system.\n\nPlease let us know if you need assistance with replacing the larger drive.\n\nRegards,\nSylvia M.\nNETSCOUT Customer Care\n1-888-357-7667`;
      break;
    case "RMA Shipped":
      return `Hello,\n\nYour replacement part/ unit on RMA ${propObj.rmaNum} has shipped.\n\nFED EX Tracking number: ${propObj.trackNum}\n\nShip date:\n\nEstimated delivery:\n\nOnce you receive the replacement part/ unit, please confirm that it was received and is working properly.\n\nRegards,\nSylvia M.\nNETSCOUT Customer Care\n1-888-357-7667`;
      break;
    case "RMA Delayed":
      return `Hello, \n\nWe apologize for the delay in shipping RMA ${propObj.rmaNum}. This email is just to inform you that we are working closely with the shipping department, and we will strive to ship your replacement unit/part as soon as we can. We will follow up with tracking information at that time. \n\nWe apologize for the inconvenience this may cause and hope for your understanding in this matter. \nThank you for your continued support of NETSCOUT products. \n\nRegards, \nSylvia M. \nNETSCOUT Customer Care \n1-888-357-7667`;
      break;
    case "Closing Case":
      return `Hello, \n\nAs the defective part does not need to be returned, we will close this incident at this time. \n\nWe appreciate you choosing NETSCOUT products! \n\nRegards, \nSylvia M. \nNETSCOUT Customer Care \n1-888-357-7667`;
      break;
    case "Return Reminder":
      return `Hello, \n\nPlease advise us on the return of the defective hardware on RMA ${propObj.rmaNum} \n\nIf you did not receive a return label in the box with your replacement unit, please let us know. \n\n***PLEASE REFERENCE RMA # ${propObj.rmaNum} ON THE BOX AND ALL CORRESPONDENCE*** \n\n****Also please remove your SFP/XFP installed on the defective unit. \n\nLet us know if you have any questions. \n\nRegards, \nSylvia M. \nNETSCOUT Customer Care \n1-888-357-7667`;
      break;
    default:
      return "Something went wrong, no match for template name string";
      break;
  }

};

export { giveText };
