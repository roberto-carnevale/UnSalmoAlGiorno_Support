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
  let easterDate = new Date(yyyy, Mp-1, Ep);
  easterDate.setUTCHours(12,0,0,0);
  return easterDate;
}

function getLastAdventSun(yyyy) {
  var dateToCheck = new Date(yyyy, 11, 24);
  dateToCheck.setUTCHours(12,0,0,0);
  while (dateToCheck.getDay() != 0) {
      dateToCheck.setUTCDate(dateToCheck.getUTCDate()-1);
  }
  return dateToCheck
}

function isSacraFamiglia(date) {
  if (date.getUTCMonth() == 11) {
    var dateToCheck = new Date(date.getFullYear(), 11, 31);
    dateToCheck.setUTCHours(12,0,0,0);
    while (dateToCheck.getDay() != 0) {
        dateToCheck.setUTCDate(dateToCheck.getUTCDate()-1);
    }
    if (dateToCheck.getDate() <= 26) {dateToCheck.setUTCDate(30);}
    if (dateToCheck-date==0) {return true;}
  }
  return false;
}

function dateBattesimo(yyyy) {
  var dateToCheck = new Date(yyyy, 0, 7);
  dateToCheck.setUTCHours(12,0,0,0);
  while (dateToCheck.getDay() != 0) {
      dateToCheck.setUTCDate(dateToCheck.getUTCDate()+1);
  }
  return dateToCheck;
}

function leapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

/////////////////////////////////////////////TEST 
function testDate() {
  var testDate = new Date(2021, 5, 7);
  testDate.setUTCHours(12, 0,0,0);
  Logger.log("Date: "+testDate);
  Logger.log("Res : "+checkHoliday(testDate));
}

// function checkHoliday(testDate) {
//   //set noon UTC
//   testDate.setUTCHours(12, 0,0,0);
//   //return object
//   var holiday = null;
//   // Easter erea
//   var easter = getEasterDay(testDate.getFullYear());
//   //let easterdifference = Math.trunc( ( easter - (new Date()) )/86400000 );
//   let easterdifference = Math.trunc( ( testDate - easter ) / 86400000 );
//   // //Leap Year
//   // let leapDay = (testDate - ( new Date(testDate.getFullYear(), 0, 1) ).setUTCHours(12,0,0,0)) / 86400000;
//   // if (leapYear(testDate.getFullYear()) && leapDay > 60) {easterdifference++;}
//   switch (easterdifference) {
//     case -52: holiday = {name:"Giovedì Grasso", psalm:"B", holy:false, tempo:"O" ,special:true, color:"G" };break;
//     case -47: holiday = {name:"Martedì Grasso", psalm:"B", holy:false, tempo:"O" ,special:true, color:"G" };break;
//     case -46: holiday = {name:"Le Ceneri", psalm:"D", holy:true, tempo:"Q" ,special:true, color:"V" };break;
//     case -45: holiday = {name:"Giovedì Grasso (Ambrosiano)", psalm:"B", holy:true, tempo:"Q" ,special:true, color:"V" };break;
//     case -43: holiday = {name:"Sabato Grasso (Ambrosiano)", psalm:"B", holy:true, tempo:"Q" ,special:true, color:"V" };break;
//     case -42: holiday = {name:"Domenica della tentazione", psalm:"D", holy:true, tempo:"Q" ,special:true, color:"V" };break;
//     case -35: holiday = {name:"Domenica della Trasfigurazione", psalm:"D", holy:true, tempo:"Q" ,special:true, color:"V" };break;
//     case -28: holiday = {name:"Domenica della Samaritana", psalm:"D", holy:true, tempo:"Q" ,special:true, color:"V" };break;
//     case -21: holiday = {name:"Domenica dell'illuminazione (Laetare)", psalm:"D", holy:true, tempo:"Q" ,special:true, color:"S" };break;
//     case -14: holiday = {name:"Domenica di Lazzaro", psalm:"D", holy:true, tempo:"Q" ,special:true, color:"V" };break;
//     case -7:  holiday = {name:"Domenica delle palme", psalm:"D", holy:true, tempo:"Q" ,special:true, color:"R" };break;
//     case -3:  holiday = {name:"Giovedì santo", psalm:"D", holy:true, tempo:"Q" ,special:true, color:"W" };break;
//     case -2:  holiday = {name:"Venerdì santo", psalm:"D", holy:true, tempo:"Q" ,special:true, color:"R" };break;
//     case -1:  holiday = {name:"Sabato santo", psalm:"D", holy:true, tempo:"Q" ,special:true, color:"W" };break;
//     case 0:   holiday = {name:"SS. Pasqua", psalm:"G", holy:true, tempo:"P" ,special:true, color:"W" };break;
//     case 1:   holiday = {name:"Lunedì dell'Angelo", psalm:"G", holy:true, tempo:"P" ,special:true, color:"W" };break;
//     case 7:   holiday = {name:"Domenica in Albis", psalm:"G", holy:true, tempo:"P" ,special:true, color:"W" };break;
//     case 21:  holiday = {name:"Domenica del Buon Pastore", psalm:"G", holy:true, tempo:"P" ,special:true, color:"W" };break;
//     case 39:  holiday = {name:"Ascensione", psalm:"G", holy:false, tempo:"P" ,special:true, color:"W" };break;
//     case 42:  holiday = {name:"Ascensione (liturgica)", psalm:"G", holy:true, tempo:"P" ,special:true, color:"W" };break;
//     case 49:  holiday = {name:"Pentecoste", psalm:"G", holy:true, tempo:"P" ,special:true, color:"R" };break;
//     case 56:  holiday = {name:"Santissima Trinità", psalm:"G", holy:true, tempo:"O" ,special:true, color:"W" };break;
//     case 60:  holiday = {name:"Corpus Domini", psalm:"G", holy:false, tempo:"O" ,special:true, color:"W" };break;
//     case 63:  holiday = {name:"Corpus Domini (liturgico)", psalm:"G", holy:true, tempo:"O" ,special:true, color:"W" };break;
//     case 68:  holiday = {name:"Sacro Cuore di Gesù", psalm:"G", holy:true, tempo:"O" ,special:true, color:"W" };break;
//     case 69:  holiday = {name:"Cuore immacolato di Maria", psalm:"G", holy:true, tempo:"O" ,special:true, color:"A" };break;
//   }
//   if (holiday) {Logger.log(holiday.name); return JSON.stringify(holiday);}
  
