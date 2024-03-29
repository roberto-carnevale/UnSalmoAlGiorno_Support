function readParams() {
  return SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName(SubscriberParams);
}

function readDebugChat() {
  return (parseInt(readParams().getRange("B4").getValue()));
}

function sendMessage() {
  return (parseInt(readParams().getRange("B1").getValue()));
}

//weekMsg
function getWeekMsg () {
  return readParams().getRange("B10").getValue();
}

function lastVerse() {
  return (parseInt(readParams().getRange("B2").getValue()));
}

function lastVerseFull() {
  return readParams().getRange("B8").getValue();
}
function setVerseFull(string) {
  readParams().getRange("B8").setValue(string);
}
function setVerseFullES(string) {
  readParams().getRange("B13").setValue(string);
}
function setVerseFullEN(string) {
  readParams().getRange("B19").setValue(string);
}


function setdayFull(string) {
  readParams().getRange("B9").setValue(string);
}
function getdayFull() {
  return readParams().getRange("B9").getValue();
}
function setdayFullES(string) {
  readParams().getRange("B18").setValue(string);
}
function setdayFullEN(string) {
  readParams().getRange("B21").setValue(string);
}
// function lastSentUsers() {
//   return (parseInt(readParams().getRange("B3").getValue()));
// }

function setlastVerse(num) {
  readParams().getRange("B2").setValue(num);
}
function setlastSentUsers(num) {
  parseInt(readParams().getRange("B3").setValue(num));
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

function getLiturgicDay() {
  return JSON.parse(readParams().getRange("B7").getValue());
}

function getFacebookLikes() {
  return (parseInt(readParams().getRange("B6").getValue()));
}

function getAllUsers() {
  return readParams().getRange("B16").getValue();
}

//compietaMsg
function setCompietaFull(msg) {
  readParams().getRange("B11").setValue(msg);
}

function setCompietaImage(img) {
  readParams().getRange("B12").setValue(img);
}