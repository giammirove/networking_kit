const util = require("./utility");
const reader = require("readline-sync");

// Stop and wait
function calcola_throughput() {
  console.log("[!] Si considera stop and wait !");
  let dimensione_pacchetto = reader.question(
    "[?] Dimensione pacchetto in KB : "
  );
  let rtt = reader.question("[?] RTT in ms : ");
  let throughput = dimensione_pacchetto / (rtt / 1000);
  console.log(`[-] Throughput ${throughput} KB/s`);
}

function calcola_utilizzo() {
  let dimensione_pacchetto = reader.question(
    "[?] Dimensione pacchetto in KB : "
  );
  let capacita = reader.question("[?] Capacita' del canale Mbps : ");
  let throughput = reader.question("[?] Throughput KB/s : ");
  let utilizzo = (throughput * dimensione_pacchetto) / (capacita * 1000);
  console.log(`[-] Utilizzo ${utilizzo * 100} %`);
}

function dimensione_massima_pacchetto() {
  let pack_sec = reader.question("[?] Pacchetti al secondo : ");
  let capacita = reader.questionFloat("[?] Capacita' del canale Mbit/s : ");
  // La/R = 1 , significa che la rete e' in congestione
  // L e' il peso del pacchetto
  // a e' il numero di pacchetto in arrivo
  // R e' la capacita del canale
  // quindi affinche sia 1 il rapporto allora L = R/a
  let dimensione_pacchetto = (capacita * 1000) / pack_sec;
  console.log(`[-] Dimensione pacchetto ${dimensione_pacchetto} Kbit`);
}

function main() {
  let res = reader.questionInt(
    `[-] Scegli una delle opzioni\n 1. Calcola throughput\n 2. Calcola utilizzo della rete\n 3. Calcola dimensione massima del pacchetto per la congestion\n >  `
  );

  if (res == 1) calcola_throughput();
  else if (res == 2) calcola_utilizzo();
  else if (res == 3) dimensione_massima_pacchetto();
  else console.log(`[x] Bruh scegli bene`);
}

main();