//   // Advent area
//   var lastAdvent = getLastAdventSun((new Date()).getUTCFullYear());
//   let adventdifference = Math.trunc( ( testDate - lastAdvent ) / 86400000 );
//   switch (adventdifference) {
//     case -42: holiday = {name:"Inizio Avvento Ambrosiano (Cristo Re)", psalm:"G", holy:true, tempo:"A" ,special:true, color:"V" };break;
//     case -28: holiday = {name:"Cristo Re", psalm:"G", holy:true, tempo:"A" ,special:true, color:"W" };break;
//     case -21: holiday = {name:"1ª domenica di Avvento", psalm:"L", holy:true, tempo:"A" ,special:true, color:"V" };break;
//     case -14: holiday = {name:"2ª domenica di Avvento", psalm:"L", holy:true, tempo:"A" ,special:true, color:"V" };break;
//     case -7: holiday = {name:"3ª domenica di Avvento (Gaudete)", psalm:"L", holy:true, tempo:"A" ,special:true, color:"S" };break;
//     case 0:  holiday = {name:"4ª domenica di Avvento", psalm:"L", holy:true, tempo:"A" ,special:true, color:"V" };break;
//   }
//   if (holiday) {Logger.log(holiday.name); return JSON.stringify(holiday);}
  
//   // Search for Sacra Famiglia
//   if (isSacraFamiglia(testDate)) {holiday = {name:"Santa Famiglia di Gesù, Maria e Giuseppe", psalm:"L", holy:true, tempo:"N" ,special:true, color:"W" };return JSON.stringify(holiday);}
  
//   // Search for Battesimo del Signore
//   var dateBattesimoVar=dateBattesimo(testDate);
//   if (testDate-dateBattesimoVar == 0) {holiday = {name:"Battesimo del Signore", psalm:"L", holy:true, tempo:"N" ,special:true, color:"W" };return JSON.stringify(holiday);}

