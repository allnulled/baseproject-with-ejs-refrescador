function(op = "Operation", ms = false, msg = '  [*] Operation «{op}» took: {ms} milliseconds') {
  const time = typeof ms === "number" ? ms : this.stop();
  const out = msg.replace("{op}", op).replace("{ms}", time);
  console.log(out);
}