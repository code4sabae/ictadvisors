import { CSV } from "https://code4sabae.github.io/js/CSV.js";
import { match } from "./match.js";
import { isPC } from "./isPC.js";

window.onload = async () => {
  const csv = await CSV.fetch("ictadvisors_2022.csv");
  const json = CSV.toJSON(csv);

  const search = () => {
    const key = inputfilter.value;
    let cnt = 0;
    for (const d of json) {
      const flg = match(d, key);
      const idname = "data" + d.ID;
      const div = document.getElementById(idname);
      if (flg) {
        cnt++;
      }
      div.style.display = flg ? "block" : "none";      
    }
    filtered.textContent = `該当者：${cnt}名`;
  };
  inputfilter.onchange = search;
  if (isPC()) {
    inputfilter.onkeyup = search;
  }

  document.querySelectorAll(".advisor").forEach(a => {
    const h2 = a.querySelector("h2");
    const div = a.querySelector("div");
    h2.onclick = () => {
      div.style.display = div.style.display == "block" ? "none" : "block";
    };
  });
};