//   // Fixed Holidays (month start from 0!!!! 00 is Jan)
//   let stringCheck = testDate.getUTCDate().toString().padStart(2, '0')+testDate.getUTCMonth().toString().padStart(2, '0');
//   switch (stringCheck) {
//     case "0100": holiday = {name:"Maria Santissima Madre di Dio", psalm:"G", holy:true, tempo:"N" ,special:true, color:"A" };break;
//     case "0600": holiday = {name:"Epifania", psalm:"L", holy:true, tempo:"N" ,special:true, color:"W" };break;
//     case "0201": holiday = {name:"Presentazione di Gesù al Tempio (Candelora)", psalm:"L", holy:false, tempo:"O" ,special:true, color:"W" };break;
//     case "2502": holiday = {name:"Annunciazione", psalm:"L", holy:false, tempo:"O" ,special:true, color:"W" };break;
//     case "1507": holiday = {name:"Assunzione", psalm:"G", holy:true, tempo:"O" ,special:true, color:"A" };break;
//     case "0110": holiday = {name:"Ognissanti", psalm:"B", holy:true, tempo:"O" ,special:true, color:"W" };break;
//     case "0210": holiday = {name:"Commemorazione defunti", psalm:"B", holy:false, tempo:"O" ,special:true, color:"W" };break;
//     case "0811": holiday = {name:"Immasolata Concezione", psalm:"G", holy:true, tempo:"A" ,special:true, color:"A" };break;
//     case "0711": holiday = {name:"S. Ambrogio", psalm:"B", holy:false, tempo:"A" ,special:true, color:"V" };break;
//     case "1011": holiday = {name:"Immasolata Concezione", psalm:"G", holy:true, tempo:"A" ,special:true, color:"A" };break;
//     case "2511": holiday = {name:"SS. Natale di Ns. Signore", psalm:"L", holy:true, tempo:"N" ,special:true, color:"W" };break;
//     case "2611": holiday = {name:"Santa Famiglia di Gesù, Maria e Giuseppe", psalm:"L", holy:true, tempo:"N" ,special:true, color:"W" };break;

//     case "3111": holiday = {name:"S. Silvestro", psalm:"L", holy:false, tempo:"N" ,special:true, color:"R" };break;
//     case "1700": holiday = {name:"S. Antonio", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2500": holiday = {name:"Conversione di San Paolo", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2600": holiday = {name:"Santi Timoteo e Tito", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2800": holiday = {name:"San Tommaso d’Aquino", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2100": holiday = {name:"Sant'Agnese", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "0501": holiday = {name:"Sant'Agata", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "0601": holiday = {name:"Santi Paolo Miki e compagni", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "1001": holiday = {name:"Santa Scolastica", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2201": holiday = {name:"Cattedra di S.Pietro", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "1902": holiday = {name:"S. Giuseppe", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2903": holiday = {name:"Santa Caterina da Siena", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "0304": holiday = {name:"Santi Filippo e Giacomo", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "1404": holiday = {name:"S. Mattia", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "2404": holiday = {name:"Beata Vergine Maria Madre della Chiesa", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2604": holiday = {name:"S. Filippo Neri", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "3104": holiday = {name:"Visitazione della Beata Vergine Maria", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "0105": holiday = {name:"S. Giustino", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "0505": holiday = {name:"S. Bonifacio", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "1205": holiday = {name:"Cuore Immacolato della Beata Vergine Maria", psalm:"B", holy:false, tempo:"?" ,special:false, color:"A" };break;
//     case "2105": holiday = {name:"S. Luigi Gonzaga", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2405": holiday = {name:"Natività di San Giovanni Battista", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2805": holiday = {name:"S. Ireneo di Lione", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "2905": holiday = {name:"Santi Pietro e Paolo", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "0306": holiday = {name:"S. Tommaso", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "1506": holiday = {name:"S. Bonaventura", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;   
//     case "2206": holiday = {name:"Santa Maria Maddalena", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2606": holiday = {name:"Santi Gioacchino ed Anna", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2906": holiday = {name:"Santa Marta", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "0407": holiday = {name:"San Giovanni Maria Vianney", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "0607": holiday = {name:"Trasfigurazione del Signore", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "1007": holiday = {name:"S. Lorenzo", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "1107": holiday = {name:"Santa Chiara", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "1407": holiday = {name:"S. Massimiliano Maria Kolbe", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "2007": holiday = {name:"S. Bernardo", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2107": holiday = {name:"S. Pio X", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2407": holiday = {name:"S. Bartolomeo", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "2707": holiday = {name:"Santa Monica", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2807": holiday = {name:"Sant'Agostino", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "0308": holiday = {name:"San Gregorio Magno", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "0808": holiday = {name:"Natività della Beata Vergine Maria", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "1308": holiday = {name:"San Giovanni Crisostomo", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "1408": holiday = {name:"Esaltazione della Santa Croce", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "1508": holiday = {name:"Beata Vergine Maria Addolorata", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "1608": holiday = {name:"Santi Cornelio e Cipriano", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break; 
//     case "2008": holiday = {name:"Santi Andrea Kim Taegŏn e Paolo Chŏng Hasang e compagni", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;  
//     case "2108": holiday = {name:"S. Matteo", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break; 
//     case "2308": holiday = {name:"S. Pio da Pietrelcina", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break; 
//     case "2708": holiday = {name:"S. Vincenzo de’ Paoli", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2908": holiday = {name:"Santi Michele, Gabriele e Raffaele, Arcangeli", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "3008": holiday = {name:"S. Girolamo", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "0109": holiday = {name:"Santa Teresa del Bambino Gesù", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "0209": holiday = {name:"Santi Angeli custodi", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "0409": holiday = {name:"San Francesco d’Assisi", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "0709": holiday = {name:"Beata Vergine Maria del Rosario", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "1509": holiday = {name:"Santa Teresa di Gesù", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "1809": holiday = {name:"S. Luca", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "0410": holiday = {name:"S. Carlo Borromeo", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "0910": holiday = {name:"Dedicazione della basilica Lateranense", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "1010": holiday = {name:"S. Leone Magno", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "1110": holiday = {name:"S. Martino di Tours", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "1210": holiday = {name:"S. Giosafat", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "1710": holiday = {name:"Sant’Elisabetta d’Ungheria", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2210": holiday = {name:"Santa Cecilia", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "2809": holiday = {name:"Santi Simone e Giuda", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "2110": holiday = {name:"Santi Andrea Dung-Lac e compagni", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "3010": holiday = {name:"Sant’Andrea", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "0311": holiday = {name:"San Francesco Saverio", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "1311": holiday = {name:"Santa Lucia", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//     case "1411": holiday = {name:"San Giovanni della Croce", psalm:"B", holy:false, tempo:"?" ,special:false, color:"E" };break;
//     case "2711": holiday = {name:"San Giovanni", psalm:"B", holy:false, tempo:"?" ,special:false, color:"W" };break;
//     case "2811": holiday = {name:"Santi Innocenti, martiri", psalm:"B", holy:false, tempo:"?" ,special:false, color:"R" };break;
//   }
//   if (holiday) {Logger.log(holiday.name); return JSON.stringify(holiday);}

