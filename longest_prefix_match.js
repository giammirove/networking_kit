const util = require("./utility");
const reader = require("readline-sync");

function get_input() {
  console.log("[!] Premi invio senza scrivere niente per terminare");
  let dest = [];
  while (true) {
    let addr = reader.question(`[?] Destinazione ${dest.length} : `);
    if (addr == "") break;
    dest.push(addr);
  }
  return dest;
}

function match(ip, dest) {
  let bit = util.ip_to_bin(ip);
  let index = dest.length;

  for (let i = 0; i < dest.length; i++) {
    if (bit.startsWith(dest[i])) {
      if (index == dest.length || dest[i].length > dest[index].length) {
        index = i;
      }
    }
  }

  return index;
}

function main() {
  let dest = get_input();
  console.log("[!] Premi invio senza scrivere niente per terminare");
  while (true) {
    let ip = reader.question("[?] IP : ");
    if (ip == "") break;
    let m = match(ip, dest);
    console.log(`[-] Link interface ${m}`);
  }
}

main();
