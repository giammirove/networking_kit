const util = require("./utility");
const reader = require("readline-sync");

const FADE_MARGIN = 10;

// F in Mhz . D in miles
function free_space_loss(F, D) {
  return 36.6 + 20 * Math.log10(F) + 20 * Math.log10(D);
}

// loss = 36.6 + 20 * Math.log10(F) + 20 * Math.log10(D)
// (loss - 36.6 + 20 * Math.log10(F) ) / 20 = Math.log10(D)
// 10 * (//) = D
function distance_from_loss(loss, freq) {
  let exp = (loss - 36.6 - 20 * Math.log10(freq)) / 20;
  return Math.pow(10, exp);
}

function frequence_from_loss(loss, dist) {
  let exp = (loss - 36.6 - 20 * Math.log10(dist)) / 20;
  return Math.pow(10, exp);
}

// condition
// Potenza ricevuta - receiver sensitivity >= fade operating margin
// dove Potenzo ricevuta = Potenza trasmessa + guadagni + free space loss

// p_trasmessa in dBm
// guadagni in dBm o dBi
// frequenza in Mhz
// distanza in miglia
function calc_potenza_ricevuta(
  p_trasmessa,
  guadagni,
  perdite,
  frequenza,
  distanza
) {
  return (
    p_trasmessa + guadagni - perdite - free_space_loss(frequenza, distanza)
  );
}

function convert_mw_dbm(s) {
  return 10 * Math.log10(s);
}

function convert_dbm_mw(s) {
  return Math.pow(10, s / 10);
}

function convert_km_miles(s) {
  return s * 0.621371;
}

function convert_miles_km(s) {
  return s / 0.621371;
}

function convert_feet_m(s) {
  return (s * 30.5) / 100;
}

function convert_m_feet(s) {
  return s / 30.5;
}

// raggio 100 %
// frequenza in in Ghz
// distanza in miglia
// il risultato sarebbe in feet ma convertito in metri
function raggio_zona_fresnel_100(frequenza, distanza) {
  let r = 72.2 * Math.sqrt(distanza / (4 * frequenza));
  console.log(
    `[-] Raggio della zona di Fresnel 100%\n\t${r} feet\n\t${convert_feet_m(
      r
    )} m`
  );
  return r;
}

function raggio_zona_fresnel_60(frequenza, distanza) {
  let r = 43.3 * Math.sqrt(distanza / (4 * frequenza));
  r = convert_feet_m(r);
  console.log(`[-] Raggio della zona di Fresnel 100% ${r}`);
  return r;
}

function trova_potenza_di_trasmissione(
  guadagni,
  perdite,
  frequenza,
  distanza,
  receiver_sensitivity,
  nebbia
) {
  let fade_margin = 0;
  if (nebbia) fade_margin = FADE_MARGIN;
  let potenza_ricevuta_parziale = calc_potenza_ricevuta(
    0,
    guadagni,
    perdite,
    frequenza,
    distanza
  );
  console.log(
    `[-] Free space loss ${free_space_loss(frequenza, distanza)} dBm`
  );
  console.log(`[-] Potenza ricevuta parziale ${potenza_ricevuta_parziale} dBm`);
  let potenza_trasmessa =
    -potenza_ricevuta_parziale - receiver_sensitivity + fade_margin;
  console.log(
    `[-] Potenza di trasmissione \n\t\t${potenza_trasmessa} dBm\n\t\t${convert_dbm_mw(
      potenza_trasmessa
    )} mW`
  );
  return potenza_trasmessa;
}

function trova_fade_margin(
  guadagni,
  perdite,
  frequenza,
  distanza,
  transmission_power,
  receiver_sensitivity
) {
  let received_power = calc_potenza_ricevuta(
    transmission_power,
    guadagni,
    perdite,
    frequenza,
    distanza
  );
  console.log(`[-] Receiver power ${received_power}`);
  let fade_margin = received_power + receiver_sensitivity;
  console.log(`[-] Fade margin di ${fade_margin} dBm`);
  if (fade_margin > 0) {
    console.log(`[-] Amplificatore NON necessario`);
  } else {
    console.log(`[x] Amplificatore necessario`);
  }
  return fade_margin;
}

function trova_receiver_sensitivity(
  guadagni,
  perdite,
  frequenza,
  distanza,
  transmission_power,
  fade_margin
) {
  let receiver_power = calc_potenza_ricevuta(
    transmission_power,
    guadagni,
    perdite,
    frequenza,
    distanza
  );
  let receiver_sensitivity = receiver_power - fade_margin;
  console.log(`[-] Receiver sensitivity ${receiver_sensitivity}`);
  return receiver_sensitivity;
}

function trova_frequenza_minima(
  guadagni,
  perdite,
  distanza,
  transmission_power,
  receiver_sensitivity,
  fade_margin
) {
  let gain = guadagni + transmission_power;
  let perdita_distanza = gain - perdite + receiver_sensitivity - fade_margin;
  let frequenza = frequence_from_loss(perdita_distanza, distanza);
  console.log(`[-] Frequenza ${frequenza}`);
}

function trova_distanza_minima(
  guadagni,
  perdite,
  frequenza,
  transmission_power,
  receiver_sensitivity,
  fade_margin
) {
  let gain = guadagni + transmission_power;
  let perdita_distanza = gain - perdite + receiver_sensitivity - fade_margin;
  let distanza = distance_from_loss(perdita_distanza, frequenza);
  console.log(`[-] Distanza ${distanza}`);
}

function test() {
  let p = trova_potenza_di_trasmissione(14, 0, 1900, 5, 97, true);
  trova_fade_margin(14, 0, 1900, 10, p, 97);
  trova_receiver_sensitivity(14, 0, 1900, 5, p, FADE_MARGIN);
  trova_distanza_minima(14, 0, 1900, p, 97, FADE_MARGIN);
  trova_frequenza_minima(14, 0, 5, p, 97, FADE_MARGIN);
  raggio_zona_fresnel_100(1.9, 5);
}