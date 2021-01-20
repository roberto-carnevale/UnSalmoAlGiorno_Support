function readParams() {
  return SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName(SubscriberParams);
}

function readDebugChat() {
  return (parseInt(readParams().getRange("B4").getValue()));
}

function sendMessage() {
  return (parseInt(readParams().getRange("B1").getValue()));
}
function lastVerse() {
  return (parseInt(readParams().getRange("B2").getValue()));
}
function lastSentUsers() {
  return (parseInt(readParams().getRange("B3").getValue()));
}

function setlastVerse(num) {
  readParams().getRange("B2").setValue(num);
}
function setlastSentUsers(num) {
  return (parseInt(readParams().getRange("B3").setValue(num)));
}

function getTwitterFollowers() {
  return (parseInt(readParams().getRange("B5").getValue()));
}

function setLiturgicday(obj) {
  readParams().getRange("B7").setValue(JSON.stringify(obj));
}

function getTelegramSubcribers() {
  return SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName("Subscribers").getDataRange().getNumRows();
}

function getFacebookLikes() {
  return (parseInt(readParams().getRange("B6").getValue()));
}

function getAllUsers() {
  return getTelegramSubcribers()+getFacebookLikes()+getTwitterFollowers();
}