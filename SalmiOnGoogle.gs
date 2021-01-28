function SalmiOnGoogle() {
  //set up tab
  this.tabData = SpreadsheetApp.openById(SalmiDBSpreadsheet).getSheetByName(SalmiDBByTypeTab);
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

SalmiOnGoogle.prototype.niceVerseForWeb = function(seedW) {
  let verseRaw = this.tabData.getRange("A"+seedW+":D"+seedW).getValues();
  let htmlVerse = verseRaw[0][0]+","+verseRaw[0][2] + "<br/>" + verseRaw[0][3].toString().replace(/###/g,"<br/>");
  return htmlVerse;
}

SalmiOnGoogle.prototype.niceVerseForMailingList = function() {
  let seedW = lastVerse();
  let verseRaw = this.tabData.getRange("A"+seedW+":D"+seedW).getValues();
  let dayObj = getLiturgicDay();
  let dayName = "";
  let stringHoly = "";
  if (dayObj.name) {dayName=dayObj.name;}
  if (dayObj.holy) {stringHoly=stringsHoly[dayObj.holy];}
  let htmlVerse = "<html><body><font style='color:"+codeColor[dayObj.color]+"'><b>Oggi paramenti "+stringColor[dayObj.color]+"</b><br/></font>Preghiamo "+stringsTempo[dayObj.tempo]+stringHoly+dayName+"<br/><br/>";
  htmlVerse += verseRaw[0][0]+","+verseRaw[0][2] + "<br/>" + verseRaw[0][3].toString().replace(/###/g,"<br/>")+"</body></html>";
  Logger.log(htmlVerse);
  return htmlVerse;
}

//Testing function. Use locally
function test(){
  var f = new SalmiOnGoogle();
  var r = f.selectTypeVerse("L");
  var s = new SalmiOnGoogle();
  Logger.log(s.niceVerseForWeb(r));
}
    

