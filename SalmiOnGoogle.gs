function SalmiOnGoogle() {
  //set up tab
  this.tabData = SpreadsheetApp.openById(SalmiDBSpreadsheet).getSheetByName(SalmiDBByTypeTab);
}

//Draws a tray
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

SalmiOnGoogle.prototype.niceVerseForWeb = function(seedW) {
  let verseRaw = this.tabData.getRange("A"+seedW+":D"+seedW).getValues();
  let htmlVerse = verseRaw[0][0]+","+verseRaw[0][2] + "<br/>" + verseRaw[0][3].toString().replace(/###/g,"<br/>");
  return htmlVerse;
}

//Testing function. Use locally
function test(){
  var f = new SalmiOnGoogle();
  var r = f.selectTypeVerse("L");
  var s = new SalmiOnGoogle();
  Logger.log(s.niceVerseForWeb(r));
}
    

