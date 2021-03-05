function checkHolidayParametric(testDate) {
  sog = new SalmiOnGoogle();
  //set noon UTC
  testDate.setUTCHours(12, 0,0,0);
  // Easter & Christmas dates
  var easter = getEasterDay(testDate.getFullYear());
  var adventIVSun = getLastAdventSun(testDate.getFullYear());
  var dateBattesimoVar = dateBattesimo(testDate.getFullYear());
  // calc differences
  let easterdifference = Math.trunc( ( testDate - easter.getTime() ) / millisPerDay );
  let adventdifference = Math.trunc( ( testDate - adventIVSun.getTime() ) / millisPerDay ); 
  
  //initialize object
  let liturgicYear = (testDate.getFullYear() % 3);
  currentDay = {name:"", psalm:"", tempo:"O" , color:"G", holy:null, liturgicYear: liturgicYear, baseImage : "brand.jpg"};

  //tempi forti liturgici
  if (easterdifference >= -46 && easterdifference <0) {currentDay.psalm="D"; currentDay.color="V"; currentDay.tempo = "Q";}
  if (easterdifference >= 0 && easterdifference <50) {currentDay.psalm="G";currentDay.color="W";currentDay.tempo = "P";}
  if (adventdifference >= -21 && adventdifference <7) {currentDay.psalm="L";currentDay.color="V";currentDay.tempo = "A";}
  if (testDate.getUTCMonth() == 0 && testDate.getUTCDate() <= dateBattesimoVar.getUTCDate()) {currentDay.psalm="B";currentDay.color="W";currentDay.tempo = "N";}
  if (testDate.getUTCMonth() == 11 && testDate.getUTCDate() >= 25) {currentDay.psalm="B";currentDay.color="W";currentDay.tempo = "N";}
  
  let folder = DriveApp.getFolderById(ImageFolder);
  let countImages = {'A':0,'P':0,'Q':0,'N':0,'O':0,'d':0};
  let findfile = folder.getFiles();
  while (findfile.hasNext()) {
    let file= findfile.next();
    if (file.getName().substring(0,6) == "tempo-") {
      switch (file.getName().substring(6,7)) {
        case "A": {countImages['A']++;break;}
        case "P": {countImages['P']++;break;}
        case "Q": {countImages['Q']++;break;}
        case "N": {countImages['N']++;break;}
        case "O": {countImages['O']++;break;}
        case "d": {countImages['d']++;break;}
      }
    }
  }

  // standard day, no holiday or feast or solemnity
  switch (currentDay.tempo) {
    case "A": {currentDay.psalm="L"; currentDay.baseImage="tempo-A_"+ (testDate.getUTCDate() % countImages['A']).toString() +".jpg"; break;}
    case "N": {currentDay.psalm="B"; currentDay.baseImage="tempo-N_"+ (testDate.getUTCDate() % countImages['N']).toString() +".jpg"; break;}
    case "Q": {currentDay.psalm="D"; currentDay.baseImage="tempo-Q_"+ (testDate.getUTCDate() % countImages['Q']).toString() +".jpg"; break;}
    case "P": {currentDay.psalm="G"; currentDay.baseImage="tempo-P_"+ (testDate.getUTCDate() % countImages['P']).toString() +".jpg"; break;}
    case "O": {
      currentDay.baseImage="tempo-O_"+ (testDate.getUTCDate() % countImages['O']).toString() +".jpg";
      switch (testDate.getUTCDay()) {
        case 1: {currentDay.psalm="B";break;}
        case 2: {currentDay.psalm="D";break;}
        case 3: {currentDay.psalm="G";break;}
        case 4: {currentDay.psalm="L";break;}
        case 5: {currentDay.psalm="D";break;}
        case 6: {currentDay.psalm="B";break;}
      }
    }
  }

  let search="P"+easterdifference.toString();
  //triduo Pasquale
  if (search=="P-1" || search=="P-2" || search=="P-3") {currentDay.tempo="T";}
  //search for 1st level Easter mobile days
  currentDay = findDay(sog.calendarMovingData, 1,search, currentDay);
  if (currentDay.holy) {currentDay.special=search;return currentDay;}
  
  // search for 1st level Advent mobile days
  search="A"+adventdifference.toString();
  currentDay = findDay(sog.calendarMovingData, 1, search, currentDay);
  if (currentDay.holy) {currentDay.special=search;return currentDay;}

  // Search for Battesimo del Signore & Santa Famiglia di Gesù, Maria e Giuseppe e Dedicazione Duomo
  if (testDate-dateBattesimoVar.getTime() == 0) {search="battesimo";}
  if (isSacraFamiglia(testDate)) {search="sacra_famiglia";}
  if (isDedicazioneDuomo(testDate)) {search="dedicazione_duomo";}
  if (isIINatale(testDate)) {search="IINatale";}
  currentDay = findDay(sog.calendarMovingData, 1, search, currentDay);
  if (currentDay.holy) {currentDay.special=search;return currentDay;}

  // Fixed Holidays
  search = testDate.getUTCDate().toString().padStart(2, '0')+((testDate.getUTCMonth())+1).toString().padStart(2, '0');
  currentDay = findIndexDay(sog.calendarFixData, testDate, 1, currentDay);
  if (currentDay.holy) {currentDay.special=search;return currentDay;}
  
  ///// if is Sunday ordinary tempo has precedences on 3rd level memories/feasts
  if (testDate.getUTCDay() == 0 && currentDay.tempo=="O") {
    var sunCount = 0;
    if (testDate.getTime()-easter.getTime()-46*millisPerDay <0) {
      //before Mercoledì delle Ceneri
      sunCount = 1;
      while (testDate.getTime()-(sunCount*millisPerDay*7)-dateBattesimoVar.getTime() > 0){
        sunCount++;
      }
      sunCount++;
      } else {
      //se dopo Pasqua
      let w33num = adventIVSun.getTime()-(35*millisPerDay);
      let tempSunCount = 0;
      while (testDate.getTime()+(tempSunCount*millisPerDay*7)-w33num != 0){
        tempSunCount++;
      }
      sunCount = 33 - tempSunCount;
    }
    let liturgicYear = (testDate.getFullYear() % 3);
    currentDay.psalm="G";
    currentDay.holy="N";
    currentDay.name= "Domenica della "+dictR2A[sunCount]+" Settimana " + yearEncode[liturgicYear];
    currentDay.special="D"+dictR2A[sunCount];
    currentDay.baseImage="tempo-d_"+ (testDate.getUTCDate() % countImages['d']).toString() +".jpg"
    return currentDay;
  }
    // Fixed Holidays
  search = testDate.getUTCDate().toString().padStart(2, '0')+((testDate.getUTCMonth())+1).toString().padStart(2, '0');
  currentDay = findIndexDay(sog.calendarFixData, testDate, 2, currentDay);
  if (currentDay.holy) {currentDay.special=search;return currentDay;}

  //if noormal day is there completion of the schema
  currentDay.holy="N";
  currentDay.special=search;
  return currentDay;
}

