const utility = require("./utility");

let input = process.argv[2];
let ip = input.split("/")[0];
let cidr = input.split("/")[1];

function execute(ip, cidr) {
  if (!utility.valid(ip)) {
    console.log("[x] Non valido !");
  } else {
    console.log("[-] E' valido");
    if (utility.is_host(ip, cidr)) {
      console.log("[-] E' host");
    } else {
      console.log("[-] E' rete");
    }
    console.log(`[-] Classe ${utility.get_class(ip)}`);
    utility.get_subnet_count(ip, cidr);
  }
}

execute(ip, cidr);
