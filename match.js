const match1 = (d, kword) => {
  const k2 = kword.toLowerCase();
  for (const name in d) {
    let c = d[name];
    if (typeof c != "string") {
      c = c.toString();
    }
    if (c.toLowerCase().indexOf(k2) >= 0) {
      return true;
    }
  }
  return false;
};

export const match = (d, kword) => {
  kword = kword.replace(/　/g, " ");
  const keys = kword.split(" ");
  if (keys.length == 1 && keys[0] == "") {
    return true;
  }
  for (const key of keys) {
    if (!match1(d, key)) {
      return false;
    }
  }
  return true;
};
