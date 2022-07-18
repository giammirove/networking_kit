const utility = require("./utility");

let input = process.argv[2];
let ip = input.split("/")[0];
let cidr = input.split("/")[1];

function execute(ip, cidr) {
  if (!utility.valid(ip)) {
    console.log("[x] Non valido !");
  } else {
    let bin = utility.ip_to_bin(ip);
    let bin2 = "";
    let bin3 = "";
    for (let i = 0; i < 32; i++) {
      bin2 += bin[i];
      bin3 += bin[i];
      if ((i + 1) % 8 == 0) {
        bin2 += " ";
        bin3 += " ";
      }
      if (i == cidr - 1) bin3 += "|";
    }
    console.log(`[-] Ben formattato\n\t${bin3}`);
    let host = bin2.split(" ")[1].padStart(32, "0");
    console.log("[-] E' valido");
    if (utility.is_host(ip, cidr)) {
      console.log(`[-] E' host \n\t${host}\n\t${utility.bit_to_ip(host)}`);
    } else {
      console.log("[-] E' rete");
    }
    console.log(`[-] Classe ${utility.get_class(ip)}`);
    utility.get_subnet_count(ip, cidr);
  }
}

execute(ip, cidr);
