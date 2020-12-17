import { CSV } from "https://code4sabae.github.io/js/CSV.js";

window.onload = async () => {
  const csv = await CSV.fetch("ictadvisors_2020.csv");
  const json = CSV.toJSON(csv);

  inputfilter.onchange = inputfilter.onkeyup = () => {
    const key = inputfilter.value;
    let cnt = 0;
    for (const d of json) {
      let flg = false;
      for (const name in d) {
        if (d[name].indexOf(key) >= 0) {
          flg = true;
          console.log(d[name]);
          break;
        }
      }
      const idname = "data" + d["ID"];
      const div = document.getElementById(idname);
      if (flg) {
        cnt++;
      }
      div.style.display = flg ? "block" : "none";
    }
    filtered.textContent = `該当者：${cnt}人`;
  };
};
