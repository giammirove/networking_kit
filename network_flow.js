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

function trasmetti_tramite_protocollo_ip() {
  let blocco_dati = reader.question("[?] Blocco dati in KB : ");
  blocco_dati = blocco_dati * 1024; // converto in bytes
  let mtu_size = 1500; // in bytes
  let header_ip_size = 20; // in bytes
  let numero_mtu = parseInt(blocco_dati / mtu_size);
  if (parseFloat(blocco_dati) / parseFloat(mtu_size) != numero_mtu)
    numero_mtu += 1;

  for (let i = 0; i < numero_mtu; i++) {
    let size = Math.min(mtu_size - header_ip_size, blocco_dati);
    let flag = i != numero_mtu - 1 ? 1 : 0;
    console.log(
      `[-] Frammento ${
        i + 1
      }\n\t${header_ip_size} bytes di header IP + ${size} bytes del blocco dati`
    );
    console.log(
      `\tFLAG = ${flag} - OFFSET = ${(mtu_size - header_ip_size) * i}`
    );
    blocco_dati -= size;
  }
}

function calcola_congestion_window() {
  let dimensione_dati = reader.question("[?] Dimensione dati in KB : ");
  let rtt = reader.question("[?] RTT in ms : ");
  let capacita_rete = reader.question(
    "[?] Capacita' della rete (in un senso, con comunicazione parallelo inserire /2) in KB/s : "
  );
  let peso_percentuale_ack = reader.questionFloat(
    "[?] Peso percentuale dell'ACK : "
  );

  let kb_s = capacita_rete * (rtt / 1000);
  console.log(`[-] Dati in KB al secondo ${kb_s}`);
  let peso_ack = (peso_percentuale_ack / 100) * kb_s;
  let peso_dati = kb_s - peso_ack;
  let congestion_window = parseInt(peso_dati / dimensione_dati);

  console.log(`[-] Congestion Window e' di ${congestion_window}`);
}

function main() {
  let res = reader.questionInt(
    `[-] Scegli una delle opzioni\n 1. Calcola throughput\n 2. Calcola utilizzo della rete\n 3. Calcola dimensione massima del pacchetto per la congestion\n 4. Trasmetti blocco dati con protocollo IP\n 5. Congestion Window\n >  `
  );

  if (res == 1) calcola_throughput();
  else if (res == 2) calcola_utilizzo();
  else if (res == 3) dimensione_massima_pacchetto();
  else if (res == 4) trasmetti_tramite_protocollo_ip();
  else if (res == 5) calcola_congestion_window();
  else console.log(`[x] Bruh scegli bene`);
}

main();
