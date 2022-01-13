function SalmiOnGoogle() {
  //set up tab
  this.dataSpreadsheet = SpreadsheetApp.openById(SalmiDBSpreadsheet);
  this.tabData = this.dataSpreadsheet.getSheetByName(SalmiDBByTypeTab);
  this.tabDataES = this.dataSpreadsheet.getSheetByName(SalmiDBTabES);
  this.tabDataEN = this.dataSpreadsheet.getSheetByName(SalmiDBTabEN);
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

SalmiOnGoogle.prototype.getVerseDataES = function(seedT) {
  //gets the verse
  return this.tabDataES.getRange("A"+seedT.toString()+":D"+seedT.toString()).getValues();
}

SalmiOnGoogle.prototype.getVerseDataEN = function(seedT) {
  //gets the verse
  return this.tabDataEN.getRange("A"+seedT.toString()+":D"+seedT.toString()).getValues();
}

// SalmiOnGoogle.prototype.niceVerseForWeb = function() {
//   let htmlVerse = lastVerseFull().toString().replace(/###/g,"<br/>");
//   return htmlVerse;
// }

//Draws a verse matching the type
SalmiOnGoogle.prototype.getFinalVerse = function(seedLine) {
  let verseRaw = this.getVerseData(seedLine);
  let finalVerse = verseRaw[0][0]+","+verseRaw[0][2] + "###" + verseRaw[0][3].toString();
  return finalVerse;
}

//Draws a verse matching the type
SalmiOnGoogle.prototype.getFinalVerseES = function(seedLine) {
  let verseRaw = this.getVerseDataES(seedLine);
  let finalVerse = verseRaw[0][0]+","+verseRaw[0][1] + "###" + verseRaw[0][2].toString();
  return finalVerse;
}

//Draws a verse matching the type
SalmiOnGoogle.prototype.getFinalVerseEN = function(seedLine) {
  let verseRaw = this.getVerseDataEN(seedLine);
  let finalVerse = verseRaw[0][0]+":"+verseRaw[0][1] + "###" + verseRaw[0][2].toString();
  return finalVerse;
}

function testES() {
  var sog=new SalmiOnGoogle();
  Logger.log(sog.getFinalVerseES(1865, {}));
}
    

