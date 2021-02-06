/////////////////////////////////////////////TEST 
function testDate() {
  var testDate = new Date(2021, 5, 7);
  testDate.setUTCHours(12, 0,0,0);
  Logger.log("Date: "+testDate);
  Logger.log("Res : "+checkHoliday(testDate));
}


function checkHoliday(testDate) {
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
  currentDay = {name:"", psalm:"", tempo:"O" , color:"G", holy:null };

  //tempi forti liturgici
  if (easterdifference >= -46 && easterdifference <0) {currentDay.psalm="D"; currentDay.color="V"; currentDay.tempo = "Q";}
  if (easterdifference >= 0 && easterdifference <50) {currentDay.psalm="G";currentDay.color="W";currentDay.tempo = "P";}
  if (adventdifference >= -21 && adventdifference <7) {currentDay.psalm="L";currentDay.color="V";currentDay.tempo = "A";}
  if (testDate.getUTCMonth() == 0 && testDate.getUTCDate() <= dateBattesimoVar.getUTCDate()) {currentDay.psalm="B";currentDay.color="W";currentDay.tempo = "N";}
  if (testDate.getUTCMonth() == 11 && testDate.getUTCDate() >= 25) {currentDay.psalm="B";currentDay.color="W";currentDay.tempo = "N";}

  // Solennità di Pasqua
  switch (easterdifference) {
    case -46: {currentDay.name="Le Ceneri";currentDay.psalm="D";currentDay.holy="N";break;}
    case -7: {currentDay.name="Domenica delle Palme e della Passione del Signore"; currentDay.holy="N";break;}
    case -3:  {currentDay.name="Giovedì Santo – Cena del Signore";currentDay.psalm="D";currentDay.holy="N";currentDay.color="W";break;}
    case -2:  {currentDay.name="Venerdì Santo – Passione del Signore";currentDay.psalm="D";currentDay.holy="N";currentDay.color="R";break;}
    case -1:  {currentDay.name="Sabato Santo";currentDay.psalm="D";currentDay.holy="N";currentDay.color="W";break;}
    case 0:   {currentDay.name="Domenica di Pasqua – Risurrezione del Signore";currentDay.holy="N";break;}
    case 1:   {currentDay.name="Lunedì fra l’Ottava di Pasqua";currentDay.holy="S";break;}
    case 2:   {currentDay.name="Martedì fra l’Ottava di Pasqua";currentDay.holy="S";break;}
    case 3:   {currentDay.name="Mercoledì fra l’Ottava di Pasqua";currentDay.holy="S";break;}
    case 4:   {currentDay.name="Giovedì fra l’Ottava di Pasqua";currentDay.holy="S";break;}
    case 5:   {currentDay.name="Venerdì fra l’Ottava di Pasqua";currentDay.holy="S";break;}
    case 6:   {currentDay.name="Sabato fra l’Ottava di Pasqua";currentDay.holy="S";break;}
    case 7:   {currentDay.name="II Domenica di Pasqua (o della Divina Misericordia)";currentDay.holy="N";break;}
    case 39:  {currentDay.name="Ascensione";currentDay.holy="S";currentDay.psalm="G";break;}
    case 49:  {currentDay.name="Pentecoste";currentDay.holy="S";currentDay.color="R";currentDay.psalm="G";break;}
    case 50:  {currentDay.name="Beata Maria Vergine Madre della Chiesa";currentDay.holy="M";currentDay.color="A";currentDay.psalm="L";break;}
    case 56:  {currentDay.name="Santissima Trinità";currentDay.holy="S";currentDay.color="W";currentDay.psalm="G";break;}
    case 63:  {currentDay.name="Corpus Domini";currentDay.holy="S";currentDay.color="W";currentDay.psalm="G";break;}
    case 68:  {currentDay.name="Sacratissimo Cuore di Gesù";currentDay.holy="S";currentDay.color="W";currentDay.psalm="G";break;}
  }
  if (currentDay.holy) {currentDay.special="P"+easterdifference.toString();return currentDay;}

  // Festività e Memorie mobili di Pasqua
  switch (easterdifference) {
    case -42: {currentDay.name="Domenica della tentazione (I Quaresima)";currentDay.holy="N";break;}
    case -35: {currentDay.name="Domenica della Trasfigurazione (II Quaresima)";currentDay.holy="N";break;}
    case -28: {currentDay.name="Domenica della Samaritana (III Quaresima)";currentDay.holy="N";break;}
    case -21: {currentDay.name="Domenica dell'illuminazione (Laetare - VI Quaresima)";currentDay.color="S"; currentDay.holy="N";break;}
    case -14: {currentDay.name="Domenica di Lazzaro (V Quaresima)"; currentDay.holy="N";break;}
    case 21:  {currentDay.name="Domenica del Buon Pastore"; currentDay.holy="N";break;}
    case 68:  {currentDay.name="Sacratissimo Cuore di Gesù";currentDay.holy="S";currentDay.color="W";currentDay.psalm="L";break;}
    case 69:  {currentDay.name="Cuore Immacolato della Beata Vergine Maria";currentDay.holy="M";currentDay.color="A";currentDay.psalm="B";break;}
  }
  if (currentDay.holy) {currentDay.special="P"+easterdifference.toString();return currentDay;}

  // Solennittà mobili di Natale
  switch (adventdifference) {
    case -42: {currentDay.name="XXXII Settimana, Inizio Avvento Ambrosiano"; currentDay.holy="N";currentDay.psalm="L";break;}
    case -28: {currentDay.name="Nostro Signore Gesù Cristo Re dell’Universo"; currentDay.holy="S";currentDay.color="W";currentDay.psalm="G";break;}
    case -21: {currentDay.name="I Domenica di Avvento"; currentDay.holy="N";break;}
    case -14: {currentDay.name="II Domenica di Avvento"; currentDay.holy="N";break;}
    case -7: {currentDay.name="III Domenica di Avvento"; currentDay.holy="N";break;}
    case 0:  {currentDay.name="VI Domenica di Avvento"; currentDay.holy="N";break;}
  }
  if (currentDay.holy) {currentDay.special="N"+adventdifference.toString();return currentDay;}

  // Search for Battesimo del Signore & Santa Famiglia di Gesù, Maria e Giuseppe
  if (testDate-dateBattesimoVar.getTime() == 0) {currentDay.special="Battesimo del Signore";currentDay.name="Battesimo del Signore"; currentDay.holy="S";currentDay.psalm="L";return currentDay;}
  if (isSacraFamiglia(testDate)) {currentDay.special="Santa Famiglia di Gesù, Maria e Giuseppe";currentDay.name="Santa Famiglia di Gesù, Maria e Giuseppe"; currentDay.holy="F";currentDay.color="W";currentDay.psalm="B";return currentDay;}

  // Fixed Holidays
  let stringCheck = testDate.getUTCDate().toString().padStart(2, '0')+((testDate.getUTCMonth())+1).toString().padStart(2, '0');
  switch (stringCheck) {
    case "0101": {currentDay.name="Maria Santissima Madre di Dio"; currentDay.holy="S";currentDay.psalm="G";currentDay.color="A";break;}
    case "0601": {currentDay.name="Epifania"; currentDay.holy="S";currentDay.psalm="L";break;}
    case "0202": {currentDay.name="Presentazione di Gesù al Tempio (Candelora)"; currentDay.holy="F";currentDay.color="W";currentDay.psalm="L";break;}
    case "2503": {currentDay.name="Annunciazione del Signore"; currentDay.holy="F";currentDay.color="W";currentDay.psalm="L";break;}
    case "0608": {currentDay.name="Trasfigurazione del Signore";currentDay.color="W";currentDay.holy="F";currentDay.psalm="G";break;}
    case "1508": {currentDay.name="Assunzione"; currentDay.holy="F";currentDay.color="W";currentDay.psalm="G";break;}
    case "0809": {currentDay.name="Natività della Beata Vergine Maria";currentDay.color="W";currentDay.holy="F";currentDay.psalm="L";break;}
    case "0111": {currentDay.name="Ognissanti"; currentDay.holy="F";currentDay.color="W";currentDay.psalm="G";break;}
    case "0211": {currentDay.name="Commemorazione defunti"; currentDay.holy="N";currentDay.color="B";currentDay.psalm="L";break;}
    case "0712": {currentDay.name="S. Ambrogio"; currentDay.holy="M";currentDay.color="W";currentDay.psalm="L";break;}
    case "0812": {currentDay.name="Immacolata Concezione della Beata Vergine Maria";currentDay.holy="S";currentDay.color="W";currentDay.psalm="G";break;}
    case "2512": {currentDay.name="Natale del Signore"; currentDay.holy="S";currentDay.psalm="L";break;}
    case "2612": {currentDay.name="S. Stefano"; currentDay.holy="F";currentDay.color="R";currentDay.psalm="B";break;}
  }
  if (currentDay.holy) {currentDay.special=stringCheck;return currentDay;}
  
  ///// if is Sunday ordinary tempo
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
    currentDay.psalm="G";
    currentDay.holy="N"
    currentDay.name= "nella Domenica della "+dictR2A[sunCount]+" Settimana";
    currentDay.special="D"+dictR2A[sunCount];
    return currentDay;
  }
  
  //Memorie e Solennità fisse di II categoria
  switch (stringCheck) {
    case "0201": {currentDay.name="Santi Basilio Magno e Gregorio Nazianzeno";currentDay.color="W";currentDay.holy="M";break;}
    case "1701": {currentDay.name="S. Antonio";currentDay.color="W";currentDay.holy="M";break;}
    case "2101": {currentDay.name="Sant'Agnese";currentDay.color="R";currentDay.holy="M";break;}
    case "2401": {currentDay.name="San Francesco di Sales";currentDay.color="W";currentDay.holy="M";break;}
    case "2501": {currentDay.name="Conversione di San Paolo";currentDay.color="W";currentDay.holy="F";break;}
    case "2601": {currentDay.name="Santi Timoteo e Tito";currentDay.color="W";currentDay.holy="M";break;}
    case "2801": {currentDay.name="San Tommaso d’Aquino";currentDay.color="W";currentDay.holy="M";break;}
    case "3101": {currentDay.name="San Giovanni Bosco";currentDay.color="W";currentDay.holy="M";break;}

    case "0502": {currentDay.name="Sant'Agata";currentDay.color="R";currentDay.holy="M";break;}
    case "0602": {currentDay.name="Santi Paolo Miki e compagni";currentDay.color="R";currentDay.holy="M";break;}
    case "1002": {currentDay.name="Santa Scolastica";currentDay.color="W";currentDay.holy="M";break;}
    case "1402": {currentDay.name="Santi Cirillo e Metodio";currentDay.color="W";currentDay.holy="M";break;}
    case "2202": {currentDay.name="Cattedra di S.Pietro";currentDay.color="W";currentDay.holy="F";break;}

    case "1903": {currentDay.name="S. Giuseppe";currentDay.color="W";currentDay.holy="F";break;}
    case "2503": {currentDay.name="S. Marco";currentDay.color="R";currentDay.holy="F";break;}

    case "2904": {currentDay.name="Santa Caterina da Siena";currentDay.color="W";currentDay.holy="M";break;}

    case "0205": {currentDay.name="Sant’Atanasio";currentDay.color="W";currentDay.holy="M";break;}
    case "0305": {currentDay.name="Santi Filippo e Giacomo";currentDay.color="R";currentDay.holy="F";break;}
    case "1405": {currentDay.name="S. Mattia";currentDay.color="R";currentDay.holy="F";break;}
    case "2605": {currentDay.name="S. Filippo Neri";currentDay.color="W";currentDay.holy="M";break;}
    case "3105": {currentDay.name="Visitazione della Beata Vergine Maria";currentDay.color="W";currentDay.holy="F";break;}

    case "0106": {currentDay.name="S. Giustino";currentDay.color="R";currentDay.holy="M";break;}
    case "0306": {currentDay.name="Santi Carlo Lwanga e compagni";currentDay.color="R";currentDay.holy="M";break;}
    case "0506": {currentDay.name="S. Bonifacio";currentDay.color="R";currentDay.holy="M";break;}
    case "1106": {currentDay.name="S. Barnaba";currentDay.color="R";currentDay.holy="M";break;}
    case "1306": {currentDay.name="Sant’Antonio da Padova";currentDay.color="W";currentDay.holy="M";break;}
    case "2106": {currentDay.name="S. Luigi Gonzaga";currentDay.color="W";currentDay.holy="M";break;}
    case "2406": {currentDay.name="Natività di San Giovanni Battista";currentDay.color="W";currentDay.holy="S";break;}
    case "2806": {currentDay.name="S. Ireneo di Lione";currentDay.color="R";currentDay.holy="M";break;}
    case "2906": {currentDay.name="Santi Pietro e Paolo";currentDay.color="R";currentDay.holy="M";break;}

    case "0307": {currentDay.name="S. Tommaso";currentDay.color="R";currentDay.holy="F";break;}
    case "1007": {currentDay.name="S. Benedetto";currentDay.color="W";currentDay.holy="M";break;}
    case "1507": {currentDay.name="S. Bonaventura";currentDay.color="W";currentDay.holy="M";break;}   
    case "2207": {currentDay.name="Santa Maria Maddalena";currentDay.color="W";currentDay.holy="F";break;}
    case "2607": {currentDay.name="Santi Gioacchino ed Anna";currentDay.color="W";currentDay.holy="M";break;}
    case "2907": {currentDay.name="Santa Marta";currentDay.color="W";currentDay.holy="M";break;}
    case "3107": {currentDay.name="S. Ignazio di Loyola";currentDay.color="W";currentDay.holy="M";break;}

    case "0108": {currentDay.name="Sant’Alfonso Maria de’ Liguori";currentDay.color="W";currentDay.holy="M";break;}
    case "0408": {currentDay.name="San Giovanni Maria Vianney";currentDay.color="W";currentDay.holy="M";break;}
    case "0808": {currentDay.name="San Domenico";currentDay.color="W";currentDay.holy="M";break;}
    case "1008": {currentDay.name="S. Lorenzo";currentDay.color="R";currentDay.holy="F";break;}
    case "1108": {currentDay.name="Santa Chiara";currentDay.color="W";currentDay.holy="M";break;}
    case "1408": {currentDay.name="S. Massimiliano Maria Kolbe";currentDay.color="R";currentDay.holy="M";break;}
    case "2008": {currentDay.name="S. Bernardo";currentDay.color="W";currentDay.holy="M";break;}
    case "2108": {currentDay.name="S. Pio X";currentDay.color="W";currentDay.holy="M";break;}
    case "2408": {currentDay.name="S. Bartolomeo";currentDay.color="R";currentDay.holy="F";break;}
    case "2708": {currentDay.name="Santa Monica";currentDay.color="W";currentDay.holy="M";break;}
    case "2808": {currentDay.name="Sant'Agostino";currentDay.color="W";currentDay.holy="M";break;}

    case "0309": {currentDay.name="San Gregorio Magno";currentDay.color="W";currentDay.holy="M";break;}
    case "1209": {currentDay.name="Santissimo Nome di Maria";currentDay.color="A";currentDay.holy="M";break;}
    case "1309": {currentDay.name="San Giovanni Crisostomo";currentDay.color="W";currentDay.holy="M";break;}
    case "1409": {currentDay.name="Esaltazione della Santa Croce";currentDay.color="R";currentDay.holy="F";break;}
    case "1509": {currentDay.name="Beata Vergine Maria Addolorata";currentDay.color="W";currentDay.holy="M";break;}
    case "1609": {currentDay.name="Santi Cornelio e Cipriano";currentDay.color="R";currentDay.holy="M";break;} 
    case "2009": {currentDay.name="Santi Andrea Kim Taegŏn e Paolo Chŏng Hasang e compagni";currentDay.color="R";currentDay.holy="M";break;}  
    case "2109": {currentDay.name="S. Matteo";currentDay.color="R";currentDay.holy="F";break;} 
    case "2309": {currentDay.name="S. Pio da Pietrelcina";currentDay.color="W";currentDay.holy="M";break;} 
    case "2709": {currentDay.name="S. Vincenzo de’ Paoli";currentDay.color="W";currentDay.holy="M";break;}
    case "2909": {currentDay.name="Santi Michele, Gabriele e Raffaele, Arcangeli";currentDay.color="W";currentDay.holy="F";break;}
    case "3009": {currentDay.name="S. Girolamo";currentDay.color="W";currentDay.holy="M";break;}

    case "0110": {currentDay.name="Santa Teresa del Bambino Gesù";currentDay.color="W";currentDay.holy="M";break;}
    case "0210": {currentDay.name="Santi Angeli custodi";currentDay.color="W";currentDay.holy="M";break;}
    case "0410": {currentDay.name="San Francesco d’Assisi";currentDay.color="W";currentDay.holy="M";break;}
    case "0710": {currentDay.name="Beata Vergine Maria del Rosario";currentDay.color="A";currentDay.holy="N";break;}
    case "1710": {currentDay.name="Dedicazione del Duomo di Milano";currentDay.color="W";currentDay.holy="S";break;}
    case "1510": {currentDay.name="Santa Teresa di Gesù";currentDay.color="W";currentDay.holy="M";break;}
    case "1810": {currentDay.name="S. Luca";currentDay.color="R";currentDay.holy="F";break;}
    case "2210": {currentDay.name="S. Giovanni Paolo II";currentDay.color="W";currentDay.holy="N";break;}
    case "2810": {currentDay.name="Santi Simone e Giuda";currentDay.color="R";currentDay.holy="F";break;}

    case "0411": {currentDay.name="S. Carlo Borromeo";currentDay.color="W";currentDay.holy="M";break;}
    case "0911": {currentDay.name="Dedicazione della basilica Lateranense";currentDay.color="W";currentDay.holy="F";break;}
    case "1011": {currentDay.name="S. Leone Magno";currentDay.color="W";currentDay.holy="M";break;}
    case "1111": {currentDay.name="S. Martino di Tours";currentDay.color="W";currentDay.holy="M";break;}
    case "1211": {currentDay.name="S. Giosafat";currentDay.color="R";currentDay.holy="M";break;}
    case "1711": {currentDay.name="Sant’Elisabetta d’Ungheria";currentDay.color="W";currentDay.holy="M";break;}
    case "2111": {currentDay.name="Presentazione della Beata Vergine Maria";currentDay.color="W";currentDay.holy="M";break;}
    case "2211": {currentDay.name="Santa Cecilia";currentDay.color="R";currentDay.holy="M";break;}
    case "2411": {currentDay.name="Santi Andrea Dung-Lac e compagni";currentDay.color="R";currentDay.holy="M";break;}
    case "3011": {currentDay.name="Sant’Andrea";currentDay.color="R";currentDay.holy="F";break;}

    case "0312": {currentDay.name="San Francesco Saverio";currentDay.color="W";currentDay.holy="M";break;}
    case "1312": {currentDay.name="Santa Lucia";currentDay.color="R";currentDay.holy="M";break;}
    case "1412": {currentDay.name="San Giovanni della Croce";currentDay.color="W";currentDay.holy="M";break;}
    case "2712": {currentDay.name="San Giovanni";currentDay.color="R";currentDay.holy="M";break;}
    case "2812": {currentDay.name="Santi Innocenti, martiri";currentDay.color="R";currentDay.holy="M";break;}
  }

  // standard day, no holiday or feast or solemnity
  switch (currentDay.tempo) {
    case "A": {currentDay.psalm="L";break;}
    case "N": {currentDay.psalm="B";break;}
    case "Q": {currentDay.psalm="D";break;}
    case "P": {currentDay.psalm="G";break;}
    case "O": {
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
  currentDay.special=stringCheck;
  return currentDay;
}

calendarData = SpreadsheetApp.openById('1SChzmNnXtXz8r83xv4QntBnl5ZyOv3kQj9DHrbrxXFM').getSheetByName('Calendar').getDataRange().getValues();
function checkHolidayParametric(testDate) {
  //var calendarData = SpreadsheetApp.openById('1SChzmNnXtXz8r83xv4QntBnl5ZyOv3kQj9DHrbrxXFM').getSheetByName('Calendar').getDataRange().getValues();
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
  currentDay = {name:"", psalm:"", tempo:"O" , color:"G", holy:null };

  //tempi forti liturgici
  if (easterdifference >= -46 && easterdifference <0) {currentDay.psalm="D"; currentDay.color="V"; currentDay.tempo = "Q";}
  if (easterdifference >= 0 && easterdifference <50) {currentDay.psalm="G";currentDay.color="W";currentDay.tempo = "P";}
  if (adventdifference >= -21 && adventdifference <6) {currentDay.psalm="L";currentDay.color="V";currentDay.tempo = "A";}
  if (testDate.getUTCMonth() == 0 && testDate.getUTCDate() <= dateBattesimoVar.getUTCDate()) {currentDay.psalm="B";currentDay.color="W";currentDay.tempo = "N";}
  if (testDate.getUTCMonth() == 11 && testDate.getUTCDate() >= 25) {currentDay.psalm="B";currentDay.color="W";currentDay.tempo = "N";}

  let search="P"+easterdifference.toString();
  currentDay = findDay(calendarData, 1,search, currentDay);
  if (currentDay.holy) {currentDay.special=search;return currentDay;}

  // Solennittà mobili di Natale
  search="A"+adventdifference.toString();
  currentDay = findDay(calendarData, 1, search, currentDay);
  if (currentDay.holy) {currentDay.special=search;return currentDay;}

  // Search for Battesimo del Signore & Santa Famiglia di Gesù, Maria e Giuseppe
  if (testDate-dateBattesimoVar.getTime() == 0) {currentDay.special="Battesimo del Signore";currentDay.name="Battesimo del Signore"; currentDay.holy="S";currentDay.psalm="L";return currentDay;}
  if (isSacraFamiglia(testDate)) {currentDay.special="Santa Famiglia di Gesù, Maria e Giuseppe";currentDay.name="Santa Famiglia di Gesù, Maria e Giuseppe"; currentDay.holy="F";currentDay.color="W";currentDay.psalm="B";return currentDay;}

  // Fixed Holidays --- ATTENTION HERE TO MOVE ONLY NEEDFUL!!!!
  search = testDate.getUTCDate().toString().padStart(2, '0')+((testDate.getUTCMonth())+1).toString().padStart(2, '0');
  currentDay = findDay(calendarData, 2, search, currentDay);
  if (currentDay.holy) {currentDay.special=search;return currentDay;}
  
  ///// if is Sunday ordinary tempo
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
    currentDay.psalm="G";
    currentDay.holy="N"
    currentDay.name= "nella Domenica della "+dictR2A[sunCount]+" Settimana";
    currentDay.special="D"+dictR2A[sunCount];
    return currentDay;
  }
    // Fixed Holidays --- ATTENTION HERE TO MOVE ONLY NEEDFUL!!!!
  currentDay = findDay(calendarData, 3, search, currentDay);
  if (currentDay.holy) {currentDay.special=search;return currentDay;}

  // standard day, no holiday or feast or solemnity
  switch (currentDay.tempo) {
    case "A": {currentDay.psalm="L";break;}
    case "N": {currentDay.psalm="B";break;}
    case "Q": {currentDay.psalm="D";break;}
    case "P": {currentDay.psalm="G";break;}
    case "O": {
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
  currentDay.special=search;
  return currentDay;
}

function findDay (calendarData, level, search, currentDayObj) {
  for (let i in calendarData) {
    if (level == calendarData[i][1]){
      if (search == calendarData[i][0]) {
        currentDayObj.name = calendarData[i][3];
        currentDayObj.holy = calendarData[i][4];
        if (calendarData[i][1]) {currentDayObj.text = calendarData[i][2];}
        if (calendarData[i][4]) {currentDayObj.color = calendarData[i][5];}
        if (calendarData[i][5]) {currentDayObj.psalm = calendarData[i][6];}
      }
    }
  }
  return currentDayObj;

}
