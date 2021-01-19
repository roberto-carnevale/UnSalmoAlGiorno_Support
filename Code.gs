function checkDate() {
  var testDate = new Date();
  testDate.setUTCHours(12,0,0,0);
  try {
    let jsonObj = checkHoliday(testDate);
    setLiturgicday(jsonObj);

    sog = new SalmiOnGoogle();
    seedLine = sog.selectTypeVerse(jsonObj.psalm);
    setlastVerse(seedLine);
    
  } catch (err) {
    MailApp.sendEmail("kn35roby@gmail.com", "Holiday Calculator Exception", err.toString() + "\r\n" + err.stack.toString())
  }
}

