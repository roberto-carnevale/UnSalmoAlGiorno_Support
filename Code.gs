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
    
    if (jsonObj.name != "" ) {
      setdayFull(emojiTempo[jsonObj.tempo]+stringsTempo[jsonObj.tempo]+"###"+stringsHoly[jsonObj.holy]+jsonObj.name);
    } else {
      setdayFull(emojiTempo[jsonObj.tempo]+stringsTempo[jsonObj.tempo]);
    }
    
    //Finally select Compieta
    try {
        //connects DB Compieta
        var compietaObj = new CompietaOnGoogle();

        let verseRow = compietaObj.selectVerse(testDate.getDay());
        let salmoToSend = compietaObj.createNiceVerse(verseRow, testDate.getDay());

        //record for twitter and Facebook
        let compietaToRecord = "Compieta "+compietaObj.getDayString(testDate.getDay())+"### ###"+salmoToSend;
        setCompietaFull(compietaToRecord);
    } catch (err) {
      MailApp.sendEmail("kn35roby@gmail.com", "Compieta Selection Exception", err.toString() + "\r\n" + err.stack.toString())
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
    Logger.log(testDate);
    let jsonObj = checkHolidayParametric(testDate);
    sh.getRange("A"+i).setValue(testDate);
    //sh.getRange("B"+i).setValue(jsonObj.name);
    sh.getRange("C"+i).setValue(jsonObj.color + emojiColor[jsonObj.color]);
    sh.getRange("D"+i).setValue(jsonObj.tempo + emojiTempo[jsonObj.tempo]);
    sh.getRange("E"+i).setValue(jsonObj.holy);
    sh.getRange("F"+i).setValue(jsonObj.psalm);
    sh.getRange("G"+i).setValue(jsonObj.special);
    if (jsonObj.name != "" ) {
      sh.getRange("H"+i).setValue(emojiTempo[jsonObj.tempo]+stringsTempo[jsonObj.tempo]+"###"+stringsHoly[jsonObj.holy]+jsonObj.name);
    } else {
      sh.getRange("H"+i).setValue(emojiTempo[jsonObj.tempo]+stringsTempo[jsonObj.tempo]);
    }
    sh.getRange("I"+i).setValue(jsonObj.text);
    sh.getRange("J"+i).setValue(JSON.stringify(jsonObj));
    numDate += 86400000;
  }

}
