function sendMailingList() {
  var dataMailingList = SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName("MailingList").getDataRange().getValues();

  let dayObj = getLiturgicDay();
  let htmlVerse = "<html><body><font style='color:"+codeColor[dayObj.color]+"'><b>"+stringColorMailingList[dayObj.color]+"</b></font><br/>"+getdayFull().toString().replace(/###/g,"<br/>")+"<br/>";
  htmlVerse += lastVerseFull().toString().replace(/###/g,"<br/>")+"</body></html>";

  for (var row in dataMailingList) {
    MailApp.sendEmail(dataMailingList[row][0],"Un Salmo al Giorno", "Salmo", {htmlBody : htmlVerse, name:"Un Salmo al giorno"});
  }
}