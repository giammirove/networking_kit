function valid(ip) {
  let s = ip.split(".");
  for (let i = 0; i < s.length; i++)
    if (parseInt(s[i]) > 255 || parseInt(s[i]) < 0) return false;
  return true;
}

function mask_to_bit(cidr) {
  let m = "";
  for (let i = 0; i < cidr; i++) m += "1";
  for (let i = cidr; i < 32; i++) m += "0";
  return m;
}

function end_mask(cidr) {
  let mask = mask_to_bit(cidr);
  mask = mask.replace(/1/gm, "");
  return mask;
}

function dec_to_bin(d) {
  return String(parseInt(d).toString(2)).padStart(8, "0");
}

function dec_to_bin_long(d) {
  return String(parseInt(d).toString(2)).padStart(32, "0");
}

function ip_to_bin(ip) {
  let s = ip.split(".");
  let b = "";
  for (let i = 0; i < s.length; i++) {
    b += dec_to_bin(parseInt(s[i]));
  }
  return b;
}

function is_host(ip, cidr) {
  let bin = ip_to_bin(ip);
  let end = end_mask(cidr);
  return !bin.endsWith(end);
}

function get_class(ip) {
  const firstOctet = parseInt(ip.match(/\d{1,3}(?=\.)/)[0], 10);

  if (firstOctet < 128) {
    return "A";
  }
  if (firstOctet > 127 && firstOctet < 192) {
    return "B";
  }
  if (firstOctet > 191 && firstOctet < 224) {
    return "C";
  }
  if (firstOctet > 223 && firstOctet < 240) {
    return "D";
  }
  if (firstOctet > 239 && firstOctet < 256) {
    return "E";
  }

  // Note: Should never get here because of validation check
  return false;
}

function get_bit_for_class(c) {
  if (c == "A") return 8;
  else if (c == "B") return 16;
  else if (c == "C") return 24;
  return 32;
}

function get_subnet_count(ip, cidr) {
  let c = get_bit_for_class(get_class(ip));
  let diff = Math.abs(c - parseInt(cidr));
  let sub = Math.pow(2, diff);
  if (c < cidr) {
    console.log(`[-] Subnetting di ${sub} reti`);
  } else if (c > cidr) {
    console.log(`[-] Supernetting ${sub} reti`);
  }
}

function bit_to_ip(bit) {
  let s = bit.match(/.{1,8}/g);
  let ip = "";
  for (let i = 0; i < s.length; i++) {
    ip += parseInt(s[i], 2);
    if (i < s.length - 1) {
      ip += ".";
    }
  }
  return ip;
}

function get_network(ip, cidr) {
  let end = end_mask(cidr);
  let l = end.length;
  let ip_bit = ip_to_bin(ip);
  let new_ip = "";
  for (let i = 0; i < ip_bit.length - l; i++) new_ip += ip_bit[i];
  new_ip = new_ip.padEnd(ip_bit.length, "0");

  return bit_to_ip(new_ip);
}

function get_first_host(ip, cidr) {
  let network = get_network(ip, cidr);
  return next_ip(network);
}

function get_last_host(ip, cidr) {
  let router = get_router(ip, cidr);
  return prev_ip(router);
}

function get_broadcast(ip, cidr) {
  let network = get_network(ip, cidr);
  let ip_net = ip_to_bin(network);
  let broadcast = ip_net
    .slice(0, -(ip_net.length - cidr))
    .padEnd(ip_net.length, "1");
  return bit_to_ip(broadcast);
}

function get_router(ip, cidr) {
  let broadcast = get_broadcast(ip, cidr);
  return prev_ip(broadcast);
}

function prev_ip(ip) {
  return bit_to_ip(dec_to_bin_long(parseInt(ip_to_bin(ip), 2) - 1));
}
function next_ip(ip) {
  return bit_to_ip(dec_to_bin_long(parseInt(ip_to_bin(ip), 2) + 1));
}

function find_exp_for_host(hosts) {
  let e = 0;
  while (Math.pow(2, e) < hosts) {
    e++;
  }
  return e;
}

module.exports = {
  valid,
  is_host,
  get_subnet_count,
  get_class,
  end_mask,
  dec_to_bin,
  mask_to_bit,
  get_bit_for_class,
  ip_to_bin,
  bit_to_ip,
  get_network,
  get_router,
  get_first_host,
  get_last_host,
  get_broadcast,
  find_exp_for_host,
  prev_ip,
  next_ip,
};
