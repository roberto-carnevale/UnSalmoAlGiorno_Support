// function DayDescription() {
//   this.day = {name:"", psalm:"", tempo:"O" , color:"G", holy:null };
// }

const millisPerDay = 86400000;

/*name: Name of the Holy day
psalm: Psalm Type B,G,L,D
holy: Type of feast
  S: Solennità
  F: Festa
  M: Memoria
  N: Nessuna
tempo:
  O: Ordinario
  A: Avvento
  Q: Quaresima
  N: Natalizio
color:
  G: Verde
  W: Bianco
  R: Rosso
  V: Viola
  A: Azzurro
  S: Rosa
year:
  1: A
  2: B
  3: C
*/

const yearEncode = {
  1: "Anno A",
  2: "Anno B",
  0: "Anno C"
}

const dictR2A={2:"II",
3:"III",
4:"IV",
5:"V",
6:"VI",
7:"VII",
8:"VIII",
9:"IX",
10:"X",
11:"XI",
12:"XII",
13:"XIII",
14:"XIV",
15:"XV",
16:"XVI",
17:"XVII",
18:"XVIII",
19:"XIX",
20:"XX",
21:"XXI",
22:"XXIII",
23:"XXIII",
24:"XXIV",
25:"XXV",
26:"XXVI",
27:"XXVII",
28:"XXVIII",
29:"XXIX",
30:"XXX",
31:"XXXI",
32:"XXXII",
33:"XXXIII"
}

const dictR2E={2:"2nd",
3: "3rd",
4:"4th",
5:"5th",
6:"6th",
7:"7th",
8:"8th",
9:"9th",
10:"10th",
11:"11th",
12:"12th",
13:"13th",
14:"14th",
15:"15th",
16:"16th",
17:"17th",
18:"18th",
19:"19th",
20:"20th",
21:"21st",
22:"22nd",
23:"23rd",
24:"24th",
25:"25th",
26:"26th",
27:"27th",
28:"28th",
29:"29th",
30:"30th",
31:"31st",
32:"32nd",
33:"33rd"
}