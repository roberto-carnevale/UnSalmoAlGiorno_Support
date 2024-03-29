function sendMailingList() {
  var dataMailingList = SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName("MailingList").getDataRange().getValues();

  let dayObj = getLiturgicDay();
  let htmlVerse = "<html><body><font style='color:"+codeColor[dayObj.color]+"'><b>"+stringColorMailingList[dayObj.color]+"</b></font><br/>"+getdayFull().toString().replace(/###/g,"<br/>")+"<br/>";
  if (dayObj.text) {htmlVerse += "<br/>" + dayObj.text.toString().replace(/###/g,"<br/>") + "<br/><br/>"; }
  htmlVerse += lastVerseFull().toString().replace(/###/g,"<br/>")+"</body></html>";

  //image treatment
  var file = null
  let folder = DriveApp.getFolderById(ImageFolder);
  
  let findfile = folder.getFilesByName(dayObj.special+".jpg");
  if (findfile.hasNext()) {
    file=findfile.next().getBlob();
  } else {
    file=folder.getFilesByName(dayObj.baseImage).next().getBlob();
  }
  
  htmlVerse +="<br/><p>Immagine del giorno<br/><img src='cid:imageOfTheDay' style='width:480px'/></p>";
  
  //debug!!!
  //MailApp.sendEmail("kn35roby@gmail.com","Un Salmo al Giorno", "Salmo", {htmlBody : htmlVerse, name:"Un Salmo al giorno", inlineImages:{imageOfTheDay: file} } );
 
  for (var row in dataMailingList) {
      MailApp.sendEmail(dataMailingList[row][0],"Un Salmo al Giorno", "Salmo", {htmlBody : htmlVerse, name:"Un Salmo al giorno", inlineImages:{imageOfTheDay: file} } );
      Logger.log(dataMailingList[row][0]);
  }
}

function doUserCountMailingList() {
  var dataMailingList = SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName("MailingList").getDataRange().getValues();

  let htmlMessage = getWeekMsg().toString().replace(/<TOT>/, getAllUsers()).replace(/###/g,"\r\n");;

  //image treatment
  var file = null
  let folder = DriveApp.getFolderById(ImageFolder);
  
  file=folder.getFilesByName("candele.jpg").next().getBlob();
  
  htmlMessage +="<br/><p><img src='cid:imageOfTheDay' style='width:480px'/></p>";
  
  //debug!!!
  //MailApp.sendEmail("kn35roby@gmail.com","Un Salmo al Giorno", "Salmo", {htmlBody : htmlMessage, name:"Un Salmo al giorno", inlineImages:{imageOfTheDay: file} } );
 
  for (var row in dataMailingList) {
      MailApp.sendEmail(dataMailingList[row][0],"Un Salmo al Giorno", "Salmo", {htmlBody : htmlMessage, name:"Un Salmo al giorno", inlineImages:{imageOfTheDay: file} } );
      Logger.log(dataMailingList[row][0]);
  }

}