function sendMailingList() {
  var dataMailingList = SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName("MailingList").getDataRange().getValues();

  let dayObj = getLiturgicDay();
  let htmlVerse = "<html><body><font style='color:"+codeColor[dayObj.color]+"'><b>"+stringColorMailingList[dayObj.color]+"</b></font><br/>"+getdayFull().toString().replace(/###/g,"<br/>")+"<br/>";
  htmlVerse += lastVerseFull().toString().replace(/###/g,"<br/>")+"</body></html>";

  //image treatment
  var file = null
  let findfile = DriveApp.getFolderById(ImageFolder).getFilesByName(dayObj.special+".jpg");
  if (findfile.hasNext()) {file=findfile.next().getBlob(); Logger.log(file.getName())}
  if (file != null)  { htmlVerse +="<br/><p>Immagine del giorno<br/><img src='cid:imageOfTheDay' style='width:480px'/></p>"; }
  
  for (var row in dataMailingList) {
    if (file == null) {
      MailApp.sendEmail(dataMailingList[row][0],"Un Salmo al Giorno", "Salmo", {htmlBody : htmlVerse, name:"Un Salmo al giorno"});
    } else {
      MailApp.sendEmail(dataMailingList[row][0],"Un Salmo al Giorno", "Salmo", {htmlBody : htmlVerse, name:"Un Salmo al giorno", inlineImages:{imageOfTheDay: file} } );
    }
  }
}