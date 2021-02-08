function SalmiOnGoogle() {
  //set up tab
  this.dataSpreadsheet = SpreadsheetApp.openById(SalmiDBSpreadsheet);
  this.tabData = this.dataSpreadsheet.getSheetByName(SalmiDBByTypeTab);
  this.tabSpecial = this.dataSpreadsheet.getSheetByName("special-days");
  this.calendarFixData = this.dataSpreadsheet.getSheetByName(SalmiDBFixCal).getDataRange().getValues();
  this.calendarMovingData = this.dataSpreadsheet.getSheetByName(SalmiDBMovingCal).getDataRange().getValues();
}

//Draws a verse matching the type
SalmiOnGoogle.prototype.selectTypeVerse = function(type) {
  //gets the seed
  var seedT = parseInt( Math.random() * ( parseInt(this.tabData.getRange("A1").getValue() ) )) +2;
  //gets the verse
  var verseRaw = this.getVerseData(seedT);
  while (verseRaw[0][1]!=type) {
    Logger.log("re-run:" + verseRaw[0][1] + "/" + seedT);
    seedT = parseInt( Math.random() * ( parseInt(this.tabData.getRange("A1").getValue() ) )) +2;
    //gets the verse
    verseRaw = this.getVerseData(seedT);
  }
  return seedT;
}

SalmiOnGoogle.prototype.getVerseData = function(seedT) {
  //gets the verse
  return this.tabData.getRange("A"+seedT.toString()+":D"+seedT.toString()).getValues();
}

// SalmiOnGoogle.prototype.niceVerseForWeb = function() {
//   let htmlVerse = lastVerseFull().toString().replace(/###/g,"<br/>");
//   return htmlVerse;
// }

SalmiOnGoogle.prototype.niceVerseForMailingList = function() {
  let seedW = lastVerse();
  let verseRaw = this.tabData.getRange("A"+seedW+":D"+seedW).getValues();
  let dayObj = getLiturgicDay();
  let dayName = "";
  let stringHoly = "";
  if (dayObj.name) {dayName=dayObj.name;}
  if (dayObj.holy) {stringHoly=stringsHoly[dayObj.holy];}
  let htmlVerse = "<html><body><font style='color:"+codeColor[dayObj.color]+"'><b>"+stringColorMailingList[tempTom.color]+"</b></font><br/>"+getdayFull().toString().replace(/###/g,"<br/>")+"<br/>";
  htmlVerse += lastVerseFull().toString().replace(/###/g,"<br/>")+"</body></html>";
  Logger.log(htmlVerse);
  return htmlVerse;
}

//Draws a verse matching the type
SalmiOnGoogle.prototype.selectSpecialCite = function(special) {
  let specialVerse = null;
  let found = -1;
  // gets data from special array
  let specialArray = this.tabSpecial.getRange("1:1").getValues();
  for (let i in specialArray[0]) {
    if (specialArray[0][i] == special) {found = parseInt(i)+1; break;}
  }
  // gets all the verses (still not implemented)
  //this.tabSpecial.getRange(2,found+1,1000,1).getValues();
  
  if (found > 0) {
    specialVerse =  this.tabSpecial.getRange(2,found,1,1).getValue();
    parseInt(readParams().getRange("B8").setValue(specialVerse));
  } else {
    let verseRaw =this.getVerseData(lastVerse());
    let verse = verseRaw[0][0]+","+verseRaw[0][2] + "###" + verseRaw[0][3].toString()
    readParams().getRange("B8").setValue(verse);
  }
}


//Testing function. Use locally
function test(){
  var f = new SalmiOnGoogle();
  var r = f.selectSpecialCite("P-47");
  Logger.log(f);
}
    

