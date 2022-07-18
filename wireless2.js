const util = require("./utility");
const reader = require("readline-sync");

function convert_Mhz_Hz(f) {
  return f * 1000000;
}

// frequenza deve essere in Hz
function calc_lunghezza_onda(frequenza) {
  let l = 300000000 / frequenza;
  console.log(
    `[-] Lunghezza d'onda {${l}} = velocita della luce {${300000000}} / frequenza {${frequenza}}`
  );
  return l;
}

// diff_distanza indica la differenza in metri tra la distanza percorsa
// dal segnale buono e quello che ha subito una variazione
function controlla_risultante(frequenza, diff_distanza) {
  let lunghezza = calc_lunghezza_onda(convert_Mhz_Hz(frequenza));
  let alpha = lunghezza / diff_distanza;
  console.log(
    `[-] Risultante = Lunghezza d'onda {${lunghezza}} / differenza di distanza {${diff_distanza}}`
  );
  if (alpha == parseInt(alpha)) console.log(`[-] La comunicazione e' buona`);
  else console.log(`[x] La comunicazione si annulla!`);
}

let f = parseFloat(process.argv[2]);
let d = parseInt(process.argv[3]);
controlla_risultante(f, d);
