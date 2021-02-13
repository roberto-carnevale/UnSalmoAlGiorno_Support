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
    if (dateToCheck.getDate() < 26) {dateToCheck.setUTCDate(30);}
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