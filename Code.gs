function checkDate() {
  var testDate = new Date();
  testDate.setUTCHours(12,0,0,0);
  try {
    let jsonObj = checkHoliday(testDate);
    setLiturgicday(jsonObj);

    sog = new SalmiOnGoogle();
    seedLine = sog.selectTypeVerse(jsonObj.psalm);
    setlastVerse(seedLine);
    sog.selectSpecialCite(jsonObj.special);
  } catch (err) {
    MailApp.sendEmail("kn35roby@gmail.com", "Holiday Calculator Exception", err.toString() + "\r\n" + err.stack.toString())
  }
}


function createYear() {
  var sh = SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName('TEST_Y');
  var testDate = new Date(2021, 0, 1);
  testDate.setUTCHours(12,0,0,0);
  var numDate = testDate.getTime();
  for (var i = 1; i< 366; i++) {
    testDate.setTime(numDate);
    let res = checkHoliday(testDate);
    sh.getRange("A"+i).setValue(testDate);
    sh.getRange("B"+i).setValue(res.name);
    sh.getRange("C"+i).setValue(res.color + dayColor[res.color]);
    sh.getRange("D"+i).setValue(res.tempo + dayTempo[res.tempo]);
    sh.getRange("E"+i).setValue(res.holy);
    sh.getRange("F"+i).setValue(res.psalm);
    sh.getRange("G"+i).setValue(res.special);
    numDate += 86400000;
  }

}


function createYear2() {
  var sh = SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName('TEST_Y');
  var testDate = new Date(2021, 0, 1);
  testDate.setUTCHours(12,0,0,0);
  var numDate = testDate.getTime();
  for (var i = 1; i< 366; i++) {
    testDate.setTime(numDate);
    let res = checkHolidayParametric(testDate);
    sh.getRange("A"+i).setValue(testDate);
    sh.getRange("B"+i).setValue(res.name);
    sh.getRange("C"+i).setValue(res.color + dayColor[res.color]);
    sh.getRange("D"+i).setValue(res.tempo + dayTempo[res.tempo]);
    sh.getRange("E"+i).setValue(res.holy);
    sh.getRange("F"+i).setValue(res.psalm);
    sh.getRange("G"+i).setValue(res.special);
    sh.getRange("H"+i).setValue("Preghiamo "+stringsTempo[res.tempo]+stringsHoly[res.holy]+res.name);
    sh.getRange("I"+i).setValue(res.text);
    sh.getRange("J"+i).setValue(res.yearA);
    sh.getRange("K"+i).setValue(res.yearB);
    sh.getRange("L"+i).setValue(res.yearC);
    numDate += 86400000;
  }

}
