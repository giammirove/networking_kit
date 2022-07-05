const util = require("./utility");
const reader = require("readline-sync");

function convert_Mhz_Hz(f) {
  return f * 1000000;
}

// frequenza deve essere in Hz
function calc_lunghezza_onda(frequenza) {
  return 300000000 / frequenza;
}

// diff_distanza indica la differenza in metri tra la distanza percorsa
// dal segnale buono e quello che ha subito una variazione
function controlla_risultante(frequenza, diff_distanza) {
  let alpha = calc_lunghezza_onda(convert_Mhz_Hz(frequenza)) / diff_distanza;
  if (alpha == parseInt(alpha)) console.log(`[-] La comunicazione e' buona`);
  else console.log(`[x] La comunicazione si annulla!`);
}

let f = parseFloat(process.argv[2]);
let d = parseInt(process.argv[3]);
controlla_risultante(f, d);
