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

//Draws a verse matching the type
SalmiOnGoogle.prototype.getFinalVerse = function(seedLine, jsonDay) {
  let verseRaw = this.getVerseData(seedLine);
  let finalVerse = verseRaw[0][0]+","+verseRaw[0][2] + "###" + verseRaw[0][3].toString();
  switch (jsonDay.liturgicYear) {
    case 1: if (jsonDay.yearA && jsonDay.yearA != "") {finalVerse =jsonDay.yearA; break; }
    case 2: if (jsonDay.yearB && jsonDay.yearB != "") {finalVerse =jsonDay.yearB; break; }
    case 0: if (jsonDay.yearC && jsonDay.yearC != "") {finalVerse =jsonDay.yearC; break; }
  }
  return finalVerse;
}


//Testing function. Use locally
function test(){
  var f = new SalmiOnGoogle();
  var r = f.selectSpecialCite("P-47");
  Logger.log(f);
}
    

