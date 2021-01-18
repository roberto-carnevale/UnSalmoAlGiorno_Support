function checkDate() {
  var testDate = new Date();
  testDate.setUTCHours(12,0,0,0);
  try {
    let jsonObj = checkHoliday(testDate);
    setLiturgicday(jsonObj); 
  } catch (err) {
    MailApp.sendEmail("kn35roby@gmail.com", "Holiday Calculator Exception", err.toString() + "\r\n" + err.stack.toString())
  }
}

function createYear() {
  var sh = SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName('TEST_2021');
  var testDate = new Date(2022, 0, 1);
  testDate.setUTCHours(12,0,0,0);
  var numDate = testDate.getTime();
  for (var i = 1; i< 366; i++) {
    testDate.setTime(numDate);
    let ress = checkHoliday(testDate);
    let res = JSON.parse(ress);
    Logger.log(res.name);
    sh.getRange("A"+i).setValue(testDate);
    sh.getRange("B"+i).setValue(res.name);
    sh.getRange("C"+i).setValue(res.color);
    sh.getRange("D"+i).setValue(res.tempo);
    numDate += 86400000;
  }

}