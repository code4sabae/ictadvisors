import { CSV } from "https://code4sabae.github.io/js/CSV.js";

const toJSON = (csv, name) => {
  const head = csv[0];
  let idx = 0;
  for (let i = 0; i < head.length; i++) {
    if (head[i] == name) {
      head[i] += idx++;
    }
  }
  const data = CSV.toJSON(csv);
  data.forEach(d => {
    const ss = [];
    for (let i = 0; i <= idx; i++) {
      const v = d[name + i];
      if (v) {
        ss.push(v);
      }
      delete d[name + i];
    }
    d[name] = ss.join(",");
  });
  return data;
};

const data1 = toJSON(await CSV.fetch("ictadvisors_2021.csv"), "https://schema.org/knowsAbout");
const data2 = CSV.toJSON(await CSV.fetch("21_ad_opendata.csv"));

console.log(Object.keys(data1[0]));
console.log(Object.keys(data2[0]));
/*
[
  "https://schema.org/identifier",
  "https://schema.org/name",
  "https://schema.org/alternateName",
  "https://schema.org/jobTitle",
  "https://schema.org/image",
  "https://schema.org/knowsAbout",
  "https://schema.org/publishingPrinciples",
  "https://schema.org/isBasedOnUrl"
]
name id
name ふりがな
name 氏名
name 所属・役職
name 活動拠点
name 略歴
name 地域情報化の
専門分野・技術
name 自治体向け
メッセージ
name 関連ＵＲＬ
name これまでの経験業務・研究活動 
name これまでに関与した地域情報化に関するプロジェクト
*/

const extractURL = (s) => {
  const n = s.match(/(https?:\/\/[^\s]+)/);
  if (!n) {
    return n;
  }
  return n[1];
};
//console.log(extractURL("aorecuhあhttps://jig.jp/あ\narcoheu"));

// 神田 隆史 神田 隆史
// 高橋 邦夫 髙橋 邦夫
// 和﨑 宏 和崎 宏
data1.forEach((d, idx) => {
  //const d2 = data2.find(d2 => d2.id == d["https://schema.org/identifier"]);
  const d2 = data2[idx];
  if (!d2) {
    throw new Error();
  }
  const n = (s) => s.replace(/ /g, "").replace("隆", "隆").replace("髙", "高").replace("和﨑", "和崎");
  if (n(d2.氏名) != n(d["https://schema.org/name"])) {
    console.log(d2.氏名, d["https://schema.org/name"]);
    throw new Error();
  }
  console.log(d2.氏名);
  d["https://schema.org/jobTitle"] = d2["所属・役職"];
  d["https://schema.org/url"] = extractURL(d2["関連ＵＲＬ"]) || "";
  const param = ["活動拠点", "略歴", "地域情報化の\n専門分野・技術", "自治体向け\nメッセージ", "関連ＵＲＬ", "これまでの経験業務・研究活動 ", "これまでに関与した地域情報化に関するプロジェクト"];
  for (const name of param) {
    const v = d2[name];
    d[name.replace("\n", "").trim()] = v;
  }
});

await Deno.writeTextFile("ictadvisors_2021_2.csv", CSV.stringify(data1));
