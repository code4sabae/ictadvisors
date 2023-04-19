import { CSV } from "https://code4sabae.github.io/js/CSV.js";

for (let i = 2022; i <= 2023; i++) {
  const data = CSV.toJSON(CSV.decode(await Deno.readTextFile(`ictadvisors_${i}.csv`)));
  await Deno.writeTextFile(`ictadvisors_name_${i}.csv`, CSV.stringify(data.map(d => ({ 氏名: d.氏名 }))));
}
