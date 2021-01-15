function getEasterDay(yyyy) {
  // Calculates Easter date from 1753 till 2500
  var Ap, Bp, Cp, Dp, Ep, Fp, Mp;
  if (yyyy<100) yyyy = 1900 + yyyy;
  Ap = yyyy % 19;
  Bp = yyyy % 4;
  Cp = yyyy % 7;
  Dp = (19*Ap + 24) % 30;
  Fp = 0; // correzione per secoli
  if (yyyy<2500) Fp=3;
  if (yyyy<2300) Fp=2;
  if (yyyy<2200) Fp=1;
  if (yyyy<2100) Fp=0;
  if (yyyy<1900) Fp=6;
  if (yyyy<1800) Fp=5;
  if (yyyy<1700) Fp=4;
  Ep = (2*Bp + 4*Cp + 6*Dp + Fp + 5) % 7;
  Ep = 22 + Dp + Ep;
  Mp = 3;
  if (Ep>31) {
    Mp = 4;
    Ep = Ep - 31;
  }
  return (new Date(yyyy, Mp-1, Ep));
}

function getLastAdventSun(yyyy) {
  var dateToCheck = new Date(yyyy, 11, 25, 12, 0, 0);
  while (dateToCheck.getDay() != 0) {
      dateToCheck.setUTCDate(dateToCheck.getUTCDate()-1);
  }
  return dateToCheck
}

function isSacraFamiglia(date) {
  if (date.getUTCMonth() == 11) {
    var dateToCheck = new Date(date.getFullYear(), 11, 31, 12, 0, 0);
    while (dateToCheck.getDay() != 0) {
        dateToCheck.setUTCDate(dateToCheck.getUTCDate()-1);
    }
    if (dateToCheck.getDate() < 26) {dateToCheck.setUTCDate(30);}
    if (dateToCheck == date) {return true;}
  }
  return false;
}
function testDate() {
  var testDate = new Date(2021, 0, 10 ,12,0,0);
  Logger.log(testDate);
  Logger.log(checkHoliday(testDate));
}

