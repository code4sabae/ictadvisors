import { CSV } from "https://code4sabae.github.io/js/CSV.js";

const csv = CSV.decode(await Deno.readTextFile("01_ad_opendata.csv"));
// console.log(csv);

csv.forEach((line) => line.forEach((d, i) => line[i] = d.trim().replace(/\t/g, " ")));

/*
for (const d of csv) {
  if (d[2].indexOf("森本") >= 0) {
    console.log(d[2]);
  }
}
Deno.exit(0);
*/

const d1 = 
`おかむらひさかず
おかむら
こいでのりゆき
こいで
たかむらこおし
たかむら
みきこうへい
みき
みのぐち・めぐみ
みのぐち
よしもとあきひら
よしもと
わたなべ・けんじ
わたなべ
わたなべともあき
わたなべ`.split("\n");

for (const d of csv) {
  let s = d[1];
  const n = d1.indexOf(s);
  if (n >= 0) {
    s = s.replace("・", "");
    s = s.replace("　", "");
    const len = d1[n + 1].length;
    s = s.substring(0, len) + " " + s.substring(len);
    console.log(s);
    d[1] = s;
  }
}

const d2 = 
`遠藤　守
遠藤
岡村久和
岡村
小出範幸
小出
児玉知浩
児玉
三木浩平
三木
山西潤一
山西
吉本明平
吉本
渡辺健次
渡辺
渡辺智暁
渡辺`.split("\n");

for (const d of csv) {
  let s = d[2];
  const n = d2.indexOf(s);
  if (n >= 0) {
    s = s.replace("・", "");
    s = s.replace("　", "");
    const len = d2[n + 1].length;
    s = s.substring(0, len) + " " + s.substring(len);
    console.log(s);
    d[2] = s;
  }
}

/*
for (const d of csv) {
  const d1 = d[1].trim().split(" ");
  if (d1.length !== 2) {
    console.log(d1);
  }
}
*/
for (const d of csv) {
  const d1 = d[2].trim().split(" ");
  if (d1.length !== 2) {
    console.log(d1);
  }
}

await Deno.writeTextFile("ictadvisors_2020.csv", CSV.encode(csv));

/*
おかむらひさかず
こいでのりゆき
たかむらこおし
みきこうへい
みのぐち・めぐみ
よしもとあきひら
わたなべ・けんじ
わたなべともあき


遠藤　守
遠藤
岡村久和
岡村
小出範幸
小出
児玉知浩
児玉
三木浩平
三木
山西潤一
山西
吉本明平
吉本
渡辺健次
渡辺
渡辺智暁
渡辺
*/