//   // standard day, no holiday or feastday
//   switch (testDate.getUTCDay()) {
//     case 0: holiday = {name:"Domenica "+testDate.getUTCDate(), psalm:"G", holy:true, tempo:"O" ,special:false, color:"G" };break;
//     case 1: holiday = {name:"Lunedì "+testDate.getUTCDate(), psalm:"B", holy:false, tempo:"O" ,special:false, color:"G" };break;
//     case 2: holiday = {name:"Martedì "+testDate.getUTCDate(), psalm:"D", holy:false, tempo:"O" ,special:false, color:"G" };break;
//     case 3: holiday = {name:"Mercoledì "+testDate.getUTCDate(), psalm:"G", holy:false, tempo:"O" ,special:false, color:"G" };break;
//     case 4: holiday = {name:"Giovedì "+testDate.getUTCDate(), psalm:"L", holy:false, tempo:"O" ,special:false, color:"G" };break;
//     case 5: holiday = {name:"Venerdì "+testDate.getUTCDate(), psalm:"D", holy:false, tempo:"O" ,special:false, color:"G" };break;
//     case 6: holiday = {name:"Sabato "+testDate.getUTCDate(), psalm:"B", holy:false, tempo:"O" ,special:false, color:"G" };break;
//   }
//   if (easterdifference > -46 && easterdifference <0) {holiday.color="V"; holiday.tempo = "Q";}
//   if (easterdifference > 0 && easterdifference <49) {holiday.color="W";holiday.tempo = "P";}
//   if (adventdifference > -28 && adventdifference <6) {holiday.color="V";holiday.tempo = "A";}
//   if (testDate.getUTCMonth() == 0 && testDate.getUTCDate() < dateBattesimoVar.getUTCDate()) {holiday.color="W";holiday.tempo = "N";}

//   // let week = ( Math.trunc( (testDate - dateBattesimoVar)/86400000/7 ) +1 );
//   // Logger.log(">>"+week);

//   if (holiday) {return JSON.stringify(holiday);}
  
//   holiday = {name:"Errore di calcolo!", psalm:"D", holy:false, tempo:"" ,special:true, color:"" };
//   return JSON.stringify(holiday);
// }