function findDay (calendarData, level, search, currentDayObj) {
  let  i= 0;
  i = calendarData.findIndex( element => element[0] == search, search)
  
  if (i > 0) {     //avoid check level since everything is 1 ==> calendarData[i][1]== level
    //complete data
    currentDayObj.name = calendarData[i][3];
    currentDayObj.holy = calendarData[i][4];
    if (calendarData[i][2]) {currentDayObj.text = calendarData[i][2];}
    if (calendarData[i][5]) {currentDayObj.color = calendarData[i][5];}
    if (calendarData[i][6]) {currentDayObj.psalm = calendarData[i][6];}
    if (calendarData[i][7]) {currentDayObj.yearA = calendarData[i][7];}
    if (calendarData[i][8]) {currentDayObj.yearB = calendarData[i][8];}
    if (calendarData[i][9]) {currentDayObj.yearC = calendarData[i][9];}
  }
  return currentDayObj;

}

function findIndexDay (calendarData, testDate, level, currentDayObj) {
  //calculates the number of days from 1 Jan
  let start = new Date(testDate.getFullYear(), 0, 1, 12 ,0 ,0,0);
  let diff = (testDate - start);
  var index = Math.round(diff / 86400000) + 1;
  if (testDate.getFullYear() % 4 != 0 && testDate.getUTCMonth() > 1) { index++; }

  //if there's something in the line... complete day
  if (level == calendarData[index][1]){
    if (calendarData[index][3] && calendarData[index][3] != "") {currentDayObj.name = calendarData[index][3];}
    if (calendarData[index][4] && calendarData[index][4] != "") {currentDayObj.holy = calendarData[index][4];}
    if (calendarData[index][2] && calendarData[index][2] != "") {currentDayObj.text = calendarData[index][2];}
    if (calendarData[index][5] && calendarData[index][5] != "") {currentDayObj.color = calendarData[index][5];}
    if (calendarData[index][6] && calendarData[index][6] != "") {currentDayObj.psalm = calendarData[index][6];}
    if (calendarData[index][7] && calendarData[index][7] != "") {currentDayObj.yearA = calendarData[index][7];}
    if (calendarData[index][8] && calendarData[index][8] != "") {currentDayObj.yearB = calendarData[index][8];}
    if (calendarData[index][9] && calendarData[index][9] != "") {currentDayObj.yearC = calendarData[index][9];}
  }
  return currentDayObj;

}