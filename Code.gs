function checkDate() {
  var testDate = new Date();
  try {
    let jsonObj = checkHoliday(testDate);
    setLiturgicday(jsonObj); 
  } catch (err) {
    MailApp.sendEmail("kn35roby@gmail.com", "Holiday Calculator Exception", err.toString() + "\r\n" + err.stack.toString())
  }
}