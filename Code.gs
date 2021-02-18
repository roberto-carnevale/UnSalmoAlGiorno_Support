function checkDate() {
  var testDate = new Date();
  testDate.setUTCHours(12,0,0,0);
  try {
    let jsonObj = checkHolidayParametric(testDate);
    setLiturgicday(jsonObj);

    var sog = new SalmiOnGoogle();
    let seedLine = sog.selectTypeVerse(jsonObj.psalm);
    setlastVerse(seedLine);
    setVerseFull(sog.getFinalVerse(seedLine, jsonObj));
    
    if (jsonObj.text && jsonObj.text!="") {
      setdayFull(emojiTempo[jsonObj.tempo]+stringsTempo[jsonObj.tempo]+"###"+jsonObj.text);
    } else {
      if (jsonObj.name != "" ) {
        setdayFull(emojiTempo[jsonObj.tempo]+stringsTempo[jsonObj.tempo]+"###"+stringsHoly[jsonObj.holy]+jsonObj.name);
      }
      else {
        setdayFull(emojiTempo[jsonObj.tempo]+stringsTempo[jsonObj.tempo]);
      }
    }  
      
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
    sh.getRange("C"+i).setValue(res.color + emojiColor[res.color]);
    sh.getRange("D"+i).setValue(res.tempo + emojiTempo[res.tempo]);
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
    Logger.log(testDate);
    let jsonObj = checkHolidayParametric(testDate);
    sh.getRange("A"+i).setValue(testDate);
    sh.getRange("B"+i).setValue(jsonObj.name);
    sh.getRange("C"+i).setValue(jsonObj.color + emojiColor[jsonObj.color]);
    sh.getRange("D"+i).setValue(jsonObj.tempo + emojiTempo[jsonObj.tempo]);
    sh.getRange("E"+i).setValue(jsonObj.holy);
    sh.getRange("F"+i).setValue(jsonObj.psalm);
    sh.getRange("G"+i).setValue(jsonObj.special);
    if (jsonObj.text && jsonObj.text!="") {
      sh.getRange("H"+i).setValue(emojiTempo[jsonObj.tempo]+stringsTempo[jsonObj.tempo]+"###"+jsonObj.text);
    } else {
      if (jsonObj.name != "" ) {
        sh.getRange("H"+i).setValue(emojiTempo[jsonObj.tempo]+stringsTempo[jsonObj.tempo]+"###"+stringsHoly[jsonObj.holy]+jsonObj.name);
      }
      else {
        sh.getRange("H"+i).setValue(emojiTempo[jsonObj.tempo]+stringsTempo[jsonObj.tempo]);
      }
    } 
    sh.getRange("I"+i).setValue(JSON.stringify(jsonObj));
    numDate += 86400000;
  }

}
