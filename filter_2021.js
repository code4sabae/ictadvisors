import { CSV } from "https://code4sabae.github.io/js/CSV.js";

window.onload = async () => {
  const csv = await CSV.fetch("ictadvisors_2021.csv");

  inputfilter.onchange = inputfilter.onkeyup = () => {
    const key = inputfilter.value;
    let cnt = 0;
    for (let i = 1; i < csv.length; i++) {
      const d = csv[i];
      let flg = false;
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
