import { CSV } from "https://code4sabae.github.io/js/CSV.js";
//import { JSONUtil } from "https://js.sabae.cc/JSONUtil.js";
//import { diffChars } from "https://taisukef.github.io/jsdiff-es/src/diff/character.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const names = {};
for (let i = 2022; i <= 2023; i++) {
  const data = CSV.toJSON(CSV.decode(await Deno.readTextFile(`ictadvisors_${i}.csv`)));
  const name = data.map(d => ({ 氏名: d.氏名 }));
  await Deno.writeTextFile(`ictadvisors_name_${i}.csv`, CSV.stringify(name));
  //names[i] = CSV.stringify(name);
  names[i] = name;
  //console.log(names[i])
}
const diff = ArrayUtil.diff(names[2022], names[2023]);
console.log(diff, diff.added.length, diff.removed.length);
const show = (ar) => ar.map(s => s.氏名.replace("　", "") + "氏").join("、");
console.log("新任メンバー: " + show(diff.added));
console.log("卒業メンバー: " + show(diff.removed));
await Deno.writeTextFile("ictadvisors_name_diff_2023.json", JSON.stringify(diff, null, 2));
//console.log(JSON.stringify(JSONUtil.diff(names[2022], names[2023]), null, 2));
//console.log(JSON.stringify(diffChars(names[2022], names[2023]), null, 2));

