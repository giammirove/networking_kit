const util = require("./utility");
const reader = require("readline-sync");

let input = process.argv[2];
let ip = input.split("/")[0];
let cidr = input.split("/")[1];

const RESERVED_HOST = 3;

function calc_info(ip, cidr) {
  let network = util.get_network(ip, cidr);
  let first = util.get_first_host(ip, cidr);
  let last = util.get_last_host(ip, cidr);
  let router = util.get_router(ip, cidr);
  let broadcast = util.get_broadcast(ip, cidr);
  console.log(`[-] Network ${network}/${cidr}`);
  console.log(`[-] Netmask ${util.bit_to_ip(util.mask_to_bit(cidr))}`);
  console.log(`[-] First Host ${first}`);
  console.log(`[-] Last Host ${last}`);
  console.log(`[-] Router ${router}`);
  console.log(`[-] Broadcast ${broadcast}`);
  return { network, first, last, router, broadcast };
}

function execute(ip, cidr) {
  let info = calc_info(ip, cidr);
  check_subnet(info.network, info.cidr, info.router, info.broadcast);
}

function ask_subnet() {
  let n = reader.question("[?] Quante subnet ci sono ? ");
  return parseInt(n);
}

function check_subnet(network, cidr, gateway, broadcast) {
  let sub = [];
  let n_sub = ask_subnet();
  for (let i = 0; i < n_sub; i++) {
    let nome = reader.question("[?] Nome : ");
    let max_host = parseInt(reader.question("[?] Max host : ")) + RESERVED_HOST;
    sub.push({ nome, max_host });
  }
  // sub = [
  //   { nome: "A", max_host: 1000 },
  //   { nome: "B", max_host: 210 },
  // ];
  sub.sort(function (a, b) {
    return b.max_host - a.max_host;
  });

  let sub_ip = network;
  for (let i = 0; i < sub.length; i++) {
    let new_cidr = 32 - util.find_exp_for_host(sub[i].max_host);
    console.log(`\nSubnet ${sub[i].nome}(${sub[i].max_host - RESERVED_HOST})`);
    let info = calc_info(sub_ip, new_cidr);
    console.log(`[-] Gateway ${gateway}`);
    check_subnet(sub_ip, new_cidr, info.router, info.broadcast);
    sub_ip = util.next_ip(info.broadcast);
  }
}

execute(ip, cidr);
