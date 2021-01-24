function sendMailingList() {
  var dataMailingList = SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName("MailingList").getDataRange().getValues();
  let sog = new SalmiOnGoogle();
  var htmlProlog = sog.niceVerseForMailingList();
  for (var row in dataMailingList) {
    MailApp.sendEmail(dataMailingList[row][0],"Un Salmo al Giorno", "Salmo", {htmlBody : htmlProlog});
  }
}

function sendDayAfter() {
  let testDate = new Date();
  testDate.setTime(testDate.getTime()+86400000);
  let tempTom = checkHoliday(testDate);
  let dayName = "";
  let stringHoly = "";
  if (tempTom.name) {dayName=tempTom.name;}
  if (tempTom.holy) {stringHoly=stringsHoly[tempTom.holy];}
  let htmlVerse = "<html><body><font style='color:"+codeColor[tempTom.color]+"'><b>Oggi paramenti "+stringColor[tempTom.color]+"</b><br/></font>Preghiamo "+stringsTempo[tempTom.tempo]+stringHoly+dayName+"<br/><br/></body></html>";
   MailApp.sendEmail("kn35roby@gmail.com","Il Giorno di Domani", JSON.stringify(tempTom), {htmlBody : htmlVerse});
}
