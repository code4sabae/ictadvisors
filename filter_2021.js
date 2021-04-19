import { CSV } from "https://code4sabae.github.io/js/CSV.js";

window.onload = async () => {
  const csv = await CSV.fetch("ictadvisors_2021.csv");
  const csv2020 = await CSV.fetch("ictadvisors_2020.csv");
  const json = CSV.toJSON(csv2020);

  const search2020 = () => {
    const key = inputfilter.value;
    const res = [];
    for (const d of json) {
      let flg = false;
      for (const name in d) {
        if (d[name].indexOf(key) >= 0) {
          flg = true;
          break;
        }
      }
      if (flg) {
        const idname = d["氏名"];
        res.push(idname);
      }
    }
    return res;
  };

  inputfilter.onchange = inputfilter.onkeyup = () => {
    const hitnames = search2020();
    //console.log(hitnames);

    const key = inputfilter.value;
    let cnt = 0;
    for (let i = 1; i < csv.length; i++) {
      const d = csv[i];
      const name = d[1];
      let flg = hitnames.indexOf(name) >= 0;
      for (const s of d) {
        if (s.indexOf(key) >= 0) {
          flg = true;
          break;
        }
      }
      const idname = "data" + d[0];
      const div = document.getElementById(idname);
      if (flg) {
        cnt++;
      }
      div.style.display = flg ? "block" : "none";
    }
    filtered.textContent = `該当者：${cnt}人`;
  };
};