function checkHoliday(testDate) {
  //set noon UTC
  testDate.setUTCHours(12, 0,0,0);
  //return object
  var holiday = null;
  // Easter erea
  var easter = getEasterDay(testDate.getFullYear());
  //let easterdifference = Math.trunc( ( easter - (new Date()) )/86400000 );
  let easterdifference = Math.trunc( ( testDate - easter ) / 86400000 )-1;
  switch (easterdifference) {
    case -52: holiday = {name:"Giovedì Grasso", psalm:"B", holy:false, special:true, color:"V" };break;
    case -47: holiday = {name:"Martedì Grasso", psalm:"B", holy:false, special:true, color:"V" };break;
    case -46: holiday = {name:"Le Ceneri", psalm:"D", holy:true, special:true, color:"V" };break;
    case -45: holiday = {name:"Giovedì Grasso (Ambrosiano)", psalm:"B", holy:true, special:true, color:"V" };break;
    case -41: holiday = {name:"Sabato Grasso (Ambrosiano)", psalm:"B", holy:true, special:true, color:"V" };break;
    case -42: holiday = {name:"Domenica della tentazione", psalm:"D", holy:true, special:true, color:"V" };break;
    case -35: holiday = {name:"Domenica della Trasfigurazione", psalm:"D", holy:true, special:true, color:"V" };break;
    case -28: holiday = {name:"Domenica della Samaritana", psalm:"D", holy:true, special:true, color:"V" };break;
    case -21: holiday = {name:"Domenica dell'illuminazione (Laetare)", psalm:"D", holy:true, special:true, color:"S" };break;
    case -14: holiday = {name:"Domenica di Lazzaro", psalm:"D", holy:true, special:true, color:"V" };break;
    case -7:  holiday = {name:"Domenica delle palme", psalm:"D", holy:true, special:true, color:"R" };break;
    case -3:  holiday = {name:"Giovedì santo", psalm:"D", holy:true, special:true, color:"W" };break;
    case -2:  holiday = {name:"Venerdì santo", psalm:"D", holy:true, special:true, color:"R" };break;
    case 0:   holiday = {name:"SS. Pasqua", psalm:"G", holy:true, special:true, color:"W" };break;
    case 1:   holiday = {name:"Lunedì dell'Angelo", psalm:"G", holy:true, special:true, color:"W" };break;
    case 7:   holiday = {name:"Domenica in Albis", psalm:"G", holy:true, special:true, color:"W" };break;
    case 21:  holiday = {name:"Domenica del Buon Pastore", psalm:"G", holy:true, special:true, color:"W" };break;
    case 39:  holiday = {name:"Ascensione", psalm:"G", holy:false, special:true, color:"W" };break;
    case 42:  holiday = {name:"Ascensione (liturgica)", psalm:"G", holy:true, special:true, color:"W" };break;
    case 49:  holiday = {name:"Pentecoste", psalm:"G", holy:true, special:true, color:"R" };break;
    case 56:  holiday = {name:"Santissima Trinità", psalm:"G", holy:true, special:true, color:"W" };break;
    case 60:  holiday = {name:"Corpus Domini", psalm:"G", holy:false, special:true, color:"W" };break;
    case 63:  holiday = {name:"Corpus Domini (liturgico)", psalm:"G", holy:true, special:true, color:"W" };break;
    case 68:  holiday = {name:"Sacro Cuore di Gesù", psalm:"G", holy:true, special:true, color:"W" };break;
    case 69:  holiday = {name:"Cuore immacolato di Maria", psalm:"G", holy:true, special:true, color:"A" };break;
  }
  if (holiday) {Logger.log(holiday.name); return JSON.stringify(holiday);}
  
  // Advent area
  var lastAdvent = getLastAdventSun((new Date()).getUTCFullYear());
  let adventdifference = Math.trunc( ( testDate - lastAdvent ) / 86400000 );
  switch (adventdifference) {
    case -42: holiday = {name:"Inizio Avvento Ambrosiano (Cristo Re)", psalm:"G", holy:true, special:true, color:"V" };break;
    case -28: holiday = {name:"Cristo Re", psalm:"G", holy:true, special:true, color:"W" };break;
    case -21: holiday = {name:"1ª domenica di Avvento", psalm:"L", holy:true, special:true, color:"V" };break;
    case -14: holiday = {name:"2ª domenica di Avvento", psalm:"L", holy:true, special:true, color:"V" };break;
    case -7: holiday = {name:"3ª domenica di Avvento (Gaudete)", psalm:"L", holy:true, special:true, color:"S" };break;
    case 0:  holiday = {name:"4ª domenica di Avvento", psalm:"L", holy:true, special:true, color:"V" };break;
    case -343:  holiday = {name:"Battesimo del Signore", psalm:"L", holy:true, special:true, color:"W" };break;
  }
  if (holiday) {Logger.log(holiday.name); return JSON.stringify(holiday);}
  
  // Search for Sacra Famiglia
  if (isSacraFamiglia(testDate)) {holiday = {name:"Sacra Famiglia", psalm:"L", holy:true, special:true, color:"" }}

  // Fixed Holidays (month start from 0!!!! 00 is Jan)
  let stringCheck = testDate.getUTCDate().toString().padStart(2, '0')+testDate.getUTCMonth().toString().padStart(2, '0');
  switch (stringCheck) {
    case "0100": holiday = {name:"Maria Santissima Madre di Dio", psalm:"G", holy:true, special:true, color:"A" };break;
    case "0600": holiday = {name:"Epifania", psalm:"L", holy:true, special:true, color:"W" };break;
    case "0201": holiday = {name:"Presentazione di Gesù al Tempio (Candelora)", psalm:"L", holy:false, special:true, color:"W" };break;
    case "2502": holiday = {name:"Annunciazione", psalm:"L", holy:false, special:true, color:"W" };break;
    case "1607": holiday = {name:"Assunzione", psalm:"G", holy:true, special:true, color:"A" };break;
    case "0110": holiday = {name:"Ognissanti", psalm:"B", holy:true, special:true, color:"W" };break;
    case "0210": holiday = {name:"Commemorazione defunti", psalm:"B", holy:false, special:true, color:"W" };break;
    case "0811": holiday = {name:"Immasolata Concezione", psalm:"G", holy:true, special:true, color:"A" };break;
    case "0711": holiday = {name:"S. Ambrogio", psalm:"B", holy:false, special:true, color:"V" };break;
    case "2511": holiday = {name:"SS. Natale di Ns. Signore", psalm:"L", holy:true, special:true, color:"W" };break;
    case "2611": holiday = {name:"S. Stefano", psalm:"L", holy:true, special:true, color:"R" };break;

    case "3106": holiday = {name:"S. Ignazio di Loyola", psalm:"B", holy:false, special:true, color:"V" };break;
    case "2905": holiday = {name:"Santi Pietro e Paolo", psalm:"B", holy:false, special:true, color:"R" };break;
    case "3111": holiday = {name:"S. Silvestro", psalm:"L", holy:false, special:true, color:"R" };break;
    case "1902": holiday = {name:"S. Giuseppe", psalm:"B", holy:false, special:true, color:"V" };break;
  }
  if (holiday) {Logger.log(holiday.name); return JSON.stringify(holiday);}

  // standard day, no holiday or feastday
  switch (testDate.getUTCDay()) {
    case 0: holiday = {name:"Domenica "+testDate.getUTCDate(), psalm:"G", holy:true, special:false, color:"G" };break;
    case 1: holiday = {name:"Lunedì "+testDate.getUTCDate(), psalm:"B", holy:false, special:false, color:"G" };break;
    case 2: holiday = {name:"Martedì "+testDate.getUTCDate(), psalm:"D", holy:false, special:false, color:"G" };break;
    case 3: holiday = {name:"Mercoledì "+testDate.getUTCDate(), psalm:"G", holy:false, special:false, color:"G" };break;
    case 4: holiday = {name:"Giovedì "+testDate.getUTCDate(), psalm:"L", holy:false, special:false, color:"G" };break;
    case 5: holiday = {name:"Venerdì "+testDate.getUTCDate(), psalm:"D", holy:false, special:false, color:"G" };break;
    case 6: holiday = {name:"Sabato "+testDate.getUTCDate(), psalm:"B", holy:false, special:false, color:"G" };break;
  }
  if (easterdifference > -46 && easterdifference <0) {holiday.color="V";}
  if (easterdifference > 0 && easterdifference <48) {holiday.color="W";}
  if (adventdifference > -28 && easterdifference <0) {holiday.color="V";}
  if (adventdifference > 0 && easterdifference <6) {holiday.color="W";}
  if (adventdifference > -359 && adventdifference <-342) {holiday.color="W";}

  if (holiday) {Logger.log(holiday.name); return JSON.stringify(holiday);}
  
  holiday = {name:"Errore di calcolo!", psalm:"D", holy:false, special:true, color:"" };
  return JSON.stringify(holiday);
}

